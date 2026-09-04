import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Loader2, Tag } from 'lucide-react';
import { Language } from '../types';

interface ColorCategory {
  id: string;
  KO: string;
  JA: string;
  EN: string;
}

interface ColorRecommendationItem {
  name: Record<Language, string>;
  image: string;
  description: Record<Language, string>;
  categories: string[];
  bag: string;
}

interface ColorGuideResponse {
  categories: ColorCategory[];
  colors: ColorRecommendationItem[];
}

interface ColorRecommendationProps {
  currentLang: Language;
}

export function ColorRecommendation({ currentLang }: ColorRecommendationProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ColorGuideResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchColorGuide = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://raw.githubusercontent.com/seowon-hi/yyeon-reviews/refs/heads/main/color_guide.json');
        if (!response.ok) {
          throw new Error('Failed to load color recommendations');
        }
        const parsed: ColorGuideResponse = await response.json();
        setData(parsed);
        // Default select first category key if items exist
        if (parsed.categories && parsed.categories.length > 0) {
          setSelectedCategory(parsed.categories[0].id);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchColorGuide();
  }, []);

  const t = {
    KO: {
      title: '나의 라이프웨어 맞춤 컬러',
      loading: '컬러 추천 가이드를 준비 중입니다...',
      error: '컬러 가이드 데이터를 불러오는 도중 오류가 발생했습니다.',
      noColors: '해당 분류에 등록된 컬러가 없습니다.',
      subtitle: '피부 톤과 코디 스타일에 맞는 다채로운 색감 가이드',
    },
    JA: {
      title: 'ライフウェアおすすめカラー',
      loading: 'カラー提案ガイドを読み込んでいます...',
      error: 'カラーガイドデータの読み込みに失敗しました。',
      noColors: 'このカテゴリに該当するカラーがありません。',
      subtitle: 'コーデやスタイリングを格上げする豊富なカラーバリエーション',
    },
    EN: {
      title: 'Curated Color Guide',
      loading: 'Loading color recommendations...',
      error: 'Failed to fetch color guidelines.',
      noColors: 'No colors under this category yet.',
      subtitle: 'Elevate your daily outfits with our exquisite shades',
    }
  }[currentLang] || {
    title: 'Curated Color Guide',
    loading: 'Loading color recommendations...',
    error: 'Failed to fetch color guidelines.',
    noColors: 'No colors under this category yet.',
    subtitle: 'Elevate your daily outfits with our exquisite shades',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
        <p className="text-xs text-gray-500 font-semibold">{t.loading}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-2">
        <AlertCircle className="text-rose-500" size={28} />
        <p className="text-xs text-rose-700 font-bold">{t.error}</p>
        <p className="text-[10px] text-rose-400 max-w-sm font-medium">{error}</p>
      </div>
    );
  }

  // Filter colors based on select category ID
  const filteredColors = data.colors.filter(c => c.categories.includes(selectedCategory));

  return (
    <div className="space-y-6">
      {/* Scrollable button bar -> Grid button bar styling */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-2 pb-2">
          {data.categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const categoryText = cat[currentLang] || cat['KO'];
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center justify-center text-center px-1.5 py-3 rounded-xl text-[10px] sm:text-[11px] font-black border transition-all cursor-pointer leading-tight ${
                  isActive
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-gray-800 hover:bg-neutral-50'
                }`}
              >
                {categoryText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Colors List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 gap-4"
        >
          {filteredColors.length === 0 ? (
            <div className="py-12 bg-gray-50/50 rounded-2xl text-center border border-gray-150">
              <p className="text-xs text-gray-400 font-semibold">{t.noColors}</p>
            </div>
          ) : (
            filteredColors.map((colorItem, index) => (
              <div
                key={colorItem.name['KO'] + index}
                className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-shadow duration-300 grid grid-cols-12 gap-0"
              >
                {/* Bag Image Banner */}
                <div className="col-span-4 h-full relative min-h-[110px] bg-neutral-100 border-r border-gray-100">
                  <img
                    src={colorItem.image}
                    alt={colorItem.name[currentLang] || colorItem.name['KO']}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details Side Description */}
                <div className="col-span-8 p-4 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-gray-900 leading-snug">
                      {colorItem.name[currentLang] || colorItem.name['KO']}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                      {colorItem.description[currentLang] || colorItem.description['KO']}
                    </p>
                  </div>

                  {/* Associated Bag Tag */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-50 border border-gray-150 rounded-md text-[9px] font-black text-gray-400 tracking-wider uppercase">
                      <Tag size={10} className="text-gray-400" />
                      <span>{colorItem.bag}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
