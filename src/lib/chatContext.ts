// Builds the review/spec/storage-capacity context block that gets sent to
// the Gemini chat route for a given user question, so the model only has
// to answer from data we actually hand it (see server.ts systemInstruction).
import Fuse from "fuse.js";
import { CATEGORIES, CategoryDef, normalizeProduct } from "./categories";
import { BAG_DATA, COMPARE_TABLE_DATA } from "../data/bagComparison";

export interface ReviewLike {
  id: number;
  rating: number;
  product: string;
  color?: string;
  text: { KO: string; JA: string; EN: string };
}

interface BagCompareEntry {
  id: string;
  name: { KO: string; JA: string; EN: string };
  type: { KO: string; JA: string; EN: string };
  colors: { KO: string[]; JA: string[]; EN: string[] };
  weight: string;
  material: { KO: string; JA: string; EN: string };
  lock: { KO: string; JA: string; EN: string };
  feature: { KO: string; JA: string; EN: string };
}

const REVIEW_LIMIT = 25;

function categoryAliases(cat: CategoryDef): string[] {
  return [
    cat.id,
    cat.fullName,
    cat.names.KO,
    cat.names.JA,
    cat.names.EN,
    ...cat.matchKeywords,
  ].map((a) => a.toLowerCase());
}

// Flattened once at module load: every (keyword, category) pair, used for
// the exact-match pass.
const KEYWORD_ENTRIES: { keyword: string; category: CategoryDef }[] =
  CATEGORIES.flatMap((cat) =>
    categoryAliases(cat).map((keyword) => ({ keyword, category: cat })),
  );

// Same, but with short keywords dropped when a longer keyword of the same
// category already contains them (e.g. "aro" is a substring of "aro bag";
// "アロ" is a substring of "アロバッグ"). Short brand-only fragments like
// these are the main source of fuzzy false positives against unrelated
// words that merely start the same way ("who ARE you" ~ "aro", "アロマ"(
// aroma) ~ "アロ", "ブルース"(blues) ~ "ブルーミング"). The longer keyword
// already covers real typos of the same product just as well (verified:
// "アロパッグ" still fuzzy-matches via "アロバッグ"), so dropping the
// fragment costs no real match coverage.
const FUZZY_KEYWORD_ENTRIES = KEYWORD_ENTRIES.filter((entry) => {
  const sameCategory = KEYWORD_ENTRIES.filter(
    (e) => e.category === entry.category && e.keyword !== entry.keyword,
  );
  const isRedundantFragment = sameCategory.some(
    (other) =>
      other.keyword.length > entry.keyword.length &&
      other.keyword.includes(entry.keyword),
  );
  return !isRedundantFragment;
});

// Below this Fuse score (0 = perfect match, 1 = no match) a fuzzy hit is
// trusted; above it, we'd rather fall back to "no category matched" than
// risk answering about the wrong product. Tuned against real typo/mismatch
// test cases: 0.4 catches single-character typos (KO/EN) and JA chōon/
// dakuten slips, while still rejecting unrelated questions.
const FUZZY_THRESHOLD = 0.55;
// Skip fuzzy-searching keywords shorter than this — too short to mean
// anything on their own (this only gates which keywords we try, separate
// from Fuse's own internal match-quality gating below).
const MIN_KEYWORD_LEN = 2;

/** Fuzzy fallback for typo'd questions ("오프백", "ヘンヌバック", ...).
 * Searches the user's message (as the indexed text) for an approximate
 * occurrence of each known keyword (as the search pattern) — the right way
 * around for Fuse's Bitap matcher, since keywords are short and the message
 * is the longer haystack. */
function fuzzyMatchCategory(query: string): CategoryDef | null {
  const low = query.toLowerCase();
  // threshold: 1 disables Fuse's own accept/reject filtering (it doesn't
  // reliably exclude poor matches on a single-item corpus) — we do the
  // score check ourselves below instead, explicitly. minMatchCharLength: 1
  // (not MIN_KEYWORD_LEN) — Fuse's own gate requires a *contiguous* run of
  // that many matching characters, which a middle-of-word typo in a 3-char
  // keyword (e.g. "오브백" -> "오프백") breaks into single-character runs,
  // silently dropping the candidate before it's even scored.
  const fuse = new Fuse([{ text: low }], {
    keys: ["text"],
    includeScore: true,
    ignoreLocation: true,
    distance: Math.max(low.length, 50),
    threshold: 1,
    minMatchCharLength: 1,
  });

  let best: { score: number; category: CategoryDef } | null = null;
  for (const entry of FUZZY_KEYWORD_ENTRIES) {
    if (entry.keyword.length < MIN_KEYWORD_LEN) continue;
    const results = fuse.search(entry.keyword);
    const score = results[0]?.score;
    if (score === undefined || score > FUZZY_THRESHOLD) continue;
    if (!best || score < best.score) {
      best = { score, category: entry.category };
    }
  }

  return best ? best.category : null;
}

