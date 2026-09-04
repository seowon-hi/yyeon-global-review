import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Loader2 } from "lucide-react";
import { translations, transformRawReviews } from "./translations";
import { Language, Review } from "./types";
import { BagComparison } from "./components/BagComparison";
import { BagRecommendation } from "./components/BagRecommendation";
import { HomeScreen } from "./components/HomeScreen";
import { DataScreen } from "./components/DataScreen";
import { GuideScreen } from "./components/GuideScreen";
import { WishlistScreen } from "./components/WishlistScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNav } from "./components/BottomNav";
import { ImageGalleryModal } from "./components/ImageGalleryModal";
import { KEYWORD_MAPPING_KO, TAG_MAP } from "./lib/keywords";
import { CATEGORY_FULL_NAMES, getBagProductUrl, normalizeProduct } from "./lib/categories";

export default function App() {
  const openBagProductPage = (bagName: string) => {
    window.open(getBagProductUrl(bagName), "_blank", "noopener,noreferrer");
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>("JA");
  const [activeTab, setActiveTab] = useState<
    "home" | "data" | "compare" | "recommend" | "wishlist" | "guide" | "profile"
  >("home");
  const [isReviewView, setIsReviewView] = useState(false);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [recentReviews, setRecentReviews] = useState<number[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<{
    images: string[];
    initialIndex: number;
  } | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/data/yyeon_reviews_final.json");
        const data = await response.json();
        const baseReviews = transformRawReviews(data);

        const processedReviews = baseReviews
          .map((r) => {
            const categoriesToRemove = [
              ...CATEGORY_FULL_NAMES,
              "yyeon Bag",
              "Henne Bag Mini",
              "Henne Bag Medium",
            ];
            const tagsToRemove = [
              "실구매후기",
              "하트홀더",
              "heart holder",
              "baby blue",
              "만족도 리뷰",
              ...categoriesToRemove,
            ];

            const cleanTags = (tags: string[]) =>
              tags.filter(
                (t) =>
                  !tagsToRemove.some((rem) =>
                    t.toLowerCase().includes(rem.toLowerCase()),
                  ),
              );

            const tagsPerLang: Record<Language, string[]> = {
              KO: cleanTags(r.tags.KO),
              JA: cleanTags(r.tags.JA),
              EN: cleanTags(r.tags.EN),
            };

            const textKO = (r.text.KO + (r.summary?.KO || "")).toLowerCase();

            // Add source hashtags
            if (r.source === "와디즈") {
              tagsPerLang.KO.push("와디즈");
              tagsPerLang.JA.push("ワディ즈"); // Fix: ワディズ was translated, but previously it was ワディズ
              tagsPerLang.EN.push("Wadiz");
            } else {
              tagsPerLang.KO.push("자사몰");
              tagsPerLang.JA.push("公式サイト");
              tagsPerLang.EN.push("Store");
            }

            for (const [tagKey, keywords] of Object.entries(
              KEYWORD_MAPPING_KO,
            )) {
              if (
                Array.isArray(keywords) &&
                keywords.some((kw) => textKO.includes(kw.toLowerCase()))
              ) {
                const trans = TAG_MAP[tagKey];
                if (trans) {
                  tagsPerLang.KO.push(trans.KO);
                  tagsPerLang.JA.push(trans.JA);
                  tagsPerLang.EN.push(trans.EN);
                }
              }
            }

            return {
              ...r,
              tags: {
                KO: Array.from(new Set(tagsPerLang.KO)),
                JA: Array.from(new Set(tagsPerLang.JA)),
                EN: Array.from(new Set(tagsPerLang.EN)),
              },
            };
          })
          .filter((r) => {
            const text = r.text?.KO || "";
            if (
              text.includes("배송받고") &&
              (text.includes("휘어") ||
                text.includes("실망") ||
                text.includes("늦게 뜯어") ||
                text.includes("바빠서"))
            ) {
              return false;
            }

            return normalizeProduct(r.product) !== null;
          });

        setReviews(processedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const t = useMemo(() => translations[currentLang], [currentLang]);

  const stats = useMemo(() => {
    if (reviews.length === 0) return null;
    const total = reviews.length;
    const getAvg = (arr: Review[]) =>
      arr.length
        ? (arr.reduce((s, r) => s + r.rating, 0) / arr.length).toFixed(1)
        : "0.0";
    const totalAvgRating = getAvg(reviews);
    const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
    const sentiment = Math.round((positiveReviews / total) * 100);
    const trustScore = Math.round((parseFloat(totalAvgRating) / 5) * 100);

    return {
      total,
      totalAvgRating,
      sentiment,
      trustScore,
    };
  }, [reviews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-editorial-bg flex justify-center items-center font-sans tracking-tight p-4 md:p-10">
        <div className="w-full max-w-[375px] h-[780px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[8px] border-brand-dark relative overflow-hidden flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="text-brand-primary mb-4"
          >
            <Loader2 size={32} />
          </motion.div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">
            System Synchronizing...
          </p>
        </div>
      </div>
    );
  }

  const openGallery = (images: string[], index: number) => {
    setSelectedGallery({ images, initialIndex: index });
  };

  const toggleLike = (reviewId: number) => {
    setLikedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const addToRecent = (reviewId: number) => {
    setRecentReviews((prev) => {
      const filtered = prev.filter((id) => id !== reviewId);
      return [reviewId, ...filtered].slice(0, 5);
    });
  };

  return (
    <div className="min-h-screen bg-brand-editorial-bg flex justify-center items-center font-sans tracking-tight p-4 md:p-10">
      <div className="w-full max-w-[375px] h-[780px] bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[8px] border-brand-dark relative overflow-hidden flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <HomeScreen
                key="home"
                t={t}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                isReviewView={isReviewView}
                setIsReviewView={setIsReviewView}
                toggleLike={toggleLike}
                likedReviews={likedReviews}
                addToRecent={addToRecent}
                setActiveTab={setActiveTab}
                onImageClick={openGallery}
                reviews={reviews}
                stats={stats}
              />
            )}
            {activeTab === "data" && (
              <div className="h-full overflow-y-auto pb-20 pt-16">
                <DataScreen
                  key="data"
                  t={t}
                  reviews={reviews}
                  globalStats={stats}
                  currentLang={currentLang}
                />
              </div>
            )}
            {activeTab === "compare" && (
              <div className="h-full overflow-y-auto pb-20">
                <BagComparison
                  reviews={reviews}
                  onBagClick={openBagProductPage}
                  currentLang={currentLang}
                />
              </div>
            )}
            {activeTab === "recommend" && (
              <div className="h-full overflow-y-auto pb-20">
                <BagRecommendation currentLang={currentLang} />
              </div>
            )}
            {activeTab === "wishlist" && (
              <div className="h-full overflow-y-auto pb-20 pt-16">
                <WishlistScreen key="wishlist" t={t} />
              </div>
            )}
            {activeTab === "guide" && (
              <div className="h-full overflow-y-auto pb-20 pt-16">
                <GuideScreen key="guide" t={t} currentLang={currentLang} />
              </div>
            )}
            {activeTab === "profile" && (
              <div className="h-full overflow-y-auto pb-20">
                <ProfileScreen
                  key="profile"
                  t={t}
                  likedReviews={likedReviews}
                  recentReviews={recentReviews}
                  lang={currentLang}
                  toggleLike={toggleLike}
                  onReviewClick={() => {
                    setActiveTab("home");
                    setIsReviewView(true);
                  }}
                  onImageClick={openGallery}
                  reviews={reviews}
                />
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Tab Bar */}
        <BottomNav
          activeTab={activeTab}
          t={t}
          onHome={() => {
            if (activeTab === "home") setIsReviewView(false);
            setActiveTab("home");
          }}
          onCompare={() => setActiveTab("compare")}
          onWishlist={() => setActiveTab("wishlist")}
          onProfile={() => setActiveTab("profile")}
        />

        {/* Floating Action Button - Inquiry */}
        {activeTab !== "guide" && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab("guide")}
            className="absolute bottom-20 right-5 z-[60] w-14 h-14 bg-gray-900 text-white rounded-full flex flex-col items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.3)] group active:bg-brand-primary transition-colors"
          >
            <MessageCircle size={20} className="mb-0.5" />
            <span className="text-[7px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">
              {t.nav.guide}
            </span>
          </motion.button>
        )}

        {/* Image Gallery Modal */}
        <AnimatePresence>
          {selectedGallery && (
            <ImageGalleryModal
              images={selectedGallery.images}
              initialIndex={selectedGallery.initialIndex}
              onClose={() => setSelectedGallery(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
