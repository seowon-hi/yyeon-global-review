import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Star, ArrowRight, BarChart3, MessageSquare } from "lucide-react";
import { Language, Review } from "../types";
import { HomeHeader, OfficialSiteBanner } from "./Header";
import { BagCatalogSection, ReviewList } from "./ReviewList";
import { SearchFilter } from "./SearchFilter";
import { CATEGORY_FULL_NAMES, MAIN_CATEGORIES, normalizeProduct as normalizeProductBase } from "../lib/categories";

export function HomeScreen({
  t,
  currentLang,
  setCurrentLang,
  isReviewView,
  setIsReviewView,
  toggleLike,
  likedReviews,
  addToRecent,
  setActiveTab,
  onImageClick,
  reviews,
  stats,
}: {
  t: any;
  currentLang: Language;
  setCurrentLang: (l: Language) => void;
  isReviewView: boolean;
  setIsReviewView: (v: boolean) => void;
  toggleLike: (id: number) => void;
  likedReviews: number[];
  addToRecent: (id: number) => void;
  setActiveTab: (tab: any) => void;
  onImageClick: (images: string[], index: number) => void;
  reviews: Review[];
  stats: any;
  key?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Blooming bag",
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);

  const normalizeProduct = (name: string) => normalizeProductBase(name) ?? name;

  const categories = useMemo(() => CATEGORY_FULL_NAMES, []);

  const mainCategories = useMemo(() => MAIN_CATEGORIES, []);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setSelectedKeywords([]);
  };

  const availableColors = useMemo(() => {
    if (!selectedCategory) return [];
    const colors = reviews
      .filter((r) => normalizeProduct(r.product) === selectedCategory)
      .map((r) => (r.color || "").replace(/[)]/g, "").trim());

    return Array.from(new Set(colors));
  }, [selectedCategory, reviews]);

  const filteredReviews = useMemo(
    () =>
      reviews.filter((r) => {
        const normProduct = normalizeProduct(r.product);
        const cleanColor = (r.color || "").replace(/[)]/g, "").trim();
        const catMatch = !selectedCategory || normProduct === selectedCategory;

        const colorMatch = !selectedColor || cleanColor === selectedColor;

        const keywordMatch =
          selectedKeywords.length === 0 ||
          selectedKeywords.some((kw) => {
            const tags = r.tags?.[currentLang];
            return Array.isArray(tags) && tags.includes(kw);
          });
        return catMatch && colorMatch && keywordMatch;
      }),
    [selectedCategory, selectedColor, selectedKeywords, currentLang, reviews],
  );

  const allKeywords = useMemo(() => {
    const tags = filteredReviews.flatMap((r) => r.tags[currentLang]);
    const uniqueTags = Array.from(new Set(tags)) as string[];

    // Prioritize source tags
    const priorityTags = ((
      {
        KO: ["자사몰", "와디즈"],
        JA: ["公式サイト", "ワディズ"],
        EN: ["Official", "Wadiz"],
      } as any
    )[currentLang] || []) as string[];

    const sortedTags = [
      ...priorityTags.filter((t) => uniqueTags.includes(t)),
      ...uniqueTags.filter((t) => !priorityTags.includes(t)),
    ];

    return sortedTags;
  }, [currentLang, filteredReviews]);

  const displayedKeywords = isKeywordsExpanded
    ? allKeywords
    : allKeywords.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative h-full flex flex-col ${!isReviewView ? "overflow-hidden" : ""}`}
    >
      <HomeHeader
        t={t}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        isReviewView={isReviewView}
        reviewCount={reviews.length}
        onBackFromReview={() => {
          setIsReviewView(false);
          setSelectedCategory(null);
          setSelectedKeywords([]);
        }}
      />

      {!isReviewView ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex-1 flex flex-col justify-start px-6 pt-0 pb-16 space-y-3 overflow-hidden"
        >
          {/* Trust Card */}
          <div className="bg-[#FAF9F6] p-6 rounded-[2.5rem] text-center relative overflow-hidden group border border-gray-50/50 shadow-inner shrink-0">
            <div className="relative z-10">
              <div className="flex justify-center mb-2">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} fill="#000" stroke="none" />
                  ))}
                </div>
              </div>
              <div className="text-[9px] text-brand-primary font-black uppercase tracking-[0.2em] mb-1">
                {t.home.metrics.avg_rating}
              </div>
              <div className="text-[42px] font-serif italic text-gray-900 tracking-tighter leading-none mb-3">
                {stats?.totalAvgRating || "4.9"} / 5.0
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("data")}
                className="inline-flex items-center space-x-2 bg-white border border-gray-100 text-gray-900 px-4 py-2 rounded-full text-[9px] font-black tracking-wider uppercase mb-3 shadow-sm active:bg-gray-50 transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span>{t.home.metrics.review_analysis}</span>
              </motion.button>

              <p className="text-[11px] text-gray-500 font-bold max-w-[200px] mx-auto leading-relaxed mb-4 uppercase tracking-tighter">
                "{t.home.trust_description}"
              </p>

              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1.5 opacity-60">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[8px] font-black text-gray-900 uppercase tracking-tight">
                    {t.home.review_source.mall}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 opacity-60">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="text-[8px] font-black text-gray-900 uppercase tracking-tight">
                    {t.home.review_source.wadiz}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-3xl opacity-40" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {[
              {
                label: t.home.metrics.total_reviews,
                value: reviews.length,
                icon: <MessageSquare size={10} className="text-gray-900" />,
              },
              {
                label: t.home.metrics.review_analysis,
                value: t.home.metrics.review_analysis,
                icon: <BarChart3 size={10} className="text-brand-primary" />,
                isText: true,
              },
            ].map((m, i) => (
              <div
                key={i}
                className="bg-white py-3 px-4 rounded-[1.5rem] border border-gray-100 text-center shadow-sm flex flex-col items-center justify-center min-h-[85px]"
              >
                <div className="mb-2 p-1.5 bg-[#FAF9F6] rounded-full">{m.icon}</div>
                <div className="text-[8px] text-gray-400 font-black uppercase mb-1 tracking-widest leading-tight">
                  {m.label}
                </div>
                <div className={`${m.isText ? "text-[10px]" : "text-xs"} font-black text-gray-900 leading-tight`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* AI Satisfaction Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center space-x-2 py-1"
          >
            <div className="h-[1px] w-8 bg-gray-100" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
              {stats?.trustScore || "98"}.2% AI Satisfaction
            </span>
            <div className="h-[1px] w-8 bg-gray-100" />
          </motion.div>

          {/* Action Button */}
          <button
            onClick={() => setIsReviewView(true)}
            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-xs shadow-2xl shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group relative overflow-hidden shrink-0"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="tracking-[0.2em]">{t.home.view_reviews}</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="review-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-y-auto bg-[#FAF9F6]"
        >
          <OfficialSiteBanner />

          {/* Bag Category Section */}
          <BagCatalogSection
            selectedCategory={selectedCategory}
            onSelect={(fullName) => {
              setSelectedCategory(fullName);
              setSelectedColor(null);
            }}
            mainCategories={mainCategories}
            reviews={reviews}
            normalizeProduct={normalizeProduct}
          />

          <SearchFilter
            t={t}
            selectedCategory={selectedCategory}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
            availableColors={availableColors}
            allKeywords={allKeywords}
            displayedKeywords={displayedKeywords}
            isKeywordsExpanded={isKeywordsExpanded}
            setIsKeywordsExpanded={setIsKeywordsExpanded}
            onResetFilters={resetFilters}
          />

          <div className="h-[1px] bg-gray-100 mx-5 my-4" />

          <ReviewList
            categories={categories}
            filteredReviews={filteredReviews}
            normalizeProduct={normalizeProduct}
            currentLang={currentLang}
            t={t}
            selectedKeywords={selectedKeywords}
            likedReviews={likedReviews}
            toggleLike={toggleLike}
            addToRecent={addToRecent}
            onImageClick={onImageClick}
            onResetFilters={resetFilters}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
