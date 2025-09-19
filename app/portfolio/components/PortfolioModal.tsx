import { ExternalLink, X } from 'lucide-react';
import { useEffect, useId } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import styles from '@/portfolio/components/markdown.module.css';
import type { PortfolioItem } from '@/portfolio/types';
import MediaComponent from './MediaComponent';

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      role="dialog"
      tabIndex={-1}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl animate-fadeInUp overflow-y-auto rounded-xl bg-slate-800">
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
            {item.title}
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
            <a
              className="hover:-translate-y-1 flex items-center gap-2 rounded-lg border-2 border-indigo-500 bg-transparent px-6 py-3 font-medium text-indigo-400 transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-indigo-500/30 hover:shadow-lg"
              href={item.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <title>GitHub</title>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
