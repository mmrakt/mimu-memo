import dayjs from 'dayjs';
import { remark } from 'remark';
import Parser from 'rss-parser';
import strip from 'strip-markdown';
import { NOTE_FEED_URL, QIITA_API_ENDPOINT, ZENN_FEED_URL } from '@/config';
import type { Frontmatter, MediaType, QiitaPost } from '@/memo/services/external-content/types';

dayjs().format();

// import type { CollectionEntry } from "astro:content";

const EXCERPT_MAX_LENGTH = 70;

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const formatPostDate = (date: Date | string) => dayjs(date).format('YYYY-MM-DD');

export const sortPostsByPubDate = (posts: Frontmatter[]): Frontmatter[] =>
  posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

export const makeQiitaPosts = async (): Promise<Frontmatter[]> => {
  const token = process.env.QIITA_TOKEN || '';
  if (!token) {
    return [];
  }

  const posts = await fetchPosts(QIITA_API_ENDPOINT, token);
  return mappingQiitaFeed(posts);
};

export const makeZennPosts = async (): Promise<Frontmatter[]> => {
  const feed = await fetchFeed(ZENN_FEED_URL);
  return mappingFeed(feed.items, 'zenn');
};

export const makeNotePosts = async (): Promise<Frontmatter[]> => {
  const feed = await fetchFeed(NOTE_FEED_URL);
  return mappingFeed(feed.items, 'note');
};

export const fetchFeed = async (url: string) => {
  const feed = await new Parser().parseURL(url);
  return feed;
};

export const fetchPosts = async (endpoint: string, token: string) => {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

const mappingQiitaFeed = (posts: QiitaPost[]): Frontmatter[] => {
  return posts.map((post) => ({
    title: post.title ?? '',
    pubDate: post.created_at ? dayjs(post.created_at).format('YYYY-MM-DD') : '',
    link: post.url ?? '',
    media: 'qiita',
  }));
};

const mappingFeed = (items: Parser.Item[], media: Exclude<MediaType, 'mimu-memo'>) =>
  items.map((item) => ({
    title: item.title ?? '',
    pubDate: item.pubDate ? dayjs(item.pubDate).format('YYYY-MM-DD') : '',
    link: item.link ?? '',
    media,
  }));

export const extractExcerptFromBody = async (body: string) => {
  let excerpt = '';
  const processing = await remark().use(strip).process(body);
  excerpt = processing.toString().replace(/\r|\n|\rn/g, ' ');

  if (excerpt.length > EXCERPT_MAX_LENGTH) {
    return `${excerpt.slice(0, EXCERPT_MAX_LENGTH)}...`;
  }
  return excerpt;
};

// export const fromCollectionToFrontmatters = (
//   collection: any[] // FIXME
// ): Frontmatter[] => {
//   return collection.map((entry) => {
//     return {
//       pubDate: entry.data.pubDate,
//       title: entry.data.title,
//       tag: entry.data.tag,
//       link: entry.slug,
//       media: "owned",
//     };
//   });
// };

// export const calcTagCountByCollection = (
//   collection: any[] // FIXME
// ): TagCount[] => {
//   return collection
//     .flatMap((post) => ({ name: post.data.tag, count: 1 }))
//     .reduce((acc, cur) => {
//       const found = acc.find((el) => el.name === cur.name);
//       if (found) {
//         found.count += 1;
//       } else {
//         acc.push(cur);
//       }
//       return acc;
//     }, []);
// };
