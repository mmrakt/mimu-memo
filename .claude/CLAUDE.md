# Development Guidelines

## Project Overview

**mimu-memo** is a personal portfolio and blog website built with Next.js 16 and React 19. It showcases engineering experience, portfolio projects, and development memos (blog posts).

- **URL**: https://mimu-memo.com
- **Package Manager**: bun@1.2.2
- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome via Ultracite presets
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## Project Architecture

### File Structure

```
/
├── app/                          # Next.js App Router root
│   ├── _components/              # Shared UI components
│   ├── _services/                # Business logic and service layer
│   │   └── shared/               # Shared types, utils, error handlers
│   ├── _utils/                   # Utility functions (e.g., metadata generation)
│   ├── career/                   # Career/resume page
│   │   ├── components/           # Career-specific components
│   │   ├── services/             # Data transformation services
│   │   ├── utils/                # Career utilities (date, skills)
│   │   ├── config/constants.ts   # Career-section constants
│   │   └── types.ts              # Career-specific types
│   ├── memo/                     # Blog/memo section
│   │   ├── [id]/                 # Dynamic post detail page
│   │   ├── page/[page]/          # Pagination routes
│   │   ├── tag/[tag]/page/[page] # Tag-based filtered pagination
│   │   ├── tags/                 # Tag listing page
│   │   ├── components/           # Memo-specific components
│   │   ├── lib/                  # Memo utilities (file, date, error)
│   │   └── services/             # External content services
│   ├── portfolio/                # Portfolio showcase section
│   │   ├── components/           # Portfolio-specific components
│   │   ├── services/             # Portfolio data services
│   │   └── types.ts              # Portfolio-specific types
│   ├── config/
│   │   └── constants.ts          # Global app constants (pagination, tag icons, etc.)
│   ├── config.ts                 # Site-wide config (name, URL, social links, paths)
│   ├── globals.css               # Global styles and CSS animations
│   ├── layout.tsx                # Root layout with metadata and analytics
│   └── page.tsx                  # Homepage
├── content/                      # Static content (NOT inside app/)
│   ├── memo/                     # Markdown files for blog posts (frontmatter + body)
│   ├── portfolio/                # Portfolio project data (markdown/JSON)
│   └── career/                   # Career data files (JSONC format)
├── public/                       # Static assets (images, icons)
├── scripts/                      # Build and development scripts
├── .github/
│   ├── workflows/                # CI/CD (lint, test, type-check, claude-review)
│   └── actions/setup-bun/        # Custom Bun setup action
└── .claude/                      # Claude-specific configuration
```

### Import Aliases

Always use these path aliases — never use relative paths that cross directory boundaries:

```typescript
import { foo } from '@/components/foo'      // maps to app/
import { bar } from '@content/memo/bar'     // maps to content/
```

### Naming Conventions

- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Variables/Functions**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfileData`)
- **Test files**: Co-located in `__tests__/` directories next to the code being tested

### Component Guidelines

- Create small, focused components with single responsibilities
- Use TypeScript for all components with explicit type definitions
- Prefer function components; use `const` declarations
- Add `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Extract complex logic into custom hooks
- Explicitly type all props with interfaces or type aliases

### State Management

- Use React's built-in hooks (`useState`, `useReducer`) for component-level state
- Use custom hooks to encapsulate and reuse complex logic
- Use React Context for deeply nested component trees to avoid prop drilling
- Keep state as close to its usage as possible

### Service Layer Pattern

Business logic is separated into service files under `_services/` or feature-specific `services/` directories:

```typescript
// Return typed result objects, never throw to callers
type ServiceResult<T> = { success: true; data: T } | { success: false; error: string }
```

Shared types in `app/_services/shared/types.ts`:
- `ServiceResult<T>`, `ServiceError`, `AsyncServiceResult<T>`
- `PaginationParams`, `PaginatedResult<T>`, `BaseContent`, `Tag`

### Styling Guidelines

- **Tailwind CSS v4** with utility-first approach — always prefer Tailwind classes
- Use `globals.css` for custom keyframe animations and CSS variables only
- Dark mode is the default; CSS custom properties handle theming
- Mobile-first responsive design (use `sm:`, `md:`, `lg:` prefixes)
- Key theme colors: indigo (`#6366f1`), cyan (`#22d3ee`), amber (`#f59e0b`), dark slate bg (`#0f172a`)

