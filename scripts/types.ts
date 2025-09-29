export type ArticleSource = {
  title: string;
  url: string;
  summary?: string;
};

export type ThemeCandidate = {
  theme: string;
  summary: string[];
  sources: ArticleSource[];
};
