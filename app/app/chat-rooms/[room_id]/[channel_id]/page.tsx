"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getChannelData, CHANNEL_IDS, type Channel, type Message, type VoiceUser } from "@/app/data/mockChannelData";

export default function ChatRoomPage({
  params,
}: {
  params: Promise<{ room_id: string; channel_id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedServer, setSelectedServer] = useState("planet");
  const [message, setMessage] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userStatus, setUserStatus] = useState<"active" | "busy" | "away">("active");
  const [isConnectedToVoice, setIsConnectedToVoice] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showVoiceChatPanel, setShowVoiceChatPanel] = useState(false);
  const [showControlMenu, setShowControlMenu] = useState(false);
  const [displayMode, setDisplayMode] = useState<'grid' | 'speaker' | 'sidebar'>('grid');
  const [voiceMessage, setVoiceMessage] = useState("");
  const [colorMode, setColorMode] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('colorMode');
      return (saved as 'light' | 'dark' | 'system') || 'dark';
    }
    return 'dark';
  });
  const [theme, setTheme] = useState<'blue' | 'purple' | 'green' | 'orange' | 'pink'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'blue' | 'purple' | 'green' | 'orange' | 'pink') || 'blue';
    }
    return 'blue';
  });
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVoiceEmojiPicker, setShowVoiceEmojiPicker] = useState(false);

  // Persist color mode and theme to localStorage
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Theme colors
  const themes = {
    blue: {
      light: { from: 'from-blue-400', via: 'via-cyan-400', to: 'to-teal-400', accent: 'cyan', col1: 'from-cyan-300 to-blue-400', col2: 'from-cyan-400 to-blue-500', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-cyan-500/30', accentRing: 'ring-cyan-300', accentHover: 'hover:bg-cyan-400/40', divider: 'bg-cyan-200/50' },
      dark: { from: 'from-blue-400', via: 'via-cyan-400', to: 'to-teal-400', accent: 'cyan', col1: 'from-cyan-600 to-blue-700', col2: 'from-cyan-700 to-blue-800', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-cyan-500/30', accentRing: 'ring-cyan-300', accentHover: 'hover:bg-cyan-400/40', divider: 'bg-cyan-200/50' }
    },
    purple: {
      light: { from: 'from-purple-400', via: 'via-pink-400', to: 'to-rose-400', accent: 'purple', col1: 'from-purple-300 to-pink-400', col2: 'from-purple-400 to-pink-500', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-purple-500/30', accentRing: 'ring-purple-300', accentHover: 'hover:bg-purple-400/40', divider: 'bg-purple-200/50' },
      dark: { from: 'from-purple-400', via: 'via-pink-400', to: 'to-rose-400', accent: 'purple', col1: 'from-purple-600 to-pink-700', col2: 'from-purple-700 to-pink-800', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-purple-500/30', accentRing: 'ring-purple-300', accentHover: 'hover:bg-purple-400/40', divider: 'bg-purple-200/50' }
    },
    green: {
      light: { from: 'from-emerald-400', via: 'via-teal-400', to: 'to-cyan-400', accent: 'emerald', col1: 'from-emerald-300 to-teal-400', col2: 'from-emerald-400 to-teal-500', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-emerald-500/30', accentRing: 'ring-emerald-300', accentHover: 'hover:bg-emerald-400/40', divider: 'bg-emerald-200/50' },
      dark: { from: 'from-emerald-400', via: 'via-teal-400', to: 'to-cyan-400', accent: 'emerald', col1: 'from-emerald-600 to-teal-700', col2: 'from-emerald-700 to-teal-800', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-emerald-500/30', accentRing: 'ring-emerald-300', accentHover: 'hover:bg-emerald-400/40', divider: 'bg-emerald-200/50' }
    },
    orange: {
      light: { from: 'from-orange-400', via: 'via-amber-400', to: 'to-yellow-400', accent: 'orange', col1: 'from-orange-300 to-amber-400', col2: 'from-orange-400 to-amber-500', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-orange-500/30', accentRing: 'ring-orange-300', accentHover: 'hover:bg-orange-400/40', divider: 'bg-orange-200/50' },
      dark: { from: 'from-orange-400', via: 'via-amber-400', to: 'to-yellow-400', accent: 'orange', col1: 'from-orange-600 to-amber-700', col2: 'from-orange-700 to-amber-800', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-orange-500/30', accentRing: 'ring-orange-300', accentHover: 'hover:bg-orange-400/40', divider: 'bg-orange-200/50' }
    },
    pink: {
      light: { from: 'from-pink-400', via: 'via-fuchsia-400', to: 'to-purple-400', accent: 'pink', col1: 'from-pink-300 to-fuchsia-400', col2: 'from-pink-400 to-fuchsia-500', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-pink-500/30', accentRing: 'ring-pink-300', accentHover: 'hover:bg-pink-400/40', divider: 'bg-pink-200/50' },
      dark: { from: 'from-pink-400', via: 'via-fuchsia-400', to: 'to-purple-400', accent: 'pink', col1: 'from-pink-600 to-fuchsia-700', col2: 'from-pink-700 to-fuchsia-800', iconColor: 'text-gray-700', iconColorDark: 'text-white', accentBg: 'bg-pink-500/30', accentRing: 'ring-pink-300', accentHover: 'hover:bg-pink-400/40', divider: 'bg-pink-200/50' }
    }
  };

  const isDark = colorMode === 'dark' || (colorMode === 'system' && true); // For now, system defaults to dark
  const currentTheme = themes[theme][isDark ? 'dark' : 'light'];

  // Emoji categories
  const emojiCategories = {
    'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔'],
    'Gestures': ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
    'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '❤️‍🔥', '❤️‍🩹', '💌'],
    'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋'],
    'Food': ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞', '🥖'],
    'Activities': ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🎽', '🛹', '🛼', '🎿', '🏂', '🪂', '🏋️', '🤸'],
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleVoiceEmojiSelect = (emoji: string) => {
    setVoiceMessage(prev => prev + emoji);
    setShowVoiceEmojiPicker(false);
  };

  // Current user data for voice channel
  const currentUser = {
    id: 'current-user',
    username: 'Reymark',
    userType: 'hybrid' as const,
    avatar: '/calling/10.jpeg',
    status: userStatus,
    isSpeaking: false,
    isMuted: isMuted,
    isDeafened: isDeafened,
    isVideo: isVideoOn,
    isScreenSharing: isScreenSharing,
  };

  // Load channel data when channel_id changes
  useEffect(() => {
    const channelData = getChannelData(resolvedParams.channel_id);
    
    // If channel not found by UUID, check if it's a legacy name and redirect
    if (!channelData) {
      const legacyName = resolvedParams.channel_id as keyof typeof CHANNEL_IDS;
      if (CHANNEL_IDS[legacyName]) {
        const uuid = CHANNEL_IDS[legacyName];
        router.replace(`/chat-rooms/1/${uuid}`);
        return;
      }
    }
    
    setCurrentChannel(channelData);
  }, [resolvedParams.channel_id, router]);

  const handleChannelClick = (channelName: keyof typeof CHANNEL_IDS) => {
    const channelId = CHANNEL_IDS[channelName];
    router.push(`/chat-rooms/1/${channelId}`);
    setShowMobileMenu(false);
  };

  const getStatusColor = (status: "active" | "busy" | "away") => {
    switch (status) {
      case "active":
        return "bg-green-400";
      case "busy":
        return "bg-red-500";
      case "away":
        return "bg-yellow-400";
    }
  };

  const getStatusText = (status: "active" | "busy" | "away") => {
    switch (status) {
      case "active":
        return "Active";
      case "busy":
        return "Busy";
      case "away":
        return "Away";
    }
  };

  const getUserTypeBadge = (userType: 'silicon' | 'carbon' | 'hybrid') => {
    switch (userType) {
      case 'silicon':
        return { emoji: '🤖', color: 'text-blue-400', bg: 'bg-blue-500/30', border: 'border-blue-400/30' };
      case 'carbon':
        return { emoji: '🧬', color: 'text-green-400', bg: 'bg-green-500/30', border: 'border-green-400/30' };
      case 'hybrid':
        return { emoji: '⚡', color: 'text-purple-400', bg: 'bg-gradient-to-r from-purple-500/30 to-pink-500/30', border: 'border-purple-400/30' };
    }
  };

  const handleVoiceChannelClick = (channelName: keyof typeof CHANNEL_IDS) => {
    const channelId = CHANNEL_IDS[channelName];
    router.push(`/chat-rooms/1/${channelId}`);
    setShowMobileMenu(false);
    // Automatically connect to voice channel
    const channelData = getChannelData(channelId);
    if (channelData?.type === 'voice') {
      setIsConnectedToVoice(true);
    }
  };

  const disconnectFromVoice = () => {
    setIsConnectedToVoice(false);
    setIsMuted(false);
    setIsDeafened(false);
    setIsVideoOn(false);
    setIsScreenSharing(false);
  };

  const userTypeBadge = (type: "silicon" | "carbon" | "hybrid") => {
    switch (type) {
      case "silicon":
        return <span className="text-xs px-2 py-0.5 bg-blue-400/30 text-blue-700 rounded font-semibold backdrop-blur-sm">🤖 Silicon</span>;
      case "carbon":
        return <span className="text-xs px-2 py-0.5 bg-green-400/30 text-green-700 rounded font-semibold backdrop-blur-sm">🧬 Carbon</span>;
      case "hybrid":
        return <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-purple-400/30 to-pink-400/30 text-purple-700 rounded font-semibold backdrop-blur-sm">⚡ Hybrid</span>;
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.from} ${currentTheme.via} ${currentTheme.to} animate-gradient-xy`}>
        <div className={`absolute inset-0 bg-gradient-to-tl ${currentTheme.from} ${currentTheme.via} ${currentTheme.to} opacity-70 animate-gradient-slow`}></div>
      </div>

      {/* Dark Overlay - Show when menu is open on mobile */}
      {showMobileMenu && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => {
            setShowMobileMenu(false);
          }}
        ></div>
      )}

      {/* Mobile Header - Single Row */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDark ? 'bg-gray-900/60 border-white/20' : 'bg-white/80 border-gray-300'}`}>
        <div className="h-14 px-4 flex items-center justify-between">
          {/* Menu Icon - Opens both columns together */}
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
            className={`w-10 h-10 backdrop-blur-md rounded-lg flex items-center justify-center transition-all duration-200 border ${
              isDark 
                ? 'bg-white/20 hover:bg-white/30 border-white/30' 
                : 'bg-gray-200 hover:bg-gray-300 border-gray-300'
            }`}
          >
            <svg className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Channel Name - Center */}
          <div className="flex items-center gap-2">
            <svg className={`w-5 h-5 ${isDark ? 'text-white/80' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className={`font-bold text-base drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentChannel?.name || 'general'}</span>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Chat Button - Only show in voice channels on mobile */}
            {currentChannel?.type === 'voice' && (
              <button 
                onClick={() => setShowVoiceChatPanel(!showVoiceChatPanel)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  showVoiceChatPanel 
                    ? 'bg-cyan-500/80 text-white' 
                    : isDark
                    ? 'hover:bg-white/20 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                title="Toggle Chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            )}
            <button className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-white/20' : 'hover:bg-gray-200'
            }`}>
              <svg className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* COLUMN 1: Server Navigation Sidebar */}
      <div className={`${showMobileMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-[60] w-[70px] h-full bg-gradient-to-b ${currentTheme.col1} md:bg-white/10 md:backdrop-blur-lg border-r border-white/20 flex flex-col items-center py-3 gap-2 transition-transform duration-300 ${showMobileMenu ? "top-0" : "top-0"} md:top-auto shadow-2xl md:shadow-none`}>
        {/* Home */}
        <Link href="/">
          <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200">
            <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </Link>
        
        <div className={`w-8 h-0.5 ${currentTheme.divider} rounded-full my-1`}></div>
        
        {/* Servers */}
        <button 
          onClick={() => setSelectedServer("planet")}
          className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${selectedServer === "planet" ? `!${currentTheme.accentBg} ${currentTheme.accentRing} ring-2` : ""}`}
        >
          <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
        
        <button 
          onClick={() => setSelectedServer("quest")}
          className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${selectedServer === "quest" ? `!${currentTheme.accentBg} ${currentTheme.accentRing} ring-2` : ""}`}
        >
          <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        
        <button 
          onClick={() => setSelectedServer("workshop")}
          className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all duration-200 relative ${selectedServer === "workshop" ? `!${currentTheme.accentBg} ${currentTheme.accentRing} ring-2` : ""}`}
        >
          <svg className={`w-5 h-5 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        {/* Add Server */}
        <button className={`w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center ${currentTheme.accentHover} transition-all duration-200 ${isDark ? currentTheme.iconColorDark : currentTheme.iconColor}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* COLUMN 2: Channel List & User Profile */}
      <div className={`${showMobileMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-[60] w-60 h-full bg-gradient-to-b ${currentTheme.col2} md:bg-white/10 md:backdrop-blur-lg border-r border-white/20 flex flex-col transition-transform duration-300 ${showMobileMenu ? "top-0 left-[70px]" : "top-0"} md:top-auto md:left-auto shadow-2xl md:shadow-none`}>
        {/* Server Header - Hidden on mobile */}
        <div className="hidden md:flex h-12 px-4 items-center justify-between border-b border-white/20 hover:bg-white/10 cursor-pointer">
          <h2 className={`font-bold drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>BoloboloMi</h2>
          <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>▼</span>
        </div>

        {/* Mobile Header for Sidebar - Only visible on mobile when sidebar is open */}
        <div className="md:hidden h-[56px] px-4 flex flex-col justify-center border-b border-white/30">
          <h2 className={`font-bold drop-shadow-lg text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>BoloboloMi Server</h2>
          <p className={`text-xs mt-1 ${isDark ? 'text-white/90' : 'text-gray-700'}`}>Select a channel to chat</p>
        </div>

        {/* Action Buttons - Create Category & Invite Member */}
        <div className="px-2 py-2 border-b border-white/20 space-y-1.5">
          <button className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 w-full font-medium border ${isDark ? 'text-white/90 border-white/30' : 'text-gray-800 border-gray-700/30'}`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Category
          </button>
          <button className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 w-full font-medium border ${isDark ? 'text-white/90 border-white/30' : 'text-gray-800 border-gray-700/30'}`}>
            <svg className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Invite Member
          </button>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto px-2 py-2 chat-scrollbar">{/* Added custom scrollbar styling */}
          {/* TEXT CHANNELS */}
          <div className="mb-4">
            <div className={`text-xs font-bold px-2 mb-1 flex items-center justify-between drop-shadow group ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
              <div className="flex items-center gap-1">
                <span>▼</span> TEXT CHANNELS
              </div>
              <button className={`opacity-0 group-hover:opacity-100 hover:bg-white/30 rounded p-0.5 transition-all duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`} title="Create Channel">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-0.5">
              <div 
                onClick={() => handleChannelClick('welcome')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center justify-between transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>#</span> welcome
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center">3</span>
              </div>
              <div 
                onClick={() => handleChannelClick('general')}
                className={`text-sm px-2 py-1.5 rounded cursor-pointer flex items-center gap-2 transition-all duration-200 ${
                  resolvedParams.channel_id === CHANNEL_IDS.general
                    ? 'bg-white/30 text-white font-semibold shadow-sm' 
                    : 'hover:bg-white/20 text-white/80'
                }`}
              >
                  <span className={isDark ? 'text-white/80' : 'text-gray-800'}>#</span> general
              </div>
              <div 
                onClick={() => handleChannelClick('announcements')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <span className="text-white/60">#</span> announcements
              </div>
              <div 
                onClick={() => handleChannelClick('team-leads')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <span className="text-white/60">🔒</span> team-leads
              </div>
              <div 
                onClick={() => handleChannelClick('ai-research')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center justify-between transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>🔒</span> ai-research
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center">5</span>
              </div>
              <div 
                onClick={() => handleChannelClick('vip-lounge')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <span className="text-white/60">🔒</span> vip-lounge
              </div>
            </div>
          </div>

          {/* COMMUNICATION */}
          <div className="mb-4">
            <div className={`text-xs font-bold px-2 mb-1 flex items-center justify-between drop-shadow group ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
              <div className="flex items-center gap-1">
                <span>▼</span> COMMUNICATION
              </div>
              <button className={`opacity-0 group-hover:opacity-100 hover:bg-white/30 rounded p-0.5 transition-all duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`} title="Create Channel">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-0.5">
              <div 
                onClick={() => handleChannelClick('silicon-chat')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center justify-between transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>#</span> silicon-chat <span className="text-xs">🤖</span>
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center">12</span>
              </div>
              <div 
                onClick={() => handleChannelClick('carbon-chat')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <span className="text-white/60">#</span> carbon-chat <span className="text-xs">🧬</span>
              </div>
              <div 
                onClick={() => handleChannelClick('hybrid-lounge')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center justify-between transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-white/60' : 'text-gray-600'}>#</span> hybrid-lounge <span className="text-xs">⚡</span>
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center">7</span>
              </div>
              <div 
                onClick={() => handleChannelClick('random')}
                className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}
              >
                <span className="text-white/60">#</span> random
              </div>
            </div>
          </div>

          {/* VOICE CHANNELS */}
          <div className="mb-4">
            <div className={`text-xs font-bold px-2 mb-1 flex items-center justify-between drop-shadow group ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
              <div className="flex items-center gap-1">
                <span>▼</span> VOICE CHANNELS
              </div>
              <button className={`opacity-0 group-hover:opacity-100 hover:bg-white/30 rounded p-0.5 transition-all duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`} title="Create Voice Channel">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-0.5">
              {[
                { name: 'general-voice', label: 'General Voice' },
                { name: 'meeting-room-1', label: 'Meeting Room 1' },
                { name: 'meeting-room-2', label: 'Meeting Room 2' },
                { name: 'afk-channel', label: 'AFK Channel' },
              ].map((vc) => {
                const vcData = getChannelData(CHANNEL_IDS[vc.name as keyof typeof CHANNEL_IDS]);
                const userCount = vcData?.voiceUsers?.length || 0;
                const userLimit = vcData?.userLimit || 0;
                const isCurrentChannel = currentChannel?.id === vcData?.id;
                
                return (
                  <div key={vc.name}>
                    <div 
                      onClick={() => handleVoiceChannelClick(vc.name as keyof typeof CHANNEL_IDS)}
                      className={`text-sm px-2 py-1.5 rounded cursor-pointer flex items-center justify-between transition-all duration-200 ${
                        isCurrentChannel
                          ? isDark ? 'bg-white/30 text-white font-semibold' : 'bg-gray-700/30 text-gray-900 font-semibold'
                          : isDark ? 'text-white/80 hover:bg-white/20' : 'text-gray-800 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>🔊</span> {vc.label}
                      </div>
                      {userCount > 0 && (
                        <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          <span>{userCount}{userLimit > 0 ? `/${userLimit}` : ''}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Show connected users */}
                    {userCount > 0 && (
                      <div className="ml-6 mt-1 space-y-1">
                        {vcData?.voiceUsers?.map((user) => (
                          <div key={user.id} className={`flex items-center gap-2 px-2 py-1 text-xs hover:bg-white/10 rounded group ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                            <div className="relative">
                              <div className={`w-6 h-6 rounded-full ${getUserTypeBadge(user.userType).bg} flex items-center justify-center text-xs border ${getUserTypeBadge(user.userType).border}`}>
                                {user.avatar.slice(0, 2)}
                              </div>
                              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${getStatusColor(user.status)} rounded-full border border-white/20`}></div>
                            </div>
                            <span className="flex-1">{user.username}</span>
                            <div className="flex items-center gap-1 opacity-70">
                              {user.isSpeaking && (
                                <div className="w-4 h-4 bg-green-500/30 rounded-full flex items-center justify-center animate-pulse">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                              )}
                              {user.isScreenSharing && (
                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                              {user.isVideo && (
                                <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                              {user.isMuted && (
                                <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                              )}
                              {user.isDeafened && (
                                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* DIRECT MESSAGES */}
          <div className="mb-4">
            <div className={`text-xs font-bold px-2 mb-1 flex items-center gap-1 drop-shadow ${isDark ? 'text-white/80' : 'text-gray-900'}`}>
              <span>▼</span> DIRECT MESSAGES
            </div>
            
            <div className="space-y-0.5">
              {/* NeuralNet_Alex - Silicon AI - Online - Unread */}
              <div className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center justify-between transition-all duration-200 group ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-base font-bold text-white border-2 border-blue-300/50 shadow-lg">
                      NA
                    </div>
                    {/* Online Status */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium truncate">NeuralNet_Alex</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-blue-500/80 text-white px-1.5 py-0.5 rounded font-semibold">🤖 Silicon</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center flex-shrink-0 ml-1">2</span>
              </div>
              
              {/* Sarah_Chen - Carbon Human - Away */}
              <div className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-base font-bold text-white border-2 border-green-300/50 shadow-lg">
                    SC
                  </div>
                  {/* Away Status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate">Sarah_Chen</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-green-500/80 text-white px-1.5 py-0.5 rounded font-semibold">🧬 Carbon</span>
                  </div>
                </div>
              </div>
              
              {/* Hybrid_Marcus - Hybrid - Do Not Disturb - Unread */}
              <div className="text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer text-white/80 flex items-center justify-between transition-all duration-200">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 flex items-center justify-center text-base font-bold text-white border-2 border-purple-300/50 shadow-lg">
                      HM
                    </div>
                    {/* Do Not Disturb Status */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium truncate">Hybrid_Marcus</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded font-semibold">⚡ Hybrid</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 font-bold min-w-[20px] text-center flex-shrink-0 ml-1">8</span>
              </div>
              
              {/* Quantum_AI - Silicon AI - Online */}
              <div className={`text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer flex items-center gap-2 transition-all duration-200 ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-base font-bold text-white border-2 border-cyan-300/50 shadow-lg">
                    QA
                  </div>
                  {/* Online Status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate">Quantum_AI</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-blue-500/80 text-white px-1.5 py-0.5 rounded font-semibold">🤖 Silicon</span>
                  </div>
                </div>
              </div>
              
              {/* Emma_Rivera - Carbon Human - Offline */}
              <div className="text-sm px-2 py-1.5 rounded hover:bg-white/20 cursor-pointer text-white/80 flex items-center gap-2 transition-all duration-200 opacity-70">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-green-600 flex items-center justify-center text-base font-bold text-white border-2 border-teal-300/50 shadow-lg">
                    ER
                  </div>
                  {/* Offline Status */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate">Emma_Rivera</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] bg-green-500/80 text-white px-1.5 py-0.5 rounded font-semibold">🧬 Carbon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Panel */}
        <div 
          onClick={() => setShowProfileModal(true)}
          className="h-14 bg-white/10 backdrop-blur-md px-2 flex items-center gap-2 border-t border-white/20 cursor-pointer hover:bg-white/15 transition-all duration-200"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/60 to-pink-500/60 backdrop-blur-sm flex items-center justify-center text-sm border border-white/30 shadow-lg">
              ⚡
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(userStatus)} rounded-full border-2 border-white shadow-sm`}></div>
          </div>
          <div className="flex-1 text-xs">
            <div className="font-semibold text-white drop-shadow">Reymark</div>
            <div className="text-white/70 text-[10px]">{getStatusText(userStatus)}</div>
          </div>
          <button className="w-6 h-6 hover:bg-white/20 rounded flex items-center justify-center transition-all duration-200" title="Mute">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="w-6 h-6 hover:bg-white/20 rounded flex items-center justify-center transition-all duration-200" title="Headphones">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          <button className="w-6 h-6 hover:bg-white/20 rounded flex items-center justify-center transition-all duration-200" title="Settings">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* COLUMN 3: Main Chat Area */}
      <div className="relative flex-1 flex flex-col h-[calc(100vh-56px)] md:h-auto mt-[56px] md:mt-0">{/* Account for mobile header height */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gray-900/60' : 'bg-white/80'} backdrop-blur-md`}></div>
        <div className="relative flex flex-1 overflow-hidden">{/* Remove margin from here */}
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar - Hidden on mobile, already in mobile header */}
            <div className={`hidden md:flex h-12 px-4 items-center justify-between backdrop-blur-md border-b flex-shrink-0 min-h-[48px] ${isDark ? 'border-white/20' : 'border-gray-300'}`}>
              <div className="flex items-center gap-2">
                {currentChannel?.type === 'voice' ? (
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/80' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 ${isDark ? 'text-white/80' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                )}
                <span className={`font-bold drop-shadow-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentChannel?.name || 'general'}</span>
                <span className={`text-sm ml-2 hidden sm:block ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{currentChannel?.topic || 'Welcome to the channel'}</span>
              </div>
              <div className={`flex items-center gap-4 ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                {/* Chat Button - Only show in voice channels */}
                {currentChannel?.type === 'voice' && (
                  <button
                    onClick={() => setShowVoiceChatPanel(!showVoiceChatPanel)}
                    className={`hover:text-white transition-colors ${showVoiceChatPanel ? 'text-cyan-400' : ''}`}
                    title="Toggle Chat"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                )}
                <button className="hover:text-white transition-colors" title="Search">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="hover:text-white transition-colors" title="Pinned Messages">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <button className="hover:text-white transition-colors" title="Help">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Voice Channel View */}
            {currentChannel?.type === 'voice' ? (
              <div className="flex-1 flex flex-col relative h-full overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden relative min-h-0">
                  {/* Video/Voice Display Area */}
                  <div className={`flex-1 flex flex-col ${showVoiceChatPanel ? 'pr-0' : ''} min-h-0`}>
                    {/* Connected Users Display */}
                    {(() => {
                      // Merge current user with existing voice users when connected
                      const allVoiceUsers = isConnectedToVoice 
                        ? [currentUser, ...(currentChannel.voiceUsers || [])]
                        : (currentChannel.voiceUsers || []);
                      
                      return allVoiceUsers.length > 0 ? (
                        <div className="flex-1 p-2 md:p-4 overflow-hidden">
                          {/* Grid Display Mode - Google Meet Style */}
                          {displayMode === 'grid' && (
                            <div className={`grid gap-1 md:gap-2 h-full w-full ${
                              allVoiceUsers.length === 1 
                                ? 'grid-cols-1 place-items-center' 
                                : allVoiceUsers.length === 2
                                ? 'grid-cols-1 md:grid-cols-2 auto-rows-fr'
                                : allVoiceUsers.length === 3
                                ? 'grid-cols-2 auto-rows-fr'
                                : allVoiceUsers.length === 4
                                ? 'grid-cols-2 grid-rows-2'
                                : allVoiceUsers.length <= 6
                                ? 'grid-cols-2 md:grid-cols-3 auto-rows-fr'
                                : allVoiceUsers.length <= 9
                                ? 'grid-cols-3 auto-rows-fr'
                                : allVoiceUsers.length <= 12
                                ? 'grid-cols-3 md:grid-cols-4 auto-rows-fr'
                                : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr overflow-y-auto'
                            }`}>
                              {allVoiceUsers.map((user) => {
                                const badge = getUserTypeBadge(user.userType);
                                const isSingleUser = allVoiceUsers.length === 1;
                              
                              return (
                                <div
                                  key={user.id}
                                  className={`relative backdrop-blur-lg rounded-xl overflow-hidden border transition-all duration-200 ${
                                    isDark 
                                      ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50' 
                                      : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                  } ${
                                    user.id === 'current-user'
                                      ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                                      : user.isSpeaking
                                      ? isDark
                                        ? 'border-green-300/50 shadow-[0_0_20px_rgba(134,239,172,0.4)] bg-green-900/10'
                                        : 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-green-100'
                                      : isDark
                                      ? 'border-white/20'
                                      : 'border-gray-300'
                                  } ${
                                    isSingleUser 
                                      ? 'aspect-video max-w-4xl w-full' 
                                      : 'aspect-video w-full h-full min-h-0'
                                  }`}
                                >
                                  {/* Video Feed */}
                                  <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                    {user.isScreenSharing ? (
                                      <img 
                                        src="/calling/9.jpeg" 
                                        alt="Screen sharing content"
                                        className="w-full h-full object-cover"
                                      />
                                    ) : user.avatar.startsWith('/calling/') ? (
                                      <img 
                                        src={user.avatar} 
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className={`${
                                        isSingleUser 
                                          ? 'w-32 h-32 md:w-48 md:h-48 text-6xl md:text-8xl' 
                                          : allVoiceUsers.length <= 4
                                          ? 'w-24 h-24 md:w-32 md:h-32 text-4xl md:text-5xl'
                                          : 'w-16 h-16 md:w-24 md:h-24 text-2xl md:text-4xl'
                                      } rounded-full ${badge.bg} flex items-center justify-center font-bold text-white border-4 ${badge.border} shadow-2xl`}>
                                        {user.avatar}
                                      </div>
                                    )}
                                  </div>

                                  {/* Speaking Indicator - Subtle Glow */}
                                  {user.isSpeaking && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 pointer-events-none rounded-xl"></div>
                                  )}

                                  {/* User Info Overlay */}
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <p className="font-semibold text-white text-xs md:text-sm drop-shadow-lg truncate">{user.username}</p>
                                      </div>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {user.isSpeaking && (
                                          <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-200 rounded-full"></div>
                                          </div>
                                        )}
                                        {user.isScreenSharing && (
                                          <div className="p-0.5 md:p-1 bg-green-500/80 rounded">
                                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                          </div>
                                        )}
                                        {user.isMuted && (
                                          <div className="p-0.5 md:p-1 bg-red-500/80 rounded">
                                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                            </svg>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Live Badge for Screen Sharing */}
                                  {user.isScreenSharing && (
                                    <div className="absolute top-2 right-2">
                                      <div className="px-2 py-0.5 md:px-2.5 md:py-1 bg-green-500 rounded-full flex items-center gap-1 md:gap-1.5 shadow-lg">
                                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse"></div>
                                        <span className="text-white text-[10px] md:text-xs font-bold">LIVE</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Speaker View Mode */}
                        {displayMode === 'speaker' && allVoiceUsers.length > 0 && (
                          <div className="flex flex-col gap-2 md:gap-4 h-full overflow-hidden">
                            {/* Main Speaker (First or Speaking User) */}
                            {(() => {
                              const speakingUser = allVoiceUsers.find(u => u.isSpeaking) || allVoiceUsers[0];
                              const badge = getUserTypeBadge(speakingUser.userType);
                              return (
                                <div className={`flex-1 relative backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden border transition-all duration-200 min-h-0 ${
                                  isDark 
                                    ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50' 
                                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                } ${
                                  speakingUser.id === 'current-user'
                                    ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                                    : speakingUser.isSpeaking 
                                    ? isDark
                                      ? 'border-green-300/50 shadow-[0_0_20px_rgba(134,239,172,0.4)] bg-green-900/10'
                                      : 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-green-100'
                                    : isDark
                                    ? 'border-white/20'
                                    : 'border-gray-300'
                                }`}>
                                  <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                    {speakingUser.avatar.startsWith('/calling/') ? (
                                      <img 
                                        src={speakingUser.avatar} 
                                        alt={speakingUser.username}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className={`w-48 h-48 rounded-full ${badge.bg} flex items-center justify-center text-7xl font-bold text-white border-4 ${badge.border} shadow-2xl`}>
                                        {speakingUser.avatar}
                                      </div>
                                    )}
                                  </div>
                                  {speakingUser.isSpeaking && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 pointer-events-none rounded-2xl"></div>
                                  )}
                                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                    <p className="font-bold text-white text-xl drop-shadow-lg">{speakingUser.username}</p>
                                  </div>
                                </div>
                              );
                            })()}
                            
                            {/* Other Participants */}
                            {allVoiceUsers.length > 1 && (
                              <div className={`w-full backdrop-blur-sm rounded-xl md:rounded-2xl p-2 md:p-3 flex-shrink-0 overflow-hidden ${
                                isDark ? 'bg-white/5' : 'bg-gray-200/80'
                              }`}>
                                <div className="flex gap-1 md:gap-2 overflow-x-auto horizontal-scrollbar pb-1">
                                  {allVoiceUsers.map((user) => {
                                    const badge = getUserTypeBadge(user.userType);
                                    return (
                                      <div
                                        key={user.id}
                                        className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 relative backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden border transition-all duration-200 ${
                                          isDark ? 'bg-white/10' : 'bg-gray-100'
                                        } ${
                                          user.id === 'current-user'
                                            ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                            : user.isSpeaking 
                                            ? isDark
                                              ? 'border-green-300/50 shadow-[0_0_15px_rgba(134,239,172,0.3)]'
                                              : 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                            : isDark
                                            ? 'border-white/20'
                                            : 'border-gray-300'
                                        }`}
                                      >
                                        <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                          {user.avatar.startsWith('/calling/') ? (
                                            <img 
                                              src={user.avatar} 
                                              alt={user.username}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <div className={`w-16 h-16 rounded-full ${badge.bg} flex items-center justify-center text-xl font-bold text-white`}>
                                              {user.avatar.slice(0, 2)}
                                            </div>
                                          )}
                                        </div>
                                        {user.isSpeaking && (
                                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 pointer-events-none rounded-xl"></div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Sidebar Mode */}
                        {displayMode === 'sidebar' && allVoiceUsers.length > 0 && (
                          <div className="flex gap-4 h-full">
                            {/* Main View */}
                            <div className={`flex-1 relative backdrop-blur-lg rounded-2xl overflow-hidden border ${
                              isDark 
                                ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-white/20' 
                                : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300'
                            }`}>
                              {(() => {
                                const mainUser = allVoiceUsers[0];
                                const badge = getUserTypeBadge(mainUser.userType);
                                return (
                                  <>
                                    <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                      {mainUser.avatar.startsWith('/calling/') ? (
                                        <img 
                                          src={mainUser.avatar} 
                                          alt={mainUser.username}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className={`w-48 h-48 rounded-full ${badge.bg} flex items-center justify-center text-7xl font-bold text-white border-4 ${badge.border} shadow-2xl`}>
                                          {mainUser.avatar}
                                        </div>
                                      )}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                      <p className="font-bold text-white text-xl drop-shadow-lg">{mainUser.username}</p>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                            
                            {/* Sidebar */}
                            <div className="w-48 flex flex-col gap-3 overflow-y-auto chat-scrollbar">
                              {allVoiceUsers.map((user) => {
                                const badge = getUserTypeBadge(user.userType);
                                return (
                                  <div
                                    key={user.id}
                                    className={`relative bg-white/10 backdrop-blur-lg rounded-xl p-3 border transition-all duration-200 ${
                                      user.id === 'current-user'
                                        ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                                        : user.isSpeaking 
                                        ? 'border-green-300/50 shadow-[0_0_15px_rgba(134,239,172,0.3)] bg-green-900/5' 
                                        : 'border-white/20'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-900 flex-shrink-0">
                                        {user.avatar.startsWith('/calling/') ? (
                                          <img 
                                            src={user.avatar} 
                                            alt={user.username}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className={`w-full h-full ${badge.bg} flex items-center justify-center text-sm font-bold text-white`}>
                                            {user.avatar.slice(0, 2)}
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-white text-xs font-semibold truncate">{user.username}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Empty State */
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-24 h-24 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <p className="text-white/60 text-lg font-semibold mb-2">No one is here yet</p>
                          <p className="text-white/40 text-sm">Be the first to join this voice channel!</p>
                        </div>
                      </div>
                    );
                    })()}

                    {/* Bottom Control Bar */}
                    <div className="px-2 py-3 md:px-4 md:py-4 flex items-center justify-between flex-shrink-0">
                      {/* Bottom Left: Invite Button */}
                      <button 
                        className={`p-2.5 md:p-3 rounded-full backdrop-blur-lg transition-all duration-200 ${
                          isDark 
                            ? 'bg-white/20 hover:bg-white/30 text-white' 
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                        }`}
                        title="Invite"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </button>

                      {/* Bottom Center: Control Buttons */}
                      <div className="flex items-center gap-2 md:gap-3">
                        {/* Audio/Video Controls Group */}
                        <div className={`relative flex items-center gap-1.5 md:gap-2 backdrop-blur-lg rounded-full p-1 md:p-1.5 ${
                          isDark ? 'bg-white/10' : 'bg-gray-200/80'
                        }`}>
                          {/* Mic Button */}
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                              isMuted
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : isDark
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                            }`}
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? (
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                              </svg>
                            )}
                          </button>

                          {/* Video Button */}
                          <button
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                              isVideoOn
                                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                : isDark
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                            }`}
                            title={isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>

                          {/* Settings Menu Button */}
                          <button
                            onClick={() => setShowControlMenu(!showControlMenu)}
                            className={`p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                              isDark 
                                ? 'bg-white/20 hover:bg-white/30 text-white' 
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                            }`}
                            title="More Options"
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>

                          {/* Control Menu Popup */}
                          {showControlMenu && (
                            <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 backdrop-blur-xl rounded-xl p-2 shadow-2xl border min-w-[200px] ${
                              isDark 
                                ? 'bg-white/10 border-white/20' 
                                : 'bg-white border-gray-300'
                            }`}>
                              <button
                                onClick={() => {
                                  setIsDeafened(!isDeafened);
                                  setShowControlMenu(false);
                                }}
                                className={`w-full px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                                  isDark 
                                    ? 'text-white hover:bg-white/20' 
                                    : 'text-gray-900 hover:bg-gray-200'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                                {isDeafened ? 'Undeafen' : 'Deafen'}
                              </button>
                              <button className={`w-full px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm ${
                                isDark 
                                  ? 'text-white hover:bg-white/20' 
                                  : 'text-gray-900 hover:bg-gray-200'
                              }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Screen Share Group */}
                        <div className={`flex items-center gap-1.5 md:gap-2 backdrop-blur-lg rounded-full p-1 md:p-1.5 ${
                          isDark ? 'bg-white/10' : 'bg-gray-200/80'
                        }`}>
                          <button
                            onClick={() => setIsScreenSharing(!isScreenSharing)}
                            className={`p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                              isScreenSharing
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : isDark
                                ? 'bg-white/20 hover:bg-white/30 text-white'
                                : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                            }`}
                            title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>

                          {/* Display Mode Button */}
                          <div className="relative">
                            <button
                              onClick={() => {
                                const modes: ('grid' | 'speaker' | 'sidebar')[] = ['grid', 'speaker', 'sidebar'];
                                const currentIndex = modes.indexOf(displayMode);
                                setDisplayMode(modes[(currentIndex + 1) % modes.length]);
                              }}
                              className={`p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                                isDark 
                                  ? 'bg-white/20 hover:bg-white/30 text-white' 
                                  : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                              }`}
                              title="Change Display Mode"
                            >
                              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Disconnect Button */}
                        <button
                          onClick={disconnectFromVoice}
                          className="p-2.5 md:p-3 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200"
                          title="Disconnect"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                          </svg>
                        </button>
                      </div>

                      {/* Bottom Right: Full Screen Button */}
                      <button
                        onClick={() => {
                          if (document.fullscreenElement) {
                            document.exitFullscreen();
                          } else {
                            document.documentElement.requestFullscreen();
                          }
                        }}
                        className={`p-2.5 md:p-3 rounded-full backdrop-blur-lg transition-all duration-200 ${
                          isDark 
                            ? 'bg-white/20 hover:bg-white/30 text-white' 
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                        }`}
                        title="Toggle Fullscreen"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Chat Panel (Sidebar on desktop, Overlay on mobile) */}
                  {showVoiceChatPanel && (
                    <>
                      {/* Semi-transparent backdrop overlay (mobile only) */}
                      <div 
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setShowVoiceChatPanel(false)}
                      />
                      
                      {/* Chat Panel */}
                      <div className="fixed md:relative inset-0 md:inset-auto md:w-96 md:border-l border-white/20 bg-white/5 backdrop-blur-md flex flex-col z-50 md:z-auto">
                        {/* Chat Header */}
                        <div className="h-12 px-4 flex items-center justify-between border-b border-white/20 flex-shrink-0">
                          <h3 className="font-bold text-white">Chat</h3>
                          <button
                            onClick={() => setShowVoiceChatPanel(false)}
                            className="p-1 hover:bg-white/20 rounded transition-all duration-200"
                          >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scrollbar">
                          {currentChannel?.messages && currentChannel.messages.length > 0 ? (
                            currentChannel.messages.map((msg) => (
                              <div key={msg.id} className="group">
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border flex-shrink-0 ${
                                    msg.userType === 'silicon' ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300/50' :
                                    msg.userType === 'carbon' ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-green-300/50' :
                                    'bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 border-purple-300/50'
                                  }`}>
                                    {msg.avatar.slice(0, 2)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2">
                                      <span className="font-semibold text-white text-sm">{msg.username}</span>
                                      <span className="text-xs text-white/50">{msg.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-white/80 mt-0.5">{msg.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12">
                              <p className="text-white/40 text-sm">No messages yet</p>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 border-t border-white/20 relative">
                          {/* Emoji Picker for Voice Chat */}
                          {showVoiceEmojiPicker && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowVoiceEmojiPicker(false)}
                              ></div>
                              <div className="absolute bottom-full right-4 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-300 p-4 w-80 max-h-96 overflow-y-auto z-50 animate-fadeIn">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-bold text-gray-900 text-sm">Emojis</h3>
                                  <button 
                                    onClick={() => setShowVoiceEmojiPicker(false)}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                                {Object.entries(emojiCategories).map(([category, emojis]) => (
                                  <div key={category} className="mb-4">
                                    <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
                                    <div className="grid grid-cols-8 gap-1">
                                      {emojis.map((emoji, idx) => (
                                        <button
                                          key={idx}
                                          onClick={() => handleVoiceEmojiSelect(emoji)}
                                          className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          
                          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 flex items-center gap-2 px-3 py-2">
                            <button className="text-white/60 hover:text-white transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                            <input
                              type="text"
                              placeholder="Send a message..."
                              value={voiceMessage}
                              onChange={(e) => setVoiceMessage(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && voiceMessage.trim()) {
                                  // Handle sending message
                                  setVoiceMessage('');
                                }
                              }}
                              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-white/40"
                            />
                            <button 
                              onClick={() => setShowVoiceEmojiPicker(!showVoiceEmojiPicker)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Join Voice Channel Button - Show when not connected */}
                {!isConnectedToVoice && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                    <button
                      onClick={() => setIsConnectedToVoice(true)}
                      className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-2xl transition-all duration-200 flex items-center gap-3 text-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      Join Voice Channel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Text Channel View */
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 chat-scrollbar">
              <div className={`text-xs text-center mb-4 font-semibold drop-shadow ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                ─────  October 27, 2025  ─────
              </div>

              {currentChannel?.messages.map((msg, msgIndex) => {
                const isExpanded = expandedMessageId === msg.id;
                const isRead = msgIndex < currentChannel.messages.length - 3; // Mock: last 3 messages are unread
                
                return (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 px-4"
                  onClick={() => setExpandedMessageId(isExpanded ? null : msg.id)}
                >
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold border-2 shadow-lg flex-shrink-0 cursor-pointer ${
                    msg.userType === 'silicon' ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300/50' :
                    msg.userType === 'carbon' ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-green-300/50' :
                    'bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 border-purple-300/50'
                  } text-white`}>
                    {msg.avatar}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex-1 min-w-0 group">
                    
                    {/* Bubble Container */}
                    <div className="flex flex-col gap-1">
                      {/* Message Bubble */}
                      <div className={`inline-block rounded-2xl px-4 py-2 max-w-[85%] cursor-pointer transition-all duration-200 ${
                        isDark 
                          ? 'bg-white/15 hover:bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                          {msg.content}
                        </p>

                        {/* Attachments */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((att, idx) => (
                              <div key={idx} className={`inline-block rounded-lg px-2 py-1 text-xs ${
                                isDark ? 'bg-white/20 text-white' : 'bg-white/80 text-gray-900'
                              }`}>
                                📎 {att.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Timestamp and Read Status - Show on click */}
                      {isExpanded && (
                        <div className="flex items-center gap-2 px-2 animate-fadeIn">
                          <span className={`text-[10px] ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </span>
                          {msg.edited && (
                            <span className={`text-[10px] italic ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                              (edited)
                            </span>
                          )}
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            isRead 
                              ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
                              : isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {isRead ? '✓ Read' : 'Unread'}
                          </span>
                        </div>
                      )}

                      {/* Reactions */}
                      {msg.reactions && msg.reactions.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap px-2">
                          {msg.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 transition-all duration-200 border ${
                                isDark 
                                  ? 'bg-white/15 hover:bg-white/25 border-white/20' 
                                  : 'bg-gray-200 hover:bg-gray-300 border-gray-300'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{reaction.emoji}</span>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Reply count */}
                      {msg.replies && msg.replies > 0 && (
                        <button 
                          className={`text-xs font-semibold flex items-center gap-1 transition-colors px-2 ${
                            isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          {msg.replies} {msg.replies === 1 ? 'reply' : 'replies'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              )}
            </div>

            {/* Typing Indicator - Between Messages and Input */}
            <div className={`px-5 py-2 text-xs drop-shadow ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              <span className={`font-bold ${isDark ? 'text-white/90' : 'text-gray-900'}`}>Hybrid_Marcus</span> is typing...
            </div>

            {/* Message Input */}
            <div className="px-2 pb-2 relative">
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowEmojiPicker(false)}
                  ></div>
                  <div className="absolute bottom-full right-4 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-300 p-4 w-80 max-h-96 overflow-y-auto z-50 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-sm">Emojis</h3>
                      <button 
                        onClick={() => setShowEmojiPicker(false)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {Object.entries(emojiCategories).map(([category, emojis]) => (
                      <div key={category} className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-600 mb-2">{category}</h4>
                        <div className="grid grid-cols-8 gap-1">
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleEmojiSelect(emoji)}
                              className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="backdrop-blur-lg rounded-xl border shadow-lg bg-white border-gray-300">
                <div className="flex items-center px-4 py-3 gap-2">
                  <button className="text-gray-700 hover:text-gray-900 transition-colors" title="Upload">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder={`Message #${currentChannel?.name || 'general'}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                  />
                  <button className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block" title="Gift">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </button>
                  <button className="text-gray-700 hover:text-gray-900 text-sm transition-colors hidden sm:block" title="GIF">
                    GIF
                  </button>
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-700 hover:text-gray-900 transition-colors" 
                    title="Emoji"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block" title="Stickers">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowProfileModal(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-3xl max-w-md w-full shadow-2xl border border-white/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner Background */}
            <div className="h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 relative">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Photo - Overlapping banner */}
            <div className="px-6 -mt-12">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm flex items-center justify-center text-3xl border-4 border-white/20 shadow-xl">
                  ⚡
                </div>
                <div className={`absolute bottom-1 right-1 w-5 h-5 ${getStatusColor(userStatus)} rounded-full border-3 border-white shadow-lg`}></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Reymark</h2>
              <p className="text-sm text-white/70 mt-1">#reymark12345</p>
              
              {/* Life Form and Status Badges - Same Line */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-lg text-xs font-semibold text-white border border-purple-400/30">
                  ⚡ Hybrid
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-semibold text-white border border-white/20">
                  <span className={`w-2 h-2 ${getStatusColor(userStatus)} rounded-full`}></span>
                  {getStatusText(userStatus)}
                </span>
              </div>

              {/* Amp up your profile section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <h3 className="text-sm font-bold text-white mb-3">Amp up your profile</h3>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-lg border border-white/30 transition-all duration-200 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Get Coins
                  </button>
                  <button className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold rounded-lg border border-white/30 transition-all duration-200 flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Go to Shop
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Color Mode Section */}
              <div className="mt-4">
                <h3 className="text-xs font-bold text-white/80 mb-2 uppercase tracking-wide">Color Mode</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setColorMode("light")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                      colorMode === "light"
                        ? "bg-yellow-500/30 border-yellow-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-xs">Light</span>
                  </button>
                  <button
                    onClick={() => setColorMode("dark")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                      colorMode === "dark"
                        ? "bg-blue-500/30 border-blue-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-xs">Dark</span>
                  </button>
                  <button
                    onClick={() => setColorMode("system")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                      colorMode === "system"
                        ? "bg-purple-500/30 border-purple-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">System</span>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Theme Selection Section */}
              <div className="mt-4 mb-2">
                <h3 className="text-xs font-bold text-white/80 mb-2 uppercase tracking-wide">Theme</h3>
                <div className="flex gap-2 justify-between">
                  <button
                    onClick={() => setTheme("blue")}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 transition-all duration-200 ${
                      theme === "blue"
                        ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title="Blue"
                  />
                  <button
                    onClick={() => setTheme("purple")}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 transition-all duration-200 ${
                      theme === "purple"
                        ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title="Purple"
                  />
                  <button
                    onClick={() => setTheme("green")}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-200 ${
                      theme === "green"
                        ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title="Green"
                  />
                  <button
                    onClick={() => setTheme("orange")}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 transition-all duration-200 ${
                      theme === "orange"
                        ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title="Orange"
                  />
                  <button
                    onClick={() => setTheme("pink")}
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 via-fuchsia-400 to-purple-400 transition-all duration-200 ${
                      theme === "pink"
                        ? "ring-1 ring-white ring-offset-2 ring-offset-transparent scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    title="Pink"
                  />
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Status Update Section */}
              <div className="mt-4 mb-2">
                <h3 className="text-xs font-bold text-white/80 mb-2 uppercase tracking-wide">Update Status</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUserStatus("active")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                      userStatus === "active"
                        ? "bg-green-500/30 border-green-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                    <span className="text-xs">Active</span>
                  </button>
                  <button
                    onClick={() => setUserStatus("busy")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                      userStatus === "busy"
                        ? "bg-red-500/30 border-red-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    <span className="text-xs">Busy</span>
                  </button>
                  <button
                    onClick={() => setUserStatus("away")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 ${
                      userStatus === "away"
                        ? "bg-yellow-500/30 border-yellow-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                    <span className="text-xs">Away</span>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Edit Profile Button */}
              <button className="w-full px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