### TypeScript Guidelines

- Strict mode is enabled — all strict checks apply
- No `any` type; use `unknown` and narrow appropriately
- No non-null assertions (`!` postfix)
- Use `import type` for type-only imports
- Use `export type` for type-only exports
- Use `as const` instead of explicit literal types
- Use `T[]` array syntax consistently (not `Array<T>`)
- No TypeScript enums — use string literal unions or `as const` objects instead

#### Async/Await Guidelines

- Prefer `async/await` over `.then()` chains
- Use `Promise.all()` / `Promise.allSettled()` for parallel operations
- Always handle errors with try/catch
- Explicitly annotate async function return types

### GitHub Usage Rules

- **Before pushing**: run `bun run check:fix` (lint + format), `bun run tc` (typecheck), `bun run test`
- **Commit message format**: `<prefix>: <Japanese description>` where prefix is one of: `feat`, `fix`, `docs`, `chore`
- **Commit messages must be written in Japanese**
- Make small, frequent commits — one logical change per commit
- **Branch naming**: `<prefix>/<issue-number>-short-description` (e.g., `fix/issue-42-navigation-bug`)
- PRs block on CI — lint, typecheck, and test workflows must all pass

### Performance Guidelines

- Use Next.js `<Image>` component — never use raw `<img>` tags
- Leverage Next.js App Router's built-in route-based code splitting
- Use `React.memo()` for components that re-render with identical props frequently
- Lazy-load non-critical components with `React.lazy()` / dynamic imports
- Use Turbopack in development (`bun run dev` uses `--turbopack`)
- Monitor bundle size with `bun run build:analyze`

### Testing Guidelines

- Test files live in `__tests__/` directories next to the code they test
- Write unit tests for utility functions and service layer logic
- Use React Testing Library for component tests
- Mock Next.js `<Image>`, `window.matchMedia`, and `IntersectionObserver` (already set up in `vitest.setup.ts`)
- Test runner: Vitest with jsdom environment, single-threaded (`maxWorkers: 1`)
- No focused tests (`test.only` / `it.only`), no disabled tests (`test.skip`)
- Assertions (`expect`) must be inside `it()`/`test()` blocks

### Security Guidelines

- Sanitize all user inputs to prevent XSS
- Use environment variables for secrets — never hardcode API keys or tokens
- Do not use `dangerouslySetInnerHTML` unless absolutely necessary
- Keep dependencies updated
- Never use `target="_blank"` without `rel="noopener"`

### Accessibility (a11y) Requirements

