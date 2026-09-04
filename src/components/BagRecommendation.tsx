import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RecommendationProduct {
  bagName: string;
  colorName: string;
  hex: string;
}

interface BagRecommendationProps {
  currentLang?: 'KO' | 'JA' | 'EN';
}

const CATEGORIES = ['포인트', '부드러움·따뜻함', '고급·시크', '빈티지', '클래식'] as const;
type CategoryType = typeof CATEGORIES[number];

const RECOMMENDATIONS: Record<CategoryType, RecommendationProduct[]> = {
  포인트: [
    { bagName: '블루밍 백', colorName: '버터 옐로우', hex: '#F5D97E' },
    { bagName: '블루밍 백', colorName: '메탈 실버', hex: '#C0C0C0' },
    { bagName: '블루밍 백', colorName: '베이비 블루', hex: '#A8D8EA' },
    { bagName: '멜로 백', colorName: '레드', hex: '#C0392B' },
    { bagName: '헨느 백', colorName: '올리브', hex: '#6B7C45' },
  ],
  '부드러움·따뜻함': [
    { bagName: '블루밍 백', colorName: '아이보리', hex: '#FFFFF0' },
    { bagName: '멜로 백', colorName: '버터베이지', hex: '#F0E6C8' },
    { bagName: '헨느 백', colorName: '바닐라', hex: '#F3E5AB' },
    { bagName: '헨느 백', colorName: '더스티 블루', hex: '#B0C4D8' },
    { bagName: '헨느 백', colorName: '소프트 블랙', hex: '#2C2C2C' },
    { bagName: '아로 백', colorName: '바닐라', hex: '#F3E5AB' },
  ],
  '고급·시크': [
    { bagName: '블루밍 백', colorName: '빈티지 브라운', hex: '#6B4226' },
    { bagName: '블루밍 백', colorName: '블랙', hex: '#1A1A1A' },
    { bagName: '멜로 백', colorName: '블랙', hex: '#1A1A1A' },
    { bagName: '헨느 백', colorName: '소프트 블랙', hex: '#2C2C2C' },
    { bagName: '아로 백', colorName: '소프트 블랙', hex: '#2C2C2C' },
  ],
  빈티지: [
    { bagName: '블루밍 백', colorName: '뮤트 핑크', hex: '#D4A5A5' },
    { bagName: '헨느 백', colorName: '올리브', hex: '#6B7C45' },
    { bagName: '멜로 백', colorName: '버터베이지', hex: '#F0E6C8' },
    { bagName: '멜로 백', colorName: '레드', hex: '#C0392B' },
    { bagName: '멜로 백', colorName: '블랙', hex: '#1A1A1A' },
    { bagName: '멜로 백', colorName: '월넛 브라운', hex: '#5C3317' },
  ],
  클래식: [
    { bagName: '블루밍 백', colorName: '빈티지 브라운', hex: '#6B4226' },
    { bagName: '멜로 백', colorName: '월넛 브라운', hex: '#5C3317' },
    { bagName: '헨느 백', colorName: '카라멜 브라운', hex: '#C68642' },
    { bagName: '아로 백', colorName: '카라멜 브라운', hex: '#C68642' },
  ],
};

const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
  '포인트': { KO: '포인트', JA: 'アクセントカラー', EN: 'Accent Colors' },
  '부드러움·따뜻함': { KO: '부드러움·따뜻함', JA: 'ソフト＆ウォーム', EN: 'Soft & Warm' },
  '고급·시크': { KO: '고급·시크', JA: 'クラシック＆シック', EN: 'Classic & Chic' },
  '빈티지': { KO: '빈티지', JA: 'ヴィンテージ', EN: 'Vintage' },
  '클래식': { KO: '클래식', JA: 'クラシック', EN: 'Classic' },
};

