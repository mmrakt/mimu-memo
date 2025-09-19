import Image from 'next/image';
import Link from 'next/link';
import { getTagIconPath } from '@/memo/components/utils';
import { getAllTags } from '@/memo/services/tag-service';

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl text-gray-900 dark:text-gray-100">Tag list</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tags.map((tag) => (
          <Link
            className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-400"
            href={`/memo/tag/${tag.name}`}
            key={tag.name}
          >
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                alt={`${tag.name} icon`}
                className="object-contain"
                fill
                src={getTagIconPath(tag.name)}
              />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold text-gray-900 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                {tag.name}
              </h2>
              <p className="text-gray-600 text-sm dark:text-gray-400">{tag.count} 件の記事</p>
            </div>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          タグが見つかりませんでした。
        </p>
      )}
    </div>
  );
}
