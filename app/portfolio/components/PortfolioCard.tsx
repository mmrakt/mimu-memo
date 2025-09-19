import { getCategoryName } from '@/portfolio/data';
import type { PortfolioItem } from '@/portfolio/types';
import MediaComponent from './MediaComponent';

type PortfolioCardProps = {
  item: PortfolioItem;
  index: number;
  onCardClick: (item: PortfolioItem) => void;
};

export default function PortfolioCard({ item, index, onCardClick }: PortfolioCardProps) {
  const handleClick = () => {
    onCardClick(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCardClick(item);
    }
  };

  return (
    <button
      aria-label={`View details for ${item.title}`}
      className="group hover:-translate-y-2 animate-fadeInUp cursor-pointer overflow-hidden rounded-xl border border-indigo-600/10 bg-slate-800 text-left transition-all duration-300 hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/20"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ animationDelay: `${index * 100}ms` }}
      tabIndex={0}
      type="button"
    >
      <div className="relative overflow-hidden">
        <MediaComponent
          alt={item.title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          height={250}
          src={item.image}
          width={400}
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/90 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div>
            <h3 className="mb-2 font-bold text-white text-xl">{item.title}</h3>
            <p className="text-slate-300 text-sm">Click to view details</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2 font-semibold text-cyan-400 text-sm tracking-wide">
          {getCategoryName(item.category)}
        </div>
        <h3 className="mb-3 font-bold text-slate-50 text-xl">{item.title}</h3>
        <p className="mb-4 text-slate-400 leading-relaxed">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-indigo-400 text-xs transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/20"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
