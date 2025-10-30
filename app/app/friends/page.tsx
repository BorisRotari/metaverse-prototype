"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../ThemeContext";
import ServerHeader from "../components/ServerHeader";
import DMNavigation from "../components/DMNavigation";
import ProfileButton from "../components/ProfileButton";
import { CHANNEL_IDS } from "../../data/mockChannelData";
import { mockFriends, mockFriendRequests, Friend, FriendRequest } from "../../data/mockFriendData";

export default function FriendsPage() {
  const { isDark, currentTheme } = useTheme();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<'online' | 'all' | 'pending' | 'suggestions'>('online');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const isChatRoomsActive = pathname?.startsWith('/app/chat-rooms') || false;
  const isDirectMessageActive = pathname?.startsWith('/app/friends') || pathname?.startsWith('/app/shop') || pathname?.startsWith('/app/quests');
  const isWorkflowActive = pathname?.startsWith('/app/workflow') || pathname?.startsWith('/app/asos') || pathname?.startsWith('/app/skill-cards') || false;
  const isDiscoverActive = pathname?.startsWith('/app/applications') || pathname?.startsWith('/app/spaces') || false;

  // Filter friends
  const filteredFriends = mockFriends.filter(friend => {
    const matchesSearch = friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         friend.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || (selectedTab === 'online' && friend.status === 'Online');
    return matchesSearch && matchesTab;
  });

  const incomingRequests = mockFriendRequests.filter(req => req.type === "incoming");
  const onlineCount = mockFriends.filter(f => f.status === "Online").length;

  const getStatusColor = (status: Friend["status"]) => {
    switch (status) {
      case "Online": return "bg-green-500";
      case "Idle": return "bg-yellow-500";
      case "Do Not Disturb": return "bg-red-500";
      case "Offline": return "bg-gray-500";
    }
  };

  const getActivityIcon = (type?: "Playing" | "Listening" | "Watching" | "Streaming" | "Working") => {
    if (!type) return "💼";
    switch (type) {
      case "Playing": return "🎮";
      case "Listening": return "🎵";
      case "Watching": return "📺";
      case "Streaming": return "📹";
      case "Working": return "💼";
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log("Accepting request:", requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejecting request:", requestId);
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
          
          <span className={`font-bold text-base drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Friends</span>
          
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
            className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`}
            title="Add Space"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Column 2 - Mobile */}
        <div className={`w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex flex-col shadow-2xl`}>
          <ServerHeader description="Connect with friends" />
          <DMNavigation />
          
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-bold mb-3 px-1 text-white/60">DIRECT MESSAGES</h3>
            <button className="w-full px-3 py-2.5 rounded-lg text-left mb-2 hover:bg-white/10 text-white/80">
              <span className="text-sm">+ Invite Friends</span>
            </button>
          </div>

          <ProfileButton />
        </div>
      </div>

      {/* COLUMN 2: Desktop Navigation & DMs */}
      <div className={`hidden md:flex relative z-10 w-60 h-full bg-gradient-to-b ${currentTheme.col2} border-r border-white/20 flex-col flex-shrink-0`}>
        <ServerHeader description="Connect with friends" />
        <DMNavigation />
        
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-xs font-bold mb-3 px-1 text-white/60">DIRECT MESSAGES</h3>
          <button className="w-full px-3 py-2.5 rounded-lg text-left mb-2 hover:bg-white/10 text-white/80">
            <span className="text-sm">+ Invite Friends</span>
          </button>
        </div>

        <ProfileButton />
      </div>

      {/* COLUMN 3: Friends Content */}
      <div className={`flex-1 flex flex-col relative z-10 md:mt-0 mt-14 min-h-0`}>
        {/* Header */}
        <div className={`flex-shrink-0 border-b ${isDark ? 'bg-gray-900/80 border-white/10' : 'bg-white/50 border-gray-200'} backdrop-blur-md`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Friends
                </h1>
                <span className={`text-sm px-2 py-0.5 rounded ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-400/30 text-green-800'}`}>
                  {onlineCount} Online
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-4">
              {(['online', 'all', 'pending', 'suggestions'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`text-sm capitalize font-medium transition-colors relative ${
                    selectedTab === tab
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-white/60 hover:text-white/80' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                  {tab === 'pending' && incomingRequests.length > 0 && (
                    <span className="absolute -top-1 -right-5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {incomingRequests.length}
                    </span>
                  )}
                  {selectedTab === tab && (
                    <div className={`absolute -bottom-4 left-0 right-0 h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'}`}></div>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            {(selectedTab === 'online' || selectedTab === 'all') && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border backdrop-blur-md transition-all duration-200 text-sm ${
                    isDark
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-cyan-400/50'
                      : 'bg-white/60 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white/80 focus:border-cyan-500'
                  }`}
                />
                <svg className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className={`flex-1 overflow-y-auto p-4 min-h-0 ${isDark ? 'bg-gray-900/40' : currentTheme.chatBg} backdrop-blur-md styled-scrollbar`}>
          {/* Friends List */}
          {(selectedTab === 'online' || selectedTab === 'all') && (
            <div className="space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend)}
                  className={`backdrop-blur-md rounded-xl p-4 border transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-400/50'
                      : 'bg-white/60 border-white/30 hover:bg-white/80 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar with Status */}
                    <div className="relative flex-shrink-0">
                      <div className="text-4xl">{friend.avatar}</div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(friend.status)}`}></div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {friend.displayName}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-white/10 text-white/60' : 'bg-gray-200 text-gray-700'}`}>
                          Level {friend.level}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        @{friend.username}
                      </p>

                      {friend.customStatus && (
                        <p className={`text-sm mb-2 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                          {friend.customStatus}
                        </p>
                      )}

                      {friend.activity && (
                        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                          <span>{getActivityIcon(friend.activity.type)}</span>
                          <span className="font-medium">{friend.activity.type}</span>
                          <span className={isDark ? 'text-white/60' : 'text-gray-600'}>{friend.activity.name}</span>
                        </div>
                      )}

                      {!friend.activity && friend.status === "Offline" && friend.lastOnline && (
                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                          Last seen {friend.lastOnline}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isDark
                            ? 'bg-white/10 hover:bg-white/15 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                        title="Send Message"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isDark
                            ? 'bg-white/10 hover:bg-white/15 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                        title="More Options"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredFriends.length === 0 && (
                <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="text-lg font-medium">No friends found</p>
                  <p className="text-sm">Try adjusting your search</p>
                </div>
              )}
            </div>
          )}

          {/* Friend Requests */}
          {selectedTab === 'pending' && (
            <div className="space-y-4">
              {incomingRequests.length > 0 && (
                <div>
                  <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Incoming Requests ({incomingRequests.length})
                  </h2>
                  <div className="space-y-2">
                    {incomingRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`backdrop-blur-md rounded-xl p-4 border ${
                          isDark
                            ? 'bg-white/10 border-white/20'
                            : 'bg-white/60 border-white/30'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{request.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {request.displayName}
                              </h3>
                              <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-white/10 text-white/60' : 'bg-gray-200 text-gray-700'}`}>
                                Level {request.level}
                              </span>
                            </div>
                            <p className={`text-sm mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                              @{request.username} • {request.mutualFriends} mutual friends
                            </p>
                            {request.message && (
                              <p className={`text-sm mb-3 p-2 rounded ${isDark ? 'bg-white/5 text-white/80' : 'bg-gray-100 text-gray-800'}`}>
                                "{request.message}"
                              </p>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isDark
                                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30'
                                    : 'bg-green-400/40 hover:bg-green-400/60 text-green-900 border border-green-500/40'
                                }`}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isDark
                                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30'
                                    : 'bg-red-400/40 hover:bg-red-400/60 text-red-900 border border-red-500/40'
                                }`}
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {incomingRequests.length === 0 && (
                <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium">No pending requests</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
          )}

          {/* Suggestions */}
          {selectedTab === 'suggestions' && (
            <div className={`text-center py-12 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              <svg className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-white/20' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">Friend Suggestions Coming Soon</p>
              <p className="text-sm">We'll suggest people you might know</p>
            </div>
          )}
        </div>
      </div>

      {/* Friend Profile Modal */}
      {selectedFriend && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setSelectedFriend(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-xl overflow-hidden border ${
              isDark
                ? 'bg-gray-800/95 border-white/20'
                : 'bg-white/95 border-gray-300'
            }`}
          >
            {/* Header */}
            <div className={`p-6 relative ${isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
              <button
                onClick={() => setSelectedFriend(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="text-7xl">{selectedFriend.avatar}</div>
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 ${isDark ? 'border-gray-800' : 'border-white'} ${getStatusColor(selectedFriend.status)}`}></div>
                </div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedFriend.displayName}
                </h2>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  @{selectedFriend.username}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedFriend.customStatus && (
                <div className="mb-4">
                  <h3 className={`text-sm font-bold mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>STATUS</h3>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFriend.customStatus}</p>
                </div>
              )}

              {selectedFriend.activity && (
                <div className="mb-4">
                  <h3 className={`text-sm font-bold mb-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>ACTIVITY</h3>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-xl">{getActivityIcon(selectedFriend.activity.type)}</span>
                    <div>
                      <p className="font-medium">{selectedFriend.activity.name}</p>
                      {selectedFriend.activity.details && (
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {selectedFriend.activity.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>LIFE FORM</h3>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFriend.lifeForm}</p>
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>LEVEL</h3>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFriend.level}</p>
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>MUTUAL FRIENDS</h3>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedFriend.mutualFriends}</p>
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>FRIENDS SINCE</h3>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(selectedFriend.friendSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isDark
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  }`}
                >
                  Send Message
                </button>
                <button
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
