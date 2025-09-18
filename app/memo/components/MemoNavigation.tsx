import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PostListItem } from "@/memo/lib/types";

interface MemoNavigationProps {
  previous: PostListItem | null;
  next: PostListItem | null;
}

export default function MemoNavigation({
  previous,
  next,
}: MemoNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="border-t border-indigo-500/10 bg-slate-900/40">
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {previous && (
          <Link
            href={`/memo/${previous.id}`}
            className="group flex items-center gap-3 rounded-xl border border-indigo-500/10 bg-slate-800/40 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/60"
            aria-label={`前の記事: ${previous.title}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
              <ArrowLeft className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-sm text-slate-400">Previous</p>
              <p className="line-clamp-2 font-semibold text-slate-100 transition-colors group-hover:text-indigo-300">
                {previous.title}
              </p>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={`/memo/${next.id}`}
            className="group flex items-center gap-3 rounded-xl border border-indigo-500/10 bg-slate-800/40 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/60 md:flex-row-reverse"
            aria-label={`次の記事: ${next.title}`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
              <ArrowRight className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-sm text-slate-400">Next</p>
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
