import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Instagram, MessageCircle, Send, Loader2 } from "lucide-react";
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
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const handleFaqClick = (faq: FAQ) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: faq.question[currentLang] },
      { role: "bot", text: faq.answer[currentLang] },
    ]);
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || isSending) return;

    // messages[0] is always the bot's canned greeting, never something the
    // model actually generated — drop any leading bot turns before converting
    // to OpenAI-style {role, content} history.
    const firstUserIdx = messages.findIndex((m) => m.role === "user");
    const historySource = firstUserIdx === -1 ? [] : messages.slice(firstUserIdx);
    const history = historySource.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history, lang: currentLang }),
      });
      if (res.status === 429) {
        setMessages((prev) => [...prev, { role: "bot", text: t.guide.chat_rate_limited }]);
        return;
      }
      if (!res.ok) throw new Error("chat request failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.text }]);
    } catch (error) {
      console.error("Chat request failed:", error);
      setMessages((prev) => [...prev, { role: "bot", text: t.guide.chat_error }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white overflow-hidden"
    >
      <header className="px-5 pt-10 pb-6 border-b border-gray-100 shrink-0 bg-white sticky top-0 z-40 shadow-sm mb-4">
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
        className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-scrollbar bg-[#FAF9F6]/50"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90%] px-5 py-3.5 rounded-[1.8rem] text-[12px] leading-relaxed shadow-sm whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-gray-900 text-white font-medium rounded-br-none"
                  : "bg-white text-gray-800 font-medium border border-gray-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isSending && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[90%] px-5 py-3.5 rounded-[1.8rem] rounded-bl-none text-[12px] leading-relaxed shadow-sm bg-white text-gray-400 font-medium border border-gray-100 flex items-center space-x-2">
              <Loader2 size={12} className="animate-spin" />
              <span>{t.guide.thinking}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Options Area */}
      <div className="px-5 py-4 bg-white border-t border-gray-100 shrink-0">
        <div className="mb-3 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.guide.chat_placeholder}
            disabled={isSending}
            className="flex-1 px-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded-full text-[12px] text-gray-800 focus:outline-none focus:border-brand-primary placeholder:text-gray-300 disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={isSending || !input.trim()}
            className="w-11 h-11 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
            aria-label={t.guide.chat_send}
          >
            <Send size={14} />
          </button>
        </div>

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
