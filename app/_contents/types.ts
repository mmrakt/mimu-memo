import type { MEDIA_TYPE_LIST, MEDIA_TYPE_LIST_FOR_DISPLAY } from '@/config';
import type { MEMO_TAG_LIST } from '@/memo/constants';

export type NavItems = {
  [key: string]: NavItem;
};

export type NavItem = {
  path: string;
  title: string;
};

export type Frontmatter = {
  pubDate: string | Date;
  title: string;
  link: string;
  media: MediaType; // TODO: 汎用化する
  tag?: Tag;
};

export type PaginatedPost = {
  entry: unknown; // FIXME
  next: {
    url: string;
    title: string;
  };
  prev: {
    url: string;
    title: string;
  };
};

export type MediaType = (typeof MEDIA_TYPE_LIST)[number];
export type MediaTypeForDisplay = (typeof MEDIA_TYPE_LIST_FOR_DISPLAY)[number];

export type QiitaTag = {
  name: string;
  versions: string[];
};

export type QiitaUser = {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string;
  id: string;
  items_count: number;
  linkedin_id: string;
  location: string;
  name: string;
  organization: string;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string;
};

export type QiitaPost = {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group?: null;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags?: QiitaTag[];
  title: string;
  updated_at: string;
  url: string;
  user: QiitaUser;
  page_views_count: number;
  team_membership?: null;
  organization_url_name?: null;
  slide: boolean;
};

export type Tag = (typeof MEMO_TAG_LIST)[number];
export type TagCount = {
  name: Tag;
  count: number;
};
