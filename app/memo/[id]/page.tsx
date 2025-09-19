import { ArrowLeft, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import AnimatedBackground from '@/_components/AnimatedBackground';
import MemoNavigation from '@/memo/components/MemoNavigation';
import { getTagIconPath } from '@/memo/components/utils';
import { getAdjacentPosts } from '@/memo/services/post-service';
import { getAllMemoSlugs, getMemoBySlug } from '@/memo/utils';
import styles from './markdown.module.css';

type MemoDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllMemoSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: MemoDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const memo = await getMemoBySlug(id);

  if (!memo) {
    return {
      title: 'Not Found | mimu-memo',
    };
  }

  return {
    title: `${memo.metadata.title} | mimu-memo`,
    description: `Read about ${memo.metadata.title} on mimu-memo blog`,
    openGraph: {
      title: memo.metadata.title,
      description: `Read about ${memo.metadata.title} on mimu-memo blog`,
      type: 'article',
      publishedTime: memo.metadata.pubDate,
      authors: ['mimu'],
    },
  };
}

export default async function MemoDetailPage({ params }: MemoDetailPageProps) {
  const { id } = await params;
  const memo = await getMemoBySlug(id);

  if (!memo) {
    notFound();
  }

  const { metadata, Component, content, isMarkdown } = memo;
  const { previous, next } = await getAdjacentPosts(id);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Link
          className="mb-8 inline-flex items-center gap-2 text-indigo-400 transition-colors hover:text-indigo-300"
          href="/memo"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to memo list
        </Link>

        <article className="overflow-hidden rounded-2xl border border-indigo-500/10 bg-slate-800/50 backdrop-blur-sm">
          <header className="border-indigo-500/10 border-b p-8 text-center">
            <div className="mb-6">
              <Image
                alt={`${metadata.tag} icon`}
                className="mx-auto mb-4"
                height={64}
                src={getTagIconPath(metadata.tag)}
                width={64}
              />
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text font-bold font-space-grotesk text-4xl text-transparent leading-tight">
              {metadata.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{metadata.pubDate}</span>
              </div>
              <Link
                className="rounded-full bg-indigo-500/10 px-3 py-1 text-indigo-400 text-sm transition-colors hover:bg-indigo-500/20 hover:text-indigo-300"
                href={`/memo/tag/${metadata.tag}`}
              >
                {metadata.tag}
              </Link>
            </div>
          </header>

          <div className="space-y-6 p-8">
            {isMarkdown && content ? (
              <div className={styles.markdown}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : Component ? (
              <Component />
            ) : null}
          </div>
          <MemoNavigation next={next} previous={previous} />
        </article>
      </div>
    </div>
  );
}
