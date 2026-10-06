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
      className={`px-5 pt-8 pb-1 transition-all duration-700 shrink-0 ${!isReviewView ? "bg-[#FBF3DC]" : "bg-[#FAF9F6] border-b border-gray-100 z-10"}`}
    >
      {!isReviewView ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-serif italic font-medium text-[#22262D] tracking-tighter select-none cursor-default leading-none">
            yyeon,
          </h1>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[4px] text-[#44568C]">
            {t.home.header_subtitle}
          </p>
          <div className="mt-1 flex items-center justify-center" role="group" aria-label="Language">
            {(["JA", "KO", "EN"] as Language[]).map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-[13px] text-[#A2977F]">
                    ·
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setCurrentLang(lang)}
                  aria-pressed={currentLang === lang}
                  className="w-12 h-11 flex items-center justify-center"
                >
                  <span
                    className={`text-[13px] tracking-[3px] pl-[3px] pb-0.5 border-b ${
                      currentLang === lang
                        ? "text-[#22262D] font-medium border-[#44568C]"
                        : "text-[#5A5E66] font-normal border-transparent"
                    }`}
                  >
                    {lang === "JA" ? "JP" : lang === "KO" ? "KR" : "US"}
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
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
              src="/images/logo/yyeon_logo.jpg"
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
