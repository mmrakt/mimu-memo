import { ExternalLink, X } from 'lucide-react';
import { useEffect, useId } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import styles from '@/portfolio/components/markdown.module.css';
import type { PortfolioItem } from '@/portfolio/types';
import MediaComponent from './media-component';

type PortfolioModalProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const titleId = useId();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      tabIndex={-1}
    >
      <button
        aria-label="Close modal backdrop"
        className="absolute inset-0 z-0 h-full w-full cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl animate-fadeInUp overflow-y-auto rounded-xl bg-slate-800">
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:rotate-90 hover:bg-white/20"
          onClick={onClose}
          type="button"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="relative w-full">
          <MediaComponent
            alt={item.title}
            className="h-auto w-full"
            height={600}
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            src={item.image}
            width={800}
          />
        </div>

        <div className="p-8">
          <h2 className="mb-4 font-bold text-3xl text-slate-50" id={titleId}>
            {item.demo ? (
              <a
                className="underline decoration-transparent underline-offset-4 outline-none transition-colors hover:text-indigo-300 hover:decoration-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                href={item.demo}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h2>

          {item.startedAt && (
            <p className="mb-6 text-slate-400 text-sm">Started: {item.startedAt}</p>
          )}

          <div className="mb-6 flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-indigo-400 text-sm"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className={`${styles.markdown} mb-8`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
              {item.fullDescription}
            </ReactMarkdown>
          </div>

          <div className="flex gap-4">
            {item.isActive !== false && (
              <a
                className="hover:-translate-y-1 flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-indigo-500/30 hover:shadow-lg"
                href={item.demo}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-5 w-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
