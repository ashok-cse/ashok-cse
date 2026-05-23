---
title: "How I Built GermanBuddy to Improve My German Learning"
description: "A personal product-building story about creating an AI-powered German learning companion — born from my own pain as a learner in Berlin."
date: 2026-05-23
tags: ["AI", "German Learning", "Product Building", "LLM", "SvelteKit", "Python"]
categories: ["AI Products", "Product Building"]
showReadingTime: true
showTableOfContents: true
---

> I moved to Germany, hit the same wall every learner hits, and built the tool I wished existed.

## The wall every learner hits

I started learning German seriously when I moved to Berlin. I did the usual stack — Duolingo, a textbook, a Sprachschule, a few language exchange evenings. A few months in, I noticed something annoying:

- I knew the *words* (vocabulary apps work).
- I knew the *rules* (classes work, kind of).
- I was still terrified to **actually speak**.

The gap wasn't grammar. It was **reps in a low-stakes environment**, with feedback I could trust.

## The product idea (in one sentence)

> A patient German tutor I can write to, talk to, and roleplay with — that corrects me gently and explains *why*.

That's it. Not gamified. Not flashcards. Just a conversation that gets better with feedback.

## Stack choices (and why)

I went with the boring, fast option:

- **SvelteKit** for the app — SSR, server routes, fast DX, tiny bundles.
- **TypeScript** — non-negotiable for me at this point.
- **Tailwind CSS** — fastest path from idea to UI.
- **Python** service for AI orchestration — easiest place to wire LLM, STT, and TTS together.
- **LLM APIs** for the actual intelligence.
- **STT / TTS** for the voice loop.

I deliberately avoided anything novel in the infra. The interesting part of this project is the **prompt design and the voice loop**, not the framework.

## The two-pass correction trick

The first version did one thing: chat with the user in German and quietly fix their grammar in the reply. That felt creepy. Users couldn't tell *what* they got wrong.

I switched to a **two-pass approach**:

1. **Pass 1 — Reply:** Respond like a friendly tutor would. Keep the conversation moving.
2. **Pass 2 — Annotate:** Take the *user's* last message and run a second prompt that returns structured corrections:

```json
{
  "originalSentence": "Ich gehen zum Bahnhof",
  "corrected": "Ich gehe zum Bahnhof",
  "issues": [
    { "type": "verb-conjugation", "explanation": "1st person singular needs '-e'." }
  ]
}
```

The UI renders the chat reply *and* a small "you might want to fix this" card under the user's message. Now feedback is **visible, optional, and explained**.

## Prompt layering

The system prompt has three layers, composed at request time on the Python service:

- **Persona layer:** "You are a friendly, patient German tutor. Never switch to English unless asked..."
- **Scenario layer:** "The user is practicing for: *finding a flat in Berlin*. Help them sound natural in that context."
- **Correction layer (pass 2):** Strict JSON schema for issues.

Keeping these separate means I can ship a new scenario pack by editing one config, not the whole prompt.

## The voice loop

Speaking is the actual blocker, not typing. The loop is straightforward but unforgiving on latency:

```
Browser mic → STT → LLM → TTS → playback
```

A few things that mattered:

- **Stream wherever possible.** Waiting for the full LLM reply before TTS made the app feel dead.
- **Fail gracefully.** If STT errors, fall back to typing without losing the conversation.
- **Cache TTS for repeated phrases.** Tutor catchphrases ("Genau!", "Versuch noch einmal") don't need to hit the TTS provider every time.

## What surprised me

- Users care more about the **correction card** than the chat itself. That's the actual product.
- People will happily talk to an AI in a foreign language **because it doesn't judge them**.
- The hardest UX problem isn't the bot — it's making sure users *trust* the corrections.
- Latency on the voice loop is a feature; saved milliseconds translate directly into engagement.

## What I'd do differently

- Start with **scenario packs** from day one. Free-form chat is great for power users, terrible for first-timers.
- **Stream the voice loop** from the very first version — batch responses make voice feel broken.
- Track a single "did the user keep coming back" metric. Everything else is a vanity number.

## What's next

More scenarios, better pronunciation feedback, and a sharper roleplay mode. The browser + LLM + STT/TTS stack is finally good enough to do this without native apps, and that changes the product.

If you're learning German and want to try it: [germanbuddy.ai](/projects/germanbuddy-ai/).
