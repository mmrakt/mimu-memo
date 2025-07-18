'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Top' },
  { href: '/memo', label: 'Memo' },
  { href: '/career', label: 'Career' },
  { href: '/portfolio', label: 'Portfolio' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 backdrop-blur-sm shadow-lg shadow-indigo-500/5'
            : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/80 backdrop-blur-sm'
        } border-b border-indigo-500/20 dark:border-indigo-500/20 light:border-slate-200`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 relative group"
            >
              mimu-memo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors duration-300 hover:text-indigo-400 ${
                    pathname === item.href
                      ? 'text-indigo-400'
                      : 'text-slate-300 dark:text-slate-300 light:text-slate-600'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ${
                      pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              ))}
              <ThemeToggle />
            </nav>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-indigo-400 hover:bg-slate-800/50 dark:hover:bg-slate-800/50 light:hover:bg-slate-200/50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-slate-900/98 dark:bg-slate-900/98 light:bg-white/98 backdrop-blur-sm h-full pt-16">
          <nav className="p-6">
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className="opacity-0 -translate-x-5 animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block text-xl font-semibold transition-all duration-300 hover:text-indigo-400 hover:translate-x-2 ${
                      pathname === item.href
                        ? 'text-indigo-400'
                        : 'text-slate-200 dark:text-slate-200 light:text-slate-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-slate-700 dark:border-slate-700 light:border-slate-200">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeMobileMenu();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close mobile menu"
        />
      )}
    </>
  );
}
