import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type UrlPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

const FIRST_PAGE = 1;
const NEIGHBOR_PAGE_RANGE = 2;

export function createPageUrl(basePath: string, page: number): string {
  return page === FIRST_PAGE ? basePath : `${basePath}/page/${page}`;
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  delta: number = NEIGHBOR_PAGE_RANGE
): Array<number | '...'> {
  if (totalPages <= FIRST_PAGE) {
    return [FIRST_PAGE];
  }

  const range: number[] = [];
  const rangeWithDots: Array<number | '...'> = [];
  const lastPage = totalPages;
  const start = Math.max(FIRST_PAGE + 1, currentPage - delta);
  const end = Math.min(lastPage - 1, currentPage + delta);

  for (let page = start; page <= end; page += 1) {
    range.push(page);
  }

  if (start > FIRST_PAGE + 1) {
    rangeWithDots.push(FIRST_PAGE, '...');
  } else {
    rangeWithDots.push(FIRST_PAGE);
  }

  rangeWithDots.push(...range);

  if (end < lastPage - 1) {
    rangeWithDots.push('...', lastPage);
  } else if (lastPage > FIRST_PAGE) {
    rangeWithDots.push(lastPage);
  }

  return rangeWithDots;
}

export default function UrlPagination({
  currentPage,
  totalPages,
  basePath = '/memo',
}: UrlPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          className="flex items-center gap-1 px-3 py-2 text-slate-400 text-sm transition-colors hover:text-indigo-400"
          href={createPageUrl(basePath, currentPage - 1)}
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
              href={createPageUrl(basePath, pageNumber)}
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
          href={createPageUrl(basePath, currentPage + 1)}
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
