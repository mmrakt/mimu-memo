/**
 * UI-related constants for the memo module
 */
export const UI_CONSTANTS = {
  ANIMATION: {
    CARD_HOVER_DURATION: 300,
    STAGGER_DELAY: 100,
  },
  EXCERPT: {
    MAX_LENGTH: 70,
    TRUNCATE_SUFFIX: '...',
  },
  GRID: {
    BREAKPOINTS: {
      LARGE: 4,
      MEDIUM: 3,
      SMALL: 2,
    },
    CLASSES: {
      LARGE: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16',
      MEDIUM: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16',
      SMALL: 'grid grid-cols-1 md:grid-cols-2 gap-8 mb-16',
    },
  },
} as const;

/**
 * Type definitions for UI constants
 */
export type GridSize = keyof typeof UI_CONSTANTS.GRID.CLASSES;

/**
 * Get grid class based on item count
 */
export function getGridClass(itemCount: number): string {
  if (itemCount <= UI_CONSTANTS.GRID.BREAKPOINTS.SMALL) {
    return UI_CONSTANTS.GRID.CLASSES.SMALL;
  }
  if (itemCount <= UI_CONSTANTS.GRID.BREAKPOINTS.MEDIUM) {
    return UI_CONSTANTS.GRID.CLASSES.MEDIUM;
  }
  return UI_CONSTANTS.GRID.CLASSES.LARGE;
}
