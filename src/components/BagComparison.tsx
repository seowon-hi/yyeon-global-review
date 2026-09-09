import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Compass, Columns, Palette, Database } from 'lucide-react';
import { Review, Language } from '../types';
import { CompareTwoProducts } from './CompareTwoProducts';
import { ColorRecommendation } from './ColorRecommendation';
import { ReviewAnalysis } from './ReviewAnalysis';

interface LocalizedText {
  KO: string;
  JA: string;
  EN: string;
}

interface BagItem {
  id: string;
  name: string;
  subTitle: LocalizedText;
  badge: {
    text: LocalizedText;
    bgColor: string;
    textColor: string;
  };
  checklist: {
    item: LocalizedText;
    icon: string;
    possible: boolean;
    detail: LocalizedText;
  }[];
  promotion: LocalizedText;
  personas: string[];
}

const PERSONAS = [
  '출퇴근 직장인',
  '학생/캠퍼스',
  '주말 데일리',
  '여행/나들이',
  '미팅/비즈니스',
  '엄마/육아',
];

const PERSONA_TRANSLATIONS: Record<string, Record<string, string>> = {
  '출퇴근 직장인': { KO: '출퇴근 직장인', JA: '通勤・通学/オフィス', EN: 'Commuter/Office' },
  '학생/캠퍼스': { KO: '학생/캠퍼스', JA: '学生/キャンパス', EN: 'Student/Campus' },
  '주말 데일리': { KO: '주말 데일리', JA: '週末デイリー', EN: 'Weekend Daily' },
  '여행/나들이': { KO: '여행/나들이', JA: '旅行/お出かけ', EN: 'Travel/Outing' },
  '미팅/비즈니스': { KO: '미팅/비즈니스', JA: 'ミーティング/ビジネス', EN: 'Meetings/Business' },
  '엄마/육아': { KO: '엄마/육아', JA: 'マザーズバッグ/育児', EN: 'Mother/Diaper Bag' },
};

const LABELS: Record<string, Record<string, string>> = {
  title: { KO: '제품 세부 비교', JA: '製品詳細比較', EN: 'Detailed Product Guide' },
  btn_lifestyle: { KO: '내 가방 찾기', JA: 'マイバッグ探し', EN: 'Find My Bag' },
  btn_compare: { KO: '제품 비교', JA: '製品比較', EN: 'Compare Products' },
  btn_colors: { KO: '색상 추천', JA: 'カラー提案', EN: 'Color Advisor' },
  btn_analysis: { KO: '리뷰 분석', JA: 'レビュー分析', EN: 'Review Analysis' },
  
  sub_table: { KO: '소지품 수납 가능 표', JA: '収納力目安表', EN: 'Storage Capacity Grid' },
  sub_compare: { KO: '두 제품 비교하기', JA: '二つの製品を比較', EN: 'Compare Two Bags' },

  recommended_title: { KO: '전용 추천 상품', JA: 'おすすめ의 製品', EN: 'Recommended for You' },
  items_unit: { KO: '개', JA: '個', EN: 'item(s)' },
  checklist_title: { KO: '수납 체크리스트', JA: '収納目安', EN: 'Storage Checklist' },
  view_mall: { KO: '공식몰 보기', JA: '公式モールで見る', EN: 'View on Official Store' },
  table_header: { KO: '📊 제품별 대표 소지품 수납 가능 구조표', JA: '📊 製品別代表所持品の収納性能目安', EN: '📊 Luggage Storage Capacity Chart' },
  col_product: { KO: 'PRODUCT', JA: '製品', EN: 'PRODUCT' },
  col_laptop: { KO: '노트북 (15")', JA: 'ノートPC (15")', EN: 'Laptop (15")' },
  col_ipad: { KO: '아이패드', JA: 'iPad', EN: 'iPad' },
  col_tumbler: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
  col_books: { KO: '책 (독서)', JA: '本 (読書)', EN: 'Books' },
  col_lipstick: { KO: '립스틱/소형', JA: 'リップ/小物', EN: 'Lipstick/Small Items' },
  table_footer_title: { KO: '소지품 목적에 맞는 가방을 한눈에 찾아보세요!', JA: '持ち物の目的にピッタリなバッグをひと目で確認！', EN: 'Find the perfect bag for your belongings at a glance' },
  table_footer_desc: {
    KO: '수납 성공(o) 표시를 확인하여 가장 효율적인 사이즈와 수납력을 가진 가방 라인업을 선택할 수 있도록 상세 정보를 제공합니다.',
    JA: '収納可能（o）の表示を確認し、最も効率적인サイズ＆収納力を持つバッグをお選びいただけるよう、実用的な情報を提供します。',
    EN: 'Check the storage success (o) mark to see which bag lineup has the most efficient size and storage capacity for your needs.'
  },
};

