'use client';

import { ArrowRight, Globe, User } from 'lucide-react';
import Link from 'next/link';
import { memo, useEffect, useId, useState } from 'react';
import { ABOUT_ME, MY_NAME } from '@/config';

export const HeroSection = memo(function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const headingId = useId();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 py-20">
      {/* Complex Animated Background Elements */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orbiting Elements */}
        <div className="absolute top-1/4 left-1/4 h-6 w-6 animate-orbit rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-60" />
        <div className="animation-delay-1000 absolute top-1/3 right-1/3 h-4 w-4 animate-orbit rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40" />
        <div className="animation-delay-2000 absolute bottom-1/3 left-1/3 h-8 w-8 animate-orbit rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-50" />

        {/* Spiral Elements */}
        <div className="absolute top-1/2 left-1/2 h-5 w-5 animate-spiral bg-gradient-to-r from-purple-400 to-pink-500" />
        <div className="animation-delay-500 absolute top-1/2 left-1/2 h-3 w-3 animate-spiral bg-gradient-to-r from-emerald-400 to-teal-500" />

        {/* Morphing Shapes */}
        <div className="absolute top-1/5 right-1/5 h-12 w-12 animate-morphing bg-gradient-to-br from-indigo-500/30 to-cyan-500/30" />
        <div className="animation-delay-1000 absolute bottom-1/5 left-1/5 h-8 w-8 animate-morphing bg-gradient-to-br from-purple-500/30 to-pink-500/30" />

        {/* Magnetic Floating Elements */}
        <div className="absolute top-1/6 left-1/2 h-2 w-2 animate-magnetic rounded-full bg-cyan-400 opacity-60" />
        <div className="animation-delay-300 absolute right-1/2 bottom-1/6 h-3 w-3 animate-magnetic rounded-full bg-amber-400 opacity-50" />

        {/* Particle Trail */}
        <div className="absolute top-1/2 left-0 h-1 w-full animate-pulse-slow bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="animation-delay-1000 absolute top-1/2 left-0 h-full w-1 animate-pulse-slow bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Animated Title with Glitch Effect */}
          <div className="group relative mb-6">
            <h1
              className="animate-gradient-x cursor-default bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-500 bg-clip-text font-bold text-5xl text-transparent transition-transform duration-500 hover:scale-105 md:text-6xl lg:text-7xl"
              id={headingId}
            >
              Hi, I'm {MY_NAME}
            </h1>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 bg-clip-text font-bold text-5xl text-transparent opacity-0 transition-all duration-300 group-hover:animate-glitch group-hover:opacity-30 md:text-6xl lg:text-7xl"
            >
              Hi, I'm {MY_NAME}
            </div>
          </div>

          {/* Typewriter Effect Subtitle */}
          <div className="relative mb-8">
            <p
              className={`font-space-grotesk text-slate-400 text-xl transition-all duration-1000 md:text-2xl ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="inline-block animate-typewriter overflow-hidden whitespace-nowrap border-indigo-400 border-r-2">
                {ABOUT_ME[0]}
              </span>
              <br className="hidden md:block" />
              <span className="animation-delay-2000 inline-block animate-typewriter overflow-hidden whitespace-nowrap border-cyan-400 border-r-2">
                {ABOUT_ME[1]}
              </span>
            </p>
          </div>

          {/* Enhanced Buttons with Magnetic Effect */}
          <div
            className={`flex flex-col items-center justify-center gap-4 transition-all duration-1000 sm:flex-row ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link
              aria-label="View career information and professional background"
              className="group relative flex animate-pulse-slow items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-3 transition-all duration-300 hover:scale-110 hover:from-indigo-500 hover:to-cyan-500 hover:shadow-2xl hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              href="/career"
            >
              <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <User
                className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
                size={20}
              />
              <span className="relative z-10">About Me</span>
              <ArrowRight
                className="relative z-10 transition-transform group-hover:translate-x-1"
                size={16}
              />
            </Link>
            <Link
              aria-label="View portfolio and personal projects"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-indigo-500/30 px-8 py-3 transition-all duration-300 hover:scale-110 hover:border-indigo-400 hover:bg-indigo-500/10 hover:shadow-2xl hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              href="/portfolio"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Globe
                className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
                size={20}
              />
              <span className="relative z-10">View Work</span>
              <ArrowRight
                className="relative z-10 transition-transform group-hover:translate-x-1"
                size={16}
              />
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          aria-label="Scroll down indicator"
          className={`-translate-x-1/2 absolute bottom-8 left-1/2 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          role="img"
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="relative">
            <div className="h-10 w-6 animate-pulse-slow rounded-full border-2 border-indigo-400/50 p-1">
              <div className="mx-auto h-3 w-1 animate-bounce rounded-full bg-indigo-400" />
            </div>
            <div className="absolute inset-0 h-10 w-6 animate-ping rounded-full border-2 border-cyan-400/30" />
          </div>
        </div>
      </div>
    </header>
  );
});
