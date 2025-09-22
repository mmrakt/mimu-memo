'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Top' },
  { href: '/memo', label: 'Memo' },
  { href: '/career', label: 'Career' },
  { href: '/portfolio', label: 'Portfolio' },
];

const SCROLL_THRESHOLD = 100;
const MOBILE_MENU_ANIMATION_DELAY_MS = 100;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? '' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 shadow-indigo-500/5 shadow-lg backdrop-blur-sm'
            : 'bg-slate-900/80 backdrop-blur-sm'
        } border-indigo-500/20 border-b`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              className="group relative bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text font-bold text-transparent text-xl transition-transform duration-300 hover:scale-105"
              href="/"
            >
              mimu-memo
              <span className="-bottom-1 absolute left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>

            <nav className="hidden items-center space-x-8 md:flex">
              {navItems.map((item) => (
                <Link
                  className={`relative py-2 font-medium text-sm transition-colors duration-300 hover:text-indigo-400 ${
                    pathname === item.href ? 'text-indigo-400' : 'text-slate-300'
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                  <span
                    className={`-bottom-1 absolute left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <button
              aria-label="Toggle mobile menu"
              className="rounded-md p-2 text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-indigo-400 md:hidden"
              onClick={toggleMobileMenu}
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-slate-900/98 pt-16 backdrop-blur-sm">
          <nav className="pt-6 pl-10">
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li
                  className="-translate-x-5 slide-in-from-left animate-in opacity-0 duration-300"
                  key={item.href}
                  style={{
                    animationDelay: `${index * MOBILE_MENU_ANIMATION_DELAY_MS}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <Link
                    className={`block font-semibold text-xl transition-all duration-300 hover:translate-x-2 hover:text-indigo-400 ${
                      pathname === item.href ? 'text-indigo-400' : 'text-slate-200'
                    }`}
                    href={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <button
          aria-label="Close mobile menu"
          className="fixed inset-0 z-30 cursor-default border-0 bg-black/50 p-0 md:hidden"
          onClick={closeMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeMobileMenu();
            }
          }}
          type="button"
        />
      )}
    </>
  );
}
