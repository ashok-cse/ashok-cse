---
title: "yapping.me"
description: "Echtzeit-Chat-Plattform für Unterhaltungen mit Fremden — mit Text, Medien, Audio und Video. Gebaut mit SvelteKit, Node.js, Socket.IO, WebRTC, Redis und MinIO."
date: 2026-05-23
tags: ["SvelteKit", "Node.js", "Socket.IO", "WebRTC", "Redis", "MinIO", "Echtzeit"]
categories: ["Projekte"]
externalUrl: "https://yapping.me"
weight: 10
showReadingTime: false
showTableOfContents: true
---

> **Kurz gesagt** — Eine Echtzeit-Plattform, die zwei fremde Menschen sofort verbindet und Text-, Medien-, Audio- oder Video-Chat ermöglicht. Im Alleingang von der Idee bis zu den bezahlten Funktionen gebaut.

[**yapping.me besuchen →**](https://yapping.me)

## Problem

Zufalls-Chat als Kategorie (man denke an Omegle) brach mit der Abschaltung von Omegle ein und hinterließ eine Lücke für eine **sicherere, moderne und sauber entwickelte** Alternative. Die Herausforderung ist anspruchsvoll: Matching mit niedriger Latenz, Peer-to-Peer-Medien, Umgang mit Missbrauch, Medienaustausch und eine UX, die auch bei schlechtem Mobilfunknetz funktioniert.

## Lösung

yapping.me verbindet zwei Fremde in **unter einer Sekunde** über ein warteschlangenbasiertes System und ermöglicht den fließenden Wechsel von Text → Medien → Audio → Video, ohne die Seite zu verlassen.

- Warteschlangenbasiertes Matching mit Filtern
- Text-Chat über WebSockets, Medienaustausch über MinIO, Sprache/Video über WebRTC
- „Weiter" / „Überspringen" ohne Seitenneuladen
- Bezahlte Funktionen aufbauend auf dem kostenlosen Erlebnis

## Tech-Stack

- **Frontend:** SvelteKit, Tailwind CSS, TypeScript
- **Echtzeit:** Socket.IO für Signaling und Chat, WebRTC für Audio/Video
- **Backend:** Node.js
- **State / Matching:** Redis (Queues, Presence, Rate Limits)
- **Object Storage:** MinIO für geteilte Medien
- **Infra:** Docker, AWS

## Architektur-Highlights

- **Warteschlangenbasiertes Matching:** Nutzer:innen werden anhand von Filter-Buckets in Redis-Listen eingereiht. Ein Matcher-Worker paart sie und sendet ein `matched`-Event an beide Sockets.
- **WebRTC-Signaling über Socket.IO:** Der Offer/Answer/ICE-Flow läuft über den Node-Server; sobald verbunden, sind Medien vollständig Peer-to-Peer.
- **Medienaustausch über MinIO:** Geteilte Fotos/Dateien laufen über pre-signed MinIO-URLs, sodass der Echtzeit-Server nie große Payloads anfasst.
- **Reconnect-sichere Sessions:** Kurzlebige Session-Token erlauben es, ein bestehendes Paar wiederherzustellen, wenn der Socket innerhalb eines Zeitfensters abreißt.
- **Modulare Anti-Missbrauchs-Schicht:** Rate Limits, Soft-Bans und Melde-Flow liegen in Middleware und lassen sich leicht weiterentwickeln.

## Hauptfunktionen

- Echtzeit-Text, -Medien, -Audio und -Video mit einem gemeinsamen „Weiter"-Button
- Filter auf der Matching-Ebene
- Mobile-first, freundlich für schwache Bandbreite
- Bezahlte Funktionen aufbauend auf dem kostenlosen Erlebnis

## Was ich gelernt habe

- WebRTC ist „einfach, bis es das nicht mehr ist" — der meiste Schmerz liegt bei NAT-Traversal, TURN und mobilen Browsern.
- Ein **warteschlangenbasierter Matcher in Redis** ist für eine v1 dramatisch einfacher als ein eigener Service.
- **MinIO + pre-signed URLs** halten den Echtzeit-Server schlank — niemals Medien proxen, die man nicht muss.
- Echtzeit-Produkte brauchen eigene Observability — Sockets, Abbrüche und Matches verdienen erstklassige Metriken.
- Bezahlte Funktionen auf einem Echtzeit-Produkt zwingen einen, Latenz-Budgets gegen Friction abzuwägen.
