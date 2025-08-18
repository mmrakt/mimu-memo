'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface CareerAnimationsProps {
  heroContent: React.ReactNode;
  restContent: React.ReactNode;
}

export function CareerAnimations({ heroContent, restContent }: CareerAnimationsProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 50;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Timeline items animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            entry.target.classList.remove('opacity-0', 'scale-90');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    // Parallax effect and scroll indicator visibility
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 600}`;
      }

      // Hide scroll indicator when scrolled
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - scrolled / 300);
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
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-radial from-indigo-600 via-transparent to-transparent animate-pulse-slow"
          style={{ animationDuration: '20s' }}
        />
        <div
          className="absolute inset-0 bg-gradient-radial from-cyan-600 via-transparent to-transparent animate-pulse-slow"
          style={{ animationDuration: '20s', animationDelay: '6.67s' }}
        />
        <div
          className="absolute inset-0 bg-gradient-radial from-amber-600 via-transparent to-transparent animate-pulse-slow"
          style={{ animationDuration: '20s', animationDelay: '13.33s' }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <div ref={heroRef}>{heroContent}</div>

      {/* Rest of content without parallax */}
      {restContent}

      {/* Scroll indicator */}
      <button
        ref={scrollIndicatorRef}
        type="button"
        onClick={scrollToTimeline}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-50 transition-opacity duration-300"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </div>
  );
}