const BAG_NAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  '블루밍 백': { KO: 'Blooming bag', JA: 'Blooming bag', EN: 'Blooming bag' },
  '멜로 백': { KO: 'Mellow bag', JA: 'Mellow bag', EN: 'Mellow bag' },
  '헨느 백': { KO: 'Henne bag', JA: 'Henne bag', EN: 'Henne bag' },
  '아로 백': { KO: 'Aro bag', JA: 'Aro bag', EN: 'Aro bag' },
};

const COLOR_NAME_TRANSLATIONS: Record<string, Record<string, string>> = {
  '버터 옐로우': { KO: '버터 옐로우', JA: 'バターイエロー', EN: 'Butter Yellow' },
  '메탈 실버': { KO: '메탈 실버', JA: 'メタルシルバー', EN: 'Metal Silver' },
  '베이비 블루': { KO: '베이비 블루', JA: 'ベビーブルー', EN: 'Baby Blue' },
  '레드': { KO: '레드', JA: 'レッド', EN: 'Red' },
  '올리브': { KO: '올리브', JA: 'オリーブ', EN: 'Olive' },
  '아이보리': { KO: '아이보리', JA: 'アイボリー', EN: 'Ivory' },
  '버터베이지': { KO: '버터베이지', JA: 'バターベージュ', EN: 'Butter Beige' },
  '바닐라': { KO: '바닐라', JA: 'バニラ', EN: 'Vanilla' },
  '더스티 블루': { KO: '더스티 블루', JA: 'ダスティブルー', EN: 'Dusty Blue' },
  '소프트 블랙': { KO: '소프트 블랙', JA: 'ソフトブラック', EN: 'Soft Black' },
  '빈티지 브라운': { KO: '빈티지 브라운', JA: 'ヴィンテージブラウン', EN: 'Vintage Brown' },
  '블랙': { KO: '블랙', JA: 'ブラック', EN: 'Black' },
  '뮤트 핑크': { KO: '뮤트 핑크', JA: 'ミュートピンク', EN: 'Mute Pink' },
  '월넛 브라운': { KO: '월넛 브라운', JA: 'ウォルナットブラウン', EN: 'Walnut Brown' },
  '카라멜 브라운': { KO: '카라멜 브라운', JA: 'キャラメルブラウン', EN: 'Caramel Brown' },
};

const RECOM_LABELS: Record<string, Record<string, string>> = {
  title: { KO: 'Recommend', JA: 'Recommend', EN: 'Recommend' },
  subtitle: { KO: '취향에 맞는 가방 추천', JA: 'お好みに合わせたバッグのおすすめ', EN: 'Custom Recommendation for Your Taste' },
};

export function BagRecommendation({ currentLang = 'KO' }: BagRecommendationProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('포인트');

  const lang = (currentLang === 'KO' || currentLang === 'JA' || currentLang === 'EN') ? currentLang : 'KO';
  const products = RECOMMENDATIONS[selectedCategory] || [];

  const getTranslatedCategory = (cat: string) => CATEGORY_TRANSLATIONS[cat]?.[lang] || cat;
  const getTranslatedBag = (bag: string) => BAG_NAME_TRANSLATIONS[bag]?.[lang] || bag;
  const getTranslatedColor = (color: string) => COLOR_NAME_TRANSLATIONS[color]?.[lang] || color;
  const t = (key: string) => RECOM_LABELS[key]?.[lang] || RECOM_LABELS[key]?.[ 'KO'] || '';

  return (
    <div className="flex flex-col bg-white min-h-full font-sans">
      <header className="px-6 pt-10 pb-6 bg-[#0B1530] text-white rounded-b-[2.5rem] shadow-xl">
        <h1 className="text-2xl font-serif italic mb-1">{t('title')}</h1>
        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
          {t('subtitle')}
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
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
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
              const isLightColor = p.colorName === '아이보리' || p.colorName === '바닐라' || p.hex.toLowerCase() === '#fffff0' || p.hex.toLowerCase() === '#f3e5ab';
              
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
                        isLightColor ? 'border border-gray-200' : ''
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
