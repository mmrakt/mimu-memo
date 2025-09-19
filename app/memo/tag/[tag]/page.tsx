import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedBackground from '@/_components/AnimatedBackground';
import MemoListWithPagination from '@/memo/components/MemoListWithPagination';
import { getTagIconPath } from '@/memo/components/utils';
import { getAllTags, getPostsByTagPaginated } from '@/memo/services/tag-service';

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const { posts, currentPage, totalPages, totalPosts } = await getPostsByTagPaginated(
    decodedTag,
    1
  );

  if (totalPosts === 0) {
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
            ← Back to tag list
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
              <p className="text-gray-600 dark:text-gray-400">{totalPosts} 件の記事</p>
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
