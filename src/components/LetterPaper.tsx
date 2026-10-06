import React, { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Language } from "../types";
import { homeTilesText } from "../i18n/homeTiles";

const BODY_FONT: Record<Language, { family: string; size: number }> = {
  JA: { family: '"Shippori Mincho", serif', size: 13.5 },
  KO: { family: '"Nanum Myeongjo", serif', size: 13.5 },
  EN: { family: '"Cormorant Garamond", serif', size: 15 },
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

// "{{word}}" markers in brand_story were emphasis hints for the old home layout; show the word without braces.
const stripMarkers = (p: string) => p.replace(/\{\{(.+?)\}\}/g, "$1");

export function LetterPaper({ t, lang, onClose }: { t: any; lang: Language; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const paragraphs: string[] = (t.home.brand_story ?? []).map(stripMarkers);
  const font = BODY_FONT[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={homeTilesText[lang].meaningTitle}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      className="absolute inset-0 z-[70] flex flex-col bg-[#7391BA]"
    >
      <div className="h-[68px] shrink-0 flex items-center justify-end px-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-11 h-11 flex items-center justify-center text-[#FBF3DC] active:opacity-60"
        >
          <X size={24} strokeWidth={1.25} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-[30px] pt-[26px] pb-10">
        <div className="relative">
          {/* back sheet */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#F1EBDC] shadow-[0_1px_3px_rgba(27,37,66,0.12)]"
            style={{ transform: "translate(8px, 8px) rotate(2deg)" }}
          />
          <Paperclip />
          {/* front sheet */}
          <div className="relative bg-[#FFFDF6] text-center shadow-[0_1px_4px_rgba(27,37,66,0.14)] pt-[62px] px-6 pb-[34px]">
            <h2
              className="whitespace-nowrap text-[#22262D] font-normal leading-tight"
              style={{ fontFamily: '"Pinyon Script", cursive', fontSize: "min(38px, 9.8vw)" }}
            >
              Meaning of yeon
            </h2>
            <div className="mx-auto mt-4 mb-[22px] h-px w-7 bg-[#B9AE98]" />
            <div
              className="text-[#22262D] whitespace-pre-line"
              style={{ fontFamily: font.family, fontSize: font.size, lineHeight: "26px" }}
            >
              {paragraphs.map((p, i) => (
                <p key={i} style={{ marginTop: i === 0 ? 0 : 17 }}>
                  {p}
                </p>
              ))}
            </div>
            <div
              className="mt-[26px] font-serif italic font-medium leading-none text-[#22262D]"
              style={{ fontSize: 24 }}
            >
              yyeon,
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
