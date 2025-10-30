"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";
import ServerHeader from "../components/ServerHeader";
import DMNavigation from "../components/DMNavigation";
import ProfileButton from "../components/ProfileButton";
import { CHANNEL_IDS } from "../../data/mockChannelData";
import { mockShopItems, ShopItem } from "../../data/mockShopData";

export default function ShopPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"All" | ShopItem["category"]>("All");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoins] = useState(5000); // Mock user coins

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests');
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;

  const categories: ("All" | ShopItem["category"])[] = ["All", "Avatar", "Profile", "Boost", "Bundle", "Emoji", "Theme", "Effect", "Premium"];

  // Filter items
  const filteredItems = mockShopItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredItems = mockShopItems.filter(item => item.isFeatured);

  const handlePurchase = (item: ShopItem) => {
    // In a real app, this would process the purchase
    console.log("Purchasing:", item.id);
  };

  const getDiscountedPrice = (item: ShopItem) => {
    if (item.price.coins && item.discount) {
      return Math.floor(item.price.coins * (1 - item.discount / 100));
    }
    return item.price.coins;
  };

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
      <div className={`md:hidden fixed top-0 left-0 right-0 z-[60] backdrop-blur-md border-b ${isDark ? 'bg-gray-900/60 border-white/20' : 'bg-white/90 border-gray-300'} ${showMobileMenu ? 'pointer-events-none' : ''}`}>
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

          <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200" title="Add Space">
            <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Column 2 - Mobile */}
        <div className={`w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex flex-col`}>
          <ServerHeader description="Browse and purchase items" />
          
          <DMNavigation />
          
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-bold mb-3 px-1 text-white/60">CATEGORIES</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10 text-white/70'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <ProfileButton />
        </div>
      </div>

      {/* Desktop Column 2 */}
      <div className={`hidden md:flex relative z-10 w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader description="Browse and purchase items" />
        
        <DMNavigation />
        
        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          <h3 className="text-xs font-bold mb-3 px-1 text-white/60">CATEGORIES</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <ProfileButton />
      </div>

      {/* Column 3 - Main Content */}
      <div className={`flex-1 flex flex-col relative z-10 md:mt-0 mt-14 min-h-0`}>
        {/* Header */}
        <div className={`flex-shrink-0 border-b ${isDark ? 'bg-gray-900/80 border-white/10' : 'bg-white/50 border-gray-200'} backdrop-blur-md`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shop
              </h1>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md border ${
                isDark ? 'bg-yellow-500/20 border-yellow-400/30' : 'bg-yellow-400/30 border-yellow-500/40'
              }`}>
                <span className="text-2xl">🪙</span>
                <span className={`font-bold ${isDark ? 'text-yellow-300' : 'text-yellow-900'}`}>
                  {userCoins.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border backdrop-blur-md transition-all duration-200 ${
                  isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-cyan-400/50'
                    : 'bg-white/60 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white/80 focus:border-cyan-500'
                }`}
              />
              <svg className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-y-auto p-6 min-h-0 ${isDark ? 'bg-gray-900/40' : currentTheme.chatBg} backdrop-blur-md styled-scrollbar`}>
          {/* Featured Items */}
          {selectedCategory === "All" && !searchQuery && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ⭐ Featured
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`backdrop-blur-md rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                      isDark
                        ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/50'
                        : 'bg-white/60 border-white/30 hover:bg-white/80 hover:border-cyan-500/50'
                    }`}
                  >
                    {/* Banner */}
                    <div className={`h-32 bg-gradient-to-r ${item.banner} relative flex items-center justify-center`}>
                      <div className="text-6xl">{item.preview}</div>
                      {item.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 rounded-full px-3 py-1">
                          <span className="text-white text-sm font-bold">-{item.discount}%</span>
                        </div>
                      )}
                      {item.isNew && (
                        <div className="absolute top-2 left-2 bg-green-500 rounded-full px-3 py-1">
                          <span className="text-white text-xs font-bold">NEW</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.price.coins && (
                            <div className="flex items-center gap-1">
                              <span className="text-lg">🪙</span>
                              {item.discount ? (
                                <>
                                  <span className={`text-sm line-through ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                    {item.price.coins}
                                  </span>
                                  <span className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                    {getDiscountedPrice(item)}
                                  </span>
                                </>
                              ) : (
                                <span className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                  {item.price.coins}
                                </span>
                              )}
                            </div>
                          )}
                          {item.price.premium && (
                            <span className="text-lg">👑</span>
                          )}
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isDark
                              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30'
                              : 'bg-cyan-400/40 hover:bg-cyan-400/60 text-cyan-900 border border-cyan-500/40'
                          }`}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Items */}
          <div>
            {selectedCategory !== "All" && (
              <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedCategory}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`backdrop-blur-md rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    isDark
                      ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/50'
                      : 'bg-white/60 border-white/30 hover:bg-white/80 hover:border-cyan-500/50'
                  }`}
                >
                  {/* Banner */}
                  <div className={`h-24 bg-gradient-to-r ${item.banner} relative flex items-center justify-center`}>
                    <div className="text-5xl">{item.preview}</div>
                    {item.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 rounded-full px-2 py-0.5">
                        <span className="text-white text-xs font-bold">-{item.discount}%</span>
                      </div>
                    )}
                    {item.isNew && (
                      <div className="absolute top-2 left-2 bg-green-500 rounded-full px-2 py-0.5">
                        <span className="text-white text-xs font-bold">NEW</span>
                      </div>
                    )}
                    {item.stock !== undefined && (
                      <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-0.5">
                        <span className="text-white text-xs">{item.stock} left</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className={`font-bold text-sm mb-1 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs mb-2 line-clamp-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {item.price.coins && (
                          <>
                            <span className="text-sm">🪙</span>
                            {item.discount ? (
                              <>
                                <span className={`text-xs line-through ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                  {item.price.coins}
                                </span>
                                <span className={`text-sm font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                  {getDiscountedPrice(item)}
                                </span>
                              </>
                            ) : (
                              <span className={`text-sm font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                {item.price.coins}
                              </span>
                            )}
                          </>
                        )}
                        {item.price.premium && (
                          <span className="text-sm">👑</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className={`w-3 h-3 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className={`text-xs ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{item.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(item);
                      }}
                      className={`w-full py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isDark
                          ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30'
                          : 'bg-green-400/40 hover:bg-green-400/60 text-green-900 border border-green-500/40'
                      }`}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-medium">No items found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden border ${
              isDark
                ? 'bg-gray-800/95 border-white/20'
                : 'bg-white/95 border-gray-300'
            }`}
          >
            {/* Banner */}
            <div className={`h-40 bg-gradient-to-r ${selectedItem.banner} relative flex items-center justify-center`}>
              <div className="text-7xl">{selectedItem.preview}</div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedItem.discount && (
                <div className="absolute top-4 left-4 bg-red-500 rounded-full px-4 py-2">
                  <span className="text-white text-lg font-bold">-{selectedItem.discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-10rem)] styled-scrollbar">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedItem.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                      {selectedItem.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                      {selectedItem.type}
                    </span>
                    {selectedItem.isNew && (
                      <span className="px-2 py-1 rounded text-xs bg-green-500 text-white">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <svg className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedItem.rating}</span>
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>({selectedItem.reviews} reviews)</span>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {selectedItem.purchases.toLocaleString()} purchases
                    </span>
                  </div>
                </div>
              </div>

              <p className={`mb-6 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                {selectedItem.longDescription}
              </p>

              {/* Features */}
              {selectedItem.features && (
                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    What's Included
                  </h3>
                  <ul className={`space-y-1 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                    {selectedItem.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, idx) => (
                    <span key={idx} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Purchase */}
              <div className={`p-4 rounded-lg backdrop-blur-md border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Price</div>
                    <div className="flex items-center gap-2">
                      {selectedItem.price.coins && (
                        <>
                          <span className="text-2xl">🪙</span>
                          {selectedItem.discount ? (
                            <>
                              <span className={`text-lg line-through ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                                {selectedItem.price.coins}
                              </span>
                              <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                {getDiscountedPrice(selectedItem)}
                              </span>
                            </>
                          ) : (
                            <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                              {selectedItem.price.coins}
                            </span>
                          )}
                        </>
                      )}
                      {selectedItem.price.premium && (
                        <span className="text-2xl">👑</span>
                      )}
                    </div>
                  </div>
                  {selectedItem.stock !== undefined && (
                    <div>
                      <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Stock</div>
                      <div className={`text-xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                        {selectedItem.stock} left
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    handlePurchase(selectedItem);
                    setSelectedItem(null);
                  }}
                  className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                    isDark
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
