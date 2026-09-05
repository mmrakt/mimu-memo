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
  href: string;
  icon: string;
  name: string;
}

const externalLinks: ExternalLinkItem[] = [
  {
    href: X_PROFILE_URL,
    icon: '𝕏',
    name: 'X (Twitter)',
  },
  {
    href: `${GITHUB_URL_PREFIX}/${SNS_ID}`,
    icon: '⚡',
    name: 'GitHub',
  },
  {
    href: `${SCRAPBOX_URL_PREFIX}/mimu`,
    icon: '📝',
    name: 'Scrapbox',
  },
  {
    href: `${ZENN_URL_PREFIX}/${SNS_ID}`,
    icon: '📚',
    name: 'Zenn',
  },
  {
    href: `${QIITA_URL_PREFIX}/${SNS_ID}`,
    icon: '💡',
    name: 'Qiita',
  },
  {
    href: `${WANTEDLY_URL_PREFIX}/id/mimura_akito`,
    icon: '🤝',
    name: 'Wantedly',
  },
];

const CARD_ANIMATION_DELAY_INCREMENT_MS = 100;

export const ExternalLinks = memo(function ExternalLinksComponent() {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-16 text-center font-bold text-3xl text-slate-200 md:text-4xl"
          id={headingId}
        >
          External links
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {externalLinks.map((link, index) => (
            <a
              aria-label={`Visit ${link.name} profile (opens in new tab)`}
              className={
                'group block animate-fade-in-up rounded-xl border border-indigo-500/10 bg-slate-800/50 p-6 text-center opacity-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-indigo-500/10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900'
              }
              href={link.href}
              key={link.name}
              rel="noopener noreferrer"
              style={{
                animationDelay: `${index * CARD_ANIMATION_DELAY_INCREMENT_MS}ms`,
                animationFillMode: 'forwards',
              }}
              target="_blank"
            >
              <div className="mb-3 text-2xl transition-transform duration-300 group-hover:scale-110">
                {link.icon}
              </div>
              <h3 className="mb-2 font-semibold text-slate-100 text-sm transition-colors group-hover:text-indigo-400">
                {link.name}
              </h3>
              <ExternalLink
                className="mx-auto text-indigo-400 transition-colors group-hover:text-cyan-400"
                size={12}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});
