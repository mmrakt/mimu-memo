import type { Metadata } from 'next';
import { PORTFOLIO_PAGE_DESCRIPTION } from '@/portfolio/data';

export const metadata: Metadata = {
  description: PORTFOLIO_PAGE_DESCRIPTION,
  openGraph: {
    description: PORTFOLIO_PAGE_DESCRIPTION,
    title: 'Portfolio | mimu-memo',
    type: 'website',
  },
  title: 'Portfolio | mimu-memo',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
