'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PAGINATION } from '@/config/constants';
import MemoGrid from '@/memo/components/memo-grid';
import UrlPagination from '@/memo/components/url-pagination';
import type { PostListItem } from '@/memo/lib/types';

type MemoListProps = {
  posts: PostListItem[];
};

export default function MemoList({ posts }: MemoListProps) {
  const searchParams = useSearchParams();
  const postsPerPage = PAGINATION.POSTS_PER_PAGE;

  // Get current page from URL params
  const currentPage = Number(searchParams.get('page')) || 1;

  // Compute pagination with useMemo
  const pagination = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const items = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return { items, totalPages };
  }, [posts, currentPage, postsPerPage]);
  const paginatedPosts = pagination.items;
  const totalPageCount = pagination.totalPages;

  return (
    <>
      <MemoGrid posts={paginatedPosts} />
      {totalPageCount > 1 && (
        <UrlPagination basePath="/memo" currentPage={currentPage} totalPages={totalPageCount} />
      )}
    </>
  );
}
