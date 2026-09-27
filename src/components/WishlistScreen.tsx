import { motion } from "motion/react";
import { Heart, Send } from "lucide-react";
import { Language } from "../types";

const GOOGLE_FORM_URL = "https://forms.gle/uZwXLmGAc2jhJbKGA";

export function WishlistScreen({
  t,
  lang,
}: {
  key?: string;
  t: any;
  lang: Language;
}) {
  const bodySentences: string[] = t.wishlist.description
    .split("\n")
    .filter(Boolean);
  const bodyTextClass = lang === "KO" ? "text-[13px]" : "text-[10px]";
  const pillTextClass = lang === "JA" ? "text-[9px]" : "text-[12px]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="px-6 py-2 h-full flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Heart size={28} className="text-brand-primary" fill="currentColor" />
        </div>
        <h1 className="text-xl font-serif text-brand-primary">
          {t.wishlist.title}
        </h1>
        <div className="mt-3 -mx-2 text-gray-500 font-medium">
          {bodySentences.map((sentence, idx) => (
            <p
              key={idx}
              className={`${bodyTextClass} leading-6 break-keep`}
            >
              {sentence}
            </p>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center space-x-1 px-3 py-2 rounded-full bg-brand-primary/10 whitespace-nowrap">
          <span className="shrink-0">🎁</span>
          <span className={`${pillTextClass} text-brand-primary font-bold`}>
            {t.wishlist.gift_note}
          </span>
        </div>

        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 w-full py-4 bg-gray-900 text-white rounded-full font-black text-xs shadow-xl shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
        >
          <span>{t.wishlist.cta}</span>
          <Send size={14} className="text-brand-primary" />
        </a>
      </div>

      <div className="mt-8 mb-4 text-center opacity-30">
        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.4em]">
          Community Driven Design
        </p>
      </div>
    </motion.div>
  );
}
