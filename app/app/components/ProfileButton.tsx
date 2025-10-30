"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTheme } from "../ThemeContext";

export default function ProfileButton() {
  const { isDark, colorMode, setColorMode, theme, setTheme } = useTheme();
  const [userStatus, setUserStatus] = useState<"active" | "busy" | "away">("active");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusColor = (status: "active" | "busy" | "away") => {
    switch (status) {
      case "active": return "bg-green-400";
      case "busy": return "bg-red-400";
      case "away": return "bg-yellow-400";
    }
  };

  const getStatusText = (status: "active" | "busy" | "away") => {
    switch (status) {
      case "active": return "Active";
      case "busy": return "Busy";
      case "away": return "Away";
    }
  };

  return (
    <>
      <div 
        onClick={() => setShowProfileModal(true)}
        className={`h-14 px-2 flex items-center gap-2 border-t border-white/20 cursor-pointer transition-all duration-200 ${isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-white/10 hover:bg-white/20'} backdrop-blur-md`}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30 shadow-lg">
            <Image
              src="/avatar.jpeg"
              alt="User Avatar"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(userStatus)} rounded-full border-2 border-white shadow-sm`}></div>
        </div>
        <div className="flex-1 text-xs min-w-0">
          <div className="font-semibold drop-shadow truncate text-white">Reymark</div>
          <div className="text-[10px] truncate text-white/70">{getStatusText(userStatus)}</div>
        </div>
        <button 
          className="w-6 h-6 hover:bg-white/20 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0" 
          title="Settings"
          onClick={(e) => {
            e.stopPropagation();
            setShowProfileModal(true);
          }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Profile Modal - Rendered via Portal */}
      {mounted && showProfileModal && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowProfileModal(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl max-w-xs w-full shadow-2xl border border-white/20 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner Background - Extended with Image */}
            <div className="h-32 relative overflow-hidden">
              <Image
                src="/avatar background.jpeg"
                alt="Profile Banner"
                fill
                className="object-cover"
              />
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-2 right-2 w-7 h-7 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-200 z-10"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Profile Photo - Overlapping banner */}
            <div className="px-3 -mt-16">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <Image
                    src="/avatar.jpeg"
                    alt="Profile Avatar"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={`absolute bottom-0 right-0 w-5 h-5 ${getStatusColor(userStatus)} rounded-full border-[3px] border-white shadow-lg`}></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-3 py-2.5">
              <h2 className="text-lg font-bold text-white drop-shadow-lg">Reymark</h2>
              <p className="text-[10px] text-white/70 mt-0.5">#reymark12345</p>
              
              {/* Life Form, Status, and Level Badges - Same Line */}
              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded text-[10px] font-semibold text-white border border-purple-400/30">
                  ⚡ Hybrid
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[10px] font-semibold text-white border border-white/20">
                  <span className={`w-1.5 h-1.5 ${getStatusColor(userStatus)} rounded-full`}></span>
                  {getStatusText(userStatus)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 backdrop-blur-sm rounded text-[10px] font-bold text-white border border-yellow-400/30">
                  Level 8
                </span>
              </div>

              {/* Amp up your profile section */}
              <div className="mt-3 p-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-[10px] font-bold text-white mb-1.5">Amp up your profile</h3>
                <div className="flex gap-1.5">
                  <button className="flex-1 px-2 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[10px] font-semibold rounded border border-white/30 transition-all duration-200 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Get Coins
                  </button>
                  <button className="flex-1 px-2 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[10px] font-semibold rounded border border-white/30 transition-all duration-200 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Go to Shop
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-2.5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Color Mode Section */}
              <div className="mt-2.5">
                <h3 className="text-xs font-semibold text-white/90 mb-2.5 uppercase tracking-wide flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Color Mode
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setColorMode("light");
                    }}
                    className={`flex-1 px-3 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-md ${
                      colorMode === "light"
                        ? "bg-white/20 border-white/40 shadow-lg shadow-white/20 scale-105"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className={`text-xs font-medium ${colorMode === "light" ? "text-white" : "text-white/60"}`}>Light</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setColorMode("dark");
                    }}
                    className={`flex-1 px-3 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-md ${
                      colorMode === "dark"
                        ? "bg-white/20 border-white/40 shadow-lg shadow-white/20 scale-105"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className={`text-xs font-medium ${colorMode === "dark" ? "text-white" : "text-white/60"}`}>Dark</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setColorMode("system");
                    }}
                    className={`flex-1 px-3 py-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 backdrop-blur-md ${
                      colorMode === "system"
                        ? "bg-white/20 border-white/40 shadow-lg shadow-white/20 scale-105"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className={`text-xs font-medium ${colorMode === "system" ? "text-white" : "text-white/60"}`}>System</span>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Theme Selection */}
              <div className="mt-2.5">
                <h3 className="text-xs font-semibold text-white/90 mb-2.5 uppercase tracking-wide flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Theme Color
                </h3>
                <div className="grid grid-cols-5 gap-2.5">
                  {(['blue', 'purple', 'green', 'orange', 'pink'] as const).map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme(themeOption);
                      }}
                      className={`group aspect-square rounded-xl border-2 transition-all duration-300 backdrop-blur-md overflow-hidden ${
                        theme === themeOption
                          ? "border-white/60 shadow-lg scale-110 bg-white/10"
                          : "border-white/20 hover:border-white/40 hover:scale-105 bg-white/5"
                      }`}
                    >
                      <div className={`w-full h-full rounded-lg flex items-center justify-center ${
                        themeOption === 'blue' ? 'bg-gradient-to-br from-cyan-400 to-blue-500' :
                        themeOption === 'purple' ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                        themeOption === 'green' ? 'bg-gradient-to-br from-emerald-400 to-teal-500' :
                        themeOption === 'orange' ? 'bg-gradient-to-br from-orange-400 to-amber-500' :
                        'bg-gradient-to-br from-pink-400 to-fuchsia-500'
                      }`}>
                        {theme === themeOption && (
                          <svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="my-2.5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Update Status */}
              <div className="mt-2.5">
                <h3 className="text-[10px] font-bold text-white/80 mb-1.5 uppercase tracking-wide">Update Status</h3>
                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserStatus("active");
                    }}
                    className={`flex-1 px-2 py-1.5 rounded border transition-all duration-200 flex items-center justify-center gap-1 ${
                      userStatus === "active"
                        ? "bg-green-500/30 border-green-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-[10px]">Active</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserStatus("busy");
                    }}
                    className={`flex-1 px-2 py-1.5 rounded border transition-all duration-200 flex items-center justify-center gap-1 ${
                      userStatus === "busy"
                        ? "bg-red-500/30 border-red-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    <span className="text-[10px]">Busy</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserStatus("away");
                    }}
                    className={`flex-1 px-2 py-1.5 rounded border transition-all duration-200 flex items-center justify-center gap-1 ${
                      userStatus === "away"
                        ? "bg-yellow-500/30 border-yellow-400/50 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    <span className="text-[10px]">Away</span>
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="my-2.5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Edit Profile Button */}
              <button className="w-full px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
