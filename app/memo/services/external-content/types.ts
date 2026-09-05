import type { MEDIA_TYPE_LIST, MEDIA_TYPE_LIST_FOR_DISPLAY } from '@/config';
import type { TAG_LIST } from '@/memo/services/tag-service';

export interface NavItems {
  [key: string]: NavItem;
}

export interface NavItem {
  path: string;
  title: string;
}

export interface Frontmatter {
  link: string;
  media: MediaType; // TODO: 汎用化する
  pubDate: string | Date;
  tag?: Tag;
  title: string;
}

export interface PaginatedPost {
  entry: unknown; // FIXME
  next: {
    url: string;
    title: string;
  };
  prev: {
    url: string;
    title: string;
  };
}

export type MediaType = (typeof MEDIA_TYPE_LIST)[number];
export type MediaTypeForDisplay = (typeof MEDIA_TYPE_LIST_FOR_DISPLAY)[number];

export interface QiitaTag {
  name: string;
  versions: string[];
}

export interface QiitaUser {
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
}

export interface QiitaPost {
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group?: null;
  id: string;
  likes_count: number;
  organization_url_name?: null;
  page_views_count: number;
  private: boolean;
  reactions_count: number;
  rendered_body: string;
  slide: boolean;
  stocks_count: number;
  tags?: QiitaTag[];
  team_membership?: null;
  title: string;
  updated_at: string;
  url: string;
  user: QiitaUser;
}

export type Tag = (typeof TAG_LIST)[number];

export interface TagCount {
  count: number;
  name: Tag;
}
