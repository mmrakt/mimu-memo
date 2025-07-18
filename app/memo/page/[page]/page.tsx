import { notFound } from 'next/navigation';
import AnimatedBackground from '@/_components/AnimatedBackground';
import PageHeader from '@/_components/PageHeader';
import { PAGINATION } from '@/config/constants';
import MemoListWithPagination from '@/memo/components/MemoListWithPagination';
import { MEMO_PAGE_DESCRIPTION } from '@/memo/data';
import { getAllCombinedPosts } from '@/memo/services/combined-posts-service';
import { getAllPosts } from '@/memo/utils';

interface MemoPageProps {
  params: Promise<{
    page: string;
  }>;
}

export async function generateStaticParams() {
  // Use only internal posts for static generation to avoid build-time external API calls
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / PAGINATION.POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function MemoPageWithPagination({ params }: MemoPageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const posts = await getAllCombinedPosts();
  const totalPages = Math.ceil(posts.length / PAGINATION.POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    notFound();
  }

  const startIndex = (currentPage - 1) * PAGINATION.POSTS_PER_PAGE;
  const endIndex = startIndex + PAGINATION.POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <PageHeader title="Memo" description={MEMO_PAGE_DESCRIPTION} />
        <MemoListWithPagination
          posts={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
