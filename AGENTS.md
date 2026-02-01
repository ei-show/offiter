# Repository Guidelines

## Project Structure & Module Organization
- `pages/` contains Next.js routes (`index.tsx`, `blogs/`, `pages/blogs`, `pages/tags`).
- `src/` holds app modules: `components/`, `libs/`, `api/`, and shared exports in `src/index.ts`.
- Tests live alongside components in `src/components/__tests__/`.
- Static assets live in `public/`; styles are in `styles/` and Tailwind config lives at `tailwind.config.js`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server on `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: run the production server from a build.
- `npm run lint`: run ESLint for `ts/tsx/js`.
- `npm run format`: run Prettier on the repo.
- `npm run type-check`: run `tsc --noEmit`.
- `npm run test`: run Jest unit tests.
- `npm run test-all`: lint + type-check + tests.
- `npm run api:build`: generate API client code via Aspida.

## Coding Style & Naming Conventions
- TypeScript + React (Next.js). Use 2-space indentation in existing files.
- Prettier settings: `singleQuote: true`, `semi: false`, `printWidth: 120`.
- ESLint is configured for React + TypeScript; unused args should be prefixed with `_`.
- Test file naming: `*.test.tsx` under `__tests__`.

## Testing Guidelines
- Frameworks: Jest + React Testing Library (`@testing-library/*`).
- Keep unit tests close to components and prefer `*.test.tsx`.
- Run tests with `npm run test` or the full suite via `npm run test-all`.

## Commit & Pull Request Guidelines
- Commit messages in history follow a loose conventional style: `fix: ...`, `feat: ...`, `Merge pull request ...`.
- Keep commits focused and include a short, descriptive prefix when possible (`feat:`, `fix:`).
- PRs should include a clear description, testing notes, and UI screenshots when changing visuals.

## Security & Configuration Tips
- Local env file: create `.env.development.local` with `API_KEY`, `GA_TRACKING_ID`, and `NEXT_PUBLIC_BASE_URL`.
- Deployment requires the same variables configured in the hosting environment.
