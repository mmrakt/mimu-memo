import { PATHS, TAG_ICONS } from '@/config/constants';

export function getTagIconPath(tag: string): string {
  if (!tag) {
    return `${PATHS.TAG_ICONS_DIRECTORY}/other.svg`;
  }
  const iconName = TAG_ICONS[tag.toLowerCase() as keyof typeof TAG_ICONS];
  return iconName
    ? `${PATHS.TAG_ICONS_DIRECTORY}/${iconName}`
    : `${PATHS.TAG_ICONS_DIRECTORY}/other.svg`;
}
