import type { Metadata } from 'next';
import { ABOUT_SITE, MY_NAME, SITE_NAME, SITE_URL } from '@/config';

type MetadataConfig = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
};
type ArticleMetadataOptions = {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};
const DEFAULT_OG_IMAGE = '/ogp/thumbnail.png';

export function generateMetadata(config: MetadataConfig = {}): Metadata {
  const {
    title,
    description = ABOUT_SITE.join(' '),
    path = '',
    image = DEFAULT_OG_IMAGE,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = MY_NAME,
    tags = [],
  } = config;

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${MY_NAME}'s personal site`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const metadata: Metadata = {
    alternates: {
      canonical: url,
    },
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      description,
      images: [
        {
          alt: title || `${SITE_NAME} - ${MY_NAME}'s personal site`,
          height: 630,
          url: imageUrl,
          width: 1200,
        },
      ],
      locale: 'ja_JP',
      siteName: SITE_NAME,
      title: fullTitle,
      type,
      url,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
      index: true,
    },
    title: fullTitle,
    twitter: {
      card: 'summary_large_image',
      creator: '@mmrakt',
      description,
      images: [imageUrl],
      title: fullTitle,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      authors: [author],
      modifiedTime,
      publishedTime,
      tags,
      type: 'article',
    };

    // Add structured data for articles
    metadata.other = {
      'article:author': author,
      'article:modified_time': modifiedTime || '',
      'article:published_time': publishedTime || '',
      'article:tag': tags.join(','),
    };
  }

  return metadata;
}

export function generatePageMetadata(title: string, description?: string, path?: string): Metadata {
  return generateMetadata({
    description,
    path,
    title,
  });
}

export function generateArticleMetadata(options: ArticleMetadataOptions): Metadata {
  const { title, description, path, publishedTime, modifiedTime, tags } = options;

  return generateMetadata({
    description,
    modifiedTime,
    path,
    publishedTime,
    tags,
    title,
    type: 'article',
  });
}

export function generateJsonLd(
  config: MetadataConfig & { datePublished?: string; dateModified?: string }
) {
  const {
    title,
    description = ABOUT_SITE.join(' '),
    path = '',
    author = MY_NAME,
    datePublished,
    dateModified,
    tags = [],
  } = config;

  const url = `${SITE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
      '@type': 'Person',
      name: author,
      url: SITE_URL,
    },
    dateModified,
    datePublished,
    description,
    headline: title,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    keywords: tags.join(', '),
    mainEntityOfPage: {
      '@id': url,
      '@type': 'WebPage',
    },
    publisher: {
      '@type': 'Person',
      name: MY_NAME,
      url: SITE_URL,
    },
    url,
  };
}
