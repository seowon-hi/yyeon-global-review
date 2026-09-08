import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, AlertCircle, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface StyleItem {
  label: Record<Language, string>;
  url: string;
}

interface BagDetail {
  id: string;
  name: Record<Language, string>;
  type: Record<Language, string>;
  colors: Record<Language, string[]>;
  weight: string;
  material: Record<Language, string>;
  lock: Record<Language, string>;
  feature: Record<Language, string>;
  images: {
    detail: string;
    interior: string;
    style: StyleItem[];
  };
}

interface CompareTwoProductsProps {
  currentLang: Language;
  onNavigateToStorageTable: () => void;
}

// Color hex mapping helper to render nice color badge/circles
const COLOR_HEX_MAP: Record<string, string> = {
  // English
  'silver': '#E5E7EB',
  'black': '#111827',
  'mute pink': '#E8A2A9',
  'baby blue': '#ACD0EE',
  'vintage brown': '#8B5A2B',
  'cream ivory': '#ECE6D8',
  'butter yellow': '#FBE795',
  'vintage red': '#A62B2B',
  'walnut brown': '#6F4E37',
  'butter beige': '#E6D7C3',
  'taupe gray': '#A09A95',
  'caramel tan': '#C68E5C',
  'cameo pink': '#E1C4C7',
  'choco brown': '#5A3825',
  'milk tea': '#DEC9B5',
  'peach': '#F7C59F',
  'olive green': '#7D8462',
  'brick brown': '#9E4F39',

  // Korean
  '실버': '#E5E7EB',
  '블랙': '#111827',
  '뮤트 핑크': '#E8A2A9',
  '베이비 블루': '#ACD0EE',
  '빈티지 브라운': '#8B5A2B',
  '크림 아이보리': '#ECE6D8',
  '버터 옐로우': '#FBE795',
  '빈티지 레드': '#A62B2B',
  '월넛 브라운': '#6F4E37',
  '버터 베이지': '#E6D7C3',
  '토프 그레이': '#A09A95',
  '카라멜 탠': '#C68E5C',

  // Japanese
  'シルバー': '#E5E7EB',
  'ブラック': '#111827',
  'ミュートピンク': '#E8A2A9',
  'ベビーブルー': '#ACD0EE',
  'ヴィンテージブラウン': '#8B5A2B',
  'クリームアイボリー': '#ECE6D8',
  'バターイエロー': '#FBE795',
  'ヴィンテージレッド': '#A62B2B',
  'ウォルナットブラウン': '#6F4E37',
  'バターベージュ': '#E6D7C3',
  'トープグレー': '#A09A95',
};

function getColorHex(colorName: string): string {
  const norm = colorName.trim().toLowerCase();
  if (COLOR_HEX_MAP[norm]) return COLOR_HEX_MAP[norm];
  
  // Fuzzy match
  for (const [key, val] of Object.entries(COLOR_HEX_MAP)) {
    if (norm.includes(key) || key.includes(norm)) {
      return val;
    }
  }
  return '#D1D5DB'; // Default grey
}

