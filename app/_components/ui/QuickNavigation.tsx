'use client';

import { ArrowRight, Briefcase, Code, FileText } from 'lucide-react';
import Link from 'next/link';
import { memo, useId } from 'react';

interface QuickNavItem {
  href: string;
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
}

const quickNavItems: QuickNavItem[] = [
  {
    href: '/memo',
    title: 'Memo',
    description: '技術的な学びや知見を共有',
    icon: FileText,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    href: '/career',
    title: 'Career',
    description: '経歴とスキルセット',
    icon: Briefcase,
    color: 'from-purple-500 to-pink-600',
  },
  {
    href: '/portfolio',
    title: 'Portfolio',
    description: '個人開発などの成果物',
    icon: Code,
    color: 'from-indigo-500 to-cyan-500',
  },
];

export const QuickNavigation = memo(function QuickNavigation() {
  const headingId = useId();

  return (
    <section className="py-20 px-8" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto">
        <h2
          id={headingId}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-200"
        >
          Navigation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group block p-8 bg-slate-800/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 opacity-0 animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards',
                }}
                aria-label={`Navigate to ${item.title}: ${item.description}`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 mb-4">{item.description}</p>
                <div className="flex items-center text-indigo-400 group-hover:text-cyan-400 transition-colors">
                  <span className="text-sm font-medium">Read more</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});
