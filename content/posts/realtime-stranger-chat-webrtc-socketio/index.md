---
title: "Building a Realtime Stranger Chat App with WebRTC and Socket.IO"
description: "How I built Yapping.me — a low-latency stranger chat with text, audio, and video using SvelteKit, Node.js, Socket.IO, Redis, and WebRTC."
date: 2026-05-23
tags: ["WebRTC", "Socket.IO", "Realtime", "SvelteKit", "Node.js", "Redis"]
categories: ["Engineering", "Realtime Systems"]
showReadingTime: true
showTableOfContents: true
---

> Building a realtime product teaches you things no CRUD app ever will. Here's how I shipped Yapping.me — and what I'd do differently next time.

## The constraint that shapes everything

A stranger-chat product has exactly one job: **match two people fast and keep the connection alive**. Everything else — UI, monetization, moderation — is downstream of that.

So the constraints are:

- **Sub-second matching** (or users bounce)
- **Reliable WebRTC** across mobile, NAT, and bad Wi-Fi
- **Cheap to run** at zero traffic, scalable when it spikes

## The stack

| Concern | Tool |
| --- | --- |
| Frontend | SvelteKit + Tailwind |
| Realtime signaling | Socket.IO |
| Media | WebRTC (peer-to-peer) |
| Backend | Node.js |
| Matching state | Redis (lists + presence) |
| TURN | Hosted TURN provider |
| Infra | Docker on AWS, Cloudflare in front |

## Queue-based matching, the simple way

The mental model is just two Redis lists per filter bucket:

- `queue:lang:en:cam` — people in English, wanting video
- `queue:lang:de:text` — people in German, text only

When a user joins:

1. Their socket gets a `userId`.
2. The matcher tries `LPOP` on the queue matching their filters.
3. If it gets someone — **pair them**, emit `matched` to both sockets with a `roomId`.
4. If not — `RPUSH` themselves and wait.

That's the whole matcher. ~50 lines of code. It's almost embarrassing how well it works.

```js
async function tryMatch(user) {
  const partnerId = await redis.lpop(queueKey(user.filters));
  if (partnerId) {
    return pair(user.id, partnerId);
  }
  await redis.rpush(queueKey(user.filters), user.id);
}
```

## Signaling: Socket.IO is great for this

Once two users are paired into a `roomId`, WebRTC signaling is straightforward:

1. Caller creates an `offer`, sends it through Socket.IO to the partner.
2. Partner creates an `answer`, sends it back.
3. ICE candidates trickle in both directions over the same socket.
4. Once connected, **media goes peer-to-peer** — your server stops paying that bandwidth bill.

Socket.IO is overkill if all you need is signaling, but it gives you rooms, reconnect, fallbacks, and broadcast for free.

## Reconnect-safe sessions

Mobile users drop sockets *constantly*. The fix:

- Issue a short-lived `sessionToken` when a pair is established.
- If a user reconnects within ~5 seconds with the same token, re-attach them to the same room.
- After the grace window, just match them with someone new.

This single change reduced "the screen froze" complaints dramatically.

## TURN: the part nobody warns you about

WebRTC works peer-to-peer in maybe **70–80%** of cases. The other 20–30% — symmetric NATs, corporate networks, mobile carrier weirdness — need **TURN servers**. TURN means *your* server is now relaying media, which costs real money.

You will need:

- A hosted TURN provider (or self-host coturn).
- Time-limited credentials per session.
- Monitoring on TURN usage — it correlates directly with your bill.

## Moderation: ship the boring stuff early

For a stranger-chat app, **moderation is the product**. I shipped, in order:

1. **Rate limits** on `next` / `report` — at the socket layer.
2. **Report → soft-ban**: 3 reports in 24 hours = 1-hour cool-off.
3. **Hard blocks** by hashed user fingerprint.
4. **Manual review queue** for flagged sessions.

None of this is glamorous. All of it is non-negotiable.

## What I'd do differently

- **Build observability before features.** Sockets, drops, pair lifetimes, TURN bytes — make them dashboards on day one.
- **Use a single shared schema** for socket events. Untyped sockets are a debugging nightmare.
- **Treat matching as a separable service** earlier. Even if it lives in the same process, design it as if it doesn't.
- **Pick TURN provider before launch**, not after the first 1000 users.

## What this taught me

Realtime products are unforgiving. Every dropped socket, every laggy ICE candidate, every TURN relay is a user-visible bug. But they're also some of the most satisfying systems to build — when it works, two strangers talk in milliseconds.

The whole stack — SvelteKit on the edge, Node + Socket.IO + Redis in the middle, WebRTC end-to-end — is genuinely small. The interesting work is in the **state machine**, the **reconnect logic**, and the **moderation layer**.

If you want to see it live: [yapping.me](/projects/yapping-me/).
