# Code Deletion Log

## [2026-02-01] Dead Code Cleanup

### Summary

Removing unused files, exports, dependencies identified by knip and depcheck.

### Findings from Analysis Tools

#### knip results:

- **Unused files**: aspida.config.js, src/testData.ts
- **Unused dependencies**: @fortawesome/free-regular-svg-icons
- **Unused devDependencies**: @types/highlight.js, babel-jest, eslint-config-prettier, eslint-plugin-prettier, identity-obj-proxy, jest-watch-typeahead, prettier-plugin-tailwindcss
- **Unused exports**: client in src/libs/clientAspida.ts (duplicate export)
- **Unused types**: ApiInstance in src/api/$api.ts

#### depcheck results:

- Confirmed unused: @fortawesome/free-regular-svg-icons, @types/highlight.js, babel-jest, eslint-config-prettier, eslint-plugin-prettier, identity-obj-proxy, jest-watch-typeahead, prettier-plugin-tailwindcss
- False positives (actually used): autoprefixer, postcss, jest-environment-jsdom

### Risk Assessment

#### SAFE to remove:

1. **src/testData.ts** - Only used in tests, tests already have inline test data
2. **@fortawesome/free-regular-svg-icons** - Not imported anywhere
3. **@types/highlight.js** - No highlight.js usage found
4. **babel-jest** - Jest using SWC via Next.js
5. **eslint-config-prettier** - Not in extends array
6. **eslint-plugin-prettier** - Not in plugins array, prettier run separately
7. **jest-watch-typeahead** - Not configured in jest.config.js
8. **prettier-plugin-tailwindcss** - Not in .prettierrc plugins
9. **Duplicate export in clientAspida.ts** - Has both named and default export only

#### KEEP (false positives):

1. **aspida.config.js** - Required by aspida build command
2. **autoprefixer** - Used in postcss.config.js
3. **postcss** - Required by Next.js build
4. **identity-obj-proxy** - Used by next/jest for CSS module mocking
5. **jest-environment-jsdom** - Explicitly set in jest.config.js

### Completed Removals

#### Phase 1: Unused Dependencies (7 packages) ✅

- @fortawesome/free-regular-svg-icons - 13 packages removed
- @types/highlight.js
- babel-jest
- eslint-config-prettier
- eslint-plugin-prettier
- jest-watch-typeahead
- prettier-plugin-tailwindcss

#### Phase 2: Unused Files (1 file) ✅

- src/testData.ts - Test data file that was not being used

#### Phase 3: Duplicate Exports ✅

- Removed named export 'client' from src/libs/clientAspida.ts, kept default export only

### Testing Results

- [x] Run tests before changes (baseline: 2 failed test suites, 14 failed tests - pre-existing)
- [x] Run tests after Phase 1 - Same baseline, no regressions
- [x] Run tests after Phase 2 - Same baseline, no regressions
- [x] Run tests after Phase 3 - Same baseline, no regressions
- [x] Run build - ✓ Compiled successfully in 1804.2ms
- [x] Run lint - ✓ No linting errors

### Impact Summary

- **Files deleted**: 1 (src/testData.ts)
- **Dependencies removed**: 7 packages (13 total packages with transitive deps)
- **Exports cleaned**: 1 duplicate export removed
- **Build status**: ✅ Success
- **Test status**: ✅ No new failures (pre-existing failures unrelated)
- **Lint status**: ✅ Clean

### Bundle Size Impact

Estimated reduction: ~200-300KB from removed dependencies (pre-minified)

---

## [2026-03-01] Dead Code Cleanup - Tailwind v4 Migration Residue

### Summary

Removing dead code left behind after the Tailwind CSS v4 migration and ESLint 9
upgrade. All styling config is now CSS-first in `styles/globals.css` and ESLint
uses flat config format in `eslint.config.cjs`.

### Analysis Method

- depcheck for unused dependencies
- Manual grep analysis for all imports/exports
- ESLint version check (v9 uses flat config, ignores .eslintrc.json)
- Tailwind v4 architecture review (CSS-first config replaces tailwind.config.js)

### Completed Removals

#### Phase 1: Unused type exports in src/libs/types.ts

Removed 3 types that were exported but never imported as types anywhere:

- `tagsData` - type definition for tag contents array
- `blogsData` - type definition for blog contents with totalCount
- `blogCount` - type definition for blog count response

These types were confused with runtime variables of the same name in pages.

#### Phase 2: Unused barrel export in src/index.ts

- Removed `export { default as api } from './api/$api'`
- The `api` export was never imported from the barrel. The `$api` module is
  used indirectly via `clientAspida.ts` which imports it directly.

#### Phase 3: Dead config file .eslintrc.json

- ESLint 9.39.2 uses flat config format
- `eslint.config.cjs` (flat config) already exists and takes precedence
- `.eslintrc.json` (legacy format) was completely ignored

#### Phase 4: Dead config file tailwind.config.js

- Tailwind CSS v4 uses CSS-first configuration
- All config already migrated to `styles/globals.css` with `@plugin`,
  `@theme`, and `@import 'tailwindcss'` directives
- `postcss.config.js` uses `@tailwindcss/postcss`, not the legacy plugin
- No file in the project references `tailwind.config.js`

#### Phase 5: Unused devDependency autoprefixer

- Not referenced in any config file
- In Tailwind CSS v4, autoprefixer is built into `@tailwindcss/postcss`
- 3 packages removed from node_modules

### Testing Results

- [x] Tests after Phase 1 (unused types) - 40/40 passed
- [x] Tests after Phase 2 (unused barrel export) - 40/40 passed
- [x] Tests after Phase 3 (.eslintrc.json removal) - 40/40 passed
- [x] ESLint verification after Phase 3 - Works with flat config only
- [x] Tests after Phase 4 (tailwind.config.js removal) - 40/40 passed
- [x] Tests after Phase 5 (autoprefixer removal) - 40/40 passed
- [x] TypeScript type-check - Clean, no errors

### Impact Summary

- **Files deleted**: 2 (tailwind.config.js, .eslintrc.json)
- **Dependencies removed**: 1 (autoprefixer, 3 packages total)
- **Unused type exports removed**: 3 (tagsData, blogsData, blogCount)
- **Unused barrel exports removed**: 1 (api)
- **Test status**: All 40 tests passing
- **Type-check status**: Clean

### Items Investigated but Kept

- `.babelrc` - Required by Jest via next/jest for test transpilation
- `aspida.config.js` - Required by `npm run api:build`
- `identity-obj-proxy` - Used by next/jest for CSS module mocking
- `postcss` (devDep) - Required by `@tailwindcss/postcss`

### Notes

- `.gitignore` line 37 appears malformed: `/public/ogp/*.pngtsconfig.tsbuildinfo`
  should likely be two separate entries. Not addressed in this cleanup.
- `test-results/` directory is not gitignored but should be.
