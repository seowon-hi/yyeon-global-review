import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { Language, Review } from "../types";
import { HomeHeader, OfficialSiteBanner } from "./Header";
import { BagCatalogSection, ReviewList } from "./ReviewList";
import { SearchFilter } from "./SearchFilter";
import { HomeTiles, homeFont } from "./HomeTiles";
import { LetterPaper, MEANING_THEME, DIRECTOR_THEME } from "./LetterPaper";
import { homeTilesText } from "../i18n/homeTiles";
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
  resetSignal,
  onImmersiveChange,
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
  resetSignal?: number;
  onImmersiveChange?: (v: boolean) => void;
  key?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Blooming bag",
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isKeywordsExpanded, setIsKeywordsExpanded] = useState(false);

  const [homeView, setHomeView] = useState<"main" | "meaning" | "director">("main");

  const letterOpen = homeView !== "main" && !isReviewView;

  // Letter paper is a full-screen layer: hide the dock while it is open.
  useEffect(() => {
    onImmersiveChange?.(letterOpen);
  }, [letterOpen]);
  useEffect(() => () => onImmersiveChange?.(false), []);

  // Browser/device back closes the letter: opening pushes a history entry, popstate closes.
  const openLetter = (view: "meaning" | "director") => {
    window.history.pushState({ yyeonLetter: true }, "");
    setHomeView(view);
  };
  const closeLetter = () => {
    if (window.history.state?.yyeonLetter) window.history.back();
    else setHomeView("main");
  };
  useEffect(() => {
    const onPop = () => setHomeView("main");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Tapping the Home tab while already on Home returns to the tile screen.
  useEffect(() => {
    setHomeView("main");
  }, [resetSignal]);

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
      className={`relative h-full flex flex-col ${!isReviewView ? "overflow-hidden bg-[#FBF3DC]" : ""}`}
      style={!isReviewView ? { fontFamily: homeFont(currentLang) } : undefined}
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
        <HomeTiles
          t={t}
          lang={currentLang}
          reviewCount={reviews.length}
          onMeaning={() => openLetter("meaning")}
          onDirector={() => openLetter("director")}
          onStory={() => setIsReviewView(true)}
          onAsk={() => setActiveTab("guide")}
        />
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
      {letterOpen && homeView === "meaning" && (
        <LetterPaper
          lang={currentLang}
          title={homeTilesText[currentLang].meaningTitle}
          // "{{word}}" markers were emphasis hints for the old layout; show the word without braces.
          paragraphs={(t.home.brand_story ?? []).map((p: string) => p.replace(/\{\{(.+?)\}\}/g, "$1"))}
          signature={
            <div className="font-serif italic font-medium leading-none text-[#22262D]" style={{ fontSize: 24 }}>
              yyeon,
            </div>
          }
          theme={MEANING_THEME}
          onClose={closeLetter}
        />
      )}
      {letterOpen && homeView === "director" && (
        <LetterPaper
          lang={currentLang}
          title="Brand Letter"
          paragraphs={t.home.director_letter ?? []}
          joinLines
          signature={
            <>
              <div className="text-[#22262D] leading-none" style={{ fontFamily: '"Pinyon Script", cursive', fontSize: 30 }}>
                Be my yeon
              </div>
              <div className="mt-2 text-[12px] tracking-[2px] text-[#4A4E56]" style={{ fontFamily: '"Noto Sans KR", "Noto Sans JP", sans-serif' }}>
                Director
              </div>
            </>
          }
          theme={DIRECTOR_THEME}
          onClose={closeLetter}
        />
      )}
    </motion.div>
  );
}
