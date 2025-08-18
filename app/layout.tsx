import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import 'highlight.js/styles/github-dark.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from '@/_components/Footer';
import { MainContent } from '@/_components/MainContent';
import Navigation from '@/_components/Navigation';
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
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen bg-slate-900 text-slate-100 flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-indigo-600 text-white px-4 py-2 z-50 rounded-br-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
