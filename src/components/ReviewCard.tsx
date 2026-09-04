import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Sparkles,
  Heart,
  ChevronDown,
  Plus,
  Layers,
  Maximize2,
  ArrowRight,
} from "lucide-react";
import { Language } from "../types";
import { KEYWORD_MAPPING_KO } from "../lib/keywords";
import { getBagProductUrl, normalizeProduct } from "../lib/categories";

export function HighlightedText({
  text,
  activeKeywords,
}: {
  text: string;
  activeKeywords: string[];
}) {
  if (!activeKeywords.length) return <>{text}</>;

  const wordsToHighlight: string[] = [];
  activeKeywords.forEach((kw) => {
    if (KEYWORD_MAPPING_KO[kw]) {
      wordsToHighlight.push(...KEYWORD_MAPPING_KO[kw]);
    }
  });

  if (!wordsToHighlight.length) return <>{text}</>;

  const sortedWords = [...new Set(wordsToHighlight)].sort(
    (a, b) => b.length - a.length,
  );
  const regex = new RegExp(`(${sortedWords.join("|")})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="bg-brand-primary/20 text-brand-primary font-black rounded-sm px-0.5"
          >
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export function ReviewCard({
  review,
  lang,
  t,
  isLiked,
  activeKeywords = [],
  onLike,
  onView,
  onImageClick,
}: {
  review: any;
  lang: Language;
  t: any;
  isLiked?: boolean;
  activeKeywords?: string[];
  onLike?: () => void;
  onView?: () => void;
  onImageClick?: (images: string[], index: number) => void;
  key?: number;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const TAG_LIMIT = 6;
  const tags = review.tags[lang] || [];
  const displayedTags = isTagsExpanded ? tags : tags.slice(0, TAG_LIMIT);

  const handleShowOriginal = () => {
    setShowOriginal(!showOriginal);
    if (!showOriginal && onView) {
      onView();
    }
  };

  return (
    <div className="bg-white border border-gray-100 p-7 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-700 group overflow-hidden relative">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -mr-12 -mt-12 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
            <span className="text-[12px] font-black text-gray-400 italic font-serif">
              {(review.author[lang] || "").charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-[13px] font-black text-gray-900 tracking-tight">
              {review.author[lang] || "User"}
            </p>
            <div className="flex items-center space-x-1.5">
              <div className="flex text-gray-900 space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={8}
                    fill={i < review.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={2.5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-2 shrink-0">
          <div className="flex items-center space-x-2 py-1.5 px-3 rounded-full border border-gray-50 bg-[#F9F9F7] shadow-sm">
            <div
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${review.source === "자사몰" ? "bg-blue-500" : "bg-orange-400"}`}
            />
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">
              {review.source === "자사몰"
                ? t.home.review_source.mall
                : t.home.review_source.wadiz}
            </span>
          </div>

          {onLike && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all active:scale-90 ${
                isLiked
                  ? "bg-rose-50 border-rose-100 text-rose-500 shadow-sm shadow-rose-200"
                  : "bg-white/50 border-white/80 text-gray-300 hover:text-gray-400"
              }`}
            >
              <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>

      <div className="relative mb-6 group-hover:scale-[1.02] transition-transform duration-700">
        <div className="absolute -left-4 top-0 text-brand-primary opacity-20">
          <Sparkles size={24} />
        </div>
        <p className="text-[14px] text-gray-800 leading-[1.7] font-medium tracking-tight px-2">
          {lang === "KO" ? (
            <HighlightedText
              text={review.text[lang]}
              activeKeywords={activeKeywords}
            />
          ) : (
            review.text[lang]
          )}
        </p>
      </div>

      {/* Product Highlight */}
      {!(
        (!review.images || review.images.length === 0) &&
        review.productImage?.includes("ecimg.cafe24img.com")
      ) && (
        <div className="bg-[#FAF9F6] rounded-3xl p-4 mb-6 flex items-center space-x-4 border border-gray-50/50">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 shadow-sm transition-transform group-hover:scale-105">
            {review.productImage ? (
              <img
                src={review.productImage}
                alt={review.product}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <Star size={16} className="text-gray-300" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">
              {review.product}
            </p>
            <p className="text-[11px] font-bold text-gray-500 truncate italic">
              "
              {review.summary[lang] ||
                (review.color !== "만족도 리뷰" ? review.color : null) ||
                review.product}
              "
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {/* Color tag removed as per request for cleanup */}
            </div>
          </div>
        </div>
      )}

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-6 space-y-3">
          {review.images.length === 1 ? (
            <div
              onClick={() => onImageClick?.(review.images, 0)}
              className="relative w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 cursor-pointer hover:border-brand-primary transition-all active:scale-[0.98] group/img"
            >
              <img
                src={review.images[0]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                <Maximize2
                  size={20}
                  className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {review.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => onImageClick?.(review.images, idx)}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 cursor-pointer hover:border-brand-primary transition-all active:scale-95 group/img"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                      <Maximize2
                        size={16}
                        className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-1.5 px-1">
                <Layers size={10} className="text-brand-primary" />
                <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.1em]">
                  +{review.images.length - 1} More Photos
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {displayedTags.map((tag: string) => (
          <span
            key={tag}
            className="text-[9px] px-3 py-1.5 bg-white text-gray-400 rounded-2xl border border-gray-100 font-black uppercase tracking-tight hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default"
          >
            # {tag}
          </span>
        ))}
        {tags.length > TAG_LIMIT && (
          <button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="text-[9px] px-3 py-1.5 bg-gray-50 text-brand-primary rounded-2xl border border-gray-100 font-black uppercase tracking-tight hover:bg-brand-primary hover:text-white transition-all cursor-pointer flex items-center space-x-1"
          >
            <span>{isTagsExpanded ? t.home.show_less : t.home.show_more}</span>
            {isTagsExpanded ? <ChevronDown className="rotate-180" size={10} /> : <Plus size={10} />}
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2 px-2 mb-3">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em]">
          {review.city[lang]}
        </p>
      </div>

      <div className="flex items-center justify-end pt-6 border-t border-gray-50">
        {/* show_original button removed as per request for cleanup */}

        <button
          onClick={(e) => {
            e.preventDefault();
            const category = normalizeProduct(review.product);
            const targetUrl = category
              ? getBagProductUrl(category, review.sourceUrl)
              : review.sourceUrl;

            window.open(targetUrl, "_blank");
          }}
          className="flex items-center space-x-3 px-6 py-3 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-gray-200 active:scale-95 group/link"
        >
          <span>{t.home.shop_style}</span>
          <ArrowRight
            size={12}
            strokeWidth={3}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <AnimatePresence>
        {showOriginal && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-gray-50">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Original Feed (KO)
                </span>
              </div>
              <p className="text-[12px] text-gray-400 italic leading-[1.8] font-medium bg-[#FAFAFA] p-5 rounded-2xl border border-gray-50">
                {review.text.KO}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
