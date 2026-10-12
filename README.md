# Guddu Z

An offline-first AI study assistant for Android: answers questions from a local library,
solves maths with a verified engine, helps you study, and reads text from photos.
Online mode is optional and always asks permission first.

## Status
Planning and design. See `docs/guddu-z-guide.html` for the full guide, tech stack and roadmap.

## Planned stack
Expo + React Native + TypeScript (dev client, built with EAS), `llama.rn`, SQLite,
`mathjs`, ML Kit OCR, NetInfo, Zustand. Verify package names and versions before installing.

## Getting started
```bash
npx create-expo-app@latest . --template blank-typescript
npx expo install expo-dev-client
eas build --profile development --platform android
```

## Structure
- `src/screens`, `src/components`: UI
- `src/ai`: model loading, router, prompts, confidence
- `src/db`: SQLite, chunks, embeddings
- `src/theme`: brand tokens
- `assets/brand`: logo master, icon, splash

## Notes
- Model files (`.gguf`) are downloaded after install and are never committed.
- Add a LICENSE once you decide how others may use the code.
