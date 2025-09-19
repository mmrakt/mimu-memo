import { notFound } from 'next/navigation';
import AnimatedBackground from '@/_components/animated-background';
import PageHeader from '@/_components/page-header';
import { PAGINATION } from '@/config/constants';
import MemoListWithPagination from '@/memo/components/memo-list-with-pagination';
import { MEMO_PAGE_DESCRIPTION } from '@/memo/data';
import { getAllCombinedPosts } from '@/memo/services/combined-posts-service';
import { getAllPosts } from '@/memo/utils';

type MemoPageProps = {
  params: Promise<{
    page: string;
  }>;
};

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
  const currentPage = Number.parseInt(page, 10);

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
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <PageHeader description={MEMO_PAGE_DESCRIPTION} title="Memo" />
        <MemoListWithPagination
          currentPage={currentPage}
          posts={currentPosts}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
