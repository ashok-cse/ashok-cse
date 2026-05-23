---
title: "yapping.me"
description: "Realtime stranger chat platform with text, media, audio, and video — built on SvelteKit, Node.js, Socket.IO, WebRTC, Redis, and MinIO."
date: 2026-05-23
tags: ["SvelteKit", "Node.js", "Socket.IO", "WebRTC", "Redis", "MinIO", "Realtime"]
categories: ["Projects"]
externalUrl: "https://yapping.me"
weight: 10
showReadingTime: false
showTableOfContents: true
---

> **TL;DR** — A realtime stranger chat platform where two people get matched instantly and can chat via text, media, audio, or video. Built solo from idea to paid features.

[**Visit yapping.me →**](https://yapping.me)

## Problem

Random chat as a category (think Omegle-style) collapsed when Omegle shut down, leaving a gap for a **safer, modern, well-engineered** alternative. The challenge is non-trivial: low-latency matching, peer-to-peer media, abuse handling, media sharing, and a UX that works on bad mobile networks.

## Solution

yapping.me matches two strangers in **under a second** using a queue-based system and lets them escalate from text → media → audio → video without leaving the page.

- Queue-based matching with filters
- Text chat over WebSockets, media sharing through MinIO, voice/video over WebRTC
- "Next" / "Skip" without page reload
- Paid features layered on top of the free experience

## Tech stack

- **Frontend:** SvelteKit, Tailwind CSS, TypeScript
- **Realtime:** Socket.IO for signaling and chat, WebRTC for audio/video
- **Backend:** Node.js
- **State / matching:** Redis (queues, presence, rate limits)
- **Object storage:** MinIO for shared media
- **Infra:** Docker, AWS

## Architecture highlights

- **Queue-based matching:** Users are pushed into Redis lists based on filter buckets. A matcher worker pairs them and emits a `matched` event to both sockets.
- **WebRTC signaling over Socket.IO:** Offer/answer/ICE flow brokered through the Node server; once connected, media is fully peer-to-peer.
- **Media sharing via MinIO:** Shared photos/files go through pre-signed MinIO URLs so the realtime server never touches large payloads.
- **Reconnect-safe sessions:** Short-lived session tokens let users recover an existing pair if their socket drops within a grace window.
- **Pluggable abuse layer:** Rate limits, soft-bans, and report flow live in middleware so they're easy to evolve.

## Key features

- Realtime text, media, audio, and video with one shared "Next" button
- Filters at the matching layer
- Mobile-first, low-bandwidth-friendly UI
- Paid feature tier built on top of the free experience

## What I learned

- WebRTC is "easy until it isn't" — most pain is around NAT traversal, TURN, and mobile browsers.
- A **queue-based matcher in Redis** is dramatically simpler than a custom service for a v1.
- **MinIO + pre-signed URLs** keeps the realtime server lean — never proxy media you don't have to.
- Realtime products need their own observability — sockets, drops, and matches need first-class metrics.
- Shipping paid features on a realtime product forces you to think hard about latency budgets vs. friction.
