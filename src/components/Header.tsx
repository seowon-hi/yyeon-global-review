import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Language } from "../types";

export function HomeHeader({
  t,
  currentLang,
  setCurrentLang,
  isReviewView,
  onBackFromReview,
  reviewCount,
}: {
  t: any;
  currentLang: Language;
  setCurrentLang: (l: Language) => void;
  isReviewView: boolean;
  onBackFromReview: () => void;
  reviewCount: number;
}) {
  return (
    <header
      className={`px-5 pt-10 pb-2 transition-all duration-700 shrink-0 ${!isReviewView ? "bg-white" : "bg-[#FAF9F6] border-b border-gray-100 z-10"}`}
    >
      {!isReviewView ? (
        <>
          <div className="flex flex-col items-center mb-3">
            <h1 className="text-3xl font-serif italic text-gray-900 tracking-tighter mb-0.5 select-none transition-all group cursor-default">
              yyeon,
            </h1>
            <p className="text-[8px] text-brand-primary font-black uppercase tracking-[0.4em] opacity-40">
              {t.home.header_subtitle}
            </p>
          </div>

          {/* Language Switcher moved between logo and content */}
          <div className="mb-2 flex justify-center">
            <div className="flex p-0.5 bg-[#F5F5F3] rounded-full border border-gray-100 w-full max-w-[150px]">
              {(["JA", "KO", "EN"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`flex-1 py-1 text-[9px] font-bold rounded-full transition-all flex items-center justify-center space-x-1 ${
                    currentLang === lang
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="text-xs">
                    {lang === "JA" ? "🇯🇵" : lang === "KO" ? "🇰🇷" : "🇺🇸"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mt-2"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackFromReview}
              className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 active:scale-90 transition-transform"
            >
              <ArrowLeft size={16} className="text-gray-900" />
            </button>
            <h2 className="text-xl font-serif italic text-gray-900">
              Review Archive
            </h2>
          </div>
          <div className="bg-gray-900 px-3 py-1.5 rounded-full text-[9px] font-black text-white tracking-widest flex items-center space-x-2">
            <span className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
            <span>{reviewCount} ARCHIVES</span>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export function OfficialSiteBanner() {
  return (
    <div className="px-5 pt-4">
      <a
        href="https://yyeon.kr"
        target="_blank"
        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
            <img
              src="https://raw.githubusercontent.com/seowon-hi/yyeon-reviews/refs/heads/main/352887658_648098816807218_152363254225589778_n.jpg"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">공식 홈페이지</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              YYEON.KR 방문하기
            </p>
          </div>
        </div>
        <ChevronRight
          size={16}
          className="text-gray-300 group-hover:translate-x-1 transition-transform"
        />
      </a>
    </div>
  );
}
