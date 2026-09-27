# yyeon Reviews

A mobile-first review archive for **yyeon**'s Korean-made vegan leather bags.
Built for the brand's Japanese buyers, with Korean/Japanese/English support
throughout — reviews, product specs, storage-capacity comparisons, and an
AI concierge chat that only answers from that data.

## Features

- **Review archive** — browse and filter real customer reviews by product,
  color, and keyword, with photo galleries and AI-generated 3-second
  summaries.
- **Bag comparison** — lifestyle-based recommendations, side-by-side spec
  comparison, and a storage-capacity table (laptop / iPad / tumbler / books /
  lipstick) per bag.
- **Review data dashboard** — rating trends, activity heatmap, review source
  breakdown.
- **AI concierge chat** — answers product questions grounded only in yyeon's
  own review/spec/storage data (see [How the chat works](#how-the-chat-works)
  below); never invents information it wasn't given.
- **KO / JA / EN** throughout the UI and chat responses.

## Tech stack

- **Frontend:** Vite + React 19 + TypeScript, Tailwind CSS, Framer Motion
- **Chat backend:** [Groq](https://groq.com) (OpenAI-compatible Chat
  Completions API), served via:
  - `server.ts` — a local Express server (used by `npm run dev`/`npm start`)
  - `api/chat.ts` — a Vercel serverless function (used in production on
    Vercel)
- **Data:** static JSON in `public/data/` (reviews, bag specs, color guide,
  review analysis) + `src/data/bagComparison.ts` (storage-capacity table)

## Project structure

```
src/
  components/       UI screens (Home, Data, Compare, Wishlist, Guide/chat, ...)
  lib/
    categories.ts     canonical bag categories + KO/JA/EN name aliases
    chatContext.ts     matches a chat question to a category (exact + fuzzy),
                        builds its review/spec/storage context block
    chatHandler.ts     shared chat request logic (used by both server.ts
                        and api/chat.ts, so they can't drift apart)
  translations.ts    all KO/JA/EN UI + chat copy
public/data/         review + spec JSON consumed by both the UI and the chat
api/chat.ts          Vercel serverless chat endpoint
server.ts            local dev/prod Express server (same /api/chat route)
```

## How the chat works

1. `matchCategoryFromQuery()` matches the user's question to a bag category
   by exact keyword match first, falling back to typo-tolerant fuzzy
   matching (Fuse.js) if that fails — tuned to catch real typos without
   guessing wrong when nothing matches.
2. If a category matched, `buildChatContext()` pulls that product's
   highest-rated/most-recent reviews, spec sheet, and storage-capacity data
   into a context block.
3. That context is sent to Groq with a system prompt that forbids answering
   from anything not in the block. If no category matched at all, a fixed
   fallback message is returned **without calling the LLM**.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Set `GROQ_API_KEY` in `.env.local` to your [Groq API key](https://console.groq.com/keys)
3. Run the app:
   ```
   npm run dev
   ```
   Serves the app (with Express + Vite middleware) at `http://localhost:3000`.

Other scripts:
- `npm run build` — production build (`dist/`) + bundles `server.ts` for
  `npm start`
- `npm start` — run the production build locally
- `npm run lint` — `tsc --noEmit`

## Deploying to Vercel

The chat backend runs as a Vercel serverless function at `api/chat.ts` (the
local `server.ts` Express server is unrelated to this and is only used for
`npm run dev`/`npm start`).

Before deploying, set the `GROQ_API_KEY` environment variable in the Vercel
project dashboard (**Settings → Environment Variables**) — it is **not**
read from `.env`/`.env.local` in production, those only apply locally.

To deploy: import this repository at [vercel.com](https://vercel.com) (Add
New → Project). Vercel auto-detects the Vite framework preset; `vercel.json`
handles the build command and SPA routing fallback.
