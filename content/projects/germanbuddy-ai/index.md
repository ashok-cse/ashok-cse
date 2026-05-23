---
title: "germanbuddy.ai"
description: "An AI-powered German learning companion for writing, speaking, and chat practice — built on SvelteKit, LLM APIs, STT, TTS, and Python."
date: 2026-05-23
tags: ["AI", "LLM", "STT", "TTS", "SvelteKit", "Python", "German", "Education"]
categories: ["Projects"]
externalUrl: "https://germanbuddy.ai"
weight: 20
showReadingTime: false
showTableOfContents: true
---

> **TL;DR** — An AI buddy that helps German learners write better, practice speaking, and run roleplay conversations. Born from the gap between Duolingo and actually talking to humans in Berlin.

[**Visit germanbuddy.ai →**](https://germanbuddy.ai)

## Problem

I moved to Germany and hit the same wall most B1 learners hit: apps teach you *vocabulary*, classes teach you *grammar*, but no one helps you have a **real, low-stakes conversation** — about renting a flat, opening a bank account, or arguing with the Bürgeramt.

## Solution

germanbuddy.ai is an AI companion for German learners that combines:

- **Writing correction** with explanations, not just fixes
- **Speaking practice** with pronunciation support
- **Roleplay conversation flows** for real German life scenarios

## Tech stack

- **Frontend:** SvelteKit, Tailwind CSS, TypeScript
- **Backend:** Python service for AI orchestration
- **AI:** LLM APIs for chat and corrections, STT for speech input, TTS for spoken replies
- **Storage:** Relational DB for users / conversations
- **Infra:** Containerized deployment

## Architecture highlights

- **Two-pass correction:** First pass replies naturally in German, second pass annotates the *user's* last message for issues. Conversation flow stays human, corrections stay precise.
- **Prompt layering:** A persona prompt + a per-scenario prompt + a correction-schema prompt, composed at request time. Adding a new scenario is a config change, not a code change.
- **Voice loop:** Browser-captured audio → STT → LLM → TTS → playback. Designed so each hop fails gracefully (e.g. fall back to text if STT errors).
- **Python orchestration layer:** Keeps prompt logic, STT/TTS providers, and LLM routing out of the frontend, so models can be swapped without touching the UI.

## Key features

- Writing correction with *why*, not just *what*
- Speaking practice with pronunciation support
- Roleplay scenarios for real German life situations
- Personal progress, captured from real conversations

## What I learned

- Building AI products is mostly **prompt engineering + UX engineering**, in that order.
- The most useful feature isn't the chat — it's the **correction loop**.
- Voice raises the stakes on latency. Every saved second translates into a more usable product.
- Solving your own pain is the cheat code for product clarity.
