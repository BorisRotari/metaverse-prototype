"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileButton from "../components/ProfileButton";
import ServerHeader from "../components/ServerHeader";
import { useTheme } from "../ThemeContext";
import { CHANNEL_IDS } from "../../data/mockChannelData";
import { mockSkillCards } from "../../data/mockSkillCardData";

export default function SkillCardsPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<typeof mockSkillCards[0] | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests') || false;
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;

  // Filter skill cards based on search query
  const filteredCards = mockSkillCards.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Dark Overlay */}
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
          
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Cards</span>
          </div>
          
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
          <ServerHeader description="Workflow modules" />
          
          {/* Workflow Navigation */}
          <div className="p-3 space-y-1">
            <Link href="/app/asos">
              <button 
                className="w-full px-4 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-white/10 text-white/80"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">ASOs</span>
                </div>
              </button>
            </Link>

            <Link href="/app/skill-cards">
              <button 
                className="w-full px-4 py-2.5 rounded-lg text-left transition-all duration-200 bg-white/20 text-white"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-sm font-medium">Skill Cards</span>
                </div>
              </button>
            </Link>
          </div>

          <div className="flex-1"></div>

          <ProfileButton />
        </div>
      </div>

      {/* Desktop Column 2 */}
      <div className={`hidden md:flex relative z-10 w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader description="Workflow modules" />
        
        {/* Workflow Navigation */}
        <div className="p-3 space-y-1">
          <Link href="/app/asos">
            <button 
              className="w-full px-4 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-white/10 text-white/80"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">ASOs</span>
              </div>
            </button>
          </Link>

          <Link href="/app/skill-cards">
            <button 
              className="w-full px-4 py-2.5 rounded-lg text-left transition-all duration-200 bg-white/20 text-white"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-sm font-medium">Skill Cards</span>
              </div>
            </button>
          </Link>
        </div>

        <div className="flex-1"></div>

        <ProfileButton />
      </div>

      {/* Column 3 - Main Content */}
      <div className={`flex-1 flex flex-col relative z-10 h-screen md:h-auto`}>
        <div className={`absolute inset-0 ${currentTheme.chatBg} backdrop-blur-md`}></div>
        <div className="relative flex-1 flex flex-col min-h-0 md:mt-0 mt-14">
          {/* Header */}
          <div className={`h-12 px-4 flex items-center gap-4 border-b ${isDark ? 'border-white/20' : 'border-gray-300'} flex-shrink-0 hidden md:flex`}>
            <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h1 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Cards</h1>
          </div>
          
          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 chat-scrollbar min-h-0">
            <div className="w-full">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Workflow Modules
                </h2>
                <p className={`${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Reusable workflow logic cards that ASOs can equip and execute
                </p>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search skill cards by name, category, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-3 pl-12 rounded-xl backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-cyan-400/50' 
                        : 'bg-white/40 border-white/30 text-gray-900 placeholder-gray-500 focus:ring-cyan-500/50'
                    }`}
                  />
                  <svg 
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-white/40 hover:text-white/60' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {filteredCards.map((card) => (
                  <div 
                    key={card.id}
                    className={`backdrop-blur-md rounded-xl p-4 border transition-all duration-200 cursor-pointer ${
                      isDark 
                        ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                        : 'bg-white/40 border-white/30 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{card.icon}</div>
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          card.difficulty === 'Beginner' 
                            ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                            : card.difficulty === 'Intermediate'
                            ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                            : card.difficulty === 'Advanced'
                            ? isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                            : isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                        }`}>
                          {card.difficulty}
                        </span>
                        {card.approved && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                            isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Approved
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {card.name}
                    </h3>

                    <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                      {card.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-md border ${
                        isDark 
                          ? 'bg-purple-500/20 border-purple-400/30 text-purple-300' 
                          : 'bg-purple-100 border-purple-300 text-purple-700'
                      }`}>
                        {card.category}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {card.steps} steps
                      </span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>•</span>
                      <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {card.estimatedTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                        Used {card.uses}× by ASOs
                      </span>
                      <button 
                        onClick={() => setSelectedCard(card)}
                        className={`text-xs font-medium ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Create New Skill Card */}
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className={`backdrop-blur-md rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[240px] ${
                    isDark 
                      ? 'bg-white/15 border-white/20 hover:bg-white/20' 
                      : 'bg-white/40 border-white/30 hover:bg-white/60'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    isDark ? 'bg-white/20' : 'bg-white/30'
                  }`}>
                    <svg className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Create Skill Card
                  </h3>
                  <p className={`text-xs text-center ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Define a new workflow module<br />that ASOs can learn and execute
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          ></div>
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-xl max-h-[85vh] rounded-xl backdrop-blur-md border overflow-hidden ${
            isDark 
              ? 'bg-gray-900/90 border-white/20' 
              : 'bg-white/90 border-gray-300'
          }`}>
            {/* Header */}
            <div className={`p-4 border-b backdrop-blur-md ${
              isDark 
                ? 'bg-gray-900/80 border-white/20' 
                : 'bg-white/80 border-gray-300'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedCard.icon}</div>
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedCard.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {selectedCard.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedCard.difficulty === 'Beginner' 
                          ? isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                          : selectedCard.difficulty === 'Intermediate'
                          ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          : selectedCard.difficulty === 'Advanced'
                          ? isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                          : isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                      }`}>
                        {selectedCard.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark 
                      ? 'hover:bg-white/10 text-white/60 hover:text-white' 
                      : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body - Scrollable */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-100px)] chat-scrollbar">
              {/* Description */}
              <div>
                <h3 className={`text-xs font-bold mb-2 uppercase tracking-wide ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Description
                </h3>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCard.description}
                </p>
              </div>

              {/* Step-by-Step Workflow */}
              <div>
                <h3 className={`text-xs font-bold mb-3 uppercase tracking-wide ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Workflow Steps
                </h3>
                <div className="space-y-2">
                  {selectedCard.stepDescriptions.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex gap-3 p-3 rounded-lg backdrop-blur-md border ${
                        isDark 
                          ? 'bg-white/10 border-white/20' 
                          : 'bg-white/40 border-white/30'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDark 
                          ? 'bg-cyan-500/30 text-cyan-300' 
                          : 'bg-cyan-200 text-cyan-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div className={`flex-1 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creator & Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/40 border-white/30'
                }`}>
                  <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Creator
                  </div>
                  <div className={`text-sm font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {selectedCard.creator}
                  </div>
                </div>
                <div className={`p-3 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/40 border-white/30'
                }`}>
                  <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Status
                  </div>
                  <div className={`text-sm font-bold flex items-center gap-1 ${
                    selectedCard.approved 
                      ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                      : isDark ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {selectedCard.approved ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Approved
                      </>
                    ) : (
                      'Pending'
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg backdrop-blur-md border ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/40 border-white/30'
                }`}>
                  <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Used by ASOs
                  </div>
                  <div className={`text-sm font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {selectedCard.uses} times
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className={`text-xs font-bold mb-2 uppercase tracking-wide ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-xs backdrop-blur-md border ${
                        isDark 
                          ? 'bg-white/10 border-white/20 text-white' 
                          : 'bg-white/40 border-white/30 text-gray-900'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Skill Card Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-lg rounded-xl backdrop-blur-md border overflow-hidden ${
            isDark 
              ? 'bg-gray-900/90 border-white/20' 
              : 'bg-white/90 border-gray-300'
          }`}>
            {/* Header */}
            <div className={`p-4 border-b backdrop-blur-md ${
              isDark 
                ? 'bg-gray-900/80 border-white/20' 
                : 'bg-white/80 border-gray-300'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Create Skill Card
                  </h2>
                  <p className={`text-xs mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                    Define a new workflow module in natural language
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark 
                      ? 'hover:bg-white/10 text-white/60 hover:text-white' 
                      : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body - Form */}
            <div className="p-4 space-y-3">
              {/* Card Name */}
              <div className="flex items-center gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Card Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Light & Shadow Render..."
                  className={`flex-1 px-3 py-2 text-sm rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 placeholder-gray-500 focus:ring-cyan-500/50'
                  }`}
                />
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Category *
                </label>
                <select
                  className={`flex-1 px-3 py-2 text-sm rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 focus:ring-cyan-500/50'
                  }`}
                >
                  <option value="">Select category...</option>
                  <option value="Animation">Animation</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="Security">Security</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Difficulty *
                </label>
                <select
                  className={`flex-1 px-3 py-2 text-sm rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 focus:ring-cyan-500/50'
                  }`}
                >
                  <option value="">Select difficulty...</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              {/* Steps */}
              <div className="flex items-start gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 pt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Workflow Steps *
                </label>
                <textarea
                  rows={4}
                  placeholder={"Step 1: Collect data from source\nStep 2: Process and validate\nStep 3: Export results\nStep 4: Notify completion"}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 placeholder-gray-500 focus:ring-cyan-500/50'
                  }`}
                ></textarea>
              </div>

              {/* Description */}
              <div className="flex items-start gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 pt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Description *
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the workflow's purpose..."
                  className={`flex-1 px-3 py-2 text-sm rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 placeholder-gray-500 focus:ring-cyan-500/50'
                  }`}
                ></textarea>
              </div>

              {/* Icon */}
              <div className="flex items-center gap-3">
                <label className={`text-xs font-medium w-28 flex-shrink-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Icon
                </label>
                <input
                  type="text"
                  placeholder="🎬"
                  maxLength={2}
                  className={`w-16 px-3 py-2 rounded-lg backdrop-blur-md border transition-all duration-200 focus:outline-none focus:ring-2 text-center text-xl ${
                    isDark 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-cyan-400/50' 
                      : 'bg-white/40 border-white/30 text-gray-900 placeholder-gray-500 focus:ring-cyan-500/50'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 border ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                      : 'bg-white/40 hover:bg-white/60 text-gray-900 border-white/30'
                  }`}
                >
                  Cancel
                </button>
                <button className={`flex-1 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                  currentTheme.buttonBg
                } ${currentTheme.buttonHover} ${currentTheme.buttonText}`}>
                  Submit for Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
