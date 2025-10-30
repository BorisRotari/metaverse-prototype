"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";

export default function DMNavigation() {
  const pathname = usePathname();
  const { isDark } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="p-3 space-y-1 border-b border-white/20">
      <Link href="/app/friends">
        <button className={`w-full px-4 py-2.5 rounded-lg text-left transition-colors ${
          isActive('/app/friends')
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/80'
        }`}>
          👥 Friends
        </button>
      </Link>
      <Link href="/app/shop">
        <button className={`w-full px-4 py-2.5 rounded-lg text-left transition-colors ${
          isActive('/app/shop')
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/80'
        }`}>
          🛍️ Shop
        </button>
      </Link>
      <Link href="/app/quests">
        <button className={`w-full px-4 py-2.5 rounded-lg text-left transition-colors ${
          isActive('/app/quests')
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/80'
        }`}>
          🎯 Quests
        </button>
      </Link>
    </div>
  );
}

