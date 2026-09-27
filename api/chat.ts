import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createGroqClient, handleChatRequest } from "../src/lib/chatHandler.js";
import { ReviewLike } from "../src/lib/chatContext.js";
// Node's native ESM resolver (used when Vercel transpiles instead of
// bundling) requires explicit file extensions on relative imports, and
// JSON imports need an import attribute — omitting either produced
// "Cannot find module" at runtime in production even though local `tsx`
// and Vite resolve them fine without either.
import reviewsData from "../public/data/yyeon_reviews_final.json" with { type: "json" };
import bagCompareData from "../public/data/bag_compare.json" with { type: "json" };

// Imported (not fs.readFileSync'd from public/) so the data is bundled into
// the function at build time. Vercel functions are stateless per cold
// start — there's no guarantee the `public/` directory is present or
// readable on disk at invocation time the way it is for a long-running
// Express process, so runtime fs reads aren't a safe bet here. Importing
// sidesteps the question entirely: the JSON is inlined into the function
// bundle, so it's always available with zero I/O.
const reviews = reviewsData as unknown as ReviewLike[];
const bagCompare = bagCompareData as unknown as { bags: any[] };

// Module-level singleton: reused across warm invocations of the same
// function instance (only re-created on a fresh cold start).
const groq = createGroqClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const result = await handleChatRequest(groq, reviews, bagCompare, req.body);
  res.status(result.status).json(result.body);
}
