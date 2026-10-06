import React, { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Language } from "../types";

export interface LetterTheme {
  /** full-screen background */
  bg: string;
  closeColor: string;
  /** front sheet classes (background, border, shadow) */
  frontClass: string;
  backRotateDeg: number;
  titleSize: number;
  /** body font size for JA/KO; EN is always 15px */
  bodySize: number;
  lineHeight: number;
}

export const MEANING_THEME: LetterTheme = {
  bg: "#7391BA",
  closeColor: "#FBF3DC",
  frontClass: "bg-[#FFFDF6] shadow-[0_1px_4px_rgba(27,37,66,0.14)]",
  backRotateDeg: 2,
  titleSize: 38,
  bodySize: 13.5,
  lineHeight: 26,
};

export const DIRECTOR_THEME: LetterTheme = {
  bg: "#FFFDF6",
  closeColor: "#22262D",
  frontClass: "bg-white border border-[#E6DFD0] shadow-[0_1px_4px_rgba(34,38,45,0.08)]",
  backRotateDeg: 1.2,
  titleSize: 40,
  bodySize: 13,
  lineHeight: 25,
};

const BODY_FAMILY: Record<Language, string> = {
  JA: '"Shippori Mincho", serif',
  KO: '"Nanum Myeongjo", serif',
  EN: '"Cormorant Garamond", serif',
};

function Paperclip() {
  return (
    <svg
      width="34"
      height="92"
      viewBox="0 0 34 92"
      fill="none"
      aria-hidden="true"
      className="absolute z-10 pointer-events-none"
      style={{ left: 22, top: -46, transform: "rotate(-4deg)" }}
    >
      <path
        d="M10 74 V28 a8 8 0 0 1 16 0 V76 a10 10 0 0 1 -20 0 V36 a5.5 5.5 0 0 1 11 0 V70"
        stroke="#8B8D93"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full-screen letter paper shared by "Meaning of yeon" and the director letter.
 * - paragraphs: one string per paragraph
 * - joinLines: false keeps the line breaks inside a paragraph as written;
 *   true joins them into one flowing paragraph that wraps to the screen width.
 */
export function LetterPaper({
  lang,
  title,
  paragraphs,
  signature,
  theme,
  joinLines = false,
  onClose,
}: {
  lang: Language;
  title: string;
  paragraphs: string[];
  signature: React.ReactNode;
  theme: LetterTheme;
  joinLines?: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const isEN = lang === "EN";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const flow = (p: string) => p.split("\n").join(lang === "JA" ? "" : " ");
  const wrapStyle: React.CSSProperties = joinLines
    ? { textWrap: "balance" as any, wordBreak: lang === "KO" ? "keep-all" : "normal" }
    : {};

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      className="absolute inset-0 z-[70] flex flex-col"
      style={{ background: theme.bg }}
    >
      <div className="h-[68px] shrink-0 flex items-center justify-end px-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-11 h-11 flex items-center justify-center active:opacity-60"
          style={{ color: theme.closeColor }}
        >
          <X size={24} strokeWidth={1.25} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-[30px] pt-[26px] pb-12">
        <div className="relative">
          {/* back sheet */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#F1EBDC] shadow-[0_1px_3px_rgba(27,37,66,0.12)]"
            style={{ transform: `translate(8px, 8px) rotate(${theme.backRotateDeg}deg)` }}
          />
          <Paperclip />
          {/* front sheet */}
          <div className={`relative text-center pt-[62px] px-6 pb-[34px] ${theme.frontClass}`}>
            <h2
              className="whitespace-nowrap text-[#22262D] font-normal leading-tight"
              style={{
                fontFamily: '"Pinyon Script", cursive',
                fontSize: `min(${theme.titleSize}px, ${(theme.titleSize / 38) * 9.8}vw)`,
              }}
            >
              {title}
            </h2>
            <div className="mx-auto mt-4 mb-[22px] h-px w-7 bg-[#B9AE98]" />
            <div
              className={`text-[#22262D] ${joinLines ? "" : "whitespace-pre-line"}`}
              style={{
                fontFamily: BODY_FAMILY[lang],
                fontSize: isEN ? 15 : theme.bodySize,
                lineHeight: `${theme.lineHeight}px`,
                ...wrapStyle,
              }}
            >
              {paragraphs.map((p, i) => (
                <p key={i} style={{ marginTop: i === 0 ? 0 : 17 }}>
                  {joinLines ? flow(p) : p}
                </p>
              ))}
            </div>
            <div className="mt-[26px]">{signature}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
