import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, RECOMMENDATIONS, CategoryType } from "../data/bagRecommendation";
import {
  CATEGORY_TRANSLATIONS,
  BAG_NAME_TRANSLATIONS,
  COLOR_NAME_TRANSLATIONS,
  RECOM_LABELS,
} from "../i18n/bagRecommendation";

interface BagRecommendationProps {
  currentLang?: "KO" | "JA" | "EN";
}

export function BagRecommendation({
  currentLang = "KO",
}: BagRecommendationProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("포인트");

  const lang =
    currentLang === "KO" || currentLang === "JA" || currentLang === "EN"
      ? currentLang
      : "KO";
  const products = RECOMMENDATIONS[selectedCategory] || [];

  const getTranslatedCategory = (cat: string) =>
    CATEGORY_TRANSLATIONS[cat]?.[lang] || cat;
  const getTranslatedBag = (bag: string) =>
    BAG_NAME_TRANSLATIONS[bag]?.[lang] || bag;
  const getTranslatedColor = (color: string) =>
    COLOR_NAME_TRANSLATIONS[color]?.[lang] || color;
  const t = (key: string) =>
    RECOM_LABELS[key]?.[lang] || RECOM_LABELS[key]?.["KO"] || "";

  return (
    <div className="flex flex-col bg-white min-h-full font-sans">
      <header className="px-6 pt-10 pb-6 bg-[#0B1530] text-white rounded-b-[2.5rem] shadow-xl">
        <h1 className="text-2xl font-serif italic mb-1">{t("title")}</h1>
        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
          {t("subtitle")}
        </p>
      </header>

      <main className="flex-1 px-6 py-6 bg-[#FAFAFA]">
        {/* Buttons at the top: 포인트 / 부드러움·따뜻함 / 고급·시크 / 빈티지 / 클래식 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-start">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-full text-[10px] font-bold tracking-tight border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                {getTranslatedCategory(cat)}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid: 4 columns on desktop, 3 on tablet, 2 on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {products.map((p, index) => {
              const isLightColor =
                p.colorName === "아이보리" ||
                p.colorName === "바닐라" ||
                p.hex.toLowerCase() === "#fffff0" ||
                p.hex.toLowerCase() === "#f3e5ab";

              return (
                <motion.div
                  key={`${p.bagName}-${p.colorName}-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-150 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                >
                  {/* Swatch container */}
                  <div className="mb-4 relative flex items-center justify-center">
                    <div
                      className={`w-14 h-14 rounded-full shadow-inner ${
                        isLightColor ? "border border-gray-200" : ""
                      }`}
                      style={{ backgroundColor: p.hex }}
                    />
                  </div>

                  {/* Product title and subtitle */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xs font-bold text-gray-900 leading-tight mb-1">
                      {getTranslatedBag(p.bagName)}
                    </h3>
                    <span className="text-[10px] text-gray-500 leading-none">
                      {getTranslatedColor(p.colorName)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
