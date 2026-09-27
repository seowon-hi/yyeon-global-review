// Single source of truth for bag/product categories.
// Add a new category here and it will flow through normalizeProduct(),
// the home screen category tiles, the review-analysis tabs, and the
// per-category mall links.

export interface CategoryDef {
  /** stable internal key, also used as the review-analysis dashboard key */
  id: string;
  /** canonical display name reviews are normalized to, e.g. "Blooming bag" */
  fullName: string;
  /** lowercase substrings matched against a raw review `product` field */
  matchKeywords: string[];
  icon: string;
  desc: string;
  /** yyeon.kr cate_no for the "view on official store" link; null until known */
  cateNo: string | null;
  names: {
    KO: string;
    JA: string;
    EN: string;
  };
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "blooming",
    fullName: "Blooming bag",
    // "ブルーミング" is how JA reviews actually refer to this bag
    // (verified against yyeon_reviews_final.json).
    matchKeywords: ["blooming", "ブルーミング", "ブルーミングバッグ"],
    icon: "🌸",
    desc: "Floral & Chic",
    cateNo: "27",
    names: { KO: "블루밍백", JA: "ブルーミングバッグ", EN: "Blooming bag" },
  },
  {
    id: "henne",
    fullName: "Henne bag",
    matchKeywords: ["henne", "ヘンヌ", "ヘンヌバッグ"],
    icon: "👜",
    desc: "Classic & Clean",
    cateNo: "25",
    names: { KO: "헨느백", JA: "ヘンヌバッグ", EN: "Henne bag" },
  },
  {
    id: "aro",
    fullName: "Aro bag",
    // "are" and bare "アロ" were removed from here: both are common words
    // in their language ("what ARE your hours", "アロマ"/aroma) and matched
    // on exact-substring alone — the fuzzy fallback in chatContext.ts now
    // handles legitimate typos of "aro"/"アロバッグ" without needing them.
    matchKeywords: ["aro", "アロバッグ"],
    icon: "🎒",
    desc: "Daily & Mini",
    cateNo: "46",
    names: { KO: "아로백", JA: "アロバッグ", EN: "Aro bag" },
  },
  {
    id: "mellow",
    fullName: "Mellow bag",
    matchKeywords: ["mellow", "メロウ", "メロウバッグ"],
    icon: "☁️",
    desc: "Supple & Soft",
    cateNo: "28",
    names: { KO: "멜로우백", JA: "メロウバッグ", EN: "Mellow bag" },
  },
  {
    id: "aube",
    fullName: "Aube bag",
    // "オーブ" / "オーブバッグ" / "オーブラージ" (= Aube Large) are the
    // forms actually used in JA reviews.
    matchKeywords: ["aube", "オーブ", "オーブバッグ", "オーブラージ"],
    icon: "✨",
    desc: "New & Refined",
    cateNo: "47",
    names: { KO: "오브백", JA: "オーブバッグ", EN: "Aube bag" },
  },
  {
    id: "accessories",
    fullName: "Accessories",
    // Reviews almost never say "アクセサリー" for this product — they call
    // it "ハートホルダー" (heart holder) or "ハート型", so those are the
    // keywords that actually match real questions. Bare "ハート"/"ホルダー"
    // are excluded: they show up constantly in unrelated bag reviews too
    // (general praise, or a bag's card/drink holder pocket).
    matchKeywords: [
      "heart holder",
      "accessory",
      "accessories",
      "ハートホルダー",
      "ハート型",
      "アクセサリー",
    ],
    icon: "👛",
    desc: "Charms & Extras",
    cateNo: "45",
    names: { KO: "액세서리", JA: "アクセサリー", EN: "Accessories" },
  },
];

/** All canonical category display names, e.g. ["Blooming bag", "Henne bag", ...] */
export const CATEGORY_FULL_NAMES = CATEGORIES.map((c) => c.fullName);

/** Category tiles for the home screen ("Bag Category Section"). */
export const MAIN_CATEGORIES = CATEGORIES.map((c) => ({
  id: c.id,
  name: c.fullName.replace(" bag", ""),
  icon: c.icon,
  desc: c.desc,
  fullName: c.fullName,
}));

/** Tabs for the review-analysis dashboard. */
export const PRODUCT_LIST = CATEGORIES.map((c) => ({
  key: c.id,
  KO: c.names.KO,
  JA: c.names.JA,
  EN: c.names.EN,
}));

export function getCategoryById(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByFullName(
  fullName: string,
): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.fullName === fullName);
}

/**
 * Maps a raw review `product` string (e.g. "Aube Bag Large") to its
 * canonical category fullName (e.g. "Aube bag"), or null if it doesn't
 * belong to any known category.
 */
export function normalizeProduct(rawProductName: string): string | null {
  const low = (rawProductName || "").toLowerCase();
  const match = CATEGORIES.find((c) =>
    c.matchKeywords.some((kw) => low.includes(kw)),
  );
  return match ? match.fullName : null;
}

/**
 * Link to use for a category's "view product" action.
 * Prefers the official category page (cateNo); only falls back to the
 * review's own sourceUrl when no cateNo is known, and finally to the
 * storefront root when neither is available.
 */
export function getBagProductUrl(fullName: string, sourceUrl?: string): string {
  const category = getCategoryByFullName(fullName);
  if (category?.cateNo) {
    return `https://yyeon.kr/product/list.html?cate_no=${category.cateNo}`;
  }
  return sourceUrl || "https://yyeon.kr";
}
