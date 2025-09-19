import type { FilterOption } from '@/portfolio/types';

type FilterButtonsProps = {
  filterOptions: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterKey: string) => void;
};

export default function FilterButtons({
  filterOptions,
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">
      {filterOptions.map((filter) => (
        <button
          className={`rounded-full px-6 py-2 font-medium text-sm transition-all duration-300 ${
            activeFilter === filter.key
              ? 'bg-indigo-500 text-white shadow-indigo-500/30 shadow-lg'
              : 'hover:-translate-y-1 border border-indigo-500/30 bg-transparent text-slate-400 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400'
          }`}
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
