import { Language, TranslationSet, Review, FAQ } from "./types";

export const PRODUCTS: any[] = [
  {
    id: 1,
    category: "blooming",
    name: "[4차 리오더] Blooming bag - Silver",
    color: "Silver",
    price: 205000,
    salePrice: 123900,
    image:
      "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20240920/24b49a6c19157e2af2c90708113ddd61.jpg",
    rating: 4.8,
    reviews: 124,
    emoji: "🩶",
    createdAt: "2026-05-14",
    popularity: 95,
  },
  {
    id: 2,
    category: "blooming",
    name: "[4차 리오더] Blooming bag - Black",
    color: "Black",
    price: 205000,
    salePrice: 205000,
    image:"https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241101/d8fe10360f9d1b94231853d1324ec41b.jpg",
    rating: 4.9,
    reviews: 156,
    emoji: "🖤",
    createdAt: "2026-05-13",
    popularity: 92,
  },
  {
    id: 4, 
    category: "blooming", 
    name: "[4차 리오더] Blooming bag - Baby Blue", 
    color: "Baby Blue", 
    price: 205000, 
    salePrice: 123900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/medium/20241105/b31a996216a1d5fffa50d892f963082b.jpg",
    rating: 4.6,
    reviews: 15,
    emoji: "💙",
    createdAt: "2026-05-12",
    popularity: 88
  },
  { 
    id: 5, 
    category: "blooming", 
    name: "[4차 리오더] Blooming bag - Vintage Brown", 
    color: "Vintage Brown", 
    price: 205000, 
    salePrice: 123900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/medium/20240920/65681c933a7306b2854c13ab8ff552cd.jpg",
    rating: 4.8,
    reviews: 34,
    emoji: "🤎",
    createdAt: "2026-05-11",
    popularity: 82
  },
  { 
    id: 6, 
    category: "blooming", 
    name: "[4차 리오더] Blooming bag - Cream Ivory", 
    color: "Cream Ivory", 
    price: 205000, 
    salePrice: 123900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/medium/20241105/c0c24b4ec8a324eb8c939bbf2c5808d4.jpg",
    rating: 4.7,
    reviews: 22,
    emoji: "🤍",
    createdAt: "2026-05-10",
    popularity: 80
  },
  { 
    id: 7, 
    category: "blooming", 
    name: "[4차 리오더] Blooming bag - Butter Yellow", 
    color: "Butter Yellow", 
    price: 205000, 
    salePrice: 123900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/medium/20241105/37e06bcba3706de621892b1e18bda4e0.jpg",
    rating: 4.9,
    reviews: 67,
    emoji: "💛",
    createdAt: "2026-05-09",
    popularity: 90
  },


  {
    id: 101,
    category: "mellow",
    name: "[3차 리오더] Mellow bag - Black",
    color: "Black",
    price: 219000,
    salePrice: 139800,
    image:
      "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/5c74f5b90298e5df994dbcfa96228f6f.jpg",
    rating: 4.7,
    reviews: 31,
    emoji: "🖤",
    createdAt: "2026-05-08",
    popularity: 88,
  },
  {
      id: 102,
    category: "mellow", 
    name: "[3차 리오더] Mellow bag - Vintage Red", 
    color: "Vintage Red", 
    price: 219000, 
    salePrice: 139800, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/2f8845a45adf3a4e5791cdadb2f8a929.jpg",
    rating: 4.9,
    reviews: 45,
    emoji: "❤️",
    createdAt: "2026-05-07",
    popularity: 95
  },
  { 
    id: 103, 
    category: "mellow", 
    name: "[3차 리오더] Mellow bag - Walnut Brown", 
    color: "Walnut Brown", 
    price: 219000, 
    salePrice: 139800, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/686fae3d860a0f601b4ce3f3263b18e8.jpg",
    rating: 4.8,
    reviews: 38,
    emoji: "🤎",
    createdAt: "2026-05-06",
    popularity: 84
  },
  { 
    id: 104, 
    category: "mellow", 
    name: "[3차 리오더] Mellow bag - Butter Beige", 
    color: "Butter Beige", 
    price: 219000, 
    salePrice: 139800, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/835d6f11a94fa6df625b6ad23cbc4493.jpg",
    rating: 4.7,
    reviews: 19,
    emoji: "🧈",
    createdAt: "2026-05-05",
    popularity: 76
  },
  // =========================
  // Henne Bag
  // =========================
  // Henne Mini
  { 
    id: 201, 
    category: "henne", 
    name: "Henne Mini - Dusty Blue", 
    color: "Dusty Blue", 
    price: 249000, 
    salePrice: 178900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/dafe3a8fa22a23d75e67f02e5c30892d.jpg",
    rating: 4.5,
    reviews: 12,
    emoji: "💙",
    createdAt: "2026-03-20",
    popularity: 65
  },
  { 
    id: 202, 
    category: "henne", 
    name: "Henne Mini - Olive", 
    color: "Olive", 
    price: 249000, 
    salePrice: 178900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0b13b5669258cd4e75133061bb51bb1e.jpg",
    rating: 4.6,
    reviews: 8,
    emoji: "🫒",
    createdAt: "2026-03-25",
    popularity: 68
  },
  { 
    id: 203, 
    category: "henne", 
    name: "Henne Mini - Vanilla", 
    color: "Vanilla", 
    price: 249000, 
    salePrice: 178900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/92b539d1dc9f8ebbd11802ee5c7dce72.jpg",
    rating: 4.8,
    reviews: 21,
    emoji: "🤍",
    createdAt: "2026-04-05",
    popularity: 79
  },
  { 
    id: 204, 
    category: "henne", 
    name: "Henne Mini - Soft Black", 
    color: "Soft Black", 
    price: 249000, 
    salePrice: 178900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0cad83e7c62fe4437ebc845e706e50d9.jpg",
    rating: 4.7,
    reviews: 14,
    emoji: "🖤",
    createdAt: "2026-04-12",
    popularity: 72
  },
  { 
    id: 205, 
    category: "henne", 
    name: "Henne Mini - Caramel Brown", 
    color: "Caramel Brown", 
    price: 249000, 
    salePrice: 178900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0942bb313a1802790acbe577b2f60274.jpg",
    rating: 4.9,
    reviews: 143,
    emoji: "🤎",
    createdAt: "2026-05-11",
    popularity: 91
  },

  // Henne Medium
  { 
    id: 301, 
    category: "henne", 
    name: "Henne Medium - Butter", 
    color: "Butter", 
    price: 269000, 
    salePrice: 200900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20250717/e9b0b2f63ae74f75df5a9a6a5319b0aa.jpg",
    rating: 4.7,
    reviews: 25,
    emoji: "🧈",
    createdAt: "2026-05-02",
    popularity: 82
  },
  { 
    id: 302, 
    category: "henne", 
    name: "Henne Medium - Caramel Brown", 
    color: "Caramel Brown", 
    price: 269000, 
    salePrice: 200900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20250717/2ded740c2f6fcc4aa675aec4c9358576.jpg",
    rating: 4.9,
    reviews: 258,
    emoji: "🤎",
    createdAt: "2026-05-08",
    popularity: 96
  },
  { 
    id: 303, 
    category: "henne", 
    name: "Henne Medium - Taupe Mocha", 
    color: "Taupe Mocha", 
    price: 269000, 
    salePrice: 200900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20250717/ace8f66d38bddae14d017dcd7c7c9fc2.jpg",
    rating: 4.8,
    reviews: 31,
    emoji: "☕",
    createdAt: "2026-04-30",
    popularity: 85
  },
  { 
    id: 304, 
    category: "henne", 
    name: "Henne Medium - Soft Black", 
    color: "Soft Black", 
    price: 269000, 
    salePrice: 200900, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250110/243a01de622c75c4dae01ce7c4ef5833.jpg",
    rating: 4.7,
    reviews: 28,
    emoji: "🖤",
    createdAt: "2026-05-04",
    popularity: 87
  },

  // Henne Large
  { 
    id: 401, 
    category: "henne", 
    name: "Henne Large - Vanilla", 
    color: "Vanilla", 
    price: 319000, 
    salePrice: 245000, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260107/e48e492eb384ddb52d027da0032d7b95.jpg",
    rating: 4.8,
    reviews: 15,
    emoji: "🤍",
    createdAt: "2026-05-01",
    popularity: 81
  },
  { 
    id: 402, 
    category: "henne", 
    name: "Henne Large - Soft Black", 
    color: "Soft Black", 
    price: 319000, 
    salePrice: 245000, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250110/243a01de622c75c4dae01ce7c4ef5833.jpg",
    rating: 4.7,
    reviews: 12,
    emoji: "🖤",
    createdAt: "2026-04-25",
    popularity: 78
  },
  { 
    id: 403, 
    category: "henne", 
    name: "Henne Large - Deep Brown", 
    color: "Deep Brown", 
    price: 319000, 
    salePrice: 245000, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20250113/8853cd850c75aebf7a0a3bcefc35647c.jpg",
    rating: 4.6,
    reviews: 9,
    emoji: "🤎",
    createdAt: "2026-04-18",
    popularity: 74
  },
  { 
    id: 404, 
    category: "henne", 
    name: "Henne Large - Caramel Brown", 
    color: "Caramel Brown", 
    price: 319000, 
    salePrice: 245000, 
    image: "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20250110/3ff713fcf2acd2186c5a343212c94874.jpg",
    rating: 4.9,
    reviews: 22,
    emoji: "👜",
    createdAt: "2026-05-07",
    popularity: 90
  },


];

