"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";
import ServerHeader from "../components/ServerHeader";
import DMNavigation from "../components/DMNavigation";
import ProfileButton from "../components/ProfileButton";
import { CHANNEL_IDS } from "../../data/mockChannelData";

export default function ShopPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests');
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;

  const shopItems = [
    { id: 1, name: "Virtual Coin Pack", price: "$9.99", icon: "🪙", description: "100 Virtual Coins" },
    { id: 2, name: "Premium Avatar", price: "$4.99", icon: "🎨", description: "Exclusive avatar collection" },
    { id: 3, name: "Custom Theme", price: "$2.99", icon: "🌈", description: "Personalize your space" },
    { id: 4, name: "Skill Booster", price: "$14.99", icon: "⚡", description: "Level up faster" },
  ];

  return (
    <>
      {/* Dark Overlay - Show when menu is open on mobile */}
      {showMobileMenu && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}

      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-[60] backdrop-blur-md border-b ${isDark ? 'bg-gray-900/60 border-white/20' : 'bg-white/80 border-gray-300'} ${showMobileMenu ? 'pointer-events-none' : ''}`}>
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`w-10 h-10 backdrop-blur-md rounded-lg flex items-center justify-center transition-all duration-200 border pointer-events-auto ${
              isDark 
                ? 'bg-white/20 hover:bg-white/30 border-white/30' 
                : 'bg-white/40 hover:bg-white/60 border-white/30'
            }`}
          >
            <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <span className={`font-bold text-base drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Shop</span>
          
          <div className="w-10"></div>
        </div>
      </div>

      {/* Mobile Combined Sidebar (Column 1 + Column 2) */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-[70] flex transition-transform duration-300 ${showMobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Column 1 - Mobile */}
        <div className={`w-[70px] h-full bg-gradient-to-b ${currentTheme.col1} border-r border-white/20 flex flex-col items-center py-3 gap-2`}>
          <Link href="/" onClick={() => setShowMobileMenu(false)}>
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200">
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
          </Link>
          
          <div className="w-8 h-0.5 bg-white/30 rounded-full my-1"></div>
          
          <Link href={`/app/chat-rooms/1/${CHANNEL_IDS.general}`} onClick={() => setShowMobileMenu(false)}>
            <button 
              className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${isChatRoomsActive ? 'ring-2 ring-cyan-300 bg-cyan-500/50' : ''}`}
              title="Message In Space"
            >
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </Link>
          
          <Link href="/app/friends" onClick={() => setShowMobileMenu(false)}>
            <button 
              className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${isDirectMessageActive ? 'ring-2 ring-cyan-300 bg-cyan-500/50' : ''}`}
              title="Direct Message"
            >
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </Link>
          
          <Link href="/app/asos" onClick={() => setShowMobileMenu(false)}>
            <button 
              className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${isWorkflowActive ? 'ring-2 ring-cyan-300 bg-cyan-500/50' : ''}`}
              title="Workflow"
            >
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
          </Link>
          
          <Link href="/app/applications" onClick={() => setShowMobileMenu(false)}>
            <button 
              className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${isDiscoverActive ? 'ring-2 ring-cyan-300 bg-cyan-500/50' : ''}`}
              title="Discover"
            >
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </Link>
          
          <div className="flex-1"></div>
          
          <button 
            className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative`}
            title="Add Space"
          >
            <svg className={`w-6 h-6 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Column 2 - Mobile */}
        <div className={`w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex flex-col`}>
          <ServerHeader description="Explore virtual items" />
          <DMNavigation />
          
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-bold mb-3 px-1 text-white/60">DIRECT MESSAGES</h3>
            <button className={`w-full px-3 py-2.5 rounded-lg text-left mb-2 ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText}`}>
              <span className="text-sm">+ Invite Friends</span>
            </button>
          </div>

          <ProfileButton />
        </div>
      </div>

      {/* COLUMN 2 - Desktop */}
      <div className={`hidden md:flex w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader />
        <DMNavigation />
        
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-xs font-bold mb-3 px-1 text-white/60">DIRECT MESSAGES</h3>
          <button className={`w-full px-3 py-2.5 rounded-lg text-left mb-2 ${currentTheme.buttonBg} ${currentTheme.buttonHover} ${currentTheme.buttonText}`}>
            <span className="text-sm">+ Invite Friends</span>
          </button>
        </div>

        <ProfileButton />
      </div>

      {/* COLUMN 3 */}
      <div className="relative z-10 flex-1 flex flex-col md:mt-0 mt-14">
        <div className={`absolute inset-0 ${currentTheme.chatBg} backdrop-blur-md`}></div>
        <div className="relative flex-1 flex flex-col">
          <div className={`h-12 px-4 flex items-center gap-4 border-b ${isDark ? 'border-white/20' : 'border-gray-300'} flex-shrink-0 hidden md:flex`}>
            <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Shop</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopItems.map((item) => (
                <div key={item.id} className={`p-6 rounded-xl border transition-all ${isDark ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/80 border-gray-300 hover:bg-white'}`}>
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xl ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{item.price}</span>
                    <button className={`px-4 py-2 rounded-lg ${isDark ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}>Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
