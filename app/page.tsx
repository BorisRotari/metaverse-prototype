import Link from "next/link";
import Image from "next/image";
import { CHANNEL_IDS } from "@/app/data/mockChannelData";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Animated Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/70 via-pink-500/70 to-red-500/70 animate-gradient-xy">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/60 via-indigo-500/60 to-purple-600/60 opacity-70 animate-gradient-slow"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        {/* Logo and Title - Top Left */}
        <div className="flex items-center gap-3">
          <div className="text-4xl md:text-5xl">🦜</div>
          <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            BoloboloMi
          </h1>
        </div>

        {/* Login Button - Top Right */}
        <Link href="/login">
          <button className="px-5 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full border-2 border-white/30 hover:bg-white/40 hover:border-white/50 transition-all duration-300 shadow-lg cursor-pointer">
            Log In
          </button>
        </Link>
      </header>

      {/* Main Content - Center */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-3 md:py-3 min-h-[calc(100vh-250px)]">
        <div className="max-w-6xl mx-auto w-full">
          {/* First Row: Title + Text | Image */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            {/* First Column: Title and Text (Only text has border, center-aligned) */}
            <div className="space-y-6 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl leading-tight pt-6">
                Breathing Social Universe System
              </h2>
              
              <div className="border-2 border-white/30 md:border-0 rounded-3xl p-6 md:p-8">
                <p className="text-lg md:text-xl font-semibold text-white leading-relaxed drop-shadow-lg">
                  BoloboloMi is a comprehensive ecosystem combining AI social interaction, 
                  frequency philosophy, XR hardware, a gamified task system, and a 
                  multi-dimensional system of language and time. 
                  It's a living system which is capable of self-learning, self-updating, and self-evolving.
                </p>
              </div>
            </div>

            {/* Second Column: Image (Hidden on mobile, smaller size) */}
            <div className="hidden md:block relative w-full h-[380px] rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10 p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/ai bot with human.jpg"
                  alt="AI Bot with Human"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Second Row: Animated Slogan */}
          <div className="flex justify-center">
            <div className="relative overflow-hidden">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl text-center italic animate-pulse">
                <span className="inline-block animate-[fadeInUp_1.5s_ease-in-out]">
                  "I am guided by frequency, my bones by light."
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Buttons - Bottom Center */}
      <footer className="relative z-10 flex flex-col items-center gap-4 px-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <button className="flex-1 px-8 py-3 bg-white text-purple-600 text-base font-bold rounded-full hover:bg-white/90 hover:text-purple-700 transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer">
            Download For Windows
          </button>
          
          <Link href={`/chat-rooms/1/${CHANNEL_IDS.general}`} className="flex-1">
            <button className="w-full px-8 py-3 bg-white/20 backdrop-blur-md text-white text-base font-semibold rounded-full border-2 border-white/30 hover:bg-white/40 hover:border-white/50 transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer">
              Open In Your Browser
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
