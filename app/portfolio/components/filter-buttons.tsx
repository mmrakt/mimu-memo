'use client';

import { useCallback } from 'react';
import type { FilterOption } from '@/portfolio/types';

interface FilterButtonsProps {
  activeFilter: string;
  filterOptions: FilterOption[];
  onFilterChange: (filterKey: string) => void;
}

interface FilterButtonProps {
  filter: FilterOption;
  isActive: boolean;
  onFilterChange: (filterKey: string) => void;
}

function FilterButton({ filter, isActive, onFilterChange }: FilterButtonProps) {
  const handleClick = useCallback(() => onFilterChange(filter.key), [filter.key, onFilterChange]);

  return (
    <button
      className={`rounded-full px-6 py-2 font-medium text-sm transition-all duration-300 ${
        isActive
          ? 'bg-indigo-500 text-white shadow-indigo-500/30 shadow-lg'
          : 'border border-indigo-500/30 bg-transparent text-slate-400 hover:-translate-y-1 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400'
      }`}
      onClick={handleClick}
      type="button"
    >
      {filter.label}
    </button>
  );
}

export default function FilterButtons({
  filterOptions,
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">
      {filterOptions.map((filter) => (
        <FilterButton
          filter={filter}
          isActive={activeFilter === filter.key}
          key={filter.key}
          onFilterChange={onFilterChange}
        />
      ))}
    </div>
  );
}
