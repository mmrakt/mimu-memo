import { Suspense } from 'react';
import { PORTFOLIO_PAGE_DESCRIPTION } from '@/portfolio/data';
import PortfolioClient from '@/portfolio/PortfolioClient';
import { getAllPortfolioItems } from '@/portfolio/services/portfolio-service';

export default async function PortfolioPage() {
  const portfolioItems = await getAllPortfolioItems();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-50">
          Loading...
        </div>
      }
    >
      <PortfolioClient
        pageDescription={PORTFOLIO_PAGE_DESCRIPTION}
        portfolioItems={portfolioItems}
      />
    </Suspense>
  );
}
