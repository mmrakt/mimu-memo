export interface PortfolioItem {
  category: string;
  demo: string;
  description: string;
  fullDescription: string;
  github: string;
  id: number;
  image: string;
  isActive?: boolean;
  startedAt?: string;
  tech: string[];
  title: string;
}

export interface FilterOption {
  key: string;
  label: string;
}

export type CategoryKey = 'solo-development' | 'work';

export interface PortfolioFrontmatter {
  category?: string;
  description?: string;
  github?: string;
  image?: string;
  isActive?: boolean;
  startedAt?: string;
  tags?: string[];
  title?: string;
  url?: string;
}
