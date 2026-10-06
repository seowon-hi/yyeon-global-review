import React from "react";
import { ArrowLeft } from "lucide-react";
import { Language } from "../types";
import { homeTilesText } from "../i18n/homeTiles";
import { BrandLetter, formatLetterNo, getSortedLetters } from "../data/letters";

function SubHeader({ title, onBack, backLabel }: { title: string; onBack: () => void; backLabel: string }) {
  return (
    <header className="shrink-0 flex items-center px-3 pt-8 pb-2">
      <button
        type="button"
        onClick={onBack}
        aria-label={backLabel}
        className="w-11 h-11 flex items-center justify-center text-[#22262D] active:opacity-60"
      >
        <ArrowLeft size={20} strokeWidth={1.25} />
      </button>
      <h2 className="ml-1 text-[17px] font-medium text-[#22262D]">{title}</h2>
    </header>
  );
}

export function LettersScreen({
  t,
  lang,
  selectedNo,
  onSelect,
  onBack,
}: {
  t: any;
  lang: Language;
  selectedNo: number | null;
  onSelect: (no: number | null) => void;
  onBack: () => void;
}) {
  const letters = getSortedLetters();
  const selected: BrandLetter | undefined = letters.find((l) => l.no === selectedNo);

  if (selected) {
    return (
      <div className="h-full flex flex-col">
        <SubHeader title={homeTilesText[lang].lettersTitle} onBack={() => onSelect(null)} backLabel={t.profile.back} />
        <article className="flex-1 overflow-y-auto no-scrollbar px-5 pb-tabbar">
          <div className="text-[12px] tracking-[2px] text-[#44568C]">{formatLetterNo(selected.no)}</div>
          <h3 className="mt-2 text-[20px] font-medium leading-snug text-[#22262D]">{selected.title[lang]}</h3>
          <time className="mt-1 block text-[11px] text-[#5A5E66]">{selected.date}</time>
          {selected.image && (
            <img src={selected.image} alt="" className="mt-5 w-full rounded-[26px] object-cover" />
          )}
          <div className="mt-6 space-y-5">
            {selected.body[lang].map((p, i) => (
              <p key={i} className="text-[14px] leading-[1.9] text-[#22262D] whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SubHeader title={homeTilesText[lang].lettersTitle} onBack={onBack} backLabel={t.profile.back} />
      <ul className="flex-1 overflow-y-auto no-scrollbar px-5 pb-tabbar space-y-3">
        {letters.map((l) => (
          <li key={l.no}>
            <button
              type="button"
              onClick={() => onSelect(l.no)}
              className="w-full min-h-[44px] text-left rounded-[26px] border border-[#DDD4C2] bg-[#FFFDF6] px-5 py-4 active:opacity-70"
            >
              <div className="text-[12px] tracking-[2px] text-[#44568C]">{formatLetterNo(l.no)}</div>
              <div className="mt-1 text-[15px] font-medium text-[#22262D]">{l.title[lang]}</div>
              <div className="mt-1 text-[11px] text-[#5A5E66]">{l.date}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
