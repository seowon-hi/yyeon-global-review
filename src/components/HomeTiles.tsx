import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { Language } from "../types";
import { homeTilesText } from "../i18n/homeTiles";

export const homeFont = (lang: Language) =>
  lang === "JA"
    ? '"Noto Sans JP", sans-serif'
    : '"Noto Sans KR", "Noto Sans JP", sans-serif';

const SOFT_SHADOW = "shadow-[0_1px_2px_rgba(34,38,45,0.04)]";

function TileLabel({ children }: { children: React.ReactNode }) {
  return <span className="mt-1.5 block text-center text-[11px] leading-tight text-[#5A5E66]">{children}</span>;
}

const tileButton = "block w-full min-h-[44px] text-left active:opacity-80 transition-opacity";


export function HomeTiles({
  t,
  lang,
  reviewCount,
  onMeaning,
  onDirector,
  onStory,
  onAsk,
}: {
  t: any;
  lang: Language;
  reviewCount: number;
  onMeaning: () => void;
  onDirector: () => void;
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

  // Scale the whole tile block uniformly (same proportions, just smaller) so it fits one screen.
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const fit = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const cs = getComputedStyle(outer);
      const avail = outer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      setScale(Math.min(1, avail / inner.offsetHeight));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [lang]);

  return (
    <div ref={outerRef} className="flex-1 overflow-hidden px-5 pt-2 pb-tabbar">
      <div
        ref={innerRef}
        className="flex flex-col gap-[14px] origin-top"
        style={{ transform: `scale(${scale})` }}
      >
        {/* (1) Meaning */}
        <button type="button" onClick={onMeaning} className={tileButton}>
          <div className={`h-[208px] rounded-[26px] bg-[#7391BA] p-5 flex flex-col justify-between ${SOFT_SHADOW}`}>
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
        </button>

        {/* (2) Brand Letter / Our Story */}
        <div className="grid grid-cols-2 gap-[14px]">
          <button type="button" onClick={onDirector} className={tileButton}>
            <div
              className={`h-[170px] rounded-[26px] border border-[#DDD4C2] bg-[#FFFDF6] p-4 flex flex-col justify-between ${SOFT_SHADOW}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[20px] font-medium leading-tight text-[#22262D]">Brand Letter</span>
                <ArrowUpRight size={22} strokeWidth={1.25} className="text-[#44568C] shrink-0" />
              </div>
              <div className="border-t border-[#DDD4C2] pt-3">
                <div className="text-[12px] tracking-[2px] text-[#44568C]">{tx.directorKicker}</div>
                <div className="mt-1 text-[13px] leading-snug text-[#22262D] line-clamp-2">{tx.directorName}</div>
              </div>
            </div>
            <TileLabel>{tx.letterLabel}</TileLabel>
          </button>

          <button type="button" onClick={onStory} className={tileButton}>
            <div className={`h-[170px] rounded-[26px] bg-[#E3E8F6] p-4 flex flex-col justify-between ${SOFT_SHADOW}`}>
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
        <div className="grid grid-cols-2 gap-[14px]">
          <a
            href="https://www.instagram.com/yyeon.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={tileButton}
          >
            <div
              className={`h-[84px] rounded-[24px] border border-[#DDD4C2] bg-[#FFFDF6] px-3.5 flex items-center gap-2.5 ${SOFT_SHADOW}`}
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
              className={`h-[84px] rounded-[24px] border border-[#DDD4C2] bg-[#FFFDF6] px-3.5 flex items-center gap-2.5 ${SOFT_SHADOW}`}
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
