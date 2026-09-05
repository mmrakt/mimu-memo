export interface MemoMetadata {
  id: string;
  pubDate: string;
  tag: string;
  title: string;
}

export interface MemoContent {
  content: string;
  isMarkdown?: boolean;
  metadata: MemoMetadata;
}

export interface PostListItem {
  excerpt?: string;
  id: string;
  link?: string;
  media?: 'owned' | 'qiita' | 'zenn' | 'note';
  pubDate: string;
  tag: string;
  title: string;
}

export interface MemoBySlugResult {
  Component?: React.ComponentType;
  content?: string;
  isMarkdown?: boolean;
  metadata: MemoMetadata;
}
