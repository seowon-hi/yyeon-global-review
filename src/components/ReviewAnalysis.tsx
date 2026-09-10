import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, AlertCircle, Loader2, CheckCircle2, AlertTriangle, MessageSquare, LineChart, Award, ThumbsUp } from 'lucide-react';
import { Language } from '../types';
import { PRODUCT_LIST, getBagProductUrl, getCategoryById } from '../lib/categories';

interface SummaryLang {
  positive: string[];
  tips: string[];
  negative: string[];
}

interface TrustBadge {
  type: 'good' | 'warn';
  text: string;
}

interface ProductAnalysis {
  name: string;
  images: string[];
  total: number;
  avg_rating: number;
  positive_percent: number;
  summary: Record<Language, SummaryLang>;
  trust: {
    score: number;
    photo_review_percent: number;
    short_review_percent: number;
    negative_percent: number;
    badges: Record<Language, TrustBadge[]>;
  };
  features: Record<Language, string[]>;
  ai_recommendation: Record<Language, string>;
}

interface ReviewAnalysisProps {
  currentLang: Language;
}

export function ReviewAnalysis({ currentLang }: ReviewAnalysisProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allData, setAllData] = useState<Record<string, ProductAnalysis> | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('blooming');
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

  // Auto slide interval reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchReviewAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/review_analysis.json');
        if (!response.ok) {
          throw new Error('Failed to load review analysis data');
        }
        const data = await response.json();
        setAllData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewAnalysis();
  }, []);

  const activeProductData = allData ? allData[selectedProduct] : null;

  // Set up the automatical slideshow interval (3 seconds)
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (activeProductData && activeProductData.images && activeProductData.images.length > 0) {
      timerRef.current = setInterval(() => {
        setActiveImgIdx(prev => (prev === activeProductData.images.length - 1 ? 0 : prev + 1));
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeProductData, selectedProduct]);

  // Handle product tab changes
  const handleProductChange = (prodKey: string) => {
    setSelectedProduct(prodKey);
    setActiveImgIdx(0); // Reset slideshow to initial index
  };

  // Skip slideshow photo manual action
  const stepSlide = (direction: 'prev' | 'next') => {
    if (!activeProductData || !activeProductData.images || activeProductData.images.length === 0) return;
    const total = activeProductData.images.length;
    if (direction === 'prev') {
      setActiveImgIdx(prev => (prev === 0 ? total - 1 : prev - 1));
    } else {
      setActiveImgIdx(prev => (prev === total - 1 ? 0 : prev + 1));
    }
  };

  const t = {
    KO: {
      loading: '리뷰 분석 대시보드를 구축 중입니다...',
      error: '리뷰 분석 데이터를 불러오는 도중 오류 발생.',
      title: 'AI 리뷰 심화 분석',
      subtitle: '구입자 키워드와 후기를 시각화한 심층 진단',
      unitReviews: '개의 리뷰',
      ratingBase: '만점',
      sec1_title: '✨ 한눈에 보는 요약',
      sec1_pos: '추천 장점',
      sec1_tip: '사용 꿀팁',
      sec1_neg: '아쉬운 점',
      sec2_title: '🔒 피드백 신뢰도 분석',
      sec2_score_title: '리뷰 신뢰점수',
      sec3_title: '🏷️ 핵심 키워드 빈도',
      sec4_title: '🤖 AI 크로스 분석 총평',
      navToProduct: '제품 구경하러 가기',
    },
    JA: {
      loading: 'レビュー分析データを作成しています...',
      error: 'レビュー分析データの読み込みに失敗しました。',
      title: 'AIレビュー深層分析',
      subtitle: '購入者の口コミとキーワードを可視化した総合診断',
      unitReviews: '件のレビュー',
      ratingBase: '満点',
      sec1_title: '✨ ひと目でわかる要約',
      sec1_pos: 'おすすめポイント',
      sec1_tip: '活用のコツ',
      sec1_neg: '気になる点',
      sec2_title: '🔒 レビュー信頼性分析',
      sec2_score_title: '口コミ信頼度スコア',
      sec3_title: '🏷️ 頻出キーワード',
      sec4_title: '🤖 AI総合レコメンド',
      navToProduct: '製品を見に行く',
    },
    EN: {
      loading: 'Building review insights dashboard...',
      error: 'Failed to fetch review analysis dataset.',
      title: 'AI Sentiment Deep Dive',
      subtitle: 'Advanced visualization based on real customer feedback',
      unitReviews: 'reviews',
      ratingBase: 'out of 5',
      sec1_title: '✨ Summary at a Glance',
      sec1_pos: 'Highlights (Pros)',
      sec1_tip: 'User Tips',
      sec1_neg: 'Drawbacks (Cons)',
      sec2_title: '🔒 Feedback Trustworthiness',
      sec2_score_title: 'Review Integrity Score',
      sec3_title: '🏷️ High Frequency Keywords',
      sec4_title: '🤖 AI Recommendation & Verdict',
      navToProduct: 'View Product Details',
    }
  }[currentLang] || {
    loading: 'Building review insights dashboard...',
    error: 'Failed to fetch review analysis dataset.',
    title: 'AI Sentiment Deep Dive',
    subtitle: 'Advanced analytics based on real customer feedback',
    unitReviews: 'reviews',
    ratingBase: 'out of 5',
    sec1_title: '✨ Summary at a Glance',
    sec1_pos: 'Highlights (Pros)',
    sec1_tip: 'User Tips',
    sec1_neg: 'Drawbacks (Cons)',
    sec2_title: '🔒 Feedback Trustworthiness',
    sec2_score_title: 'Review Integrity Score',
    sec3_title: '🏷️ High Frequency Keywords',
    sec4_title: '🤖 AI Recommendation & Verdict',
    navToProduct: 'View Product Details',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
        <p className="text-xs text-gray-500 font-semibold">{t.loading}</p>
      </div>
    );
  }

  if (error || !activeProductData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-2">
        <AlertCircle className="text-rose-500" size={28} />
        <p className="text-xs text-rose-700 font-bold">{t.error}</p>
        <p className="text-[10px] text-rose-400 max-w-sm font-medium">{error}</p>
      </div>
    );
  }

  // Active locale specific sections
  const localizedSummary = activeProductData.summary[currentLang] || activeProductData.summary['KO'];
  const localizedBadges = activeProductData.trust.badges[currentLang] || activeProductData.trust.badges['KO'];
  const localizedFeatures = activeProductData.features[currentLang] || activeProductData.features['KO'];
  const localizedAiRecommend = activeProductData.ai_recommendation[currentLang] || activeProductData.ai_recommendation['KO'];

  return (
    <div className="space-y-6">
      {/* 4 buttons at the top for bag selection */}
      <div className="grid grid-cols-3 gap-1.5 bg-neutral-150/40 p-1.5 rounded-xl border border-gray-100">
        {PRODUCT_LIST.map((prod) => {
          const isActive = selectedProduct === prod.key;
          const label = prod[currentLang] || prod['KO'];
          return (
            <button
              key={prod.key}
              onClick={() => handleProductChange(prod.key)}
              className={`py-2 rounded-lg text-[11px] font-black transition-all cursor-pointer truncate ${
                isActive
                  ? 'bg-black text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-900 bg-transparent hover:bg-neutral-50/50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Styled Automatic Image Slideshow */}
      <div className="relative h-60 w-full bg-neutral-50 border border-gray-150 rounded-2xl overflow-hidden group shadow-inner">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImgIdx + selectedProduct}
            src={activeProductData.images[activeImgIdx]}
            alt={`${activeProductData.name} slideshow`}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Side arrows overlays */}
        <button
          onClick={() => stepSlide('prev')}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-gray-800 border border-gray-200/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => stepSlide('next')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/75 hover:bg-white text-gray-800 border border-gray-200/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-sm"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-md">
          {activeProductData.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImgIdx(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                activeImgIdx === idx ? 'bg-white w-3' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4 sequential report sections */}
      
      {/* 1. Summary at a Glance */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4.5 shadow-xs space-y-4">
        <h4 className="text-xs font-black text-gray-900 flex items-center space-x-2">
          <span>{t.sec1_title}</span>
        </h4>

        <div className="space-y-3 text-xs">
          {/* Positive pros */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1.5">
            <span className="inline-flex items-center text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-100/75 px-2 py-0.5 rounded-md">
              👍 {t.sec1_pos}
            </span>
            <ul className="space-y-1 text-emerald-800 font-medium list-disc pl-4.5">
              {localizedSummary.positive.map((p, idx) => (
                <li key={idx} className="leading-relaxed">{p}</li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1.5">
            <span className="inline-flex items-center text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-100/75 px-2 py-0.5 rounded-md">
              💡 {t.sec1_tip}
            </span>
            <ul className="space-y-1 text-blue-800 font-medium list-disc pl-4.5">
              {localizedSummary.tips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Negative cons */}
          <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-xl space-y-1.5">
            <span className="inline-flex items-center text-[10px] font-black text-rose-700 uppercase tracking-widest bg-rose-100/75 px-2 py-0.5 rounded-md">
              ⚠️ {t.sec1_neg}
            </span>
            <ul className="space-y-1 text-rose-800 font-medium list-disc pl-4.5">
              {localizedSummary.negative.map((n, idx) => (
                <li key={idx} className="leading-relaxed">{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Review Trustworthiness */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4.5 shadow-xs space-y-4.5">
        <h4 className="text-xs font-black text-gray-900 flex items-center space-x-2">
          <span>{t.sec2_title}</span>
        </h4>

        <div className="space-y-4">
          {/* Gauge score indicator */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">{t.sec2_score_title}</span>
              <span className="text-2xl font-black text-neutral-900 mt-0.5 block">
                {activeProductData.trust.score}<span className="text-sm font-bold text-gray-400">/100</span>
              </span>
            </div>
            
            {/* Horizontal Gauge Bar representation */}
            <div className="w-1/2 max-w-[150px] space-y-1.5">
              <div className="h-3 bg-neutral-200 rounded-full w-full overflow-hidden relative border border-neutral-300/30">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeProductData.trust.score}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between text-[8px] font-extrabold text-gray-400 uppercase tracking-wider">
                <span>VERIFIED</span>
                <span className="text-emerald-600">EXCELLENT</span>
              </div>
            </div>
          </div>

          {/* System Audit Badges */}
          <div className="space-y-2">
            {localizedBadges.map((badge, idx) => {
              const isGood = badge.type === 'good';
              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-2.5 p-3.5 rounded-xl border text-xs font-semibold ${
                    isGood
                      ? 'bg-emerald-50/20 border-emerald-100/70 text-gray-700'
                      : 'bg-amber-50/20 border-amber-100/70 text-gray-700'
                  }`}
                >
                  <div className="mt-0.5 outline-none">
                    {isGood ? (
                      <CheckCircle2 size={15} className="text-emerald-500" />
                    ) : (
                      <AlertTriangle size={15} className="text-amber-500" />
                    )}
                  </div>
                  <span className="leading-snug">{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Frequently Mentioned Features */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4.5 shadow-xs space-y-3.5">
        <h4 className="text-xs font-black text-gray-900 flex items-center space-x-2">
          <span>{t.sec3_title}</span>
        </h4>

        <div className="flex flex-wrap gap-1.5">
          {localizedFeatures.map((tag, idx) => (
            <span
              key={tag + idx}
              className="px-3 py-2 bg-neutral-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-colors hover:border-black/50"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 4. AI Recommendation Verdict */}
      <div className="bg-[#FAF7F2] border border-[#ECDCC7] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F1E4CE] pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🤖</span>
            <span className="text-xs font-black text-[#5C4523] uppercase tracking-wider">{t.sec4_title}</span>
          </div>

          {/* Quick Metrics rating badge */}
          <div className="text-right">
            <div className="flex items-center space-x-1 justify-end">
              <span className="text-xs font-black text-[#7D5A25]">★ {activeProductData.avg_rating}</span>
            </div>
            <span className="text-[9px] font-extrabold text-[#9F8A6B] block mt-0.5">
              {activeProductData.total} {t.unitReviews}
            </span>
          </div>
        </div>

        {/* AI recommended feedback prose */}
        <p className="text-xs text-[#524128] font-medium leading-relaxed bg-white/70 border border-white p-3.5 rounded-xl">
          {localizedAiRecommend}
        </p>

        {/* Call to Action Button */}
        <button
          onClick={() => {
            const fullName = getCategoryById(selectedProduct)?.fullName || 'Henne bag';
            window.open(getBagProductUrl(fullName), '_blank', 'noopener,noreferrer');
          }}
          className="w-full bg-[#3D2C1B] hover:bg-[#523C27] text-white font-extrabold text-xs py-3 rounded-lg.5 shadow-sm transition-colors flex justify-center items-center cursor-pointer"
        >
          {t.navToProduct}
        </button>
      </div>
    </div>
  );
}