export const BAG_CATALOG: Record<string, { name: string; image: string }[]> = {
  blooming: [
    {
      name: "Silver",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20240920/adbdabb5ac52058aede915b44bc37023.jpg",
    },
    {
      name: "Black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241101/d8fe10360f9d1b94231853d1324ec41b.jpg",
    },
    {
      name: "Baby Blue",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/medium/20241105/b31a996216a1d5fffa50d892f963082b.jpg",
    },
    {
      name: "Mute pink",
      image:"https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20241101/60601b03b466bcd5654a995399657be5.jpg"
    },
    {
      name: "Vintage Brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20240920/bf5d7024ced04e649850c340cf1fe992.jpg",
    },
    {
      name: "Cream Ivory",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20241105/2987f2369608a19e929cb489d5d0387d.jpg",
    },
    {
      name: "Butter Yellow",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20241105/9b5bcb1ab05598edf0342720f39de9b0.jpg",
    },
  ],
  mellow: [
    {
      name: "Black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/5c74f5b90298e5df994dbcfa96228f6f.jpg",
    },
    {
      name: "Vintage Red",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/2f8845a45adf3a4e5791cdadb2f8a929.jpg",
    },
    {
      name: "Walnut Brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/tiny/20241118/686fae3d860a0f601b4ce3f3263b18e8.jpg",
    },
    {
      name: "Butter Beige",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20241118/7e4ce2fca85910e6f08f3f784f318dc4.jpg",
    },
  ],

  henne: [
    {
      name: "mini Dusty Blue",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/dafe3a8fa22a23d75e67f02e5c30892d.jpg",
    },
    {
      name: "mini Soft Black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0cad83e7c62fe4437ebc845e706e50d9.jpg",
    },
    {
      name: "mini Vanila",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/92b539d1dc9f8ebbd11802ee5c7dce72.jpg",
    },
    {
      name: "mini olive",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0b13b5669258cd4e75133061bb51bb1e.jpg",
    },
    {
      name: "mini caramel brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260220/0942bb313a1802790acbe577b2f60274.jpg",
    },
    {
      name: "medium butter",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250717/348b0856e00c5898e7d75829d1573c6f.jpg",
    },
    {
      name: "medium soft black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250717/ea8ae12489afbfe2c25190a70153090b.jpg",
    },
    {
      name: "medium caramel brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250717/7e2e9b6edd25f679a5be510f6daf87b4.jpg",
    },
    {
      name: "medium taupe mocha",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250717/9394c9821ea7d416544a5382e797db74.jpg",
    },
    {
      name: "large deep brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250113/27a62bdbcdda7914bc651c4e72c0ed61.jpg",
    },
    {
      name: "large caramel brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250110/56327fb6bd76372d0898703273731c16.jpg",
    },
    {
      name: "large soft black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20250110/243a01de622c75c4dae01ce7c4ef5833.jpg",
    },
    {
      name: "large vanila",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260107/e48e492eb384ddb52d027da0032d7b95.jpg",
    },
  ],
  aro: [
    {
      name: "Vanilla",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260108/8a342a826f78e58114c30d45585d48d5.jpg",
    },
    {
      name: "Soft Black",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260108/624abcfbb7f642cd936f7a2064a8e57f.jpg",
    },
    {
      name: "Caramel Brown",
      image:
        "https://ecimg.cafe24img.com/pg1240b55797764052/bemyyeons2/web/product/big/20260108/434344dd70f977be3a0966f27a65f7fe.jpg",
    },
  ],
};

