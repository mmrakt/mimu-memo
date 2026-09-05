export const CAREER_CONFIG = {
  // Animation delays
  ANIMATION: {
    EDUCATION_DELAY: '0.2s',
    HERO_DELAY: '0.3s',
    LANGUAGES_DELAY: '0.3s',
    SECTION_DELAY: '0.1s',
    TIMELINE_DELAY_MULTIPLIER: 0.2,
  },

  // Default values
  DEFAULTS: {
    EMPLOYMENT_TYPE: 'Full-time' as const,
    LOCATION: '東京',
    START_YEAR: 2020,
    TAGS: ['Full-Stack Developer', 'Team Leader', 'Problem Solver'],
  },

  // Language level display mapping
  LANGUAGE_LEVELS: {
    ネイティブ: 'Native',
    ビジネス会話レベル: 'Business Level',
  } as const,

  // Month names for date formatting
  MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  // Skills level mapping
  SKILLS: {
    LEVEL_MAPPING: {
      1: 'Beginner' as const,
      2: 'Intermediate' as const,
      3: 'Advanced' as const,
      4: 'Expert' as const,
      5: 'Expert' as const,
    },
  },

  // Timeline configuration
  TIMELINE: {
    GRADIENT_CLASSES: [
      'from-purple-500/10 to-purple-500/5',
      'from-cyan-500/10 to-cyan-500/5',
      'from-indigo-500/10 to-indigo-500/5',
      'from-emerald-500/10 to-emerald-500/5',
      'from-amber-500/10 to-amber-500/5',
    ],
    VISIBLE_THRESHOLD: 50,
  },
} as const;
