export type MemoMetadata = {
  title: string;
  tag: string;
  pubDate: string;
  id: string;
};

export type MemoContent = {
  metadata: MemoMetadata;
  content: string;
  isMarkdown?: boolean;
};

export type PostListItem = {
  id: string;
  title: string;
  tag: string;
  pubDate: string;
  excerpt?: string;
  media?: 'owned' | 'qiita' | 'zenn' | 'note';
  link?: string;
};

export type MemoBySlugResult = {
  metadata: MemoMetadata;
  Component?: React.ComponentType;
  content?: string;
  isMarkdown?: boolean;
};