export const translations: Record<Language, TranslationSet> = {
  KO: {
    home: {
      header_subtitle: "Designed by Humans, for Humans",
      trust_score: "리뷰 평균 평점",
      trust_base: "전체 제품 588개 리뷰 평점 4.9점",
      product_all: "전체 제품",
      color_all: "모든 컬러",
      metrics: {
        trust: "만족도",
        avg_rating: "평균 평점",
        total_reviews: "총 리뷰",
        review_analysis: "리뷰 분석 데이터",
      },
      category_sat: "디테일 만족도",
      categories: {
        moisturizing: "내구성",
        texture: "수납력",
        longevity: "휴대성",
        price: "가격 만족도",
      },
      keywords: "실제 구매자 핵심 키워드",
      review_source: {
        mall: "자사몰",
        wadiz: "와디즈",
      },
      show_original: "원문 텍스트 보기",
      view_original: "리뷰 원문",
      shop_style: "제품 보러가기",
      view_product: "제품 보러가기",
      view_reviews: "전체 리뷰 보러가기",
      show_more: "키워드 더보기",
      show_less: "키워드 접기",
      more_keywords: "키워드 더보기",
      gallery_title: "제품 사진보기",
      ai_summary: "리뷰 3초 요약",
      view_photo: "포토 후기",
      trust_description: "실제 리뷰자 기반 AI 데이터 분석",
      highlight_1: "16인치 맥북도 거뜬한 수납력",
      highlight_2: "어깨가 안 아픈 경량 비건 레더",
      highlight_3: "와디즈 누적 펀딩 11억 돌파",
      product_search: "제품명 검색...",
      no_reviews: "리뷰를 찾을 수 없습니다",
      reset_filters: "필터 초기화",
      all_reviews_mall: "자사몰에서 전체 588개 리뷰 보기",
      viewed_all: "현재 {count}개의 아카이브를 확인했습니다.",
    },
    profile: {
      title: "마이 아카이브",
      welcome: "님, 안녕하세요!",
      recent_title: "최근 본 리뷰",
      liked_title: "좋아요 누른 리뷰",
      activity_stats: "나의 활동 통계",
      settings: "계정 설정",
      login_prompt: "로그인하고 나만의 아카이브를 즐겨보세요",
      no_activity: "아직 활동 내역이 없습니다",
      back: "뒤로",
      guest: "게스트 리비어",
      items: "개의 아이템",
      history: "히스토리",
      archiving: "아카이빙",
      benefits_title: "특별한 혜택",
      benefits_desc: "커뮤니티에 가입하고 개인화된 AI 리뷰 분석을 받아보세요.",
      join_now: "지금 가입하기",
    },
    data: {
      title: "리뷰 데이터 분석",
      subtitle: "제품별 펀딩 및 자사몰 리뷰 · AI 자동 분석",
      total_trust: "제품 만족도",
      monthly_title: "리뷰 유입 추이",
      heatmap_title: "리뷰 활동 히트맵 (최근 4주)",
      heatmap_legend: ["적음", "많음"],
      source_title: "리뷰 출처",
    },
    guide: {
      title: "브랜드 컨설턴트",
      subtitle: "비마이연 전문가와 1:1 상담",
      banner_text:
        "구매자의 92%가 가죽 질감과 가벼운 무게에 가장 큰 만족을 느꼈습니다. 전담 컨설턴트와의 상담으로 최적의 선택을 도와드립니다.",
      greeting:
        "안녕하세요, 비마이연 AI 어시스턴트입니다. 무엇이 궁금하실까요?",
      thinking: "...생각 중",
      ask_more: "추가 문의하기",
      session_ready: "실시간 세션 준비 완료",
      consult_action: "브랜드 상담 연결하기",
      status_ready: "Expert Consultant Ready →",
      show_more: "더 보기",
      show_less: "접기",
      instagram: "인스타그램",
      kakaotalk: "비마이연 채널톡",
      human_consult_prompt:
        "더 궁금한 점이 있으신가요? 1:1 브랜드 상담으로 연결해 드립니다.",
    },
    nav: {
      home: "홈",
      data: "데이터",
      wishlist: "원하는 제품",
      guide: "상담",
      profile: "마이",
      inquiry: "문의",
      request_product: "원하는 제품",
      compare: "비교",
      recommend: "추천",
    },
    wishlist: {
      title: "원하는 제품 제안하기",
      description:
        "비마이연에서 만나보고 싶은 제품이나 색상이 있다면 알려주세요. 여러분의 소중한 의견이 새로운 컬렉션의 시작이 됩니다.",
      placeholder:
        "예: 헨느백 실버 컬러가 나왔으면 좋겠어요! / 더 가벼운 미니백이 필요해요.",
      submit: "의견 보내기",
      success: "소중한 의견 감사합니다! 적극적으로 검토하겠습니다.",
    },
    dashboard: {
      insights_title: "고객 인사이트 대시보드",
      satisfaction_report: "만족도 분석 리포트",
      recent_comments: "최근 코멘트",
      live_sync: "실시간 클라우드 연동 중",
      ideas_tab: "고객 의견",
      metrics_avg: "만족 지표 (평균)",
      metrics_ideas: "데이터 수집 (의견)",
      no_data: "데이터가 없습니다",
      awaiting_input: "고객의 의견을 기다리고 있습니다...",
      delete_confirm: "정말 삭제하시겠습니까?",
      edit_fail: "수정에 실패했습니다.",
      delete_fail: "삭제에 실패했습니다.",
      no_content: "의견 내용이 없습니다.",
      rating_only: "별점 평가만 남겼습니다.",
    },
  },
  JA: {
    home: {
      header_subtitle: "Designed by Humans, for Humans",
      trust_score: "レビュー平均評価",
      trust_base: "全製品 588件のレビュー平均 4.9点",
      product_all: "全製品",
      color_all: "全カラー",
      metrics: {
        trust: "満足度",
        avg_rating: "平均評価",
        total_reviews: "総レビュー",
        review_analysis: "レビュー分析データ",
      },
      category_sat: "詳細満足度",
      categories: {
        moisturizing: "耐久性",
        texture: "収納力",
        longevity: "携帯性",
        price: "価格満足度",
      },
      keywords: "購入者の核心キーワード",
      review_source: {
        mall: "公式サイト",
        wadiz: "Wadiz",
      },
      show_original: "原文を見る ↓",
      view_original: "実際のレビューを見る",
      shop_style: "製品を見る",
      view_product: "製品を見る",
      view_reviews: "全レビューを見る",
      show_more: "もっと見る",
      show_less: "閉じる",
      more_keywords: "キーワードをもっと見る",
      gallery_title: "製品写真",
      ai_summary: "AI要約",
      view_photo: "写真を見る",
      trust_description: "実際のレビュアーに基づくAIデータ分析",
      highlight_1: "16インチMacBookも余裕の収納",
      highlight_2: "肩に負担のない軽量ヴィーガンレザー",
      highlight_3: "Wadiz累計ファンディング11億突破",
      product_search: "製品を検索...",
      no_reviews: "レビューが見つかりません",
      reset_filters: "フィルターをリセット",
      all_reviews_mall: "公式モールで全 588件のレビューを見る",
      viewed_all: "現在{count}件のアーカイブを確認しました。",
    },
    profile: {
      title: "マイアーカイブ",
      welcome: "様、こんにちは！",
      recent_title: "最近チェックしたレビュー",
      liked_title: "お気に入りレビュー",
      activity_stats: "アクティビティ統計",
      settings: "アカウント設定",
      login_prompt: "ログインして、あなただけのアーカイブをお楽しみください",
      no_activity: "まだアクティビティがありません",
      back: "戻る",
      guest: "ゲストレビュアー",
      items: "個のアイテム",
      history: "履歴",
      archiving: "アーカイブ",
      benefits_title: "特別特典",
      benefits_desc:
        "コミュニティに参加して、パーソナライズされたAI分析を利用しましょう。",
      join_now: "今すぐ登録",
    },
    data: {
      title: "レビューデータ分析",
      subtitle: "製品別のレビュー・AI自動分析",
      total_trust: "製品満足度",
      monthly_title: "レビュー流入推移",
      heatmap_title: "レビュー活動ヒートマップ (直近4週間)",
      heatmap_legend: ["少ない", "多い"],
      source_title: "レビューのソース",
    },
    guide: {
      title: "ブランドコンサルタント",
      subtitle: "弊社エキスパートとの1:1相談",
      banner_text:
        "購入者の92%がヴィーガンレザーの質感と軽さに最も満足しています。専任コンサルタントが最適な製品選びをお手伝いします。",
      greeting: "何かお手伝いできることはありますか？",
      thinking: "...考え中",
      ask_more: "さらにお問い合わせ",
      session_ready: "リアルタイムセッション準備完了",
      consult_action: "ブランド相談へ",
      status_ready: "Expert Consultant Ready →",
      show_more: "もっと見る",
      show_less: "閉じる",
      instagram: "インスタグラム (公式)",
      kakaotalk: "カカオトーク相談",
      human_consult_prompt:
        "さらに気になることはありますか？1:1ブランド相談をご案内します。",
    },
    nav: {
      home: "ホーム",
      data: "データ",
      wishlist: "ウィッシュリスト",
      guide: "案内",
      profile: "マイ",
      inquiry: "問い合わせ",
      request_product: "ウィッシュリスト",
      compare: "比較",
      recommend: "おすすめ",
    },
    wishlist: {
      title: "あなたの理想を聞かせてください。",
      description:
        "yyeonで出会いたい製品やカラーはありますか？皆様の何気ない一言から、新しいコレクションが生まれます。あなたの声をお待ちしています。",
      placeholder:
        "例：Henne Bagのシルバーカラーが欲しい！ / もっと軽くて使いやすいバッグが理想です。",
      submit: "リクエストを送る",
      success:
        "貴重なご意見ありがとうございます！皆様の声を大切に検討させていただきます。",
    },
    dashboard: {
      insights_title: "顧客インサイトダッシュボード",
      satisfaction_report: "満足度分析レポート",
      recent_comments: "最新のコメント",
      live_sync: "リアルタイム同期中",
      ideas_tab: "顧客の意見",
      metrics_avg: "満足度指標 (平均)",
      metrics_ideas: "データ収集 (意見)",
      no_data: "データがありません",
      awaiting_input: "顧客의 입력을 대기 중입니다...",
      delete_confirm: "本当に削除しますか？",
      edit_fail: "修正に失敗しました。",
      delete_fail: "削除に失敗しました。",
      no_content: "内容がありません。",
      rating_only: "評価のみ残されました。",
    },
  },
  EN: {
    home: {
      header_subtitle: "Designed by Humans, for Humans",
      trust_score: "Average Rating",
      trust_base: "4.9/5.0 based on 588 reviews",
      product_all: "All Products",
      color_all: "All Colors",
      metrics: {
        trust: "Satisfaction",
        avg_rating: "Avg Rating",
        total_reviews: "Total Reviews",
        review_analysis: "Review Analysis Data",
      },
      category_sat: "Detail Satisfaction",
      categories: {
        moisturizing: "Durability",
        texture: "Storage Capacity",
        longevity: "Portability",
        price: "Price Satisfaction",
      },
      keywords: "Key Buyer Insights",
      review_source: {
        mall: "Official Store",
        wadiz: "Wadiz",
      },
      show_original: "Show Original Text",
      view_original: "View Original Review",
      shop_style: "View Product",
      view_product: "View Product",
      view_reviews: "View All Reviews",
      show_more: "Show More",
      show_less: "Show Less",
      more_keywords: "More Keywords",
      gallery_title: "Product Photos",
      ai_summary: "3s AI Summary",
      view_photo: "Photo Reviews",
      trust_description: "AI Data Analysis Based on Actual Reviewers",
      highlight_1: "Fits 16-inch MacBook with ease",
      highlight_2: "Ultra-light vegan leather",
      highlight_3: "Over 1.1 billion KRW in Wadiz funding",
      product_search: "Search product...",
      no_reviews: "No reviews found",
      reset_filters: "Reset Filters",
      all_reviews_mall: "See all 588+ reviews on Mall",
      viewed_all: "You've viewed {count} featured archives.",
    },
    profile: {
      title: "My Archive",
      welcome: "Hello, !",
      recent_title: "Recently Viewed",
      liked_title: "Liked Reviews",
      activity_stats: "My Activity Stats",
      settings: "Account Settings",
      login_prompt: "Log in to enjoy your personalized archive",
      no_activity: "No activity yet",
      back: "Back",
      guest: "Guest Reviewer",
      items: "Items",
      history: "History",
      archiving: "Archiving",
      benefits_title: "Exclusive Benefits",
      benefits_desc:
        "Join our community and get access to personalized AI review insights.",
      join_now: "Join Now",
    },
    data: {
      title: "Review Data Insights",
      subtitle: "Product Reviews AI Analysis",
      total_trust: "Product Satisfaction",
      monthly_title: "Review Influx Trend",
      heatmap_title: "Review Activity Heatmap (Last 4 Weeks)",
      heatmap_legend: ["Low", "High"],
      source_title: "Review Source",
    },
    guide: {
      title: "Brand Consultant",
      subtitle: "1:1 Consultation with yyeon Experts",
      banner_text:
        "92% of buyers were most satisfied with the leather texture and light weight. Our dedicated consultant will help you make the best choice.",
      greeting: "How can I help you today?",
      thinking: "...Thinking",
      ask_more: "Ask more",
      session_ready: "Live session ready",
      consult_action: "Connect to Brand Consult",
      status_ready: "Expert Consultant Ready →",
      show_more: "Show More",
      show_less: "Show Less",
      instagram: "Instagram (Official)",
      kakaotalk: "KakaoTalk Channel",
      human_consult_prompt:
        "Have more questions? Connect with our 1:1 brand consultant.",
    },
    nav: {
      home: "Home",
      data: "Data",
      wishlist: "Wishlist",
      guide: "Guide",
      profile: "Profile",
      inquiry: "Inquiry",
      request_product: "Wishlist",
      compare: "Compare",
      recommend: "Recommend",
    },
    wishlist: {
      title: "Request a Product",
      description:
        "Let us know if there's a product or color you'd like to see from yyeon. Your valuable feedback starts our next collection.",
      placeholder:
        "e.g., I'd love to see the Henne Bag in Silver! / I need a lighter mini bag.",
      submit: "Send Feedback",
      success: "Thank you for your feedback! We'll review it carefully.",
    },
    dashboard: {
      insights_title: "Customer Insight Dashboard",
      satisfaction_report: "Satisfaction Analysis Report",
      recent_comments: "Recent Comments",
      live_sync: "Real-time Cloud Syncing",
      ideas_tab: "Customer Ideas",
      metrics_avg: "Satisfaction (Avg)",
      metrics_ideas: "Data Collection (Ideas)",
      no_data: "No data available",
      awaiting_input: "Awaiting customer input...",
      delete_confirm: "Are you sure you want to delete?",
      edit_fail: "Failed to edit.",
      delete_fail: "Failed to delete.",
      no_content: "No content provided.",
      rating_only: "Rating only provided.",
    },
  },
};

