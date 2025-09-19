import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type UrlPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

export default function UrlPagination({
  currentPage,
  totalPages,
  basePath = '/memo',
}: UrlPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => (page === 1 ? basePath : `${basePath}/page/${page}`);

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          className="flex items-center gap-1 px-3 py-2 text-slate-400 text-sm transition-colors hover:text-indigo-400"
          href={getPageUrl(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 px-3 py-2 text-slate-600 text-sm">
          <ChevronLeft className="h-4 w-4" />
          Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            // Use a unique key based on position in the array rather than index
            const dotsKey = index === 1 ? 'dots-left' : 'dots-right';
            return (
              <span className="px-3 py-2 text-slate-500" key={dotsKey}>
                ...
              </span>
            );
          }

          const pageNumber = Number(page);
          const isCurrentPage = pageNumber === currentPage;

          return (
            <Link
              className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                isCurrentPage
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-indigo-400'
              }
              `}
              href={getPageUrl(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          className="flex items-center gap-1 px-3 py-2 text-slate-400 text-sm transition-colors hover:text-indigo-400"
          href={getPageUrl(currentPage + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 px-3 py-2 text-slate-600 text-sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