export function CompareTwoProducts({ currentLang, onNavigateToStorageTable }: CompareTwoProductsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bags, setBags] = useState<BagDetail[]>([]);

  // Selection state
  const [leftIndex, setLeftIndex] = useState<number>(0);
  const [rightIndex, setRightIndex] = useState<number>(1);

  // Zoom overlay modal state
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Style sliders active indexes (left slider vs right slider)
  const [leftStyleIdx, setLeftStyleIdx] = useState<number>(0);
  const [rightStyleIdx, setRightStyleIdx] = useState<number>(0);

  useEffect(() => {
    const fetchBagCompareData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/bag_compare.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data && Array.isArray(data.bags)) {
          setBags(data.bags);
        } else {
          throw new Error('Invalid schema received');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBagCompareData();
  }, []);

  const t = {
    KO: {
      weight: '중량',
      material: '소재',
      lock: '잠금장치',
      feature: '핵심 특징',
      colors: '제공 색상',
      style: '스타일링 연출',
      viewStorageBtn: '📊 소지품 수납 가능 표 보기',
      placeholder: '가방 선택',
      loading: '비교 정보를 불러오고 있습니다...',
      error: '가방 정보를 가져오는 중에 오류가 발생했습니다.',
      specTitle: '제품 스펙 세부 정보',
    },
    JA: {
      weight: '重量',
      material: '素材',
      lock: '留め具',
      feature: '特長',
      colors: '展開カラー',
      style: 'スタイリング着用例',
      viewStorageBtn: '📊 収納力目安・構造表を見る',
      placeholder: 'バッグを選択',
      loading: '比較情報を読み込んでいます...',
      error: 'バッグ情報の読み込みに失敗しました。',
      specTitle: 'スペック詳細情報',
    },
    EN: {
      weight: 'Weight',
      material: 'Material',
      lock: 'Lock Mechanism',
      feature: 'Key Feature',
      colors: 'Available Colors',
      style: 'Styling Gallery',
      viewStorageBtn: '📊 View Packing Capability Grid',
      placeholder: 'Select Bag',
      loading: 'Loading comparison data...',
      error: 'Failed to load bag specifications data.',
      specTitle: 'Specifications & Details',
    }
  }[currentLang] || {
    weight: 'Weight',
    material: 'Material',
    lock: 'Lock Mechanism',
    feature: 'Key Feature',
    colors: 'Available Colors',
    style: 'Styling Gallery',
    viewStorageBtn: '📊 View Packing Capability Grid',
    placeholder: 'Select Bag',
    loading: 'Loading comparison data...',
    error: 'Failed to load bag specifications data.',
    specTitle: 'Specifications & Details',
  };

  // Reset indices if bag count changes or selection gets out of bounds
  useEffect(() => {
    if (bags.length > 0) {
      if (leftIndex >= bags.length) setLeftIndex(0);
      if (rightIndex >= bags.length) setRightIndex(Math.min(1, bags.length - 1));
    }
  }, [bags]);

  // Handle slide movement for style photos
  const slideStyle = (side: 'left' | 'right', direction: 'prev' | 'next', totalStyles: number) => {
    if (side === 'left') {
      if (direction === 'prev') {
        setLeftStyleIdx(prev => (prev === 0 ? totalStyles - 1 : prev - 1));
      } else {
        setLeftStyleIdx(prev => (prev === totalStyles - 1 ? 0 : prev + 1));
      }
    } else {
      if (direction === 'prev') {
        setRightStyleIdx(prev => (prev === 0 ? totalStyles - 1 : prev - 1));
      } else {
        setRightStyleIdx(prev => (prev === totalStyles - 1 ? 0 : prev + 1));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-3">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
        <p className="text-xs text-gray-500 font-semibold">{t.loading}</p>
      </div>
    );
  }

  if (error || bags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-2">
        <AlertCircle className="text-rose-500" size={28} />
        <p className="text-xs text-rose-700 font-bold">{t.error}</p>
        <p className="text-[10px] text-rose-400 max-w-sm font-medium">{error}</p>
      </div>
    );
  }

  const leftBag = bags[leftIndex];
  const rightBag = bags[rightIndex];

  return (
    <div className="space-y-6">
      {/* Dropout selectors for both sides */}
      <div className="grid grid-cols-2 gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-xs">
        {/* Left Side Selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Left Item</label>
          <div className="relative">
            <select
              value={leftIndex}
              onChange={(e) => {
                setLeftIndex(Number(e.target.value));
                setLeftStyleIdx(0);
              }}
              className="w-full bg-gray-50/70 border border-gray-200/80 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-black appearance-none cursor-pointer"
            >
              {bags.map((b, idx) => (
                <option key={b.id + idx} value={idx}>
                  {b.name[currentLang] || b.name['KO']}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
          </div>
        </div>

        {/* Right Side Selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Right Item</label>
          <div className="relative">
            <select
              value={rightIndex}
              onChange={(e) => {
                setRightIndex(Number(e.target.value));
                setRightStyleIdx(0);
              }}
              className="w-full bg-gray-50/70 border border-gray-200/80 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-black appearance-none cursor-pointer"
            >
              {bags.map((b, idx) => (
                <option key={b.id + idx} value={idx}>
                  {b.name[currentLang] || b.name['KO']}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">▼</div>
          </div>
        </div>
      </div>

      {/* Comparisons Panel (2 columns layout) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Bag Detail Column */}
        {leftBag && (
          <motion.div
            key={`left-${leftBag.id}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Essential Card */}
            <div className="bg-white border border-gray-200/80 p-4.5 rounded-2xl shadow-xs space-y-3.5 flex flex-col items-center text-center">
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-tight">{leftBag.name[currentLang] || leftBag.name['KO']}</h3>
                <span className="inline-block text-[9px] font-bold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full mt-1">
                  {leftBag.type[currentLang] || leftBag.type['KO']}
                </span>
              </div>

              {/* Detail Click to Zoom */}
              <div
                onClick={() => setZoomImage(leftBag.images.detail)}
                className="w-full h-36 bg-gray-50 border border-gray-150 rounded-xl relative overflow-hidden group cursor-pointer flex items-center justify-center shadow-inner"
              >
                <img
                  src={leftBag.images.detail}
                  alt={leftBag.name['KO']}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 p-1.5 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={12} />
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div className="bg-white border border-gray-200/80 p-4 rounded-2xl shadow-xs space-y-3.5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.specTitle}</div>
              
              <div className="space-y-3 text-xs">
                {/* Weight */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.weight}</span>
                  <span className="font-bold text-gray-800 block mt-0.5">{leftBag.weight}</span>
                </div>

                {/* Material */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.material}</span>
                  <p className="text-gray-600 block mt-0.5 leading-normal">{leftBag.material[currentLang] || leftBag.material['KO']}</p>
                </div>

                {/* Lock */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.lock}</span>
                  <span className="font-semibold text-gray-700 block mt-0.5">{leftBag.lock[currentLang] || leftBag.lock['KO']}</span>
                </div>

                {/* Feature */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.feature}</span>
                  <p className="text-gray-650 block mt-0.5 leading-normal font-medium">{leftBag.feature[currentLang] || leftBag.feature['KO']}</p>
                </div>

                {/* Colors (Rendered with custom color chips) */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block mb-1.5">{t.colors}</span>
                  <div className="flex flex-wrap gap-1">
                    {(leftBag.colors[currentLang] || leftBag.colors['KO']).map((color, cIdx) => {
                      const hex = getColorHex(color);
                      return (
                        <div key={color + cIdx} className="group relative flex items-center">
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300 shadow-xs block cursor-help focus:outline-none focus:ring-1 focus:ring-black"
                            style={{ backgroundColor: hex }}
                            title={color}
                          />
                          {/* Tiny color name badge on hover */}
                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {color}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Style Slider */}
            {leftBag.images.style && leftBag.images.style.length > 0 && (
              <div className="bg-white border border-gray-200/80 p-4 rounded-2xl shadow-xs space-y-3">
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase block">{t.style}</span>
                
                <div className="relative h-44 rounded-xl overflow-hidden border border-gray-150 flex items-center justify-center group">
                  <img
                    src={leftBag.images.style[leftStyleIdx]?.url}
                    alt="Left style view"
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setZoomImage(leftBag.images.style[leftStyleIdx]?.url)}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Label overlay */}
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-1 rounded font-bold backdrop-blur-md">
                    {leftBag.images.style[leftStyleIdx]?.label[currentLang] || leftBag.images.style[leftStyleIdx]?.label['KO']}
                  </div>

                  {/* Indicators line */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {leftStyleIdx + 1}/{leftBag.images.style.length}
                  </div>

                  {/* Small direction arrows */}
                  <button
                    onClick={() => slideStyle('left', 'prev', leftBag.images.style.length)}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer text-gray-800"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => slideStyle('left', 'next', leftBag.images.style.length)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer text-gray-800"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Right Bag Detail Column */}
        {rightBag && (
          <motion.div
            key={`right-${rightBag.id}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Essential Card */}
            <div className="bg-white border border-gray-200/80 p-4.5 rounded-2xl shadow-xs space-y-3.5 flex flex-col items-center text-center">
              <div>
                <h3 className="text-sm font-black text-gray-900 leading-tight">{rightBag.name[currentLang] || rightBag.name['KO']}</h3>
                <span className="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mt-1">
                  {rightBag.type[currentLang] || rightBag.type['KO']}
                </span>
              </div>

              {/* Detail Click to Zoom */}
              <div
                onClick={() => setZoomImage(rightBag.images.detail)}
                className="w-full h-36 bg-gray-50 border border-gray-155 rounded-xl relative overflow-hidden group cursor-pointer flex items-center justify-center shadow-inner"
              >
                <img
                  src={rightBag.images.detail}
                  alt={rightBag.name['KO']}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-black/60 p-1.5 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={12} />
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div className="bg-white border border-gray-200/80 p-4 rounded-2xl shadow-xs space-y-3.5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.specTitle}</div>
              
              <div className="space-y-3 text-xs">
                {/* Weight */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.weight}</span>
                  <span className="font-bold text-gray-800 block mt-0.5">{rightBag.weight}</span>
                </div>

                {/* Material */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.material}</span>
                  <p className="text-gray-650 block mt-0.5 leading-normal">{rightBag.material[currentLang] || rightBag.material['KO']}</p>
                </div>

                {/* Lock */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.lock}</span>
                  <span className="font-semibold text-gray-700 block mt-0.5">{rightBag.lock[currentLang] || rightBag.lock['KO']}</span>
                </div>

                {/* Feature */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block">{t.feature}</span>
                  <p className="text-gray-650 block mt-0.5 leading-normal font-medium">{rightBag.feature[currentLang] || rightBag.feature['KO']}</p>
                </div>

                {/* Colors (Rendered with custom color chips) */}
                <div>
                  <span className="text-[9px] font-black tracking-wider text-gray-400 uppercase block mb-1.5">{t.colors}</span>
                  <div className="flex flex-wrap gap-1">
                    {(rightBag.colors[currentLang] || rightBag.colors['KO']).map((color, cIdx) => {
                      const hex = getColorHex(color);
                      return (
                        <div key={color + cIdx} className="group relative flex items-center">
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300 shadow-xs block cursor-help focus:outline-none focus:ring-1 focus:ring-black"
                            style={{ backgroundColor: hex }}
                            title={color}
                          />
                          {/* Tiny color name badge on hover */}
                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {color}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Style Slider */}
            {rightBag.images.style && rightBag.images.style.length > 0 && (
              <div className="bg-white border border-gray-200/80 p-4 rounded-2xl shadow-xs space-y-3">
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase block">{t.style}</span>
                
                <div className="relative h-44 rounded-xl overflow-hidden border border-gray-150 flex items-center justify-center group">
                  <img
                    src={rightBag.images.style[rightStyleIdx]?.url}
                    alt="Right style view"
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setZoomImage(rightBag.images.style[rightStyleIdx]?.url)}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Label overlay */}
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-1 rounded font-bold backdrop-blur-md">
                    {rightBag.images.style[rightStyleIdx]?.label[currentLang] || rightBag.images.style[rightStyleIdx]?.label['KO']}
                  </div>

                  {/* Indicators line */}
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {rightStyleIdx + 1}/{rightBag.images.style.length}
                  </div>

                  {/* Small direction arrows */}
                  <button
                    onClick={() => slideStyle('right', 'prev', rightBag.images.style.length)}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer text-gray-800"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => slideStyle('right', 'next', rightBag.images.style.length)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/70 border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer text-gray-800"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation Redirect Button to packed items table */}
      <button
        onClick={onNavigateToStorageTable}
        className="w-full bg-[#1A253C] hover:bg-[#273552] text-white py-3.5.5 rounded-xl font-bold text-xs transition-colors flex justify-center items-center shadow-sm cursor-pointer border border-[#2E3C56] mt-4"
      >
        <span>{t.viewStorageBtn}</span>
      </button>

      {/* Lightbox Modal overlay for clickable zoom */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-[9999] flex items-center justify-center p-4 overflow-hidden"
            onClick={() => setZoomImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 text-white hover:bg-white/10 p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Enlarged image preview */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-full max-h-[85vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomImage}
                alt="Enlarged review detail"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
