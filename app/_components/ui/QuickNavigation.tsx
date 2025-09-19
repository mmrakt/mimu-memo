'use client';

import { ArrowRight, Briefcase, Code, FileText } from 'lucide-react';
import Link from 'next/link';
import { memo, useId } from 'react';

type QuickNavItem = {
  href: string;
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
};

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
    <section aria-labelledby={headingId} className="px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-16 text-center font-bold text-3xl text-slate-200 md:text-4xl"
          id={headingId}
        >
          Navigation
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {quickNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                aria-label={`Navigate to ${item.title}: ${item.description}`}
                className={
                  'group hover:-translate-y-2 block animate-fade-in-up rounded-2xl border border-indigo-500/10 bg-slate-800/50 p-8 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900'
                }
                href={item.href}
                key={item.href}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-br ${item.color} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="mb-3 font-bold text-slate-100 text-xl transition-colors group-hover:text-indigo-400">
                  {item.title}
                </h3>
                <p className="mb-4 text-slate-400">{item.description}</p>
                <div className="flex items-center text-indigo-400 transition-colors group-hover:text-cyan-400">
                  <span className="font-medium text-sm">Read more</span>
                  <ArrowRight
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    size={16}
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
