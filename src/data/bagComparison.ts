export interface LocalizedText {
  KO: string;
  JA: string;
  EN: string;
}

export interface BagItem {
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

export const PERSONAS = [
  '출퇴근 직장인',
  '학생/캠퍼스',
  '주말 데일리',
  '여행/나들이',
  '미팅/비즈니스',
  '엄마/육아',
];

export const BAG_DATA: BagItem[] = [
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

export const COMPARE_TABLE_DATA = [
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
