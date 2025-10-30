"use client";

import { useTheme } from "../ThemeContext";

interface ServerHeaderProps {
  description?: string;
}

export default function ServerHeader({ description }: ServerHeaderProps) {
  const { isDark } = useTheme();

  return (
    <>
      {/* Desktop Header - Simple */}
      <div className="hidden md:flex h-12 px-4 items-center justify-between border-b border-white/20 hover:bg-white/10 cursor-pointer flex-shrink-0">
        <h2 className="font-bold drop-shadow-lg text-white">BoloboloMi</h2>
        <span className="text-xs text-white">▼</span>
      </div>

      {/* Mobile Header - With Description */}
      <div className="md:hidden h-14 px-4 flex items-center justify-between border-b border-white/20 flex-shrink-0">
        <div className="flex flex-col justify-center">
          <h2 className="font-bold drop-shadow-lg text-white">BoloboloMi</h2>
          {description && (
            <p className="text-xs mt-0.5 text-white/90">{description}</p>
          )}
        </div>
        <span className="text-xs text-white">▼</span>
      </div>
    </>
  );
}