const BAG_DATA: BagItem[] = [
  {
    id: 'Henne bag',
    name: 'Henne Large',
    subTitle: {
      KO: '보부상 직장인을 위한 여유로운 수납',
      JA: '荷物の多いオフィスワーカーのための余裕の収納力',
      EN: 'Generous storage for office workers with lots of belongings',
    },
    badge: {
      text: { KO: 'MAXI / 대용량', JA: 'MAXI / 大容量', EN: 'MAXI / Large' },
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    checklist: [
      {
        item: { KO: '노트북(15인치)', JA: 'ノートPC(15インチ)', EN: 'Laptop (15")' },
        icon: '💻',
        possible: true,
        detail: { KO: '여유롭게 수납 가능', JA: '余裕で収納可能', EN: 'Fits spacious and securely' },
      },
      {
        item: { KO: 'A4 서류', JA: 'A4書類', EN: 'A4 Documents' },
        icon: '📑',
        possible: true,
        detail: { KO: '구김 없이 반듯하게 수납', JA: '折れ曲がらず綺麗に収まる', EN: 'Fits perfectly flat without folding' },
      },
      {
        item: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
        icon: '📦',
        possible: true,
        detail: { KO: '내부 밴드로 세워서 안전 고정', JA: '内部バンドで立てて安全固定', EN: 'Stands upright with internal band' },
      },
      {
        item: { KO: '책 (2-3권)', JA: '本 (2-3冊)', EN: 'Books (2-3)' },
        icon: '📚',
        possible: true,
        detail: { KO: '두꺼운 전공서적도 거뜬함', JA: '分厚い本や専門書も余裕', EN: 'Even thick textbooks fit easily' },
      },
      {
        item: { KO: '립스틱', JA: 'リップ/小物', EN: 'Lipstick' },
        icon: '💄',
        possible: true,
        detail: { KO: '내부 전용 포켓에 편리하게 수납', JA: '専用ポケットに便利に収納', EN: 'Easy storage in dedicated inner pocket' },
      },
    ],
    promotion: {
      KO: '🎁 리얼 레더 미니 파우치 무료 증정',
      JA: '🎁 リアルレザーミニポーチ無料プレゼント',
      EN: '🎁 Complimentary Real Leather Mini Pouch',
    },
    personas: ['출퇴근 직장인', '미팅/비즈니스', '엄마/육아', '여행/나들이'],
  },
  {
    id: 'Henne bag',
    name: 'Henne Medium',
    subTitle: {
      KO: '데일리 오피스룩에 딱 맞는 실용적인 크기',
      JA: '毎日のオフィスルックに最適な実用的サイズ',
      EN: 'Practical size perfect for daily office look',
    },
    badge: {
      text: { KO: 'MEDIUM / 실용적', JA: 'MEDIUM / 実用的', EN: 'MEDIUM / Practical' },
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    checklist: [
      {
        item: { KO: '노트북(15인치)', JA: 'ノートPC(15インチ)', EN: 'Laptop (15")' },
        icon: '💻',
        possible: false,
        detail: { KO: '수납 불가 (태블릿 수납 권장)', JA: '収納不可 (タブレット収納推奨)', EN: 'Does not fit (Tablet recommended)' },
      },
      {
        item: { KO: '아이패드 / e-book 리더기', JA: 'iPad / e-book リーダー', EN: 'iPad / e-Book Reader' },
        icon: '📱',
        possible: true,
        detail: { KO: '수납 가능', JA: '収納可能', EN: 'Fits perfectly' },
      },
      {
        item: { KO: 'A4 서류', JA: 'A4書類', EN: 'A4 Documents' },
        icon: '📑',
        possible: false,
        detail: { KO: '끝부분이 약간 휠 수 있음', JA: '端が少し曲がる可能性あり', EN: 'Edges might bend slightly' },
      },
      {
        item: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
        icon: '📦',
        possible: false,
        detail: { KO: '가로로 눕혀서만 가능', JA: '横に寝かせてのみ可能', EN: 'Horizontal alignment only' },
      },
      {
        item: { KO: '책 (1권)', JA: '本 (1冊)', EN: 'Books (1)' },
        icon: '📚',
        possible: true,
        detail: { KO: '일반 소설책 1~2권 여유 수납', JA: '一般小説1〜2冊の余裕収納', EN: 'Fits 1-2 standard novels easily' },
      },
      {
        item: { KO: '립스틱', JA: 'リップ/小物', EN: 'Lipstick' },
        icon: '💄',
        possible: true,
        detail: { KO: '지퍼 달린 이너포켓 내부 수납', JA: 'ジッパー付きインナーポケット内蔵', EN: 'Secure zipped inner pocket storage' },
      },
    ],
    promotion: {
      KO: '🎁 오피스 스타일링 슬림 타이 스카프 증정',
      JA: '🎁 オフィススタイリング・スカーフプレゼント',
      EN: '🎁 Complimentary Styling Slim Tie Scarf',
    },
    personas: ['출퇴근 직장인', '미팅/비즈니스', '주말 데일리'],
  },
  {
    id: 'Blooming bag',
    name: 'Blooming bag',
    subTitle: {
      KO: '캠퍼스 라이프와 캐주얼웨어의 완벽한 조화',
      JA: 'キャンパスライフとカジュアルの上質な調和',
      EN: 'Perfect harmony of campus life and casual wear',
    },
    badge: {
      text: { KO: 'MEDIUM / 실용적', JA: 'MEDIUM / 実用的', EN: 'MEDIUM / Practical' },
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    checklist: [
      {
        item: { KO: '노트북(15인치)', JA: 'ノートPC(15インチ)', EN: 'Laptop (15")' },
        icon: '💻',
        possible: false,
        detail: { KO: '13인치 슬림북까지만 가능', JA: '13インチスリムPCまで可能', EN: 'Fits up to 13-inch slim laptops' },
      },
      {
        item: { KO: 'A4 서류', JA: 'A4書類', EN: 'A4 Documents' },
        icon: '📑',
        possible: false,
        detail: { KO: '포켓 입구에 걸릴 수 있음', JA: 'ポケットの開口部にかかる可能性あり', EN: 'May get caught on pocket opening' },
      },
      {
        item: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
        icon: '📦',
        possible: false,
        detail: { KO: '수납 불가', JA: '収納不可', EN: 'Does not fit' },
      },
      {
        item: { KO: '책 (1-2권)', JA: '本 (1-2冊)', EN: 'Books (1-2)' },
        icon: '📚',
        possible: true,
        detail: { KO: '작은 크기의 미니북 수납 가능', JA: '小さなサイズのミニ本のみ可能', EN: 'Only small-sized mini-books can fit' },
      },
      {
        item: { KO: '립스틱', JA: 'リップ/小物', EN: 'Lipstick' },
        icon: '💄',
        possible: true,
        detail: { KO: '앞면 퀵 포켓에 바로 수납 가능', JA: 'フロントクイックポケットに即収納可能', EN: 'Instant access front pocket storage' },
      },
    ],
    promotion: {
      KO: '🎁 일러스트 참 로고 키링 에디션 포함',
      JA: '🎁 イラストチャーム・ロゴキーリング付き',
      EN: '🎁 Includes Special Illustration Charm Keyring',
    },
    personas: ['학생/캠퍼스', '주말 데일리', '여행/나들이'],
  },
  {
    id: 'Mellow bag',
    name: 'Mellow bag',
    subTitle: {
      KO: '가볍고 귀여운 미니멀 라이프의 동반자',
      JA: '軽くて可愛い、ミニマルライフの頼れる相棒',
      EN: 'Light and cute companion for minimalist life',
    },
    badge: {
      text: { KO: 'COMPACT / 미니', JA: 'COMPACT / ミニ', EN: 'COMPACT / Mini' },
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
    },
    checklist: [
      {
        item: { KO: '노트북(15인치)', JA: 'ノートPC(15インチ)', EN: 'Laptop (15")' },
        icon: '💻',
        possible: false,
        detail: { KO: '수납 불가', JA: '収納不可', EN: 'Does not fit' },
      },
      {
        item: { KO: 'A4 서류', JA: 'A4書類', EN: 'A4 Documents' },
        icon: '📑',
        possible: false,
        detail: { KO: '수납 불가', JA: '収納不可', EN: 'Does not fit' },
      },
      {
        item: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
        icon: '📦',
        possible: false,
        detail: { KO: '수납 불가 (미니 보틀만 가능)', JA: '収納不可 (ミニボトルのみ可能)', EN: 'Does not fit (Mini bottles only)' },
      },
      {
        item: { KO: '책', JA: '本', EN: 'Books' },
        icon: '📚',
        possible: false,
        detail: { KO: '포켓형 작고 가벼운 메모지만 가능', JA: 'ポケットサイズのノートのみ可能', EN: 'Pocket-sized tiny notebooks only' },
      },
      {
        item: { KO: '립스틱(여러 개)', JA: 'リップ (複数)', EN: 'Lipsticks (Multiple)' },
        icon: '💄',
        possible: true,
        detail: { KO: '립 매직 전용 오거나이저 내장', JA: '専用ビューティーオーガナイザー内蔵', EN: 'Built-in beauty product organizer' },
      },
    ],
    promotion: {
      KO: '🎁 실버 체인 링크 스트랩 추가 패키지',
      JA: '🎁 シルバーチェーンストラップ追加パッケージ付き',
      EN: '🎁 Includes Additional Silver Chain Strap',
    },
    personas: ['주말 데일리', '여행/나들이', '엄마/육아'],
  },
  {
    id: 'Aro bag',
    name: 'Aro bag',
    subTitle: {
      KO: '심플하면서 트렌디한 라운드 셰입의 매력',
      JA: 'シンプルでトレンディなラウンドデザインの魅力',
      EN: 'Charming trendy round-shape minimalist bag',
    },
    badge: {
      text: { KO: 'COMPACT / 미니', JA: 'COMPACT / ミニ', EN: 'COMPACT / Mini' },
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    checklist: [
      {
        item: { KO: '노트북(15인치)', JA: 'ノートPC(15インチ)', EN: 'Laptop (15")' },
        icon: '💻',
        possible: false,
        detail: { KO: '수납 불가', JA: '収納不可', EN: 'Does not fit' },
      },
      {
        item: { KO: '아이패드 / e-book 리더기', JA: 'iPad / e-book リーダー', EN: 'iPad / e-Book Reader' },
        icon: '📱',
        possible: true,
        detail: { KO: '수납 가능', JA: '収納可能', EN: 'Fits perfectly' },
      },
      {
        item: { KO: 'A4 서류', JA: 'A4書類', EN: 'A4 Documents' },
        icon: '📑',
        possible: false,
        detail: { KO: '수납 불가', JA: '収納不可', EN: 'Does not fit' },
      },
      {
        item: { KO: '텀블러', JA: 'タンブラー', EN: 'Tumbler' },
        icon: '📦',
        possible: false,
        detail: { KO: '에비앙 330ml 보틀 수납 가능', JA: 'エビアン330mlボトル収納可能', EN: 'Fits Evian 330ml bottle' },
      },
      {
        item: { KO: '책 (1권)', JA: '本 (1冊)', EN: 'Books (1)' },
        icon: '📚',
        possible: true,
        detail: { KO: '콤팩트한 크기의 에세이 서적 가능', JA: 'コンパクトなサイズのエッセイ本のみ可能', EN: 'Fits compact essay/memoir books' },
      },
      {
        item: { KO: '립스틱', JA: 'リップ/小物', EN: 'Lipstick' },
        icon: '💄',
        possible: true,
        detail: { KO: '지퍼 사이드 보이지 않는 포켓 수납', JA: '目立たないサイド隠しポケット収納', EN: 'Storage in invisible side zipped pocket' },
      },
    ],
    promotion: {
      KO: '🎁 가죽 참 태슬 키링 제공',
      JA: '🎁 レザーチャームタッセルキーリング付き',
      EN: '🎁 Complimentary Leather Tassel Keyring',
    },
    personas: ['주말 데일리', '미팅/비즈니스', '학생/캠퍼스'],
  },
];

const COMPARE_TABLE_DATA = [
  {
    name: 'Aube Large',
    specs: {
      notebook: true,
      ipad: true,
      tumbler: true,
      books: true,
      lipstick: true,
    },
  },
  {
    name: 'Aube Medium',
    specs: {
      notebook: false,
      ipad: true,
      tumbler: true,
      books: true,
      lipstick: true,
    },
  },
  {
    name: 'Henne Large',
    specs: {
      notebook: true,
      ipad: true,
      tumbler: true,
      books: true,
      lipstick: true,
    },
  },
  {
    name: 'Henne Medium',
    specs: {
      notebook: false,
      ipad: true,
      tumbler: false,
      books: true,
      lipstick: true,
    },
  },
  {
    name: 'Blooming bag',
    specs: {
      notebook: false,
      ipad: false,
      tumbler: false,
      books: false,
      lipstick: true,
    },
  },
  {
    name: 'Mellow bag',
    specs: {
      notebook: false,
      ipad: false,
      tumbler: false,
      books: false,
      lipstick: true,
    },
  },
  {
    name: 'Aro bag',
    specs: {
      notebook: false,
      ipad: true,
      tumbler: false,
      books: false,
      lipstick: true,
    },
  },
];

interface BagComparisonProps {
  reviews?: Review[];
  onBagClick?: (bagName: string) => void;
  currentLang?: Language;
}

export function BagComparison({ reviews = [], onBagClick, currentLang = 'KO' }: BagComparisonProps) {
  // 4 Main categories tabs: 'lifestyle' | 'compare' | 'colors' | 'analysis'
  const [mainActiveTab, setMainActiveTab] = useState<'lifestyle' | 'compare' | 'colors' | 'analysis'>('lifestyle');
  
  // Sub Tab inside 'compare': 'table' | 'two_products'
  const [compareSubTab, setCompareSubTab] = useState<'table' | 'two_products'>('two_products');

  const [selectedPersona, setSelectedPersona] = useState<string>('출퇴근 직장인');

  const lang: Language = (currentLang === 'KO' || currentLang === 'JA' || currentLang === 'EN') ? currentLang : 'KO';

  const t = (key: string) => LABELS[key]?.[lang] || LABELS[key]?.['KO'] || '';

  // Filter bags based on selected persona for lifestyle tab
  const filteredBags = BAG_DATA.filter((bag) => bag.personas.includes(selectedPersona));

  return (
    <div className="flex flex-col bg-[#FAFAFA] min-h-full font-sans text-gray-900 leading-relaxed selection:bg-gray-100">
      {/* Tab Navigation header */}
      <div className="bg-white border-b border-gray-100 px-5 pt-7 pb-4">
        <h1 className="text-lg font-black tracking-tight mb-4 text-center text-gray-800 uppercase">
          {t('title')}
        </h1>
        
        {/* Toggle 4-button navigation */}
        <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-2xl border border-gray-200/50">
          {/* Button 1: 내 가방 찾기 */}
          <button
            onClick={() => setMainActiveTab('lifestyle')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'lifestyle'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-905/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Compass size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_lifestyle')}</span>
          </button>

          {/* Button 2: 제품 비교 */}
          <button
            onClick={() => setMainActiveTab('compare')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'compare'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-905/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Columns size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_compare')}</span>
          </button>

          {/* Button 3: 색상 추천 */}
          <button
            onClick={() => setMainActiveTab('colors')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'colors'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-950/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Palette size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_colors')}</span>
          </button>

          {/* Button 4: 리뷰 분석 */}
          <button
            onClick={() => setMainActiveTab('analysis')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
              mainActiveTab === 'analysis'
                ? 'bg-white text-gray-950 shadow-xs ring-1 ring-gray-950/5'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Database size={14} className="mb-0.5" />
            <span className="text-[10px] font-black tracking-tight">{t('btn_analysis')}</span>
          </button>
        </div>
      </div>

      {/* Main Contents Area */}
      <div className="flex-1 px-5 py-5 pb-20">
        <AnimatePresence mode="wait">
          
          {/* Module 1: 내 가방 찾기 */}
          {mainActiveTab === 'lifestyle' && (
            <motion.div
              key="lifestyle-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="space-y-6"
            >
              {/* Persona Selector Row */}
              <div className="grid grid-cols-3 gap-2 pb-2">
                {PERSONAS.map((persona) => {
                  const isActive = selectedPersona === persona;
                  const label = PERSONA_TRANSLATIONS[persona]?.[lang] || persona;
                  return (
                    <button
                      key={persona}
                      onClick={() => setSelectedPersona(persona)}
                      className={`flex flex-col items-center justify-center text-center px-1.5 py-3 rounded-xl text-[10px] sm:text-[11px] font-black border transition-all cursor-pointer leading-tight ${
                        isActive
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm mb-1">
                        {persona === '출퇴근 직장인' && '💼'}
                        {persona === '학생/캠퍼스' && '📚'}
                        {persona === '주말 데일리' && '🗓️'}
                        {persona === '여행/나들이' && '✈️'}
                        {persona === '미팅/비즈니스' && '👔'}
                        {persona === '엄마/육아' && '🍼'}
                      </span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tag header */}
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                🏷️ {PERSONA_TRANSLATIONS[selectedPersona]?.[lang] || selectedPersona} {t('recommended_title')} ({filteredBags.length}{t('items_unit')})
              </div>

              {/* Recommended Cards list */}
              <div className="grid grid-cols-1 gap-5">
                {filteredBags.map((bag) => (
                  <div
                    key={bag.name}
                    className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-sm transition-all duration-300"
                  >
                    <div>
                      <span className={`inline-block text-[9px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase ${bag.badge.bgColor} ${bag.badge.textColor} mb-2`}>
                        {bag.badge.text[lang] || bag.badge.text['KO']}
                      </span>
                      <h3 className="text-base font-black text-gray-900">{bag.name}</h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{bag.subTitle[lang] || bag.subTitle['KO']}</p>
                    </div>

                    {/* Storage item check list */}
                    <div className="bg-gray-50 rounded-xl p-3.5 space-y-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('checklist_title')}
                      </div>
                      <div className="space-y-2 text-xs">
                        {bag.checklist.map((c, idx) => (
                          <div key={idx} className="flex justify-between items-center py-0.5">
                            <span className="flex items-center space-x-2 text-gray-650 font-semibold">
                              <span>{c.icon}</span>
                              <span>{c.item[lang] || c.item['KO']}</span>
                            </span>
                            <span className="flex items-center space-x-1.5 text-right">
                              <span className="text-[11px] text-gray-400 font-medium">{c.detail[lang] || c.detail['KO']}</span>
                              {c.possible ? (
                                <Check size={14} className="text-emerald-500 font-bold" />
                              ) : (
                                <X size={14} className="text-gray-300" />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onBagClick?.(bag.id)}
                      className="w-full bg-[#0B1530] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#15234A] transition-colors cursor-pointer flex justify-center items-center"
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {t('view_mall')}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Module 2: 제품 비교 (Saves both 2-1 and 2-2 subtabs) */}
          {mainActiveTab === 'compare' && (
            <motion.div
              key="compare-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="space-y-5"
            >
              {/* Product compare subtabs */}
              <div className="flex bg-neutral-100 p-0.5 rounded-xl border border-gray-200/40">
                <button
                  onClick={() => setCompareSubTab('two_products')}
                  className={`flex-1 py-2 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                    compareSubTab === 'two_products'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t('sub_compare')}
                </button>
                <button
                  onClick={() => setCompareSubTab('table')}
                  className={`flex-1 py-2 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                    compareSubTab === 'table'
                      ? 'bg-white text-gray-950 shadow-xs'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t('sub_table')}
                </button>
              </div>

              {/* Sub-tab Content mapping */}
              <AnimatePresence mode="wait">
                {compareSubTab === 'two_products' ? (
                  <motion.div
                    key="two_products_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <CompareTwoProducts
                      currentLang={lang}
                      onNavigateToStorageTable={() => setCompareSubTab('table')}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="table_sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="space-y-4"
                  >
                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      {t('table_header')}
                    </div>

                    {/* Table markup for comparison */}
                    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              <th className="py-4 px-4 font-black text-gray-500 first:pl-5">{t('col_product')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_laptop')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_ipad')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_tumbler')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_books')}</th>
                              <th className="py-4 px-3 font-semibold text-gray-500 text-center">{t('col_lipstick')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-xs text-gray-750">
                            {COMPARE_TABLE_DATA.map((row) => (
                              <tr key={row.name} className="hover:bg-gray-50/40 transition-colors">
                                <td className="py-4.5 px-4 font-black text-gray-900 pl-5">
                                  <div>{row.name}</div>
                                  <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest block mt-0.5">
                                    {row.name.includes('Henne') ? 'Henne bag' : row.name.toLowerCase().includes('mellow') ? 'Mellow bag' : row.name.toLowerCase().includes('aro') ? 'Aro bag' : row.name.toLowerCase().includes('aube') ? 'Aube Bag' : 'Blooming bag'}
                                  </span>
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.notebook ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.ipad ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.tumbler ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.books ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                                <td className="py-4.5 px-3 text-center">
                                  {row.specs.lipstick ? (
                                    <span className="text-emerald-500 font-extrabold text-sm">o</span>
                                  ) : (
                                    <span className="text-gray-400 font-extrabold text-sm">x</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Table footer descriptions */}
                    <div className="bg-gray-50 border border-gray-150 p-4.5 rounded-xl text-center">
                      <span className="text-[10px] font-black text-gray-400 tracking-wider block mb-2 uppercase">
                        {t('table_footer_title')}
                      </span>
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                        {t('table_footer_desc')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Module 3: 색상 추천 */}
          {mainActiveTab === 'colors' && (
            <motion.div
              key="colors-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <ColorRecommendation currentLang={lang} />
            </motion.div>
          )}

          {/* Module 4: 리뷰 분석 */}
          {mainActiveTab === 'analysis' && (
            <motion.div
              key="analysis-module"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
            >
              <ReviewAnalysis currentLang={lang} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
