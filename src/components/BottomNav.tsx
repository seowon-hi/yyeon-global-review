import React from "react";
import { Home, Trophy, Heart } from "lucide-react";

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
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 transition-colors ${active ? "text-brand-primary" : "text-gray-400"}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export function BottomNav({
  activeTab,
  t,
  onHome,
  onCompare,
  onWishlist,
  onProfile,
}: {
  activeTab: string;
  t: any;
  onHome: () => void;
  onCompare: () => void;
  onWishlist: () => void;
  onProfile: () => void;
}) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 flex items-center justify-around z-50 px-2 rounded-b-[32px]">
      <TabButton
        active={activeTab === "home"}
        onClick={onHome}
        icon={<Home size={18} />}
        label={t.nav.home}
      />
      <TabButton
        active={activeTab === "compare"}
        onClick={onCompare}
        icon={<Trophy size={18} />}
        label={t.nav.compare || "비교"}
      />
      <TabButton
        active={activeTab === "wishlist"}
        onClick={onWishlist}
        icon={<Heart size={18} />}
        label={t.nav.wishlist}
      />
      <TabButton
        active={activeTab === "profile"}
        onClick={onProfile}
        icon={
          <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center overflow-hidden">
            <div className="w-2 h-2 bg-current rounded-full" />
          </div>
        }
        label={t.nav.profile}
      />
    </nav>
  );
}
