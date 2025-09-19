'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { PAGINATION } from '@/config/constants';
import MemoGrid from '@/memo/components/MemoGrid';
import UrlPagination from '@/memo/components/UrlPagination';
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
  const { currentPosts, totalPages } = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return { currentPosts, totalPages };
  }, [posts, currentPage, postsPerPage]);

  return (
    <>
      <MemoGrid posts={currentPosts} />
      {totalPages > 1 && (
        <UrlPagination basePath="/memo" currentPage={currentPage} totalPages={totalPages} />
      )}
    </>
  );
}
