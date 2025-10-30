"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";
import ServerHeader from "../components/ServerHeader";
import DMNavigation from "../components/DMNavigation";
import ProfileButton from "../components/ProfileButton";
import { CHANNEL_IDS } from "../../data/mockChannelData";
import { mockQuests, Quest, calculateTotalRewards } from "../../data/mockQuestData";

export default function QuestsPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"All" | Quest["category"]>("All");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests');
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;

  const categories: ("All" | Quest["category"])[] = ["All", "Daily", "Weekly", "Monthly", "Special", "Community"];

  // Filter quests
  const filteredQuests = mockQuests.filter(quest => {
    const matchesCategory = selectedCategory === "All" || quest.category === selectedCategory;
    const matchesActive = !showOnlyActive || quest.isActive;
    return matchesCategory && matchesActive;
  });

  // Calculate stats
  const activeQuests = mockQuests.filter(q => q.isActive);
  const completedQuests = mockQuests.filter(q => q.isCompleted);
  const totalRewards = calculateTotalRewards(completedQuests);

  const getDifficultyColor = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Easy": return isDark ? "text-green-400" : "text-green-600";
      case "Medium": return isDark ? "text-yellow-400" : "text-yellow-600";
      case "Hard": return isDark ? "text-orange-400" : "text-orange-600";
      case "Expert": return isDark ? "text-red-400" : "text-red-600";
    }
  };

  const getDifficultyBg = (difficulty: Quest["difficulty"]) => {
    switch (difficulty) {
      case "Easy": return isDark ? "bg-green-500/20 border-green-400/30" : "bg-green-400/30 border-green-500/40";
      case "Medium": return isDark ? "bg-yellow-500/20 border-yellow-400/30" : "bg-yellow-400/30 border-yellow-500/40";
      case "Hard": return isDark ? "bg-orange-500/20 border-orange-400/30" : "bg-orange-400/30 border-orange-500/40";
      case "Expert": return isDark ? "bg-red-500/20 border-red-400/30" : "bg-red-400/30 border-red-500/40";
    }
  };

  const handleAcceptQuest = (quest: Quest) => {
    // In a real app, this would make an API call
    console.log("Accepting quest:", quest.id);
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
          
          <span className={`font-bold text-base drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Quests</span>
          
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
          <ServerHeader description="Complete quests and earn rewards" />
          
          <DMNavigation />
          
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-bold mb-3 px-1 text-white/60">QUEST CATEGORIES</h3>
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

            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setShowOnlyActive(!showOnlyActive)}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                  showOnlyActive
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-white/70'
                }`}
              >
                ⚡ Active Only
              </button>
            </div>
          </div>

          <ProfileButton />
        </div>
      </div>

      {/* Desktop Column 2 */}
      <div className={`hidden md:flex relative z-10 w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader description="Complete quests and earn rewards" />
        
        <DMNavigation />
        
        <div className="flex-1 overflow-y-auto p-3 min-h-0">
          <h3 className="text-xs font-bold mb-3 px-1 text-white/60">QUEST CATEGORIES</h3>
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

          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={() => setShowOnlyActive(!showOnlyActive)}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                showOnlyActive
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-white/70'
              }`}
            >
              ⚡ Active Only
            </button>
          </div>
        </div>

        <ProfileButton />
      </div>

      {/* Column 3 - Main Content */}
      <div className={`flex-1 flex flex-col relative z-10 md:mt-0 mt-14 min-h-0`}>
        {/* Header */}
        <div className={`flex-shrink-0 border-b ${isDark ? 'bg-gray-900/80 border-white/10' : 'bg-white/50 border-gray-200'} backdrop-blur-md`}>
          <div className="p-4">
            <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quest Hub
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`backdrop-blur-md rounded-lg p-3 border ${
                isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'
              }`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Active</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  {activeQuests.length}
                </div>
              </div>
              <div className={`backdrop-blur-md rounded-lg p-3 border ${
                isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'
              }`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Completed</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {completedQuests.length}
                </div>
              </div>
              <div className={`backdrop-blur-md rounded-lg p-3 border ${
                isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'
              }`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Total XP</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  {totalRewards.xp.toLocaleString()}
                </div>
              </div>
              <div className={`backdrop-blur-md rounded-lg p-3 border ${
                isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'
              }`}>
                <div className={`text-xs mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Total Coins</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {totalRewards.coins.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-y-auto p-6 min-h-0 ${isDark ? 'bg-gray-900/40' : currentTheme.chatBg} backdrop-blur-md styled-scrollbar`}>
          <div className="space-y-4">
            {filteredQuests.map((quest) => (
              <div
                key={quest.id}
                onClick={() => setSelectedQuest(quest)}
                className={`backdrop-blur-md rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.01] cursor-pointer ${
                  isDark
                    ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/50'
                    : 'bg-white/60 border-white/30 hover:bg-white/80 hover:border-cyan-500/50'
                }`}
              >
                {/* Banner */}
                <div className={`h-20 bg-gradient-to-r ${quest.banner} relative flex items-center px-4 gap-3`}>
                  <div className="text-4xl">{quest.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg drop-shadow-lg">{quest.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium bg-black/30 text-white`}>
                        {quest.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium bg-black/30 text-white`}>
                        {quest.difficulty}
                      </span>
                      {quest.isPremium && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-400/90 text-yellow-900">
                          ⭐ Premium
                        </span>
                      )}
                    </div>
                  </div>
                  {quest.isActive && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/90 rounded-full px-2 py-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-white">Active</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className={`text-sm mb-4 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                    {quest.description}
                  </p>

                  {/* Progress Bar */}
                  {quest.isActive && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={isDark ? 'text-white/70' : 'text-gray-700'}>Progress</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          {quest.progress.current} / {quest.progress.total}
                        </span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${(quest.progress.current / quest.progress.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Rewards */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">⚡</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                          {quest.rewards.xp} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">🪙</span>
                        <span className={`text-sm font-medium ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {quest.rewards.coins} Coins
                        </span>
                      </div>
                      {quest.rewards.badge && (
                        <div className="flex items-center gap-1">
                          <span className="text-lg">🏆</span>
                          <span className={`text-sm font-medium ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                            Badge
                          </span>
                        </div>
                      )}
                    </div>
                    {quest.timeRemaining && (
                      <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        ⏱️ {quest.timeRemaining}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center gap-3">
                    {quest.isActive ? (
                      <button
                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          isDark
                            ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30'
                            : 'bg-cyan-400/40 hover:bg-cyan-400/60 text-cyan-900 border border-cyan-500/40'
                        }`}
                      >
                        Continue Quest
                      </button>
                    ) : quest.isCompleted ? (
                      <button
                        disabled
                        className={`flex-1 py-2 rounded-lg font-medium text-sm ${
                          isDark
                            ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                            : 'bg-green-400/40 text-green-900 border border-green-500/40'
                        }`}
                      >
                        ✓ Completed
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptQuest(quest);
                        }}
                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          isDark
                            ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30'
                            : 'bg-green-400/40 hover:bg-green-400/60 text-green-900 border border-green-500/40'
                        }`}
                      >
                        Accept Quest
                      </button>
                    )}
                    <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      👥 {quest.participants.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuests.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-medium">No quests found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Quest Details Modal */}
      {selectedQuest && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setSelectedQuest(null)}
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
            <div className={`h-32 bg-gradient-to-r ${selectedQuest.banner} relative flex items-center justify-center`}>
              <div className="text-6xl">{selectedQuest.icon}</div>
              <button
                onClick={() => setSelectedQuest(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedQuest.isActive && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-green-500/90 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-white">Active</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)] styled-scrollbar">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedQuest.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyBg(selectedQuest.difficulty)} ${getDifficultyColor(selectedQuest.difficulty)}`}>
                      {selectedQuest.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                      {selectedQuest.category}
                    </span>
                    {selectedQuest.isPremium && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-400 text-yellow-900">
                        ⭐ Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className={`mb-6 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                {selectedQuest.longDescription}
              </p>

              {/* Progress */}
              {selectedQuest.isActive && (
                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Progress
                  </h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDark ? 'text-white/70' : 'text-gray-700'}>
                      {selectedQuest.progress.current} of {selectedQuest.progress.total} completed
                    </span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {Math.round((selectedQuest.progress.current / selectedQuest.progress.total) * 100)}%
                    </span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${(selectedQuest.progress.current / selectedQuest.progress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Requirements */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Requirements
                </h3>
                <ul className={`space-y-1 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  {selectedQuest.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rewards */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Rewards
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-purple-500/20 border-purple-400/30' : 'bg-purple-100 border-purple-300'}`}>
                    <div className="text-2xl mb-1">⚡</div>
                    <div className={`text-lg font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      {selectedQuest.rewards.xp} XP
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-yellow-500/20 border-yellow-400/30' : 'bg-yellow-100 border-yellow-300'}`}>
                    <div className="text-2xl mb-1">🪙</div>
                    <div className={`text-lg font-bold ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      {selectedQuest.rewards.coins} Coins
                    </div>
                  </div>
                  {selectedQuest.rewards.badge && (
                    <div className={`p-3 rounded-lg border col-span-2 ${isDark ? 'bg-orange-500/20 border-orange-400/30' : 'bg-orange-100 border-orange-300'}`}>
                      <div className="text-2xl mb-1">🏆</div>
                      <div className={`text-lg font-bold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                        {selectedQuest.rewards.badge}
                      </div>
                    </div>
                  )}
                  {selectedQuest.rewards.items && selectedQuest.rewards.items.length > 0 && (
                    <div className={`p-3 rounded-lg border col-span-2 ${isDark ? 'bg-cyan-500/20 border-cyan-400/30' : 'bg-cyan-100 border-cyan-300'}`}>
                      <div className="text-2xl mb-2">🎁</div>
                      <div className={`space-y-1 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                        {selectedQuest.rewards.items.map((item, idx) => (
                          <div key={idx} className="text-sm">• {item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Participants</div>
                  <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedQuest.participants.toLocaleString()}
                  </div>
                </div>
                {selectedQuest.acceptedBy && (
                  <div>
                    <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Accepted By</div>
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedQuest.acceptedBy.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {selectedQuest.isActive ? (
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${
                    isDark
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  }`}
                >
                  Continue Quest
                </button>
              ) : selectedQuest.isCompleted ? (
                <button
                  disabled
                  className={`w-full py-3 rounded-lg font-bold ${
                    isDark
                      ? 'bg-green-500/30 text-green-400 border border-green-400/30'
                      : 'bg-green-400/50 text-green-900 border border-green-500/40'
                  }`}
                >
                  ✓ Quest Completed
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAcceptQuest(selectedQuest);
                    setSelectedQuest(null);
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-200 ${
                    isDark
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Accept Quest
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
