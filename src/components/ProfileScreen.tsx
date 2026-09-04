import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Settings, Heart, Clock, Star } from "lucide-react";
import { Language, Review } from "../types";
import { ReviewCard } from "./ReviewCard";

export function ProfileScreen({
  t,
  likedReviews,
  recentReviews,
  lang,
  toggleLike,
  onReviewClick,
  onImageClick,
  reviews,
}: {
  t: any;
  likedReviews: number[];
  recentReviews: number[];
  lang: Language;
  toggleLike: (id: number) => void;
  onReviewClick: () => void;
  onImageClick: (images: string[], index: number) => void;
  reviews: Review[];
  key?: string;
}) {
  const [profileView, setProfileView] = useState<"all" | "liked" | "recent">(
    "all",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "게스트 리비어",
    nickname: "human_01",
  });

  const likedData = useMemo(
    () => reviews.filter((r) => likedReviews.includes(r.id)),
    [likedReviews, reviews],
  );
  const recentData = useMemo(
    () => reviews.filter((r) => recentReviews.includes(r.id)),
    [recentReviews, reviews],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-24 relative"
    >
      <header className="mb-6 sticky top-0 bg-[#FAF9F6] pt-10 pb-3 z-40 -mx-6 px-6 shadow-sm shadow-gray-100/50">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-serif italic text-gray-900">
            {t.profile.title}
          </h1>
          {profileView !== "all" && (
            <button
              onClick={() => setProfileView("all")}
              className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center space-x-1"
            >
              <ArrowRight size={10} className="rotate-180" />
              <span>{t.profile.back}</span>
            </button>
          )}
        </div>

        <div className="relative mt-4">
          <div className="flex items-center space-x-4 bg-[#FAF9F6] p-5 rounded-[2.5rem] border border-gray-50/50 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 border-4 border-white shadow-sm overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="space-y-1.5 p-1">
                  <input
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-black"
                  />
                  <input
                    value={userProfile.nickname}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        nickname: e.target.value,
                      }))
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-[9px] font-medium"
                  />
                  <button
                    onClick={() => setIsEditing(false)}
                    className="mt-1 w-full bg-gray-900 text-white text-[8px] font-black uppercase py-1 rounded-md"
                  >
                    SAVE
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-black text-gray-900 uppercase tracking-wider truncate">
                    {userProfile.name}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium tracking-tight truncate">
                    @{userProfile.nickname}
                  </p>
                </>
              )}
            </div>
            {!isEditing && (
              <div className="ml-auto bg-brand-primary/10 px-2.5 py-1 rounded-full">
                <span className="text-[8px] font-black text-brand-primary uppercase tracking-tighter italic">
                  Lifer
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Account Settings */}
      <div className="mb-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full py-3 bg-white border border-gray-100 rounded-2xl flex items-center justify-center space-x-2 shadow-sm active:scale-95 transition-all group"
        >
          <Settings
            size={14}
            className="text-gray-400 group-hover:rotate-45 transition-transform"
          />
          <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">
            {t.profile.settings}
          </span>
        </button>
      </div>

      {/* Archive Navigation Card */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setProfileView("liked")}
          className={`relative p-5 rounded-[2.5rem] border transition-all text-left overflow-hidden group ${
            profileView === "liked"
              ? "bg-gray-900 border-gray-900 text-white shadow-xl"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div
              className={`w-8 h-8 rounded-2xl flex items-center justify-center mb-4 ${profileView === "liked" ? "bg-white/10" : "bg-[#FAF9F6] text-red-400"}`}
            >
              <Heart
                size={14}
                fill={profileView === "liked" ? "white" : "currentColor"}
              />
            </div>
            <div>
              <p
                className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${profileView === "liked" ? "text-white/40" : "text-gray-400"}`}
              >
                {t.profile.liked_title}
              </p>
              <p className="text-2xl font-serif italic">
                {likedReviews.length}
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Heart
              size={80}
              fill={profileView === "liked" ? "white" : "gray"}
            />
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setProfileView("recent")}
          className={`relative p-5 rounded-[2.5rem] border transition-all text-left overflow-hidden group ${
            profileView === "recent"
              ? "bg-brand-primary border-brand-primary text-white shadow-xl"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div
              className={`w-8 h-8 rounded-2xl flex items-center justify-center mb-4 ${profileView === "recent" ? "bg-white/10" : "bg-[#FAF9F6] text-blue-400"}`}
            >
              <Clock size={14} />
            </div>
            <div>
              <p
                className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${profileView === "recent" ? "text-white/40" : "text-gray-400"}`}
              >
                {t.profile.recent_title}
              </p>
              <p className="text-2xl font-serif italic">
                {recentReviews.length}
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <Clock size={80} />
          </div>
        </motion.button>
      </div>

      {/* Dynamic Content Area */}
      <AnimatePresence mode="wait">
        {profileView === "liked" && (
          <motion.section
            key="liked"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                {t.profile.liked_title} {t.profile.archiving}
              </h2>
              <span className="text-[10px] text-brand-primary font-black">
                {likedData.length} {t.profile.items}
              </span>
            </div>
            <div className="space-y-6">
              {likedData.length > 0 ? (
                likedData.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    lang={lang}
                    t={t}
                    isLiked={likedReviews.includes(review.id)}
                    onLike={() => toggleLike(review.id)}
                    onView={onReviewClick}
                    onImageClick={onImageClick}
                  />
                ))
              ) : (
                <div className="bg-[#FAF9F6] py-20 rounded-[2.5rem] border border-gray-100 border-dashed text-center">
                  <p className="text-[11px] text-gray-400 font-medium italic">
                    {t.profile.no_activity}
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {profileView === "recent" && (
          <motion.section
            key="recent"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                {t.profile.recent_title} {t.profile.history}
              </h2>
              <span className="text-[10px] text-blue-400 font-black">
                {recentData.length} {t.profile.items}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recentData.length > 0 ? (
                recentData.map((review) => (
                  <motion.div
                    key={review.id}
                    whileHover={{ y: -5 }}
                    onClick={onReviewClick}
                    className="bg-white p-3 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 mb-3 border border-gray-50 flex items-center justify-center text-gray-300">
                      {review.productImage ? (
                        <img
                          src={review.productImage}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Star size={16} />
                      )}
                    </div>
                    <p className="text-[10px] font-black text-gray-900 uppercase truncate w-full text-center">
                      {review.product}
                    </p>
                    <div className="mt-2 flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={8}
                          fill={i < review.rating ? "#000" : "none"}
                          stroke={i < review.rating ? "none" : "#ddd"}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 bg-[#FAF9F6] py-20 rounded-[2.5rem] border border-gray-100 border-dashed text-center">
                  <p className="text-[11px] text-gray-400 font-medium italic">
                    {t.profile.no_activity}
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {profileView === "all" && (
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Guidance and settings cards removed as requested */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
