<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/67c5bf3f-3def-47f0-8ec8-4d167127ced2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GROQ_API_KEY` in [.env.local](.env.local) to your Groq API key
3. Run the app:
   `npm run dev`

## Deploying to Vercel

The chat backend runs as a Vercel serverless function at `api/chat.ts` (the
local `server.ts` Express server is unrelated to this and is only used for
`npm run dev`/`npm start`).

Before deploying, set the `GROQ_API_KEY` environment variable in the Vercel
project dashboard (**Settings → Environment Variables**) — it is **not**
read from `.env`/`.env.local` in production, those only apply locally.
