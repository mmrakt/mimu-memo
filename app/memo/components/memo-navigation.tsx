import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { PostListItem } from '@/memo/lib/types';

type MemoNavigationProps = {
  previous: PostListItem | null;
  next: PostListItem | null;
};

export default function MemoNavigation({ previous, next }: MemoNavigationProps) {
  if (!(previous || next)) {
    return null;
  }

  return (
    <nav className="border-indigo-500/10 border-t bg-slate-900/40">
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {previous && (
          <Link
            aria-label={`前の記事: ${previous.title}`}
            className="group flex items-center gap-3 rounded-xl border border-indigo-500/10 bg-slate-800/40 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/60"
            href={`/memo/${previous.id}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-slate-400 text-sm">Previous</p>
              <p className="line-clamp-2 font-semibold text-slate-100 transition-colors group-hover:text-indigo-300">
                {previous.title}
              </p>
            </div>
          </Link>
        )}

        {next && (
          <Link
            aria-label={`次の記事: ${next.title}`}
            className="group flex items-center gap-3 rounded-xl border border-indigo-500/10 bg-slate-800/40 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/60 md:flex-row-reverse"
            href={`/memo/${next.id}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
              <ArrowRight className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-slate-400 text-sm">Next</p>
              <p className="line-clamp-2 font-semibold text-slate-100 transition-colors group-hover:text-indigo-300">
                {next.title}
              </p>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