- Always include `lang` attribute on `<html>` element
- Always include `type` attribute on `<button>` elements
- Always include `title` element inside `<svg>` elements
- Always include `title` attribute for `<iframe>` elements
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`) instead of role attributes
- All images require meaningful `alt` text (exclude "image", "picture", "photo" from alt)
- `onClick` handlers must be accompanied by `onKeyUp`, `onKeyDown`, or `onKeyPress`
- `onMouseOver`/`onMouseOut` must be accompanied by `onFocus`/`onBlur`
- Don't assign `tabIndex` to non-interactive elements
- Don't assign interactive ARIA roles to non-interactive elements
- Respect `prefers-reduced-motion` in CSS animations

### Documentation Guidelines

- Document complex business logic and algorithms inline
- Use JSDoc comments for utility functions and service methods
- Keep TypeScript interfaces well-named and self-documenting
- Update this file when architectural patterns change

## Development Workflow

1. Create a feature branch from `main` using the naming convention above
2. Implement changes following the guidelines in this file
3. Run `bun run test` — fix any test failures
4. Run `bun run tc` — fix any TypeScript errors
5. Run `bun run check:fix` — auto-fix lint/format issues
6. Commit in small, logical chunks with Japanese commit messages
7. Push and open a pull request
8. Address code review and CI feedback before merge

## Available Scripts

```bash
bun run dev           # Start dev server with Turbopack
bun run dev:watch     # Start dev server with file watcher script
bun run build         # Production build
bun run build:analyze # Production build with bundle analysis (ANALYZE=true)
bun run start         # Start production server
bun run tc            # TypeScript type checking (tsc --noEmit)
bun run check         # Biome lint check (no writes)
bun run check:fix     # Biome lint + format with auto-fix (run before committing)
bun run test          # Run Vitest test suite
bun run test:ui       # Run Vitest with browser UI dashboard
bun run test:coverage # Run Vitest with coverage report
bun run react-doctor  # Check React best practices
```

## CI/CD Pipelines

All workflows run on pull requests and must pass before merging:

| Workflow | File | Command |
|---|---|---|
| Lint | `.github/workflows/lint.yml` | `bun run check` |
| Type Check | `.github/workflows/type-check.yml` | `bun run tc` |
| Tests | `.github/workflows/test.yml` | `bun run test` |
| Claude Code Review | `.github/workflows/claude-code-review.yml` | AI-assisted PR review |
| Auto Issue Resolver | `.github/workflows/auto-issue-resolver.yml` | Automated issue handling |

## Git Hooks (Lefthook)

Hooks run automatically — do not use `--no-verify`:

- **pre-commit**: Biome formatter/linter on staged files
- **pre-push**: TypeScript check (`bun run tc`) + test suite (`CI=1 bun run test`)
- **post-merge**: Auto-runs `bun install` when dependencies changed

## Key Configuration Files

| File | Purpose |
|---|---|
| `biome.json` | Linting/formatting config (extends `ultracite/core` and `ultracite/next`) |
| `tsconfig.json` | TypeScript config (strict mode, `@/` and `@content/` aliases) |
| `next.config.ts` | Next.js config (remote image patterns, Sass support) |
| `tailwind.config.ts` | Tailwind v4 config (custom animations, color scheme) |
| `vitest.config.ts` | Vitest config (jsdom, single-threaded, global mocks) |
| `vitest.setup.ts` | Test setup (jest-dom, Next.js Image mock, browser API polyfills) |
| `lefthook.yml` | Git hooks config |
| `app/config.ts` | Site constants (name, URL, social links, content paths) |
| `app/config/constants.ts` | App constants (pagination, tag icons, date formats) |

## Content Structure

Blog posts in `content/memo/` use Markdown with frontmatter (parsed by `gray-matter`):

```markdown
---
title: "Post Title"
date: "2024-01-01"
tags: ["typescript", "nextjs"]
---

Post content here...
```

Portfolio projects in `content/portfolio/` contain project metadata.
Career data in `content/career/` uses JSONC format.

Syntax highlighting uses `rehype-highlight` with the GitHub Dark theme.

---

# Ultracite Code Quality Rules

Ultracite enforces strict type safety, accessibility standards, and consistent code quality using Biome's formatter and linter.

## Key Principles
- Zero configuration required
- Subsecond performance
- Maximum type safety
- AI-friendly code generation

## Before Writing Code
1. Analyze existing patterns in the codebase
2. Consider edge cases and error scenarios
3. Follow the rules below strictly
4. Validate accessibility requirements

## Rules

### Accessibility (a11y)
- Don't use `accessKey` attribute on any HTML element.
- Don't set `aria-hidden="true"` on focusable elements.
- Don't add ARIA roles, states, and properties to elements that don't support them.
- Don't use distracting elements like `<marquee>` or `<blink>`.
- Only use the `scope` prop on `<th>` elements.
- Don't assign non-interactive ARIA roles to interactive HTML elements.
- Make sure label elements have text content and are associated with an input.
- Don't assign interactive ARIA roles to non-interactive HTML elements.
- Don't assign `tabIndex` to non-interactive HTML elements.
- Don't use positive integers for `tabIndex` property.
- Don't include "image", "picture", or "photo" in img alt prop.
- Don't use explicit role property that's the same as the implicit/default role.
- Make static elements with click handlers use a valid role attribute.
- Always include a `title` element for SVG elements.
- Give all elements requiring alt text meaningful information for screen readers.
- Make sure anchors have content that's accessible to screen readers.
- Assign `tabIndex` to non-interactive HTML elements with `aria-activedescendant`.
- Include all required ARIA attributes for elements with ARIA roles.
- Make sure ARIA properties are valid for the element's supported roles.
- Always include a `type` attribute for button elements.
- Make elements with interactive roles and handlers focusable.
- Give heading elements content that's accessible to screen readers (not hidden with `aria-hidden`).
- Always include a `lang` attribute on the html element.
- Always include a `title` attribute for iframe elements.
- Accompany `onClick` with at least one of: `onKeyUp`, `onKeyDown`, or `onKeyPress`.
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onBlur`.
- Include caption tracks for audio and video elements.
- Use semantic elements instead of role attributes in JSX.
- Make sure all anchors are valid and navigable.
- Ensure all ARIA properties (`aria-*`) are valid.
- Use valid, non-abstract ARIA roles for elements with ARIA roles.
- Use valid ARIA state and property values.
- Use valid values for the `autocomplete` attribute on input elements.
- Use correct ISO language/country codes for the `lang` attribute.

