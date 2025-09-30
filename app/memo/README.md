# Memo Module

This module handles the blog/memo functionality for the application, supporting both Markdown (.md) and MDX (.mdx) files

## Directory Structure

```
memo/
├── README.md                    # This documentation
├── data.ts                     # Page constants and descriptions
├── utils.ts                    # Re-exports for backward compatibility
├── page.tsx                    # Main memo list page (server component)
├── [id]/                       # Dynamic memo detail pages
│   ├── page.tsx               # Individual memo page
│   └── markdown.module.css    # Markdown styling
├── components/                 # UI components
│   ├── MemoList.tsx           # Client component for memo list with pagination
│   ├── Pagination.tsx         # Pagination component
│   ├── AnimatedBackground.tsx # Background animation component
│   ├── utils.ts              # Client-side utilities (tag icons)
│   └── __tests__/            # Component tests
├── lib/                       # Business logic libraries
│   ├── types.ts              # TypeScript type definitions
│   ├── date-utils.ts         # Date formatting and sorting utilities
│   ├── file-utils.ts         # File system utilities
│   └── __tests__/            # Library tests
└── services/                  # Data access layer
    └── post-service.ts        # Post data retrieval and processing
```

## Features

- **Multi-format Support**: Handles both .md and .mdx files
- **Automatic Post Discovery**: Scans the `content/memo/` directory
- **Frontmatter Parsing**: Extracts metadata from post headers
- **Date Handling**: Converts various date formats to consistent display
- **Pagination**: Client-side pagination for large post lists
- **Tag Icons**: Technology-specific icons for post tags
- **Static Generation**: All posts are pre-rendered at build time
- **Safe Rendering**: Uses react-markdown instead of dangerouslySetInnerHTML
- **Syntax Highlighting**: Code blocks with highlight.js support

## Post Format

Posts should be placed in `content/memo/` with frontmatter:

```markdown
---
title: Post Title
tag: react
pubDate: 2024-01-15
excerpt: Optional excerpt for the post list
---

# Post Content

Your markdown content here...
```

## Configuration

Key settings are defined in `app/config/constants.ts`:

- `PAGINATION.POSTS_PER_PAGE`: Number of posts per page (default: 6)
- `TAG_ICONS`: Mapping of tag names to SVG icons
- `PATHS.POSTS_DIRECTORY`: Location of post files
- Date format separators and file extensions

## Testing

Each module has comprehensive test coverage:

- **Unit Tests**: Individual functions and utilities
- **Integration Tests**: Component behavior and data flow
- **Type Safety**: Full TypeScript coverage

Run tests with: `bun run test app/memo`

## Performance

- **Static Generation**: All posts are built at compile time
- **Lazy Loading**: Components use React's built-in optimizations
- **Code Splitting**: Separate chunks for better loading
- **Image Optimization**: Next.js Image component for tag icons

## Extensibility

The modular structure makes it easy to:

- Add new file formats by extending `FILE_EXTENSIONS.SUPPORTED_POSTS`
- Add new tag icons by updating `TAG_ICONS`
- Modify pagination settings in `PAGINATION`
- Add new metadata fields to the `MemoMetadata` interface
- Extend styling through CSS modules or Tailwind classes
