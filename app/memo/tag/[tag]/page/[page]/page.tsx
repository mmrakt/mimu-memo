import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedBackground from '@/_components/animated-background';
import MemoListWithPagination from '@/memo/components/memo-list-with-pagination';
import { getTagIconPath } from '@/memo/components/utils';
import { getAllTags, getPostsByTagPaginated } from '@/memo/services/tag-service';

type PageProps = {
  params: Promise<{
    tag: string;
    page: string;
  }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  const params: Array<{ tag: string; page: string }> = [];

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
  const pageNumber = Number.parseInt(page, 10);

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, currentPage, totalPages, totalPosts } = await getPostsByTagPaginated(
    decodedTag,
    pageNumber
  );

  if (totalPosts === 0 || pageNumber > totalPages) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            className="mb-4 inline-flex items-center text-cyan-600 hover:underline dark:text-cyan-400"
            href="/memo/tags"
          >
            ← タグ一覧に戻る
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <Image
                alt={`${decodedTag} icon`}
                className="object-contain"
                fill
                src={getTagIconPath(decodedTag)}
              />
            </div>
            <div>
              <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">{decodedTag}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {totalPosts} 件の記事 (ページ {currentPage}/{totalPages})
              </p>
            </div>
          </div>
        </div>

        <MemoListWithPagination
          basePath={`/memo/tag/${tag}`}
          currentPage={currentPage}
          posts={posts}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
