/**
 * @deprecated This file is deprecated. Import directly from the appropriate modules:
 * - Types: import from './lib/types'
 * - Services: import from './services/post-service'
 * - Utils: import from './lib/[specific-util-file]'
 */

import type {
  MemoBySlugResult as MemoBySlugResultType,
  MemoContent as MemoContentType,
  MemoMetadata as MemoMetadataType,
  PostListItem as PostListItemType,
} from '@/memo/lib/types';
import {
  getAllMemoSlugs as getAllMemoSlugsInternal,
  getAllPosts as getAllPostsInternal,
  getMemoBySlug as getMemoBySlugInternal,
} from '@/memo/services/post-service';

export type MemoBySlugResult = MemoBySlugResultType;
export type MemoContent = MemoContentType;
export type MemoMetadata = MemoMetadataType;
export type PostListItem = PostListItemType;

export function getAllMemoSlugs() {
  return getAllMemoSlugsInternal();
}

export function getAllPosts() {
  return getAllPostsInternal();
}

export function getMemoBySlug(slug: string) {
  return getMemoBySlugInternal(slug);
}

// TODO: Remove this file and update all imports to use direct imports
