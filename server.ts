import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { createGroqClient, handleChatRequest } from "./src/lib/chatHandler.js";
import { ReviewLike } from "./src/lib/chatContext.js";

dotenv.config();

function loadJson<T>(relativePath: string): T {
  const filePath = path.join(process.cwd(), "public", "data", relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Review + spec data loaded once at startup; used to ground chat answers.
  const reviews = loadJson<ReviewLike[]>("yyeon_reviews_final.json");
  const bagCompare = loadJson<{ bags: any[] }>("bag_compare.json");
  const groq = createGroqClient();

  // API Routes
  app.post("/api/chat", async (req, res) => {
    const result = await handleChatRequest(groq, reviews, bagCompare, req.body);
    res.status(result.status).json(result.body);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
