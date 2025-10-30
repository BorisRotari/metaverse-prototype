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
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-medium">Friends</span>
          </div>
        </button>
      </Link>
      <Link href="/app/shop">
        <button className={`w-full px-4 py-2.5 rounded-lg text-left transition-colors ${
          isActive('/app/shop')
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/80'
        }`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-sm font-medium">Shop</span>
          </div>
        </button>
      </Link>
      <Link href="/app/quests">
        <button className={`w-full px-4 py-2.5 rounded-lg text-left transition-colors ${
          isActive('/app/quests')
            ? 'bg-white/20 text-white'
            : 'hover:bg-white/10 text-white/80'
        }`}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-medium">Quests</span>
          </div>
        </button>
      </Link>
    </div>
  );
}

