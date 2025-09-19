import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import 'highlight.js/styles/github-dark.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '@/_components/footer';
import { MainContent } from '@/_components/main-content';
import Navigation from '@/_components/navigation';
import { generateMetadata } from '@/_utils/metadata';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="ja">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100 antialiased`}
      >
        <a
          className="sr-only z-50 rounded-br-md bg-indigo-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          href="#main-content"
        >
          Skip to main content
        </a>
        <Navigation />
        <MainContent>{children}</MainContent>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
