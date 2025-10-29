"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
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
        <Link href="/" className="flex items-center gap-3">
          <div className="text-4xl md:text-5xl">🦜</div>
          <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            BoloboloMi
          </h1>
        </Link>
      </header>

      {/* Login Form - Center */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-12 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
              Log In
            </h2>

            <form className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-white text-xs font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-white text-xs font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all duration-300"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  href="/forgot-password"
                  className="text-white text-xs hover:text-white/80 transition-colors duration-300 cursor-pointer underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-6 py-2.5 bg-white text-purple-600 text-base font-bold rounded-full hover:bg-white/90 hover:text-purple-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white text-xs font-semibold">OR</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="w-full px-6 py-2.5 bg-white/20 backdrop-blur-md text-white text-base font-semibold rounded-full border-2 border-white/30 hover:bg-white/40 hover:border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Log In with Google
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white text-xs">
                Don't have an account?{" "}
                <Link 
                  href="/register"
                  className="font-bold hover:text-white/80 transition-colors duration-300 cursor-pointer underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

