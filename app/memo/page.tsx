import { Tag } from 'lucide-react';
import Link from 'next/link';
import AnimatedBackground from '@/_components/animated-background';
import PageHeader from '@/_components/page-header';
import { PAGINATION } from '@/config/constants';
import MemoListWithPagination from '@/memo/components/memo-list-with-pagination';
import { MEMO_PAGE_DESCRIPTION } from '@/memo/data';
import { getAllCombinedPosts } from '@/memo/services/combined-posts-service';

export default async function MemoPage() {
  const posts = await getAllCombinedPosts();
  const totalPages = Math.ceil(posts.length / PAGINATION.POSTS_PER_PAGE);

  const startIndex = 0;
  const endIndex = PAGINATION.POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <PageHeader description={MEMO_PAGE_DESCRIPTION} title="Memo" />

        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-indigo-400 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/20"
            href="/memo/tags"
          >
            <Tag size={18} />
            <span>View All Tag</span>
          </Link>
        </div>

        <MemoListWithPagination currentPage={1} posts={currentPosts} totalPages={totalPages} />
      </div>
    </div>
  );
}
