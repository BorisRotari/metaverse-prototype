"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileButton from "../components/ProfileButton";
import ServerHeader from "../components/ServerHeader";
import { useTheme } from "../ThemeContext";
import { CHANNEL_IDS } from "../../data/mockChannelData";

export default function SkillCardsPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests') || false;
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;

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

          <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200" title="Discover">
            <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

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

          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-bold mb-3 px-1 text-white/60">WORKFLOW LIBRARY</h3>
            <button className="w-full px-3 py-2.5 rounded-lg text-left mb-2 hover:bg-white/10 text-white/80">
              <span className="text-sm">+ Create Workflow</span>
            </button>
          </div>

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
        
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-xs font-bold mb-3 px-1 text-white/60">WORKFLOW LIBRARY</h3>
          <button className="w-full px-3 py-2.5 rounded-lg text-left mb-2 hover:bg-white/10 text-white/80">
            <span className="text-sm">+ Create Workflow</span>
          </button>
        </div>

        <ProfileButton />
      </div>

      {/* Column 3 - Main Content */}
      <div className={`flex-1 flex flex-col relative z-10 md:mt-0 mt-14`}>
        <div className={`absolute inset-0 ${currentTheme.chatBg} backdrop-blur-md`}></div>
        <div className="relative flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Skill Cards
            </h1>
            <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Create and manage reusable workflow modules
            </p>

            {/* Skill Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Example Skill Cards */}
              {[
                { 
                  title: "Light & Shadow Render Routine", 
                  category: "Animation", 
                  creator: "Level 3 Artist",
                  uses: 142,
                  steps: 4,
                  description: "Automated 3D rendering workflow with day/night toggle"
                },
                { 
                  title: "AI Test Environment Setup", 
                  category: "Development", 
                  creator: "Level 3 Developer",
                  uses: 89,
                  steps: 4,
                  description: "Auto-configure dev environment with testing suite"
                },
                { 
                  title: "Project Report Generator", 
                  category: "Management", 
                  creator: "Level 4 PM",
                  uses: 201,
                  steps: 5,
                  description: "Generate comprehensive project summaries with metrics"
                },
                { 
                  title: "Asset Pipeline Optimizer", 
                  category: "Animation", 
                  creator: "Level 4 Tech Lead",
                  uses: 76,
                  steps: 6,
                  description: "Optimize and compress 3D assets for production"
                },
                { 
                  title: "Code Review Workflow", 
                  category: "Development", 
                  creator: "Level 5 Architect",
                  uses: 134,
                  steps: 3,
                  description: "Automated code quality checks and PR management"
                },
                { 
                  title: "Pomodoro Task Splitter", 
                  category: "Productivity", 
                  creator: "Level 3 Designer",
                  uses: 267,
                  steps: 4,
                  description: "Break down projects into timed work sessions"
                },
              ].map((card, idx) => (
                <div 
                  key={idx}
                  className={`backdrop-blur-md rounded-xl p-5 border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    isDark 
                      ? 'bg-white/15 border-white/20 hover:bg-white/20' 
                      : 'bg-white/40 border-white/30 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
                      isDark 
                        ? 'bg-blue-500/30 border-blue-400/30 text-blue-300' 
                        : 'bg-blue-400/40 border-blue-500/40 text-blue-900'
                    }`}>
                      {card.category}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {card.steps} steps
                    </span>
                    <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>•</span>
                    <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      Used {card.uses} times
                    </span>
                  </div>

                  <div className={`text-xs mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    Created by {card.creator}
                  </div>

                  <div className="flex gap-2">
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                        : 'bg-white/40 hover:bg-white/60 text-gray-900 border border-white/30'
                    }`}>
                      View Details
                    </button>
                    <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30' 
                        : 'bg-cyan-400/40 hover:bg-cyan-400/60 text-cyan-900 border border-cyan-500/40'
                    }`}>
                      Equip
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Skill Card Button */}
            <button className={`w-full mt-6 px-6 py-4 rounded-xl font-medium transition-all duration-200 backdrop-blur-md border ${
              isDark 
                ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border-cyan-400/30' 
                : 'bg-cyan-400/40 hover:bg-cyan-400/60 text-cyan-900 border-cyan-500/40'
            }`}>
              + Create New Skill Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

