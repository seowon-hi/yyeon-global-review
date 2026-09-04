export type Language = 'JA' | 'KO' | 'EN';

export interface TranslationSet {
  home: {
    header_subtitle: string;
    trust_score: string;
    trust_base: string;
    product_all: string;
    color_all: string;
    metrics: {
      trust: string;
      avg_rating: string;
      total_reviews: string;
      review_analysis: string;
    };
    category_sat: string;
    categories: {
      moisturizing: string;
      texture: string;
      longevity: string;
      price: string;
    };
    keywords: string;
    review_source: {
      mall: string;
      wadiz: string;
    };
    show_original: string;
    view_original: string;
    shop_style: string;
    view_product: string;
    view_reviews: string;
    show_more: string;
    show_less: string;
    more_keywords: string;
    gallery_title: string;
    ai_summary: string;
    view_photo: string;
    trust_description: string;
    highlight_1: string;
    highlight_2: string;
    highlight_3: string;
    product_search: string;
    no_reviews: string;
    reset_filters: string;
    all_reviews_mall: string;
    viewed_all: string;
  };
  data: {
    title: string;
    subtitle: string;
    total_trust: string;
    monthly_title: string;
    heatmap_title: string;
    heatmap_legend: [string, string];
    source_title: string;
  };
  guide: {
    title: string;
    subtitle: string;
    banner_text: string;
    greeting: string;
    thinking: string;
    ask_more: string;
    session_ready: string;
    consult_action: string;
    status_ready: string;
    show_more: string;
    show_less: string;
    instagram: string;
    kakaotalk: string;
    human_consult_prompt: string;
  };
  nav: {
    home: string;
    data: string;
    wishlist: string;
    guide: string;
    profile: string;
    inquiry: string;
    request_product: string;
    compare?: string;
    recommend?: string;
  };
  profile: {
    title: string;
    welcome: string;
    recent_title: string;
    liked_title: string;
    activity_stats: string;
    settings: string;
    login_prompt: string;
    no_activity: string;
    back: string;
    guest: string;
    items: string;
    history: string;
    archiving: string;
    benefits_title: string;
    benefits_desc: string;
    join_now: string;
  };
  wishlist: {
    title: string;
    description: string;
    placeholder: string;
    submit: string;
    success: string;
  };
  dashboard: {
    insights_title: string;
    satisfaction_report: string;
    recent_comments: string;
    live_sync: string;
    ideas_tab: string;
    metrics_avg: string;
    metrics_ideas: string;
    no_data: string;
    awaiting_input: string;
    delete_confirm: string;
    edit_fail: string;
    delete_fail: string;
    no_content: string;
    rating_only: string;
  };
}

export interface Product {
  id: number;
  category: string;
  name: string;
  color: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  emoji: string;
  createdAt: string;
  popularity: number;
}

export interface Review {
  id: number;
  productId?: number;
  user?: string;
  date?: string;
  rating: number;
  source: '자사몰' | '와디즈';
  sourceUrl: string;
  product: string;
  color: string;
  productImage: string;
  author: Record<Language, string>;
  city: Record<Language, string>;
  text: Record<Language, string>;
  summary: Record<Language, string>;
  tags: Record<Language, string[]>;
  images: string[];
}

export interface FAQ {
  id: number;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}
