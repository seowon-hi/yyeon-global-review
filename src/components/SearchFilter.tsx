import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export function SearchFilter({
  t,
  selectedCategory,
  selectedColor,
  setSelectedColor,
  selectedKeywords,
  setSelectedKeywords,
  availableColors,
  allKeywords,
  displayedKeywords,
  isKeywordsExpanded,
  setIsKeywordsExpanded,
  onResetFilters,
}: {
  t: any;
  selectedCategory: string | null;
  selectedColor: string | null;
  setSelectedColor: (v: string | null | ((prev: string | null) => string | null)) => void;
  selectedKeywords: string[];
  setSelectedKeywords: (v: string[] | ((prev: string[]) => string[])) => void;
  availableColors: string[];
  allKeywords: string[];
  displayedKeywords: string[];
  isKeywordsExpanded: boolean;
  setIsKeywordsExpanded: (v: boolean | ((prev: boolean) => boolean)) => void;
  onResetFilters: () => void;
}) {
  return (
    <div className="bg-transparent z-[30] pt-8 pb-2 px-5">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">
          {selectedCategory
            ? `${selectedCategory.replace(" bag", "")} FEEDS`
            : "ALL REVIEWS"}
        </h3>
        {(selectedCategory || selectedColor || selectedKeywords.length > 0) && (
          <button
            onClick={onResetFilters}
            className="text-[9px] font-black text-brand-primary uppercase tracking-widest"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Color Filter - Sub selection */}
      <AnimatePresence>
        {availableColors.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 flex flex-wrap gap-1.5 pb-2"
          >
            {availableColors.map((color) => {
              // Define visibility rules for each brand
              const isHenne = selectedCategory === "Henne bag";
              const isBlooming = selectedCategory === "Blooming bag";
              const isMellow = selectedCategory === "Mellow bag";

              // 1. Henne: Hide '만족도 리뷰'
              if (isHenne && color === "만족도 리뷰") return null;

              // 2. Blooming: Hide 'STANDARD' and '만족도 리뷰'
              const upperColor = color.toUpperCase();
              if (isBlooming && (upperColor === "STANDARD" || color === "만족도 리뷰")) return null;

              // 3. Mellow: Hide 'STANDARD' and 'LONG' (and '만족도 리뷰' if it exists)
              if (isMellow && (upperColor === "STANDARD" || upperColor === "LONG" || color === "만족도 리뷰")) return null;

              return (
                <button
                  key={color}
                  onClick={() =>
                    setSelectedColor((prev: string | null) => (prev === color ? null : color))
                  }
                  className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase transition-all border ${
                    selectedColor === color
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-200 shadow-sm"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyword Chips */}
      <div className="flex flex-wrap gap-2 mb-4 relative">
        {displayedKeywords.map((kw) => {
          const isActive = selectedKeywords.includes(kw);
          return (
            <motion.button
              layout
              key={kw}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => {
                setSelectedKeywords((prev: string[]) =>
                  isActive ? prev.filter((k) => k !== kw) : [...prev, kw],
                );
              }}
              className={`px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-wider border transition-all duration-300 ${
                isActive
                  ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20 scale-105"
                  : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 shadow-sm"
              }`}
            >
              {isActive ? "✓ " : "# "} {kw}
            </motion.button>
          );
        })}

        {allKeywords.length > 6 && (
          <motion.button
            layout
            onClick={() => setIsKeywordsExpanded((prev: boolean) => !prev)}
            className="px-3.5 py-1.5 rounded-full text-[9px] font-black tracking-wider border bg-gray-50 text-gray-400 border-gray-100/50 hover:bg-gray-100 transition-all flex items-center space-x-1"
          >
            {isKeywordsExpanded ? (
              <>
                <span>{t.home.show_less}</span>
                <ChevronDown size={10} className="rotate-180" />
              </>
            ) : (
              <>
                <span>+ {t.home.show_more}</span>
                <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-[7px] text-gray-500 ml-1">
                  {allKeywords.length - 6}
                </div>
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
