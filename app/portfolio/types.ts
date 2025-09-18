export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  demo: string;
  github: string;
  fullDescription: string;
  startedAt?: string;
  isActive?: boolean;
}

export interface FilterOption {
  key: string;
  label: string;
}

export type CategoryKey = 'solo-development' | 'work';

export interface PortfolioFrontmatter {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  url?: string;
  github?: string;
  startedAt?: string;
  isActive?: boolean;
  category?: string;
}
