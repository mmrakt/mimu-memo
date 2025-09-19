'use client';

import MemoGrid from '@/memo/components/memo-grid';
import UrlPagination from '@/memo/components/url-pagination';
import type { PostListItem } from '@/memo/lib/types';

type MemoListWithPaginationProps = {
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

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
