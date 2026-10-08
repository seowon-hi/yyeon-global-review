import React from "react";
import { Trophy, Heart } from "lucide-react";
import { Language } from "../types";
import { homeFont } from "./HomeTiles";
import { useHomeScale } from "../lib/homeScale";

const ICON_PROPS = { size: 18, strokeWidth: 1.1 } as const;

export function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className="flex flex-col items-center justify-start min-h-[44px] gap-1 active:opacity-70 transition-opacity"
    >
      <span
        className={`w-[38px] h-[38px] rounded-[11px] flex items-center justify-center ${
          active ? "bg-[#9FB1DC] text-[#FBF3DC]" : "bg-[#FFFDF6] border border-[#DDD4C2] text-[#22262D]"
        }`}
      >
        {icon}
      </span>
      <span
        className={`text-[10px] leading-tight ${active ? "text-[#44568C] font-medium" : "text-[#4A4E56] font-normal"}`}
      >
        {label}
      </span>
    </button>
  );
}

export function BottomNav({
  activeTab,
  t,
  lang,
  onHome,
  onCompare,
  onWishlist,
}: {
  activeTab: string;
  t: any;
  lang: Language;
  onHome: () => void;
  onCompare: () => void;
  onWishlist: () => void;
}) {
  const scale = useHomeScale();
  return (
    <nav
      className="absolute z-50 rounded-[26px] grid grid-cols-3 pt-2 px-2 pb-1.5 border border-white/70"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc((100% - var(--screen-gutter) * 2) * var(--home-scale, 1))",
        bottom: "calc(14px + env(safe-area-inset-bottom, 0px))",
        fontFamily: homeFont(lang),
        ["--home-scale" as string]: scale,
        background: "rgba(var(--app-bg-rgb), 0.6)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        boxShadow: "0 8px 24px rgba(34,38,45,0.10)",
      }}
    >
      <TabButton
        active={activeTab === "home"}
        onClick={onHome}
        icon={<span className="font-serif italic text-[20px] leading-none -mt-0.5">y,</span>}
        label={t.nav.home}
      />
      <TabButton
        active={activeTab === "compare"}
        onClick={onCompare}
        icon={<Trophy {...ICON_PROPS} />}
        label={t.nav.compare || "비교"}
      />
      <TabButton
        active={activeTab === "wishlist"}
        onClick={onWishlist}
        icon={<Heart {...ICON_PROPS} />}
        label={t.nav.wishlist}
      />
    </nav>
  );
}
