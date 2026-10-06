import React from "react";
import { Trophy, Heart, User } from "lucide-react";
import { Language } from "../types";
import { homeFont } from "./HomeTiles";

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
  onProfile,
}: {
  activeTab: string;
  t: any;
  lang: Language;
  onHome: () => void;
  onCompare: () => void;
  onWishlist: () => void;
  onProfile: () => void;
}) {
  return (
    <nav
      className="absolute left-4 right-4 z-50 rounded-[26px] bg-[#F1E6C6] grid grid-cols-4 pt-2 px-2 pb-1.5"
      style={{ bottom: "calc(14px + env(safe-area-inset-bottom, 0px))", fontFamily: homeFont(lang) }}
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
      <TabButton
        active={activeTab === "profile"}
        onClick={onProfile}
        icon={<User {...ICON_PROPS} />}
        label={t.nav.profile}
      />
    </nav>
  );
}