### Code Complexity and Quality
- Don't use consecutive spaces in regular expression literals.
- Don't use the `arguments` object.
- Don't use primitive type aliases or misleading types.
- Don't use the comma operator.
- Don't use empty type parameters in type aliases and interfaces.
- Don't write functions that exceed a given Cognitive Complexity score.
- Don't nest describe() blocks too deeply in test files.
- Don't use unnecessary boolean casts.
- Don't use unnecessary callbacks with flatMap.
- Use for...of statements instead of Array.forEach.
- Don't create classes that only have static members (like a static namespace).
- Don't use this and super in static contexts.
- Don't use unnecessary catch clauses.
- Don't use unnecessary constructors.
- Don't use unnecessary continue statements.
- Don't export empty modules that don't change anything.
- Don't use unnecessary escape sequences in regular expression literals.
- Don't use unnecessary fragments.
- Don't use unnecessary labels.
- Don't use unnecessary nested block statements.
- Don't rename imports, exports, and destructured assignments to the same name.
- Don't use unnecessary string or template literal concatenation.
- Don't use String.raw in template literals when there are no escape sequences.
- Don't use useless case statements in switch statements.
- Don't use ternary operators when simpler alternatives exist.
- Don't use useless `this` aliasing.
- Don't use any or unknown as type constraints.
- Don't initialize variables to undefined.
- Don't use the void operators (they're not familiar).
- Use arrow functions instead of function expressions.
- Use Date.now() to get milliseconds since the Unix Epoch.
- Use .flatMap() instead of map().flat() when possible.
- Use literal property access instead of computed property access.
- Don't use parseInt() or Number.parseInt() when binary, octal, or hexadecimal literals work.
- Use concise optional chaining instead of chained logical expressions.
- Use regular expression literals instead of the RegExp constructor when possible.
- Don't use number literal object member names that aren't base 10 or use underscore separators.
- Remove redundant terms from logical expressions.
- Use while loops instead of for loops when you don't need initializer and update expressions.
- Don't pass children as props.
- Don't reassign const variables.
- Don't use constant expressions in conditions.
- Don't use `Math.min` and `Math.max` to clamp values when the result is constant.
- Don't return a value from a constructor.
- Don't use empty character classes in regular expression literals.
- Don't use empty destructuring patterns.
- Don't call global object properties as functions.
- Don't declare functions and vars that are accessible outside their block.
- Make sure builtins are correctly instantiated.
- Don't use super() incorrectly inside classes. Also check that super() is called in classes that extend other constructors.
- Don't use variables and function parameters before they're declared.
- Don't use 8 and 9 escape sequences in string literals.
- Don't use literal numbers that lose precision.

### React and JSX Best Practices
- Don't use the return value of React.render.
- Make sure all dependencies are correctly specified in React hooks.
- Make sure all React hooks are called from the top level of component functions.
- Don't forget key props in iterators and collection literals.
- Don't destructure props inside JSX components in Solid projects.
- Don't define React components inside other components.
- Don't use event handlers on non-interactive elements.
- Don't assign to React component props.
- Don't use both `children` and `dangerouslySetInnerHTML` props on the same element.
- Don't use dangerous JSX props.
- Don't use Array index in keys.
- Don't insert comments as text nodes.
- Don't assign JSX properties multiple times.
- Don't add extra closing tags for components without children.
- Use `<>...</>` instead of `<Fragment>...</Fragment>`.
- Watch out for possible "wrong" semicolons inside JSX elements.

