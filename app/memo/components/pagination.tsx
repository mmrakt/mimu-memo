'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const FIRST_PAGE = 1;
const MAX_VISIBLE_PAGES = 5;
const LEFT_ELLIPSIS_THRESHOLD = 1;
const LAST_PAGE_OFFSET = 1;

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers: number[] = [];
  const maxVisiblePages = MAX_VISIBLE_PAGES;

  let startPage = Math.max(FIRST_PAGE, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(FIRST_PAGE, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="rounded-lg border border-indigo-500/30 p-2 text-slate-300 transition-all duration-300 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === FIRST_PAGE}
        onClick={() => onPageChange(currentPage - LAST_PAGE_OFFSET)}
        type="button"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1">
        {startPage > FIRST_PAGE && (
          <>
            <button
              className="h-10 w-10 rounded-lg border border-indigo-500/30 text-slate-300 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
              onClick={() => onPageChange(FIRST_PAGE)}
              type="button"
            >
              {FIRST_PAGE}
            </button>
            {startPage > FIRST_PAGE + LEFT_ELLIPSIS_THRESHOLD && (
              <span className="px-2 text-slate-400">...</span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            className={`h-10 w-10 rounded-lg border transition-all duration-300 ${
              currentPage === number
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-indigo-500/30 text-slate-300 hover:bg-indigo-500 hover:text-white'
            }`}
            key={number}
            onClick={() => onPageChange(number)}
            type="button"
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - LAST_PAGE_OFFSET && (
              <span className="px-2 text-slate-400">...</span>
            )}
            <button
              className="h-10 w-10 rounded-lg border border-indigo-500/30 text-slate-300 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
              onClick={() => onPageChange(totalPages)}
              type="button"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className="rounded-lg border border-indigo-500/30 p-2 text-slate-300 transition-all duration-300 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + LAST_PAGE_OFFSET)}
        type="button"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
