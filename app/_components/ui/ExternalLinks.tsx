'use client';

import { ExternalLink } from 'lucide-react';
import { memo, useId } from 'react';
import {
  GITHUB_URL_PREFIX,
  QIITA_URL_PREFIX,
  SCRAPBOX_URL_PREFIX,
  SNS_ID,
  WANTEDLY_URL_PREFIX,
  X_PROFILE_URL,
  ZENN_URL_PREFIX,
} from '@/config';

interface ExternalLinkItem {
  name: string;
  href: string;
  icon: string;
}

const externalLinks: ExternalLinkItem[] = [
  {
    name: 'X (Twitter)',
    href: X_PROFILE_URL,
    icon: '𝕏',
  },
  {
    name: 'GitHub',
    href: `${GITHUB_URL_PREFIX}/${SNS_ID}`,
    icon: '⚡',
  },
  {
    name: 'Scrapbox',
    href: `${SCRAPBOX_URL_PREFIX}/mimu`,
    icon: '📝',
  },
  {
    name: 'Zenn',
    href: `${ZENN_URL_PREFIX}/${SNS_ID}`,
    icon: '📚',
  },
  {
    name: 'Qiita',
    href: `${QIITA_URL_PREFIX}/${SNS_ID}`,
    icon: '💡',
  },
  {
    name: 'Wantedly',
    href: `${WANTEDLY_URL_PREFIX}/id/mimura_akito`,
    icon: '🤝',
  },
];

export const ExternalLinks = memo(function ExternalLinks() {
  const headingId = useId();

  return (
    <section className="py-20 px-8" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto">
        <h2
          id={headingId}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-200"
        >
          External links
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {externalLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-6 bg-slate-800/50 backdrop-blur-sm border border-indigo-500/10 rounded-xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 text-center opacity-0 animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards',
              }}
              aria-label={`Visit ${link.name} profile (opens in new tab)`}
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors">
                {link.name}
              </h3>
              <ExternalLink
                size={12}
                className="mx-auto text-indigo-400 group-hover:text-cyan-400 transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});