### Correctness and Safety
- Don't assign a value to itself.
- Don't return a value from a setter.
- Don't compare expressions that modify string case with non-compliant values.
- Don't use lexical declarations in switch clauses.
- Don't use variables that haven't been declared in the document.
- Don't write unreachable code.
- Make sure super() is called exactly once on every code path in a class constructor before this is accessed if the class has a superclass.
- Don't use control flow statements in finally blocks.
- Don't use optional chaining where undefined values aren't allowed.
- Don't have unused function parameters.
- Don't have unused imports.
- Don't have unused labels.
- Don't have unused private class members.
- Don't have unused variables.
- Make sure void (self-closing) elements don't have children.
- Don't return a value from a function with the return type 'void'
- Use isNaN() when checking for NaN.
- Make sure "for" loop update clauses move the counter in the right direction.
- Make sure typeof expressions are compared to valid values.
- Make sure generator functions contain yield.
- Don't use await inside loops.
- Don't use bitwise operators.
- Don't use expressions where the operation doesn't change the value.
- Make sure Promise-like statements are handled appropriately.
- Don't use __dirname and __filename in the global scope.
- Prevent import cycles.
- Don't use configured elements.
- Don't hardcode sensitive data like API keys and tokens.
- Don't let variable declarations shadow variables from outer scopes.
- Don't use the TypeScript directive @ts-ignore.
- Prevent duplicate polyfills from Polyfill.io.
- Don't use useless backreferences in regular expressions that always match empty strings.
- Don't use unnecessary escapes in string literals.
- Don't use useless undefined.
- Make sure getters and setters for the same property are next to each other in class and object definitions.
- Make sure object literals are declared consistently (defaults to explicit definitions).
- Use static Response methods instead of new Response() constructor when possible.
- Make sure switch-case statements are exhaustive.
- Make sure the `preconnect` attribute is used when using Google Fonts.
- Use `Array#{indexOf,lastIndexOf}()` instead of `Array#{findIndex,findLastIndex}()` when looking for the index of an item.
- Make sure iterable callbacks return consistent values.
- Use `with { type: "json" }` for JSON module imports.
- Use numeric separators in numeric literals.
- Use object spread instead of `Object.assign()` when constructing new objects.
- Always use the radix argument when using `parseInt()`.
- Make sure JSDoc comment lines start with a single asterisk, except for the first one.
- Include a description parameter for `Symbol()`.
- Don't use spread (`...`) syntax on accumulators.
- Don't use the `delete` operator.
- Don't access namespace imports dynamically.
- Don't use namespace imports.
- Declare regex literals at the top level.
- Don't use `target="_blank"` without `rel="noopener"`.

### TypeScript Best Practices
- Don't use TypeScript enums.
- Don't export imported variables.
- Don't add type annotations to variables, parameters, and class properties that are initialized with literal expressions.
- Don't use TypeScript namespaces.
- Don't use non-null assertions with the `!` postfix operator.
- Don't use parameter properties in class constructors.
- Don't use user-defined types.
- Use `as const` instead of literal types and type annotations.
- Use either `T[]` or `Array<T>` consistently.
- Initialize each enum member value explicitly.
- Use `export type` for types.
- Use `import type` for types.
- Make sure all enum members are literal values.
- Don't use TypeScript const enum.
- Don't declare empty interfaces.
- Don't let variables evolve into any type through reassignments.
- Don't use the any type.
- Don't misuse the non-null assertion operator (!) in TypeScript files.
- Don't use implicit any type on variable declarations.
- Don't merge interfaces and classes unsafely.
- Don't use overload signatures that aren't next to each other.
- Use the namespace keyword instead of the module keyword to declare TypeScript namespaces.

