import { Language } from "../types";

/**
 * Brand Letter data. Add new letters to the top-level array below.
 * - no: issue number (the highest number is treated as the latest letter)
 * - date: "YYYY-MM-DD"
 * - image: optional path under /public (e.g. "/images/letters/001.jpg")
 * - body: paragraphs, one array item per paragraph
 */
export interface BrandLetter {
  no: number;
  date: string;
  image?: string;
  title: Record<Language, string>;
  body: Record<Language, string[]>;
}

export const LETTERS: BrandLetter[] = [
  {
    no: 1,
    date: "2026-10-01",
    image: undefined,
    title: {
      KO: "첫 번째 레터 제목",
      JA: "最初のレターのタイトル",
      EN: "Title of the first letter",
    },
    body: {
      KO: ["여기에 레터 본문을 적어주세요.", "문단마다 배열 항목을 하나씩 추가하면 돼요."],
      JA: ["ここにレター本文を入力してください。", "段落ごとに配列の項目を追加してください。"],
      EN: ["Write the letter body here.", "Add one array item per paragraph."],
    },
  },
];

export const getSortedLetters = () => [...LETTERS].sort((a, b) => b.no - a.no);

export const getLatestLetter = () => getSortedLetters()[0];

export const formatLetterNo = (no: number) => `No. ${String(no).padStart(2, "0")}`;
