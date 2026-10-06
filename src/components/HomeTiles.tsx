import React from "react";
import { ArrowUpRight, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { Language } from "../types";
import { homeTilesText } from "../i18n/homeTiles";
import { formatLetterNo, getLatestLetter } from "../data/letters";

export const homeFont = (lang: Language) =>
  lang === "JA"
    ? '"Noto Sans JP", sans-serif'
    : '"Noto Sans KR", "Noto Sans JP", sans-serif';

const SOFT_SHADOW = "shadow-[0_1px_2px_rgba(34,38,45,0.04)]";

function TileLabel({ children }: { children: React.ReactNode }) {
  return <span className="mt-1.5 block text-center text-[11px] leading-tight text-[#5A5E66]">{children}</span>;
}

const tileButton = "flex flex-col w-full h-full min-h-[44px] text-left active:opacity-80 transition-opacity";

// Rows share the available height (weights = original tile heights) so everything fits one screen;
// each row never grows past its design height and never shrinks below its min.
const row = (design: number, min: number): React.CSSProperties => ({
  flex: `${design} 1 0`,
  minHeight: min,
  maxHeight: design + 22,
});

export function HomeTiles({
  t,
  lang,
  reviewCount,
  onMeaning,
  onLetters,
  onStory,
  onAsk,
}: {
  t: any;
  lang: Language;
  reviewCount: number;
  onMeaning: () => void;
  onLetters: () => void;
  onStory: () => void;
  onAsk: () => void;
}) {
  const tx = homeTilesText[lang];
  // KO copy is specified in homeTiles.ts; JA/EN reuse the existing brand_story[0] wording.
  const meaningDesc =
    tx.meaningDesc ||
    String(t.home.brand_story?.[0] ?? "")
      .replace(/\{\{(.+?)\}\}/g, "$1")
      .replace(/\n/g, " ");
  const latest = getLatestLetter();

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-2 pb-tabbar">
      <div className="min-h-full flex flex-col gap-[14px]">
        {/* (1) Meaning */}
        <div style={row(208, 156)} className="min-h-0"><button type="button" onClick={onMeaning} className={tileButton}>
          <div className={`flex-1 min-h-0 rounded-[26px] bg-[#7391BA] p-5 flex flex-col justify-between ${SOFT_SHADOW}`}>
            <div className="flex items-start justify-between">
              <span className="text-[20px] font-medium leading-tight text-[#FBF3DC]">{tx.meaningTitle}</span>
              <ArrowUpRight size={22} strokeWidth={1.25} className="text-[#FBF3DC] shrink-0" />
            </div>
            <div className="flex items-end gap-3">
              <span className="text-[80px] leading-[0.9] text-[#FBF3DC] shrink-0">緣</span>
              <p className="text-[13px] leading-[1.6] text-[#1B2542] pb-1 line-clamp-4">{meaningDesc}</p>
            </div>
          </div>
          <TileLabel>{tx.meaningLabel}</TileLabel>
        </button></div>

        {/* (2) Brand Letter / Our Story */}
        <div style={row(170, 132)} className="grid grid-cols-2 gap-[14px] min-h-0">
          <button type="button" onClick={onLetters} className={tileButton}>
            <div
              className={`flex-1 min-h-0 rounded-[26px] border border-[#DDD4C2] bg-[#FFFDF6] p-4 flex flex-col justify-between ${SOFT_SHADOW}`}
            >
              <span className="text-[20px] font-medium leading-tight text-[#22262D]">Brand Letter</span>
              <div className="border-t border-[#DDD4C2] pt-3">
                {latest ? (
                  <>
                    <div className="text-[12px] tracking-[2px] text-[#44568C]">{formatLetterNo(latest.no)}</div>
                    <div className="mt-1 text-[13px] leading-snug text-[#22262D] line-clamp-2">
                      {latest.title[lang]}
                    </div>
                  </>
                ) : (
                  <div className="text-[13px] text-[#5A5E66]">{tx.letterEmpty}</div>
                )}
              </div>
            </div>
            <TileLabel>{tx.letterLabel}</TileLabel>
          </button>

          <button type="button" onClick={onStory} className={tileButton}>
            <div className={`flex-1 min-h-0 rounded-[26px] bg-[#E3E8F6] p-4 flex flex-col justify-between ${SOFT_SHADOW}`}>
              <div className="flex items-start justify-between">
                <span className="text-[20px] font-medium leading-tight text-[#22262D]">Our Story</span>
                <ArrowRight size={20} strokeWidth={1.25} className="text-[#44568C] shrink-0 mt-0.5" />
              </div>
              <div className="border-t border-[#BCC6E2] pt-3">
                <div className="text-[28px] font-medium leading-none text-[#44568C]">{reviewCount}</div>
                <div className="mt-1.5 text-[11.5px] leading-snug text-[#22262D]">{tx.storyCountSuffix}</div>
              </div>
            </div>
            <TileLabel>{tx.storyLabel}</TileLabel>
          </button>
        </div>

        {/* (3) Instagram / Ask */}
        <div style={row(84, 72)} className="grid grid-cols-2 gap-[14px] min-h-0">
          <a
            href="https://www.instagram.com/yyeon.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={tileButton}
          >
            <div
              className={`flex-1 min-h-0 rounded-[24px] border border-[#DDD4C2] bg-[#FFFDF6] px-3.5 flex items-center gap-2.5 ${SOFT_SHADOW}`}
            >
              <Instagram size={28} strokeWidth={1.1} className="text-[#22262D] shrink-0" />
              <div className="min-w-0">
                <div className="text-[17px] font-medium leading-tight text-[#22262D]">Instagram</div>
                <div className="mt-0.5 text-[11px] leading-tight text-[#5A5E66]">{tx.instagramSub}</div>
              </div>
            </div>
            <TileLabel>{tx.instagramLabel}</TileLabel>
          </a>

          <button type="button" onClick={onAsk} className={tileButton}>
            <div
              className={`flex-1 min-h-0 rounded-[24px] border border-[#DDD4C2] bg-[#FFFDF6] px-3.5 flex items-center gap-2.5 ${SOFT_SHADOW}`}
            >
              <MessageCircle size={28} strokeWidth={1.1} className="text-[#22262D] shrink-0" />
              <div className="min-w-0">
                <div className="text-[17px] font-medium leading-tight text-[#22262D]">Ask</div>
                <div className="mt-0.5 text-[11px] leading-tight text-[#5A5E66]">{tx.askSub}</div>
              </div>
            </div>
            <TileLabel>{t.nav.inquiry}</TileLabel>
          </button>
        </div>
      </div>
    </div>
  );
}