### Style and Consistency
- Don't use global `eval()`.
- Don't use callbacks in asynchronous tests and hooks.
- Don't use negation in `if` statements that have `else` clauses.
- Don't use nested ternary expressions.
- Don't reassign function parameters.
- This rule lets you specify global variable names you don't want to use in your application.
- Don't use specified modules when loaded by import or require.
- Don't use constants whose value is the upper-case version of their name.
- Use `String.slice()` instead of `String.substr()` and `String.substring()`.
- Don't use template literals if you don't need interpolation or special-character handling.
- Don't use `else` blocks when the `if` block breaks early.
- Don't use yoda expressions.
- Don't use Array constructors.
- Use `at()` instead of integer index access.
- Follow curly brace conventions.
- Use `else if` instead of nested `if` statements in `else` clauses.
- Use single `if` statements instead of nested `if` clauses.
- Use `new` for all builtins except `String`, `Number`, and `Boolean`.
- Use consistent accessibility modifiers on class properties and methods.
- Use `const` declarations for variables that are only assigned once.
- Put default function parameters and optional function parameters last.
- Include a `default` clause in switch statements.
- Use the `**` operator instead of `Math.pow`.
- Use `for-of` loops when you need the index to extract an item from the iterated array.
- Use `node:assert/strict` over `node:assert`.
- Use the `node:` protocol for Node.js builtin modules.
- Use Number properties instead of global ones.
- Use assignment operator shorthand where possible.
- Use function types instead of object types with call signatures.
- Use template literals over string concatenation.
- Use `new` when throwing an error.
- Don't throw non-Error values.
- Use `String.trimStart()` and `String.trimEnd()` over `String.trimLeft()` and `String.trimRight()`.
- Use standard constants instead of approximated literals.
- Don't assign values in expressions.
- Don't use async functions as Promise executors.
- Don't reassign exceptions in catch clauses.
- Don't reassign class members.
- Don't compare against -0.
- Don't use labeled statements that aren't loops.
- Don't use void type outside of generic or return types.
- Don't use console.
- Don't use control characters and escape sequences that match control characters in regular expression literals.
- Don't use debugger.
- Don't assign directly to document.cookie.
- Use `===` and `!==`.
- Don't use duplicate case labels.
- Don't use duplicate class members.
- Don't use duplicate conditions in if-else-if chains.
- Don't use two keys with the same name inside objects.
- Don't use duplicate function parameter names.
- Don't have duplicate hooks in describe blocks.
- Don't use empty block statements and static blocks.
- Don't let switch clauses fall through.
- Don't reassign function declarations.
- Don't allow assignments to native objects and read-only global variables.
- Use Number.isFinite instead of global isFinite.
- Use Number.isNaN instead of global isNaN.
- Don't assign to imported bindings.
- Don't use irregular whitespace characters.
- Don't use labels that share a name with a variable.
- Don't use characters made with multiple code points in character class syntax.
- Make sure to use new and constructor properly.
- Don't use shorthand assign when the variable appears on both sides.
- Don't use octal escape sequences in string literals.
- Don't use Object.prototype builtins directly.
- Don't redeclare variables, functions, classes, and types in the same scope.
- Don't have redundant "use strict".
- Don't compare things where both sides are exactly the same.
- Don't let identifiers shadow restricted names.
- Don't use sparse arrays (arrays with holes).
- Don't use template literal placeholder syntax in regular strings.
- Don't use the then property.
- Don't use unsafe negation.
- Don't use var.
- Don't use with statements in non-strict contexts.
- Make sure async functions actually use await.
- Make sure default clauses in switch statements come last.
- Make sure to pass a message value when creating a built-in error.
- Make sure get methods always return a value.
- Use a recommended display strategy with Google Fonts.
- Make sure for-in loops include an if statement.
- Use Array.isArray() instead of instanceof Array.
- Make sure to use the digits argument with Number#toFixed().
- Make sure to use the "use strict" directive in script files.

### Next.js Specific Rules
- Don't use `<img>` elements in Next.js projects.
- Don't use `<head>` elements in Next.js projects.
- Don't import next/document outside of pages/_document.jsx in Next.js projects.
- Don't use the next/head module in pages/_document.js on Next.js projects.

### Testing Best Practices
- Don't use export or module.exports in test files.
- Don't use focused tests.
- Make sure the assertion function, like expect, is placed inside an it() function call.
- Don't use disabled tests.

## Common Tasks
- `bun run check:fix` - Format and fix code automatically (use before every commit)
- `bun run tc` - Check TypeScript types
- `bun run test` - Run tests

## Example: Error Handling
```typescript
// ✅ Good: Comprehensive error handling
try {
  const result = await fetchData();
  return { success: true, data: result };
} catch (error) {
  console.error('API call failed:', error);
  return { success: false, error: error.message };
}

// ❌ Bad: Swallowing errors
try {
  return await fetchData();
} catch (e) {
  console.log(e);
}
```

## Example: Component Pattern
```typescript
// ✅ Good: Typed props, const declaration, explicit return type
type UserCardProps = {
  name: string;
  role: string;
  onClick: () => void;
};

const UserCard = ({ name, role, onClick }: UserCardProps): React.JSX.Element => (
  <button type="button" onClick={onClick} onKeyDown={onClick}>
    <span>{name}</span>
    <span>{role}</span>
  </button>
);

export { UserCard };
```

## Example: Service Layer Pattern
```typescript
// ✅ Good: Pure service function with typed result
const getUserData = async (id: string): Promise<ServiceResult<User>> => {
  try {
    const data = await fetchUser(id);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user' };
  }
};
```
