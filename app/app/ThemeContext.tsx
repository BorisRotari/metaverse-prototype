"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ColorMode = 'light' | 'dark' | 'system';
type Theme = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

interface ThemeContextType {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  currentTheme: any;
  themes: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>('dark');
  const [theme, setThemeState] = useState<Theme>('blue');

  // Load from localStorage
  useEffect(() => {
    const savedColorMode = localStorage.getItem('colorMode');
    const savedTheme = localStorage.getItem('theme');
    if (savedColorMode) setColorModeState(savedColorMode as ColorMode);
    if (savedTheme) setThemeState(savedTheme as Theme);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = {
    blue: {
      light: { 
        col1: 'from-cyan-600 to-blue-700', 
        col2: 'from-cyan-700 to-blue-800', 
        iconColor: 'text-white', 
        iconColorDark: 'text-white',
        accentBg: 'bg-cyan-500/30',
        accentRing: 'ring-cyan-300',
        accentHover: 'hover:bg-cyan-400/40',
        divider: 'bg-cyan-200/50',
        chatBg: 'bg-cyan-50/80',
        bgGradient1: 'from-blue-400 via-cyan-400 to-teal-400',
        bgGradient2: 'from-sky-400 via-cyan-400 to-emerald-400',
        buttonBg: 'bg-cyan-500',
        buttonHover: 'hover:bg-cyan-600',
        buttonText: 'text-white'
      },
      dark: { 
        col1: 'from-cyan-600 to-blue-700', 
        col2: 'from-cyan-700 to-blue-800', 
        iconColor: 'text-gray-700', 
        iconColorDark: 'text-white',
        accentBg: 'bg-cyan-500/30',
        accentRing: 'ring-cyan-300',
        accentHover: 'hover:bg-cyan-400/40',
        divider: 'bg-cyan-200/50',
        chatBg: 'bg-gray-900/60',
        bgGradient1: 'from-blue-500 via-cyan-400 to-teal-500',
        bgGradient2: 'from-sky-500 via-blue-400 to-cyan-500',
        buttonBg: 'bg-cyan-600',
        buttonHover: 'hover:bg-cyan-700',
        buttonText: 'text-white'
      }
    },
    purple: {
      light: { 
        col1: 'from-purple-600 to-pink-700', 
        col2: 'from-purple-700 to-pink-800', 
        iconColor: 'text-white', 
        iconColorDark: 'text-white',
        accentBg: 'bg-purple-500/30',
        accentRing: 'ring-purple-300',
        accentHover: 'hover:bg-purple-400/40',
        divider: 'bg-purple-200/50',
        chatBg: 'bg-purple-50/80',
        bgGradient1: 'from-purple-400 via-pink-400 to-fuchsia-400',
        bgGradient2: 'from-violet-400 via-purple-400 to-fuchsia-400',
        buttonBg: 'bg-purple-500',
        buttonHover: 'hover:bg-purple-600',
        buttonText: 'text-white'
      },
      dark: { 
        col1: 'from-purple-600 to-pink-700', 
        col2: 'from-purple-700 to-pink-800', 
        iconColor: 'text-gray-700', 
        iconColorDark: 'text-white',
        accentBg: 'bg-purple-500/30',
        accentRing: 'ring-purple-300',
        accentHover: 'hover:bg-purple-400/40',
        divider: 'bg-purple-200/50',
        chatBg: 'bg-gray-900/60',
        bgGradient1: 'from-purple-500 via-pink-400 to-fuchsia-500',
        bgGradient2: 'from-violet-500 via-fuchsia-400 to-pink-500',
        buttonBg: 'bg-purple-600',
        buttonHover: 'hover:bg-purple-700',
        buttonText: 'text-white'
      }
    },
    green: {
      light: { 
        col1: 'from-emerald-600 to-teal-700', 
        col2: 'from-emerald-700 to-teal-800', 
        iconColor: 'text-white', 
        iconColorDark: 'text-white',
        accentBg: 'bg-emerald-500/30',
        accentRing: 'ring-emerald-300',
        accentHover: 'hover:bg-emerald-400/40',
        divider: 'bg-emerald-200/50',
        chatBg: 'bg-emerald-50/80',
        bgGradient1: 'from-emerald-400 via-teal-400 to-green-400',
        bgGradient2: 'from-teal-400 via-emerald-400 to-cyan-400',
        buttonBg: 'bg-emerald-500',
        buttonHover: 'hover:bg-emerald-600',
        buttonText: 'text-white'
      },
      dark: { 
        col1: 'from-emerald-600 to-teal-700', 
        col2: 'from-emerald-700 to-teal-800', 
        iconColor: 'text-gray-700', 
        iconColorDark: 'text-white',
        accentBg: 'bg-emerald-500/30',
        accentRing: 'ring-emerald-300',
        accentHover: 'hover:bg-emerald-400/40',
        divider: 'bg-emerald-200/50',
        chatBg: 'bg-gray-900/60',
        bgGradient1: 'from-emerald-500 via-teal-400 to-cyan-500',
        bgGradient2: 'from-teal-500 via-green-400 to-emerald-500',
        buttonBg: 'bg-emerald-600',
        buttonHover: 'hover:bg-emerald-700',
        buttonText: 'text-white'
      }
    },
    orange: {
      light: { 
        col1: 'from-orange-600 to-amber-700', 
        col2: 'from-orange-700 to-amber-800', 
        iconColor: 'text-white', 
        iconColorDark: 'text-white',
        accentBg: 'bg-orange-500/30',
        accentRing: 'ring-orange-300',
        accentHover: 'hover:bg-orange-400/40',
        divider: 'bg-orange-200/50',
        chatBg: 'bg-orange-50/80',
        bgGradient1: 'from-orange-400 via-amber-400 to-yellow-400',
        bgGradient2: 'from-amber-400 via-orange-400 to-red-400',
        buttonBg: 'bg-orange-500',
        buttonHover: 'hover:bg-orange-600',
        buttonText: 'text-white'
      },
      dark: { 
        col1: 'from-orange-600 to-amber-700', 
        col2: 'from-orange-700 to-amber-800', 
        iconColor: 'text-gray-700', 
        iconColorDark: 'text-white',
        accentBg: 'bg-orange-500/30',
        accentRing: 'ring-orange-300',
        accentHover: 'hover:bg-orange-400/40',
        divider: 'bg-orange-200/50',
        chatBg: 'bg-gray-900/60',
        bgGradient1: 'from-orange-500 via-amber-400 to-yellow-500',
        bgGradient2: 'from-amber-500 via-orange-400 to-red-500',
        buttonBg: 'bg-orange-600',
        buttonHover: 'hover:bg-orange-700',
        buttonText: 'text-white'
      }
    },
    pink: {
      light: { 
        col1: 'from-pink-600 to-fuchsia-700', 
        col2: 'from-pink-700 to-fuchsia-800', 
        iconColor: 'text-white', 
        iconColorDark: 'text-white',
        accentBg: 'bg-pink-500/30',
        accentRing: 'ring-pink-300',
        accentHover: 'hover:bg-pink-400/40',
        divider: 'bg-pink-200/50',
        chatBg: 'bg-pink-50/80',
        bgGradient1: 'from-pink-400 via-rose-400 to-fuchsia-400',
        bgGradient2: 'from-rose-400 via-pink-400 to-fuchsia-400',
        buttonBg: 'bg-pink-500',
        buttonHover: 'hover:bg-pink-600',
        buttonText: 'text-white'
      },
      dark: { 
        col1: 'from-pink-600 to-fuchsia-700', 
        col2: 'from-pink-700 to-fuchsia-800', 
        iconColor: 'text-gray-700', 
        iconColorDark: 'text-white',
        accentBg: 'bg-pink-500/30',
        accentRing: 'ring-pink-300',
        accentHover: 'hover:bg-pink-400/40',
        divider: 'bg-pink-200/50',
        chatBg: 'bg-gray-900/60',
        bgGradient1: 'from-pink-500 via-rose-400 to-fuchsia-500',
        bgGradient2: 'from-rose-500 via-fuchsia-400 to-pink-500',
        buttonBg: 'bg-pink-600',
        buttonHover: 'hover:bg-pink-700',
        buttonText: 'text-white'
      }
    }
  };

  const isDark = colorMode === 'dark' || (colorMode === 'system' && true);
  const currentTheme = themes[theme][isDark ? 'dark' : 'light'];

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode, theme, setTheme, isDark, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

