# Project Structure

## Root Level
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `biome.json` - Linting and formatting rules
- `vitest.config.ts` - Test configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `lefthook.yml` - Git hooks (currently commented out)

## App Directory Structure (Next.js App Router)
```
app/
├── _components/          # Reusable UI components
│   ├── ui/              # UI-specific components
│   │   ├── HeroSection.tsx
│   │   ├── QuickNavigation.tsx
│   │   ├── SiteOverview.tsx
│   │   └── ExternalLinks.tsx
│   ├── icons/           # Custom icon components
│   ├── Navigation.tsx   # Main navigation
│   ├── Footer.tsx       # Site footer
│   └── AnimatedBackground.tsx
├── _contents/           # Static content (Markdown files)
│   ├── memo/           # Blog posts/memos
│   ├── portfolio/      # Portfolio projects
│   └── career/         # Career information
├── _services/          # Business logic and data services
├── _utils/             # Utility functions
├── memo/               # Memo pages route
├── portfolio/          # Portfolio pages route
├── career/             # Career pages route
├── config/             # Configuration files
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles
└── config.ts           # App configuration
```

## Key Design Patterns
- Route-based organization following Next.js App Router
- Separation of concerns: components, services, utils, contents
- Underscore prefix for internal/shared directories
- Co-location of related functionality