/** Finds the category a free-text question is most likely about: first by
 * exact substring match against each category's id/fullName/matchKeywords/
 * localized names, then — only if that fails — by typo-tolerant fuzzy match. */
export function matchCategoryFromQuery(query: string): CategoryDef | null {
  const low = query.toLowerCase();
  for (const cat of CATEGORIES) {
    if (categoryAliases(cat).some((a) => low.includes(a))) return cat;
  }
  return fuzzyMatchCategory(query);
}

function getFilteredReviews(
  reviews: ReviewLike[],
  fullName: string,
): ReviewLike[] {
  return reviews
    .filter((r) => normalizeProduct(r.product) === fullName)
    .sort((a, b) => b.rating - a.rating || b.id - a.id)
    .slice(0, REVIEW_LIMIT);
}

function getSpecs(bagCompare: { bags: BagCompareEntry[] }, categoryId: string) {
  return bagCompare.bags.filter((b) => b.id.startsWith(categoryId));
}

function getStorageInfo(category: CategoryDef) {
  const needle = category.id.toLowerCase();
  const tableRows = COMPARE_TABLE_DATA.filter((row) =>
    row.name.toLowerCase().includes(needle),
  );
  const checklists = BAG_DATA.filter((b) => b.id === category.fullName);
  return { tableRows, checklists };
}

export interface ChatContextResult {
  text: string;
  /** True when the SPECS section actually contains matched spec entries
   * (not the "No spec data available" placeholder) — lets the caller decide
   * whether to append a "see the Compare tab" notice. */
  hasSpecs: boolean;
}

/** Renders the merged review/spec/storage context as plain text for the
 * model prompt, in the given response language. Returns null when the
 * question doesn't match any known product category. */
export function buildChatContext(
  query: string,
  reviews: ReviewLike[],
  bagCompare: { bags: BagCompareEntry[] },
  lang: "KO" | "JA" | "EN" = "KO",
): ChatContextResult | null {
  const category = matchCategoryFromQuery(query);
  if (!category) return null;

  const matchedReviews = getFilteredReviews(reviews, category.fullName);
  const specs = getSpecs(bagCompare, category.id);
  const { tableRows, checklists } = getStorageInfo(category);

  const parts: string[] = [];
  parts.push(`### PRODUCT: ${category.fullName} (${category.names[lang]})`);

  if (matchedReviews.length > 0) {
    parts.push(`\n[REVIEWS] (${matchedReviews.length}, sorted by rating/recency)`);
    for (const r of matchedReviews) {
      const text = (r.text[lang] || r.text.KO || "").replace(/\s+/g, " ").slice(0, 300);
      parts.push(`- rating=${r.rating}/5, color=${r.color || "n/a"}: "${text}"`);
    }
  } else {
    parts.push(`\n[REVIEWS] No reviews found for this product.`);
  }

  if (specs.length > 0) {
    parts.push(`\n[SPECS]`);
    for (const s of specs) {
      parts.push(
        `- ${s.name[lang]}: weight=${s.weight}, material=${s.material[lang]}, lock=${s.lock[lang]}, feature=${s.feature[lang]}, colors=${s.colors[lang]?.join(", ")}`,
      );
    }
  } else {
    parts.push(`\n[SPECS] No spec data available for this product yet.`);
  }

  if (tableRows.length > 0 || checklists.length > 0) {
    parts.push(`\n[STORAGE CAPACITY]`);
    for (const row of tableRows) {
      const s = row.specs;
      parts.push(
        `- ${row.name}: laptop=${s.notebook ? "O" : "X"}, ipad=${s.ipad ? "O" : "X"}, tumbler=${s.tumbler ? "O" : "X"}, books=${s.books ? "O" : "X"}, lipstick=${s.lipstick ? "O" : "X"}`,
      );
    }
    for (const bag of checklists) {
      for (const item of bag.checklist) {
        parts.push(
          `- ${bag.name} / ${item.item[lang]}: ${item.possible ? "O" : "X"} (${item.detail[lang]})`,
        );
      }
    }
  } else {
    parts.push(`\n[STORAGE CAPACITY] No storage capacity data available for this product yet.`);
  }

  return { text: parts.join("\n"), hasSpecs: specs.length > 0 };
}
