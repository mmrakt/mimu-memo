'use client';

import MemoGrid from '@/memo/components/memo-grid';
import UrlPagination from '@/memo/components/url-pagination';
import type { PostListItem } from '@/memo/lib/types';

interface MemoListWithPaginationProps {
  basePath?: string;
  currentPage: number;
  posts: PostListItem[];
  totalPages: number;
}

export default function MemoListWithPagination({
  posts,
  currentPage,
  totalPages,
  basePath,
}: MemoListWithPaginationProps) {
  return (
    <>
      <MemoGrid posts={posts} />
      <UrlPagination basePath={basePath} currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
