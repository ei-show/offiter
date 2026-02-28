# Copilot Instructions for Offiter

## Project Overview

Offiter is a Next.js blog built with TypeScript, using microCMS as the headless CMS backend. The blog features static site generation with dynamic routes for blog posts and tags.

## Build, Test, and Development Commands

### Development
```bash
npm run dev              # Start dev server on http://localhost:3000
npm run build            # Create production build
npm run start            # Run production server
```

### Code Quality
```bash
npm run lint             # Run ESLint on ts/tsx/js files
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript compiler checks
```

### Testing
```bash
npm run test             # Run Jest unit tests
npm run test-all         # Run lint + type-check + tests (full suite)
```

To run a single test file:
```bash
npx jest src/components/__tests__/Card.test.tsx
```

### API Client Generation
```bash
npm run api:build        # Generate Aspida API client from src/api
```

Run this after modifying API type definitions in `src/api/`.

## Architecture

### Directory Structure

- **`pages/`** - Next.js routing and page components
  - `index.tsx` - Homepage
  - `blogs/[id].tsx` - Blog post detail pages
  - `pages/blogs/[id].tsx` - Blog pagination
  - `pages/tags/[id].tsx` - Tag-filtered blog lists
  - `_app.tsx` / `_document.tsx` - Next.js app configuration

- **`src/`** - Application modules
  - `components/` - React components with co-located tests in `__tests__/`
  - `libs/` - Utility functions and configurations
  - `api/` - API type definitions for Aspida code generation
  - `index.ts` - Central export file for all components and utilities

- **`public/`** - Static assets (images, logo, etc.)
- **`styles/`** - Global styles and SCSS modules
- **`tailwind.config.js`** - Tailwind CSS + DaisyUI configuration

### Data Flow

1. **microCMS API** → Aspida-generated client (`src/api/`) → `getContents.ts` helpers
2. **Static Generation**: Pages use `getStaticProps` and `getStaticPaths` to fetch data at build time
3. **Components** import shared utilities and types from `src/index.ts` (barrel exports)

### Key Technologies

- **CMS**: microCMS (headless CMS) accessed via Aspida-generated client
- **Styling**: Tailwind CSS with DaisyUI components and custom theme
- **Markdown**: Zenn markdown parser for blog content
- **SEO**: next-seo for meta tags
- **Icons**: FontAwesome via react-fontawesome

## Conventions

### Component Patterns

- Components live in `src/components/` and are exported through `src/index.ts`
- Tests use React Testing Library in `__tests__/` subdirectories
- File naming: `ComponentName.tsx` for components, `ComponentName.test.tsx` for tests

### Styling

- Use Tailwind utility classes with DaisyUI components (`badge`, `btn`, `card`, `join`, etc.)
- Custom theme colors defined in `tailwind.config.js` under `daisyui.themes.light`
- Font families: `font-title`, `font-head`, `font-body` (defined in Tailwind config)
- Preserve responsive breakpoints (`md:`, `lg:`) when modifying layouts
- Keep gradients and existing design patterns when adding DaisyUI components

### Code Style

- **Indentation**: 2 spaces
- **Prettier**: `singleQuote: true`, `semi: false`, `printWidth: 120`
- **TypeScript**: Strict mode, unused args prefixed with `_`
- **Imports**: Use `@/src/` and `@/pages/` path aliases

### API Client (Aspida)

- API types are defined in `src/api/` following microCMS structure
- After modifying types, run `npm run api:build` to regenerate the client
- The generated client is available as `clientAspida` from `@/src/index`

### Environment Variables

Required in `.env.development.local`:
```
API_KEY=<microcms-api-key>
GA_TRACKING_ID=<google-analytics-id>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
HEADLESS_CMS=https://offiter.microcms.io/api/v1
```

### Git Workflow

- Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`, etc.
- Husky pre-commit hook runs `lint-staged` (lint + format on staged TypeScript files)
- Husky pre-push hook runs `type-check`

### Test Coverage Thresholds

Maintain minimum coverage (configured in `jest.config.js`):
- Statements: 60%
- Branches: 45%
- Functions: 25%
- Lines: 68%

## Common Tasks

### Adding a New Component

1. Create `src/components/ComponentName.tsx`
2. Export it in `src/index.ts`
3. Add tests in `src/components/__tests__/ComponentName.test.tsx`
4. Import via `import { ComponentName } from '@/src/index'`

### Modifying API Types

1. Update type definitions in `src/api/`
2. Run `npm run api:build`
3. Update `getContents.ts` helper functions if needed

### Adding a New Page Route

1. Create file in `pages/` (e.g., `pages/new-route.tsx`)
2. Implement `getStaticProps` for data fetching
3. Use `Layout` component from `@/src/index` for consistent structure

### Working with Blog Content

- Blog posts are fetched from microCMS via `blogsGetHeader()` and `blogGetContent()`
- Markdown is parsed with `zenn-markdown-html` and rendered with `dangerouslySetInnerHTML`
- Table of contents is generated from heading elements using JSDOM
