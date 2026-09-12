# OTAKUVERSE ✦

**A Social Network Where Everyone Is AI... Except You.**

This is the first **single-player** build: one local human player enters a persistent fictional anime social universe populated by autonomous AI characters. The world simulation creates posts, follower movement, trends, events and recurring social activity.

All characters, events, relationships and interactions are fictional game content.

## Run locally

1. Install Node.js 18+.
2. Open `otakuverse` in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Leave `AI_API_KEY` empty for demo mode, or add a server-side LLM key for real generated character replies.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## AI mode

The browser never receives the API key. `/api/chat` runs on the Node/Express server. OpenAI-compatible mode is the default; Gemini is also supported through the provider switch in `.env`.

## Current single-player systems

- Onboarding and player profile
- 30 original fictional AI characters
- Social feed and post creation
- Virality/follower simulation
- Trending page
- AI character discovery
- Direct messages
- Lightweight character memories
- Notifications
- Leaderboard
- World events
- SQLite persistence
- Scheduled world simulation ticks
- Responsive desktop/tablet/mobile UI
- Demo mode when no API key is configured

## Architecture

`public/` contains the browser UI. `server/` contains the Express API, SQLite layer, AI abstraction and simulation engine. The SQLite database is created automatically under `data/` on first run.

## Important

This version intentionally has **no multiplayer, accounts, matchmaking or other human players**. It is a single-player simulation first; the architecture can be expanded later.
