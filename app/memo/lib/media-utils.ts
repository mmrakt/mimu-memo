import type { MediaType } from '@/memo/services/external-content/types';

/**
 * Type-safe media styling utility
 */
export function getMediaStyles(media: MediaType): string {
  const mediaStyleMap: Record<MediaType, string> = {
    owned: 'bg-slate-400/10 border border-slate-400/20 text-slate-400',
    qiita: 'bg-green-400/10 border border-green-400/20 text-green-400',
    zenn: 'bg-blue-400/10 border border-blue-400/20 text-blue-400',
    note: 'bg-purple-400/10 border border-purple-400/20 text-purple-400',
  };

  return mediaStyleMap[media];
}

/**
 * Type-safe media display name utility
 */
export function getMediaDisplayName(media: MediaType): string {
  const mediaDisplayMap: Record<MediaType, string> = {
    owned: 'mimu-memo',
    qiita: 'Qiita',
    zenn: 'Zenn',
    note: 'note',
  };

  return mediaDisplayMap[media];
}

/**
 * Type guard to check if media is external
 */
export function isExternalMedia(media: MediaType): boolean {
  return media !== 'owned';
}
