import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedBackground from '@/_components/AnimatedBackground';
import MemoListWithPagination from '@/memo/components/MemoListWithPagination';
import { getTagIconPath } from '@/memo/components/utils';
import { getAllTags, getPostsByTagPaginated } from '@/memo/services/tag-service';

interface PageProps {
  params: Promise<{
    tag: string;
    page: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  const params = [];

  for (const tag of tags) {
    const { totalPages } = await getPostsByTagPaginated(tag.name, 1);
    for (let page = 2; page <= totalPages; page++) {
      params.push({
        tag: tag.name,
        page: page.toString(),
      });
    }
  }

  return params;
}

export default async function TagPagePaginated({ params }: PageProps) {
  const { tag, page } = await params;
  const decodedTag = decodeURIComponent(tag);
  const pageNumber = parseInt(page, 10);

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, currentPage, totalPages, totalPosts } = await getPostsByTagPaginated(
    decodedTag,
    pageNumber,
  );

  if (totalPosts === 0 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Link
            href="/memo/tags"
            className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:underline mb-4"
          >
            ← タグ一覧に戻る
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src={getTagIconPath(decodedTag)}
                alt={`${decodedTag} icon`}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{decodedTag}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {totalPosts} 件の記事 (ページ {currentPage}/{totalPages})
              </p>
            </div>
          </div>
        </div>

        <MemoListWithPagination
          posts={posts}
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/memo/tag/${tag}`}
        />
      </div>
    </div>
  );
}
