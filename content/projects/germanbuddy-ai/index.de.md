---
title: "germanbuddy.ai"
description: "Ein KI-gestützter Lernbegleiter für Deutsch — zum Schreiben, Sprechen und Üben im Chat. Gebaut mit SvelteKit, LLM-APIs, STT, TTS und Python."
date: 2026-05-23
tags: ["KI", "LLM", "STT", "TTS", "SvelteKit", "Python", "Deutsch", "Bildung"]
categories: ["Projekte"]
externalUrl: "https://germanbuddy.ai"
weight: 20
showReadingTime: false
showTableOfContents: true
---

> **Kurz gesagt** — Ein KI-Buddy, der Deutsch-Lernenden hilft, besser zu schreiben, zu sprechen und Rollenspiel-Gespräche zu üben. Entstanden aus der Lücke zwischen Duolingo und echten Gesprächen mit Menschen in Berlin.

[**germanbuddy.ai besuchen →**](https://germanbuddy.ai)

## Problem

Ich bin nach Deutschland gezogen und gegen dieselbe Wand gelaufen, gegen die die meisten B1-Lernenden laufen: Apps bringen einem *Vokabeln* bei, Kurse bringen einem *Grammatik* bei, aber niemand hilft einem, ein **echtes, niedrigschwelliges Gespräch** zu führen — über das Mieten einer Wohnung, das Eröffnen eines Kontos oder das Diskutieren mit dem Bürgeramt.

## Lösung

germanbuddy.ai ist ein KI-Begleiter für Deutsch-Lernende und kombiniert:

- **Schreibkorrektur** mit Erklärungen statt nur Korrekturen
- **Sprechpraxis** mit Aussprache-Unterstützung
- **Rollenspiel-Gesprächsflüsse** für reale Alltagssituationen in Deutschland

## Tech-Stack

- **Frontend:** SvelteKit, Tailwind CSS, TypeScript
- **Backend:** Python-Service für KI-Orchestrierung
- **KI:** LLM-APIs für Chat und Korrekturen, STT für Spracheingabe, TTS für gesprochene Antworten
- **Speicher:** relationale Datenbank für Nutzer:innen / Gespräche
- **Infra:** containerisiertes Deployment

## Architektur-Highlights

- **Zwei-Pass-Korrektur:** Der erste Pass antwortet natürlich auf Deutsch, der zweite Pass annotiert die *letzte Nachricht der Nutzerin* auf Fehler. Der Gesprächsfluss bleibt menschlich, die Korrekturen bleiben präzise.
- **Prompt-Schichtung:** Ein Persona-Prompt + ein Szenario-Prompt + ein Korrektur-Schema-Prompt, zur Laufzeit zusammengesetzt. Ein neues Szenario hinzuzufügen ist eine Konfigurationsänderung, keine Codeänderung.
- **Sprach-Loop:** Im Browser aufgenommenes Audio → STT → LLM → TTS → Wiedergabe. So konzipiert, dass jeder Schritt anmutig scheitert (z. B. Fallback auf Text bei STT-Fehlern).
- **Python-Orchestrierungsschicht:** Hält Prompt-Logik, STT/TTS-Anbieter und LLM-Routing aus dem Frontend heraus, sodass Modelle ohne UI-Eingriff getauscht werden können.

## Hauptfunktionen

- Schreibkorrektur mit *Warum*, nicht nur *Was*
- Sprechpraxis mit Aussprache-Unterstützung
- Rollenspiel-Szenarien für reale deutsche Alltagssituationen
- Persönlicher Fortschritt, erfasst aus echten Gesprächen

## Was ich gelernt habe

- Der Bau von KI-Produkten ist vor allem **Prompt-Engineering + UX-Engineering**, in dieser Reihenfolge.
- Die nützlichste Funktion ist nicht der Chat — es ist der **Korrektur-Loop**.
- Sprache erhöht den Latenz-Druck. Jede eingesparte Sekunde macht das Produkt nutzbarer.
- Den eigenen Schmerz zu lösen, ist der Cheatcode für Produktklarheit.
