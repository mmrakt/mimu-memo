# Mimu-Memo Architecture Documentation

## Project Overview

**Mimu-Memo** is a personal blog and portfolio website built with modern web technologies. It serves as a platform for sharing technical memos, showcasing portfolio projects, and presenting career information.

## Tech Stack

### Core Framework
- **Next.js 15.3.4** - Full-stack React framework with App Router
- **React 19.0.0** - UI library with latest features
- **TypeScript 5.x** - Type-safe development

### Styling & UI
- **TailwindCSS 4.x** - Utility-first CSS framework
- **@tailwindcss/typography** - Typography plugin for markdown content
- **Lucide React** - Icon library
- **Custom animations** - CSS keyframes and Tailwind animations

### Content Management
- **Markdown** - Content authoring format
- **Gray Matter** - YAML front matter parsing
- **React Markdown** - Markdown rendering
- **Rehype Highlight** - Syntax highlighting
- **Remark GFM** - GitHub Flavored Markdown support

### Development Tools
- **Biome** - Fast linter and formatter (replacing ESLint/Prettier)
- **Vitest** - Fast test runner with coverage
- **Testing Library** - React component testing
- **Turbopack** - Fast bundler for development
- **pnpm** - Efficient package manager

### Performance & Analytics
- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring
- **Bundle Analyzer** - Build size analysis

### Development Experience
- **Lefthook** - Git hooks management
- **tsx** - TypeScript execution
- **mise** - Runtime version management
- **chokidar** - File watching utility

## Architecture Patterns

### Project Structure

```
app/
├── _components/          # Shared UI components
│   ├── icons/           # Icon components
│   └── ui/              # Reusable UI components
├── _contents/           # Static content data
│   ├── career/          # Career information
│   ├── memo/            # Blog post markdown files
│   └── portfolio/       # Portfolio project descriptions
├── _services/           # Business logic layer
│   ├── career/          # Career-related services
│   └── shared/          # Common utilities
├── _utils/              # Helper utilities
├── career/              # Career section pages/components
├── memo/                # Blog section with dynamic routing
│   ├── [id]/            # Individual post pages
│   ├── page/[page]/     # Pagination
│   └── tag/[tag]/       # Tag-based filtering
└── portfolio/           # Portfolio showcase section
```

### Design Patterns

#### Service Layer Pattern
- Business logic separated into service modules
- Centralized error handling
- Type-safe data transformation

#### Component Composition
- Atomic design principles
- Reusable UI components
- Prop-based customization

#### File-based Content Management
- Markdown files for content
- YAML frontmatter for metadata
- Static generation for performance

#### Type Safety
- Strict TypeScript configuration
- Interface definitions for all data structures
- Enhanced compiler checks enabled

## Key Features

### Content Sections
1. **Memo** - Technical blog posts with tagging and pagination
2. **Portfolio** - Project showcases with media support
3. **Career** - Professional experience timeline

### Technical Capabilities
- **Static Site Generation** - Pre-rendered pages for optimal performance
- **Dynamic Routing** - File-based routing with Next.js App Router
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **SEO Optimization** - Metadata generation and structured data
- **Performance Monitoring** - Real-time analytics and insights

### Development Features
- **Hot Reloading** - Fast development with Turbopack
- **Type Checking** - Comprehensive TypeScript validation
- **Testing** - Unit and integration tests with Vitest
- **Code Quality** - Automated linting and formatting
- **Git Hooks** - Pre-commit validation

## Performance Optimizations

### Build Optimizations
- Bundle analysis for size monitoring
- Tree shaking for unused code elimination
- Image optimization with Next.js Image component
- File tracing exclusions for pnpm store

### Runtime Optimizations
- Static generation for blog content
- Lazy loading for components
- CSS-in-JS optimizations
- Font optimization with Google Fonts

## Security & Best Practices

### TypeScript Strictness
- Enhanced compiler options enabled
- Strict null checks and type validation
- Import/export validation

### Content Security
- Safe markdown rendering
- XSS prevention in user content
- Secure external link handling

## Deployment & Infrastructure

### Platform
- **Vercel** - Serverless deployment platform
- **Edge Runtime** - Global content delivery
- **Automatic deployments** - Git-based CI/CD

### Monitoring
- Performance metrics tracking
- Error monitoring and alerting
- Build and deployment analytics

## Development Workflow

### Local Development
```bash
pnpm dev          # Start development server with Turbopack
pnpm test         # Run test suite
pnpm check        # Lint and format code
pnpm build        # Production build
```

### Quality Assurance
- Pre-commit hooks for code quality
- Automated testing on pull requests
- Type checking on build
- Bundle size monitoring

## Scalability Considerations

### Content Growth
- File-based content management scales with repository
- Static generation maintains performance at scale
- Efficient pagination for large content sets

### Feature Extensions
- Modular service architecture
- Component-based UI system
- Type-safe API contracts

This architecture provides a solid foundation for a personal blog/portfolio site with excellent developer experience, performance, and maintainability.
