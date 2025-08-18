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
    <header className="min-h-screen flex items-center justify-center px-8 py-20 relative overflow-hidden">
      {/* Complex Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Orbiting Elements */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-60 animate-orbit" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-40 animate-orbit animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-50 animate-orbit animation-delay-2000" />

        {/* Spiral Elements */}
        <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 animate-spiral" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 animate-spiral animation-delay-500" />

        {/* Morphing Shapes */}
        <div className="absolute top-1/5 right-1/5 w-12 h-12 bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 animate-morphing" />
        <div className="absolute bottom-1/5 left-1/5 w-8 h-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 animate-morphing animation-delay-1000" />

        {/* Magnetic Floating Elements */}
        <div className="absolute top-1/6 left-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-magnetic" />
        <div className="absolute bottom-1/6 right-1/2 w-3 h-3 bg-amber-400 rounded-full opacity-50 animate-magnetic animation-delay-300" />

        {/* Particle Trail */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-pulse-slow" />
        <div className="absolute top-1/2 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse-slow animation-delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Animated Title with Glitch Effect */}
          <div className="relative mb-6 group">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-500 bg-clip-text text-transparent animate-gradient-x hover:scale-105 transition-transform duration-500 cursor-default"
              id={headingId}
            >
              Hi, I'm {MY_NAME}
            </h1>
            <div
              className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 bg-clip-text text-transparent opacity-0 group-hover:opacity-30 group-hover:animate-glitch transition-all duration-300"
              aria-hidden="true"
            >
              Hi, I'm {MY_NAME}
            </div>
          </div>

          {/* Typewriter Effect Subtitle */}
          <div className="relative mb-8">
            <p
              className={`text-xl md:text-2xl text-slate-400 font-space-grotesk transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-indigo-400 animate-typewriter">
                {ABOUT_ME[0]}
              </span>
              <br className="hidden md:block" />
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyan-400 animate-typewriter animation-delay-2000">
                {ABOUT_ME[1]}
              </span>
            </p>
          </div>

          {/* Enhanced Buttons with Magnetic Effect */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Link
              href="/career"
              className="group relative flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full hover:from-indigo-500 hover:to-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/50 animate-pulse-slow overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="View career information and professional background"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x" />
              <User
                size={20}
                className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="relative z-10">About Me</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/portfolio"
              className="group relative flex items-center gap-2 px-8 py-3 border border-indigo-500/30 rounded-full hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="View portfolio and personal projects"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Globe
                size={20}
                className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="relative z-10">View Work</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '1000ms' }}
          role="img"
          aria-label="Scroll down indicator"
        >
          <div className="relative">
            <div className="w-6 h-10 border-2 border-indigo-400/50 rounded-full p-1 animate-pulse-slow">
              <div className="w-1 h-3 bg-indigo-400 rounded-full mx-auto animate-bounce" />
            </div>
            <div className="absolute inset-0 w-6 h-10 border-2 border-cyan-400/30 rounded-full animate-ping" />
          </div>
        </div>
      </div>
    </header>
  );
});
