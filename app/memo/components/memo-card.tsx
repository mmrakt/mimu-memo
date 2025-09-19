'use client';

import { Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PAGINATION } from '@/config/constants';
import { getTagIconPath } from '@/memo/components/utils';
import { getMediaDisplayName, getMediaStyles, isExternalMedia } from '@/memo/lib/media-utils';
import type { PostListItem } from '@/memo/lib/types';

type MemoCardProps = {
  post: PostListItem;
  index: number;
};

type LinkProps = {
  href: string;
  target?: string;
  rel?: string;
};

type MediaBadge = {
  show: boolean;
  className: string;
  label: string;
};

const MEDIA_BADGE_BASE_CLASSES = 'flex items-center gap-1 rounded-full px-3 py-1 text-xs';
const SLIDE_BADGE_CLASSES = 'border border-amber-400/20 bg-amber-400/10 text-amber-400';

function buildLinkProps(post: PostListItem, isExternal: boolean): LinkProps {
  if (isExternal && post.link) {
    return {
      href: post.link,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return { href: `/memo/${post.id}` };
}

function buildMediaBadge(post: PostListItem, isSlide: boolean): MediaBadge {
  if (isSlide) {
    return {
      show: true,
      className: `${MEDIA_BADGE_BASE_CLASSES} ${SLIDE_BADGE_CLASSES}`,
      label: 'Slide',
    };
  }

  if (post.media && isExternalMedia(post.media)) {
    return {
      show: true,
      className: `${MEDIA_BADGE_BASE_CLASSES} ${getMediaStyles(post.media)}`,
      label: getMediaDisplayName(post.media),
    };
  }

  return {
    show: false,
    className: MEDIA_BADGE_BASE_CLASSES,
    label: '',
  };
}

export default function MemoCard({ post, index }: MemoCardProps) {
  const hasExternalMedia = post.media ? isExternalMedia(post.media) : false;
  const hasExternalLink = Boolean(post.link);
  const isSlide = Boolean(post.link && post.media === 'owned');
  const isExternal = hasExternalMedia || hasExternalLink;
  const LinkComponent = isExternal ? 'a' : Link;
  const linkProps = buildLinkProps(post, isExternal);
  const animationDelay = `${index * PAGINATION.ANIMATION_DELAY_MS}ms`;
  const mediaBadge = buildMediaBadge(post, isSlide);

  return (
    <LinkComponent
      {...linkProps}
      className="hover:-translate-y-2 block animate-fade-in-up cursor-pointer overflow-hidden rounded-2xl border border-indigo-500/10 bg-slate-800/50 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
      style={{
        animationDelay,
        animationFillMode: 'forwards',
      }}
    >
      <div className="group relative h-48 overflow-hidden bg-gradient-to-br from-indigo-600 to-cyan-600">
        <Image
          alt={post.title}
          className="object-contain p-16 transition-transform duration-300 group-hover:scale-105"
          fill
          src={getTagIconPath(post.tag)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-slate-400 text-sm">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.pubDate}
          </span>
          {post.tag && (
            <Link
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-400 text-xs transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/20"
              href={`/memo/tag/${post.tag}`}
              onClick={(event) => event.stopPropagation()}
            >
              {post.tag}
            </Link>
          )}
          {mediaBadge.show && (
            <span className={mediaBadge.className}>
              {mediaBadge.label}
              {isExternal && <ExternalLink className="h-3 w-3" />}
            </span>
          )}
        </div>
        <h2 className="mb-3 font-bold text-slate-100 text-xl transition-colors group-hover:text-indigo-400">
          {post.title}
        </h2>
        {post.excerpt && <p className="mb-4 line-clamp-3 text-slate-400">{post.excerpt}</p>}
      </div>
    </LinkComponent>
  );
}
