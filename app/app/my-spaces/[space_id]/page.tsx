"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../../ThemeContext";
import ServerHeader from "../../components/ServerHeader";
import ProfileButton from "../../components/ProfileButton";
import { CHANNEL_IDS } from "../../../data/mockChannelData";
import { mockCollaborativeSpace, SpaceMember, Project, Task } from "../../../data/mockSpaceCollabData";

export default function CollaborativeSpacePage({ params }: { params: Promise<{ space_id: string }> }) {
  const unwrappedParams = use(params);
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "tasks" | "members" | "resources">("overview");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const space = mockCollaborativeSpace; // In real app, fetch by unwrappedParams.space_id

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests') || false;
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;
  const isMySpacesActive = pathname?.startsWith('/app/my-spaces') || false;

  const humans = space.members.filter(m => m.lifeForm === "Human");
  const ais = space.members.filter(m => m.lifeForm === "AI");

  const getStatusColor = (status: SpaceMember["status"]) => {
    switch (status) {
      case "Online": return "bg-green-500";
      case "Idle": return "bg-yellow-500";
      case "Do Not Disturb": return "bg-red-500";
      case "Offline": return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return isDark ? "text-red-400 bg-red-500/20 border-red-400/30" : "text-red-700 bg-red-100 border-red-300";
      case "High": return isDark ? "text-orange-400 bg-orange-500/20 border-orange-400/30" : "text-orange-700 bg-orange-100 border-orange-300";
      case "Medium": return isDark ? "text-yellow-400 bg-yellow-500/20 border-yellow-400/30" : "text-yellow-700 bg-yellow-100 border-yellow-300";
      case "Low": return isDark ? "text-green-400 bg-green-500/20 border-green-400/30" : "text-green-700 bg-green-100 border-green-300";
      default: return isDark ? "text-gray-400 bg-gray-500/20 border-gray-400/30" : "text-gray-700 bg-gray-100 border-gray-300";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Planning": return isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-800";
      case "In Progress": return isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-100 text-cyan-800";
      case "Review": return isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-800";
      case "Completed": return isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800";
      case "Done": return isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800";
      case "Todo": return isDark ? "bg-gray-500/20 text-gray-400" : "bg-gray-100 text-gray-800";
      default: return isDark ? "bg-gray-500/20 text-gray-400" : "bg-gray-100 text-gray-800";
    }
  };

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
          
          <span className={`font-bold text-base drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{space.icon} {space.name}</span>
          
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

          <div className="w-8 h-0.5 bg-white/30 rounded-full my-1"></div>

          <Link href="/app/my-spaces/space-001" onClick={() => setShowMobileMenu(false)}>
            <button 
              className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${isMySpacesActive ? 'ring-2 ring-cyan-300 bg-cyan-500/50' : ''}`}
              title="My Spaces"
            >
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </button>
          </Link>

          <div className="flex-1"></div>

          <Link href="/app/spaces" onClick={() => setShowMobileMenu(false)}>
            <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200" title="Add Space">
              <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Column 2 - Mobile: Space Navigation & Members */}
        <div className={`w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex flex-col`}>
          <ServerHeader description={space.description} />
          
          {/* Space Header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{space.icon}</div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white font-bold text-base truncate">{space.name}</h1>
                <p className="text-white/60 text-xs">{space.members.length} members</p>
              </div>
            </div>
          </div>

          {/* Invite Button */}
          <div className="p-3 border-b border-white/20">
            <button
              onClick={() => setShowInviteModal(true)}
              className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-colors"
            >
              + Invite Members
            </button>
          </div>

          {/* Navigation */}
          <div className="p-3 border-b border-white/20">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
                activeTab === "overview" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
                activeTab === "projects" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              🚀 Projects ({space.stats.activeProjects})
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
                activeTab === "tasks" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              ✅ Tasks ({space.stats.completedTasks}/{space.stats.totalTasks})
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
                activeTab === "members" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              👥 Members
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
                activeTab === "resources" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
              }`}
            >
              📁 Resources
            </button>
          </div>

          {/* Members List */}
          <div className="flex-1 overflow-y-auto p-3 min-h-0 styled-scrollbar">
            {/* Humans */}
            <div className="mb-4">
              <h3 className="text-xs font-bold mb-2 px-1 text-white/60">HUMANS ({humans.length})</h3>
              <div className="space-y-1">
                {humans.map((member) => (
                  <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 cursor-pointer">
                    <div className="relative">
                      <div className="text-2xl">{member.avatar}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{member.displayName}</div>
                      <div className="text-xs text-white/60 truncate">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistants */}
            <div>
              <h3 className="text-xs font-bold mb-2 px-1 text-white/60">AI ASSISTANTS ({ais.length})</h3>
              <div className="space-y-1">
                {ais.map((member) => (
                  <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 cursor-pointer">
                    <div className="relative">
                      <div className="text-2xl">{member.avatar}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{member.displayName}</div>
                      <div className="text-xs text-cyan-400 truncate">Level {member.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="border-t border-white/20">
            <ProfileButton />
          </div>
        </div>
      </div>

      {/* Desktop Column 2 - Space Navigation & Members */}
      <div className={`hidden md:flex w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader description={space.description} />
        
        {/* Space Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{space.icon}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-base truncate">{space.name}</h1>
              <p className="text-white/60 text-xs">{space.members.length} members</p>
            </div>
          </div>
        </div>

        {/* Invite Button */}
        <div className="p-3 border-b border-white/20">
          <button
            onClick={() => setShowInviteModal(true)}
            className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-colors"
          >
            + Invite Members
          </button>
        </div>

        {/* Navigation */}
        <div className="p-3 border-b border-white/20">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
              activeTab === "overview" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
              activeTab === "projects" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            🚀 Projects ({space.stats.activeProjects})
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
              activeTab === "tasks" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            ✅ Tasks ({space.stats.completedTasks}/{space.stats.totalTasks})
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 mb-1 ${
              activeTab === "members" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            👥 Members
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-200 ${
              activeTab === "resources" ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70'
            }`}
          >
            📁 Resources
          </button>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-3 min-h-0 styled-scrollbar">
          {/* Humans */}
          <div className="mb-4">
            <h3 className="text-xs font-bold mb-2 px-1 text-white/60">HUMANS ({humans.length})</h3>
            <div className="space-y-1">
              {humans.map((member) => (
                <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 cursor-pointer">
                  <div className="relative">
                    <div className="text-2xl">{member.avatar}</div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{member.displayName}</div>
                    <div className="text-xs text-white/60 truncate">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistants */}
          <div>
            <h3 className="text-xs font-bold mb-2 px-1 text-white/60">AI ASSISTANTS ({ais.length})</h3>
            <div className="space-y-1">
              {ais.map((member) => (
                <div key={member.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 cursor-pointer">
                  <div className="relative">
                    <div className="text-2xl">{member.avatar}</div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{member.displayName}</div>
                    <div className="text-xs text-cyan-400 truncate">Level {member.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="border-t border-white/20">
          <ProfileButton />
        </div>
      </div>

      {/* Column 3 - Main Content */}
      <div className="relative flex-1 flex flex-col h-[calc(100vh-56px)] md:h-screen mt-[56px] md:mt-0">
        {/* Background Layer */}
        <div className={`absolute inset-0 ${currentTheme.chatBg} backdrop-blur-md`}></div>
        
        {/* Content Layer */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className={`flex-shrink-0 h-12 px-4 flex items-center justify-between backdrop-blur-md border-b ${isDark ? 'border-white/20' : 'border-gray-300'}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{space.icon}</span>
              <span className={`font-bold drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
              <span className={`text-sm ml-2 hidden sm:block ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                {space.description}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 styled-scrollbar">
            {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-6xl">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Total Members</div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {space.stats.totalMembers}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {humans.length} humans, {ais.length} AI
                  </div>
                </div>
                <div className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Active Projects</div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {space.stats.activeProjects}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>In progress</div>
                </div>
                <div className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Tasks Completed</div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {space.stats.completedTasks}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    of {space.stats.totalTasks} total
                  </div>
                </div>
                <div className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Progress</div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {Math.round((space.stats.completedTasks / space.stats.totalTasks) * 100)}%
                  </div>
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Overall completion</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`backdrop-blur-md rounded-xl p-6 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  🔥 Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="font-bold">Nexus AI</span> completed task "Implement AI prediction algorithms"
                      </p>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🥷</div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="font-bold">Code Ninja</span> deployed new CI/CD pipeline
                      </p>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🌟</div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="font-bold">Aurora Bot</span> generated data visualization dashboard
                      </p>
                      <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channels */}
              <div className={`backdrop-blur-md rounded-xl p-6 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  📡 Channels
                </h3>
                <div className="grid gap-2">
                  {space.channels.map((channel) => (
                    <div
                      key={channel.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {channel.type === "text" && "💬"}
                          {channel.type === "voice" && "🎙️"}
                          {channel.type === "video" && "📹"}
                          {channel.type === "workflow" && "⚙️"}
                        </span>
                        <div>
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {channel.name}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            {channel.description}
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        {channel.memberCount} members
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-4 max-w-6xl">
              {space.projects.map((project) => (
                <div
                  key={project.id}
                  className={`backdrop-blur-md rounded-xl p-6 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {project.name}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDark ? 'text-white/70' : 'text-gray-700'}>Progress</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{project.progress}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Assigned to:</span>
                      <div className="flex -space-x-2">
                        {project.assignedTo.slice(0, 5).map((memberId) => {
                          const member = space.members.find(m => m.id === memberId);
                          return member ? (
                            <div key={member.id} className="text-xl" title={member.displayName}>
                              {member.avatar}
                            </div>
                          ) : null;
                        })}
                        {project.assignedTo.length > 5 && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-white/20 text-white' : 'bg-gray-300 text-gray-700'}`}>
                            +{project.assignedTo.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                    {project.deadline && (
                      <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        📅 Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-4 max-w-6xl">
              {space.tasks.map((task) => {
                const assignedMember = space.members.find(m => m.id === task.assignedTo[0]);
                const createdByMember = space.members.find(m => m.id === task.createdBy);
                return (
                  <div
                    key={task.id}
                    className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={task.status === "Done"}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 rounded border-2"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                          <div className="flex-1">
                            <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'} ${task.status === 'Done' ? 'line-through opacity-60' : ''}`}>
                              {task.title}
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                              {task.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          {assignedMember && (
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{assignedMember.avatar}</span>
                              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                                {assignedMember.displayName}
                              </span>
                            </div>
                          )}
                          {task.dueDate && (
                            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                              📅 {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {createdByMember && (
                            <span className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                              Created by {createdByMember.displayName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Members Tab */}
          {activeTab === "members" && (
            <div className="space-y-6 max-w-6xl">
              {/* Humans Section */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  👥 Human Members ({humans.length})
                </h3>
                <div className="grid gap-4">
                  {humans.map((member) => (
                    <div
                      key={member.id}
                      className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="text-5xl">{member.avatar}</div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {member.displayName}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-white/10 text-white/60' : 'bg-gray-200 text-gray-700'}`}>
                              Level {member.level}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-800'}`}>
                              {member.role}
                            </span>
                          </div>
                          <p className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            @{member.username}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {member.skills.map((skill, idx) => (
                              <span key={idx} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-800'}`}>
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            {member.contributions} contributions • Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Assistants Section */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  🤖 AI Assistants ({ais.length})
                </h3>
                <div className="grid gap-4">
                  {ais.map((member) => (
                    <div
                      key={member.id}
                      className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="text-5xl">{member.avatar}</div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {member.displayName}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-800'}`}>
                              Level {member.level} AI
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                              {member.role}
                            </span>
                          </div>
                          <p className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            @{member.username}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {member.skills.map((skill, idx) => (
                              <span key={idx} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-800'}`}>
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            {member.contributions} contributions • Active since {new Date(member.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-4 max-w-6xl">
              {space.resources.map((resource) => {
                const uploadedByMember = space.members.find(m => m.id === resource.uploadedBy);
                return (
                  <div
                    key={resource.id}
                    className={`backdrop-blur-md rounded-xl p-4 border ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/30'} hover:scale-[1.01] transition-transform cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">
                        {resource.type === "Document" && "📄"}
                        {resource.type === "Code" && "💻"}
                        {resource.type === "Design" && "🎨"}
                        {resource.type === "ASO" && "🤖"}
                        {resource.type === "Skill Card" && "🎯"}
                        {resource.type === "Link" && "🔗"}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {resource.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm mb-2 flex-wrap">
                          <span className={`px-2 py-1 rounded ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                            {resource.type}
                          </span>
                          {resource.size && (
                            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                              {resource.size}
                            </span>
                          )}
                          {uploadedByMember && (
                            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                              Uploaded by {uploadedByMember.displayName}
                            </span>
                          )}
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
                            {new Date(resource.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, idx) => (
                            <span key={idx} className={`px-2 py-1 rounded-full text-xs ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-700'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setShowInviteModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-xl p-6 ${isDark ? 'bg-gray-800/95 border border-white/20' : 'bg-white/95 border border-gray-300'}`}
          >
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Invite Members
            </h3>
            <input
              type="text"
              placeholder="Enter username or email..."
              className={`w-full px-4 py-3 rounded-lg border mb-4 ${
                isDark
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className={`flex-1 py-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