export function transformRawReviews(rawData: any[]): Review[] {
  return rawData.map((r) => {
    return {
      id: r.id,
      rating: r.rating || 5,
      source: r.source === "와디즈" ? "와디즈" : "자사몰",
      sourceUrl:
        r.sourceUrl ||
        (r.source === "와디즈"
          ? "https://www.wadiz.kr/web/campaign/detail/172281"
          : "https://yyeon.kr/article/%EC%A0%9C%ED%92%88%ED%9B%84%EA%B8%B0/4/"),
      product: r.product || "YYEON Product",
      color: r.color || "Standard",
      productImage: r.productImage || "",
      author: {
        KO: typeof r.author === "string" ? r.author : (r.author?.KO || ""),
        JA: typeof r.author === "string" ? r.author : (r.author?.JA || r.author?.KO || ""),
        EN: typeof r.author === "string" ? r.author : (r.author?.EN || r.author?.KO || ""),
      },
      city: {
        KO: "한국",
        JA: "韓国",
        EN: "Korea",
      },
      text: {
        KO: r.text?.KO || "",
        JA: r.text?.JA || "",
        EN: r.text?.EN || "",
      },
      summary: { KO: "", JA: "", EN: "" },
      tags: { KO: [], JA: [], EN: [] },
      images: r.images || [],
    };
  });
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: {
      KO: "배송은 얼마나 걸리나요?",
      JA: "配送期間は？",
      EN: "How long does shipping take?",
    },
    answer: {
      KO: "주문 후 평균 2~3일 이내에 출고되며, 배송에는 1~2일 추가 소요됩니다. 예약 구매 상품의 경우 상세 페이지의 일정을 확인해 주세요.",
      JA: "注文後平均2〜3日以内に出荷され、配送にはさらに1〜2日かかります。",
      EN: "Orders typically ship within 2-3 business days, with another 1-2 days for delivery.",
    },
  },
  {
    id: 2,
    question: {
      KO: "교환 및 반품 규정이 궁금해요.",
      JA: "交換・返品について",
      EN: "Exchange & Refund Policy",
    },
    answer: {
      KO: "상품 수령 후 7일 이내에 신청 가능합니다. 상품 가치가 훼손되지 않은 상태에서만 처리가 가능하니 유의해 주세요.",
      JA: "商品到着後7日以内に申請可能です。未使用の状態に限ります。",
      EN: "You can request an exchange or refund within 7 days of receipt, provided the item is unused.",
    },
  },
  {
    id: 3,
    question: {
      KO: "비건 레더 관리는 어떻게 하나요?",
      JA: "ヴィーガンレザーの管理",
      EN: "Vegan Leather Care",
    },
    answer: {
      KO: "오염 시 마른 헝겊이나 물티슈로 가볍게 닦아주세요. 열기나 직사광선을 피해 통풍이 잘 되는 곳에 보관하는 것이 좋습니다.",
      JA: "汚れた場合は乾いた布やウェットティッシュで軽く拭기取ってください。",
      EN: "Simply wipe with a dry cloth or wet wipe. Avoid direct sunlight and store in a ventilated area.",
    },
  },
  {
    id: 4,
    question: {
      KO: "회원 가입 혜택이 있나요?",
      JA: "会員登録の特典",
      EN: "Membership Benefits",
    },
    answer: {
      KO: "신규 가입 시 즉시 사용 가능한 웰컴 쿠폰과 구매 금액에 따른 적립금 혜택을 드립니다.",
      JA: "新規登録時にウェルカムクーポンとポイント特典を差し上げます。",
      EN: "New members get a welcome coupon and earn points on every purchase.",
    },
  },
  {
    id: 5,
    question: {
      KO: "14인치 노트북 수납이 가능한가요?",
      JA: "14インチPC収納",
      EN: "14-inch Laptop Fit",
    },
    answer: {
      KO: "헨느 라지, 오브백 등 노트북 전용 수납 칸이 있는 모델은 14~16인치까지 안정적으로 수납 가능합니다.",
      JA: "Henne LargeやAube Bagなどのモデルは14〜16インチまで収納可能です。",
      EN: "Models like Henne Large and Aube Bag fit 14-16 inch laptops securely.",
    },
  },
];
