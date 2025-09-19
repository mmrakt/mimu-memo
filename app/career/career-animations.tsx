'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

type CareerAnimationsProps = {
  heroContent: React.ReactNode;
  restContent: React.ReactNode;
};

const ELEMENT_VISIBLE_THRESHOLD = 50;
const HERO_PARALLAX_FACTOR = 0.5;
const HERO_OPACITY_DISTANCE = 600;
const INDICATOR_OPACITY_DISTANCE = 300;

export function CareerAnimations({ heroContent, restContent }: CareerAnimationsProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reveal on scroll
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    const revealOnScroll = () => {
      for (const element of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - ELEMENT_VISIBLE_THRESHOLD) {
          element.classList.add('opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-8');
        }
      }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Timeline items animation
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            entry.target.classList.remove('opacity-0', 'scale-90');
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-item');
    for (const item of timelineItems) {
      observer.observe(item);
    }

    // Parallax effect and scroll indicator visibility
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * HERO_PARALLAX_FACTOR}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / HERO_OPACITY_DISTANCE}`;
      }

      // Hide scroll indicator when scrolled
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - scrolled / INDICATOR_OPACITY_DISTANCE);
        scrollIndicatorRef.current.style.opacity = `${opacity}`;
        if (opacity === 0) {
          scrollIndicatorRef.current.style.pointerEvents = 'none';
        } else {
          scrollIndicatorRef.current.style.pointerEvents = 'auto';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('scroll', handleScroll);
      for (const item of timelineItems) {
        observer.unobserve(item);
      }
    };
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-900 text-slate-100">
      {/* Animated background */}
      <div className="-z-10 fixed inset-0 opacity-5">
        <div
          className="absolute inset-0 animate-pulse-slow bg-gradient-radial from-indigo-600 via-transparent to-transparent"
          style={{ animationDuration: '20s' }}
        />
        <div
          className="absolute inset-0 animate-pulse-slow bg-gradient-radial from-cyan-600 via-transparent to-transparent"
          style={{ animationDuration: '20s', animationDelay: '6.67s' }}
        />
        <div
          className="absolute inset-0 animate-pulse-slow bg-gradient-radial from-amber-600 via-transparent to-transparent"
          style={{ animationDuration: '20s', animationDelay: '13.33s' }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <div ref={heroRef}>{heroContent}</div>

      {/* Rest of content without parallax */}
      {restContent}

      {/* Scroll indicator */}
      <button
        className="-translate-x-1/2 fixed bottom-8 left-1/2 z-50 animate-bounce cursor-pointer transition-opacity duration-300"
        onClick={scrollToTimeline}
        ref={scrollIndicatorRef}
        type="button"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  );
}
