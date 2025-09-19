# Suggested Commands

## Development Commands

- `bun run dev` - Start development server with Turbopack
- `bun run dev:watch` - Start development with file watcher
- `bun run build` - Build for production
- `bun run build:analyze` - Build with bundle analysis
- `bun run start` - Start production server

## Code Quality Commands

- `bun tc` - Run TypeScript type checking
- `bun check` - Run Biome linting
- `bun check:fix` - Run Biome linting with auto-fix
- `bun run test` - Run Vitest test suite
- `bun run test:ui` - Run tests with UI
- `bun run test:coverage` - Run tests with coverage report

## Package Management

- `bun install` - Install dependencies (preferred for CI)
- `bun install` - Alternative package installation
- `bun add <package>` - Add new dependency
- `bun add -D <package>` - Add dev dependency

## Git Workflow Commands

- `git add .` - Stage changes
- `git commit -m "type: description"` - Commit with conventional format
- `git push` - Push changes

## System Commands (macOS/Darwin)

- `ls -la` - List files with details
- `find . -name "*.tsx"` - Find TypeScript React files
- `grep -r "pattern" app/` - Search in app directory
- `cd <directory>` - Change directory
- `pwd` - Print working directory

## Special Scripts

- `mise use` - Manage development environment
- `lefthook install` - Install git hooks (when enabled)
