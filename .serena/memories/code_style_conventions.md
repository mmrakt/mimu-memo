# Code Style and Conventions

## Naming Conventions
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Variables/Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfileData`)

## TypeScript Configuration
- Strict mode enabled with enhanced strictness rules
- `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride` enabled
- Path mapping: `@/*` maps to `./app/*`
- Explicit types required for function parameters and return values
- Prefer interfaces for object shapes, types for unions/primitives
- Avoid `any`, use `unknown` when necessary

## Biome Configuration
- **Indentation**: 2 spaces
- **Line width**: 100 characters
- **Quote style**: Single quotes for JavaScript
- **Import protocol**: Node.js import protocol enforced
- **Rules**: Recommended set enabled with style rules

## Component Guidelines
- Use function components with hooks (no class components)
- Use `const` declarations for component definitions
- Components should be small and focused (single responsibility)
- Extract complex logic into custom hooks
- Props must be explicitly typed with interfaces
- Use React.memo() for performance when appropriate

## Import Guidelines
- NEVER use absolute paths
- ALWAYS use import aliases starting with `@/`
- Import order: external libraries, then internal modules

## Async/Await Patterns
- Prioritize async/await over Promise chains
- Use `Promise.all()` for parallel processing
- Always implement error handling
- Explicitly define return types for async functions