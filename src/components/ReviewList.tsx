import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { Language, Review } from "../types";
import { BAG_CATALOG } from "../translations";
import { ReviewCard } from "./ReviewCard";

export function BagCatalogSection({
  selectedCategory,
  onSelect,
  mainCategories,
  reviews,
  normalizeProduct,
}: {
  selectedCategory: string | null;
  onSelect: (fullName: string) => void;
  mainCategories: any[];
  reviews: any[];
  normalizeProduct: (name: string) => string;
}) {
  return (
    <div className="px-5 pt-6">
      {/* Category Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {mainCategories.map((cat) => {
          const isActive = selectedCategory === cat.fullName;
          const count = reviews.filter(
            (r) => normalizeProduct(r.product) === cat.fullName,
          ).length;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(cat.fullName)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden h-20 flex flex-col justify-center ${
                isActive
                  ? "bg-[#0B1530] border-[#0B1530] text-white shadow-lg"
                  : "bg-white border-gray-100 text-black shadow-sm hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="font-black text-lg">{cat.name}</div>
                <div
                  className={`px-1.5 py-0.5 rounded-full text-[8px] font-black ${isActive ? "bg-white/20 text-white" : "bg-gray-50 text-gray-400"}`}
                >
                  {count}
                </div>
              </div>
              <div
                className={`text-[9px] font-bold uppercase tracking-tight mt-1 ${isActive ? "text-white/60" : "text-gray-400"}`}
              >
                {cat.desc}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bag Design List (Horizontal Scroll) */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-6"
          >
            {BAG_CATALOG[
              mainCategories.find((c) => c.fullName === selectedCategory)?.id ||
                ""
            ]?.map((bag, index) => (
              <div key={index} className="min-w-[80px] flex-shrink-0">
                <img
                  src={bag.image}
                  alt={bag.name}
                  className="w-full h-28 object-cover rounded-xl shadow-sm bg-gray-50"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-1.5 text-[9px] font-bold text-center text-gray-900 uppercase tracking-tight">
                  {bag.name}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ReviewList({
  categories,
  filteredReviews,
  normalizeProduct,
  currentLang,
  t,
  selectedKeywords,
  likedReviews,
  toggleLike,
  addToRecent,
  onImageClick,
  onResetFilters,
}: {
  categories: string[];
  filteredReviews: Review[];
  normalizeProduct: (name: string) => string;
  currentLang: Language;
  t: any;
  selectedKeywords: string[];
  likedReviews: number[];
  toggleLike: (id: number) => void;
  addToRecent: (id: number) => void;
  onImageClick: (images: string[], index: number) => void;
  onResetFilters: () => void;
}) {
  return (
    <section className="px-5 space-y-12 pb-32 pt-4">
      {categories.map((category) => {
        const categoryReviews = filteredReviews.filter(
          (r) => normalizeProduct(r.product) === category,
        );

        if (categoryReviews.length === 0) return null;

        return (
          <div key={category} className="space-y-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-serif italic text-gray-900">
                  {category.replace(" bag", "").toUpperCase()}
                </h3>
                <div className="px-2 py-0.5 bg-white border border-gray-100 text-[#C4C4C2] text-[8px] font-black rounded-lg uppercase tracking-widest">
                  {categoryReviews.length}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {categoryReviews.map((review) => {
                // Filter out reviews with no tags if requested for Blooming Feed
                if (
                  category === "Blooming bag" &&
                  (!review.tags[currentLang] || review.tags[currentLang].length === 0)
                ) {
                  return null;
                }

                return (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    lang={currentLang}
                    t={t}
                    activeKeywords={selectedKeywords}
                    isLiked={likedReviews.includes(review.id)}
                    onLike={() => toggleLike(review.id)}
                    onView={() => addToRecent(review.id)}
                    onImageClick={onImageClick}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {filteredReviews.length > 0 && (
        <div className="pt-10 pb-20 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-gray-100 mb-8" />
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-6 text-center px-10 leading-relaxed">
            {t.home.viewed_all.replace(
              "{count}",
              filteredReviews.length.toString(),
            )}
          </p>
          <button
            onClick={() =>
              window.open("https://yyeon.kr/article/제품후기/4/", "_blank")
            }
            className="px-8 py-4 bg-white border border-gray-100 rounded-full text-[10px] font-black text-gray-900 uppercase tracking-widest hover:bg-gray-100 transition-all shadow-sm active:scale-95"
          >
            {t.home.all_reviews_mall}
          </button>
        </div>
      )}

      {filteredReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Star size={24} className="text-gray-200" />
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            No reviews found
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 text-[10px] text-brand-primary font-black border-b border-brand-primary"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </section>
  );
}
