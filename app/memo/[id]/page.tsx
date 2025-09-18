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

interface MemoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/memo"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to memo list
        </Link>

        <article className="bg-slate-800/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl overflow-hidden">
          <header className="text-center p-8 border-b border-indigo-500/10">
            <div className="mb-6">
              <Image
                src={getTagIconPath(metadata.tag)}
                alt={`${metadata.tag} icon`}
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
            </div>
            <h1 className="text-4xl font-bold font-space-grotesk mb-6 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
              {metadata.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-slate-400 flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{metadata.pubDate}</span>
              </div>
              <Link
                href={`/memo/tag/${metadata.tag}`}
                className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors"
              >
                {metadata.tag}
              </Link>
            </div>
          </header>

          <div className="p-8 space-y-6">
            {isMarkdown && content ? (
              <div className={styles.markdown}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : Component ? (
              <Component />
            ) : null}
          </div>
          <MemoNavigation previous={previous} next={next} />
        </article>
      </div>
    </div>
  );
}
