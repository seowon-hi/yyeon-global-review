import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Instagram, MessageCircle } from "lucide-react";
import { faqs } from "../translations";
import { Language, FAQ } from "../types";

export function GuideScreen({
  t,
  currentLang,
}: {
  key?: string;
  t: any;
  currentLang: Language;
}) {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([{ role: "bot", text: t.guide.greeting }]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFaqClick = (faq: FAQ) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: faq.question[currentLang] },
      { role: "bot", text: faq.answer[currentLang] },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white pb-20 overflow-hidden"
    >
      <header className="px-6 pt-10 pb-6 border-b border-gray-100 shrink-0 bg-white sticky top-0 z-40 shadow-sm mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white shrink-0 shadow-lg shadow-gray-200">
            <Sparkles size={16} />
          </div>
          <div>
            <h1 className="text-lg font-serif italic text-gray-900 leading-none">
              yyeon Concierge
            </h1>
            <p className="text-[8px] text-brand-primary font-black uppercase tracking-[0.2em] mt-1.5">
              {t.guide.subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[#FAF9F6]/50"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-5 py-3.5 rounded-[1.8rem] text-[12px] leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-gray-900 text-white font-medium rounded-br-none"
                  : "bg-white text-gray-800 font-medium border border-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fixed Options Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="mb-4 overflow-x-auto no-scrollbar flex space-x-2 pb-1">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => handleFaqClick(faq)}
              className="px-4 py-2 bg-[#FAF9F6] border border-gray-200 rounded-full text-[10px] font-bold text-gray-600 whitespace-nowrap hover:bg-gray-100 hover:border-gray-300 transition-all active:scale-95 transition-all"
            >
              {faq.question[currentLang]}
            </button>
          ))}
        </div>

        {/* Brand Channels - High Visibility */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          <a
            href="https://www.instagram.com/yyeon.kr/"
            target="_blank"
            className="flex items-center justify-center space-x-2 py-3 bg-[#F5F5F3] border border-gray-100 rounded-2xl hover:bg-white hover:border-brand-primary group transition-all"
          >
            <Instagram
              size={14}
              className="text-gray-400 group-hover:text-brand-primary"
            />
            <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">
              {t.guide.instagram}
            </span>
          </a>
          <a
            href="https://pf.kakao.com/_xaKkVG"
            target="_blank"
            className="flex items-center justify-center space-x-2 py-3 bg-[#FEE500] border border-[#FEE500] rounded-2xl hover:shadow-lg transition-all"
          >
            <MessageCircle size={14} className="text-gray-900" />
            <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">
              {t.guide.kakaotalk}
            </span>
          </a>
        </div>
        <p className="text-center text-[7px] text-gray-300 mt-2 font-black uppercase tracking-[0.2em]">
          {t.guide.human_consult_prompt}
        </p>
      </div>
    </motion.div>
  );
}
