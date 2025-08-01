'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import AnimatedBackground from '@/_components/AnimatedBackground';
import PageHeader from '@/_components/PageHeader';
import FilterButtons from '@/portfolio/components/FilterButtons';
import PortfolioCard from '@/portfolio/components/PortfolioCard';
import PortfolioModal from '@/portfolio/components/PortfolioModal';
import { filterOptions } from '@/portfolio/data';
import type { PortfolioItem } from '@/portfolio/types';

interface PortfolioClientProps {
  portfolioItems: PortfolioItem[];
  pageDescription: string;
}

export default function PortfolioClient({ portfolioItems, pageDescription }: PortfolioClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get URL state
  const activeFilter = searchParams.get('category') || 'all';
  const selectedItemId = searchParams.get('item');

  // Compute filtered items with useMemo instead of useState + useEffect
  const filteredItems = useMemo(() => {
    return activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, portfolioItems]);

  // Get selected item from URL parameter
  const selectedItem = useMemo(() => {
    if (!selectedItemId) return null;
    const numericId = Number(selectedItemId);
    return portfolioItems.find((item) => item.id === numericId) || null;
  }, [selectedItemId, portfolioItems]);

  const handleCardClick = (item: PortfolioItem) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('item', item.id.toString());
    router.push(`/portfolio?${params.toString()}`, { scroll: false });
  };

  const handleModalClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('item');
    const newUrl = params.toString() ? `/portfolio?${params.toString()}` : '/portfolio';
    router.push(newUrl, { scroll: false });
  };

  const handleFilterChange = (filterKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filterKey === 'all') {
      params.delete('category');
    } else {
      params.set('category', filterKey);
    }
    // Clear item selection when changing filter
    params.delete('item');
    const newUrl = params.toString() ? `/portfolio?${params.toString()}` : '/portfolio';
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="pulse" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <PageHeader title="Portfolio" description={pageDescription} />

        <FilterButtons
          filterOptions={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>

      <PortfolioModal item={selectedItem} onClose={handleModalClose} />
    </div>
  );
}
