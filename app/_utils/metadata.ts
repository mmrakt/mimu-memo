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
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || `${SITE_NAME} - ${MY_NAME}'s personal site`,
        },
      ],
      locale: 'ja_JP',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@mmrakt',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      tags,
    };

    // Add structured data for articles
    metadata.other = {
      'article:author': author,
      'article:published_time': publishedTime || '',
      'article:modified_time': modifiedTime || '',
      'article:tag': tags.join(','),
    };
  }

  return metadata;
}

export function generatePageMetadata(title: string, description?: string, path?: string): Metadata {
  return generateMetadata({
    title,
    description,
    path,
  });
}

export function generateArticleMetadata(
  title: string,
  description: string,
  path: string,
  publishedTime?: string,
  modifiedTime?: string,
  tags?: string[]
): Metadata {
  return generateMetadata({
    title,
    description,
    path,
    type: 'article',
    publishedTime,
    modifiedTime,
    tags,
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
    headline: title,
    description,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    author: {
      '@type': 'Person',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: MY_NAME,
      url: SITE_URL,
    },
    url,
    datePublished,
    dateModified,
    keywords: tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
