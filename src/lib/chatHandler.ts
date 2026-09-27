// Shared chat-request handling logic, used by both the local Express server
// (server.ts) and the Vercel serverless function (api/chat.ts). Keeping this
// here means the two request/response adapters never drift apart.
import OpenAI from "openai";
import { buildChatContext, ReviewLike } from "./chatContext";
import { translations } from "../translations";

export const SUPPORTED_LANGS = ["KO", "JA", "EN"] as const;
export type ChatLang = (typeof SUPPORTED_LANGS)[number];

const GROQ_MODEL = "openai/gpt-oss-20b";

const LANG_NAMES: Record<ChatLang, string> = {
  KO: "Korean",
  JA: "Japanese",
  EN: "English",
};

function buildSystemPrompt(chatLang: ChatLang): string {
  return `You are 'yyeon's AI Brand Assistant'.
Your tone is professional, sophisticated, yet warm and helpful.
You help users with product inquiries and review interpretations for yyeon bags.
Keep answers concise and helpful.

LANGUAGE — you MUST respond only in ${LANG_NAMES[chatLang]}, regardless of what language the user's message, the conversation history, or the CONTEXT data below is written in. Never switch languages mid-answer or mirror the user's input language if it differs from ${LANG_NAMES[chatLang]}.

IMPORTANT — grounding rules:
- Every user message includes a "### CONTEXT" block with REVIEWS, SPECS, and STORAGE CAPACITY data for one matched product, gathered from yyeon's own data. This block is only ever included when a product was actually matched, so it is always present in the messages you receive.
- Answer ONLY using facts present in that context block. Never invent ratings, specs, materials, sizes, or storage capabilities that are not explicitly stated there.
- When a section says "No ... data available", tell the user plainly that this information isn't available yet for that product instead of guessing.
- Never generate brand introductions, company descriptions, or generic marketing copy that is not explicitly present in the provided context data — even if it sounds plausible or on-brand.
- Clearly attribute each claim to its source in your answer, using a phrase matching the response language, e.g. Korean "리뷰에 따르면~" / "스펙상~" / "수납표 기준~", Japanese "レビューによると~" / "スペック上~" / "収納表によると~", English "According to reviews~" / "Per the spec~" / "Per the storage chart~".`;
}

const NO_CONTEXT_FALLBACK: Record<ChatLang, string> = {
  KO: "안녕하세요! 리뷰와 가방 데이터를 기반으로 답변해드리고 있어요. 궁금하신 제품명이나 특징을 말씀해주시면 답변해드릴게요.",
  JA: "こんにちは！レビューとバッグのデータをもとにお答えしています。気になる製品名や特徴を教えていただければお答えします。",
  EN: "Hi! I answer based on our review and bag data. Let me know which product or feature you're curious about, and I'll help from there.",
};

export interface ChatRequestBody {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  lang?: string;
}

export type ChatResult =
  | { status: 200; body: { text: string } }
  | { status: 429; body: { error: string; message: string } }
  | { status: 500; body: { error: string } };

export function createGroqClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.GROQ_API_KEY || "",
    baseURL: "https://api.groq.com/openai/v1",
  });
}

export async function handleChatRequest(
  groq: OpenAI,
  reviews: ReviewLike[],
  bagCompare: { bags: any[] },
  requestBody: ChatRequestBody,
): Promise<ChatResult> {
  const { message, history, lang } = requestBody;
  const chatLang: ChatLang = (SUPPORTED_LANGS as readonly string[]).includes(lang || "")
    ? (lang as ChatLang)
    : "KO";

  const context = buildChatContext(message, reviews, bagCompare, chatLang);
  console.log(
    `[chat] message=${JSON.stringify(message)} lang=${chatLang} context=${
      context
        ? `MATCHED (${context.text.length} chars, hasSpecs=${context.hasSpecs})`
        : "EMPTY (no category matched)"
    }`,
  );

  if (!context) {
    return { status: 200, body: { text: NO_CONTEXT_FALLBACK[chatLang] } };
  }

  const augmentedMessage = `### CONTEXT\n${context.text}\n\n### USER QUESTION\n${message}`;
  const chatHistory = history || [];

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: buildSystemPrompt(chatLang) },
        ...chatHistory,
        { role: "user", content: augmentedMessage },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    // Fixed append, not left to the model — keeps wording consistent and
    // guarantees it's never dropped. When the answer drew on specs, the
    // compare-tab mention and the KakaoTalk notice are combined into one
    // sentence instead of stacking as two separate notices.
    const guideText = translations[chatLang].guide;
    const notice = context.hasSpecs
      ? guideText.chat_compare_and_kakao_notice
      : guideText.chat_kakao_notice;
    return { status: 200, body: { text: text + notice } };
  } catch (error) {
    console.error("Chat Error:", error);
    if (error instanceof OpenAI.APIError && error.status === 429) {
      return {
        status: 429,
        body: { error: "rate_limited", message: "지금 요청이 많아서 잠시 후 다시 시도해주세요." },
      };
    }
    return { status: 500, body: { error: "Failed to get AI response" } };
  }
}
