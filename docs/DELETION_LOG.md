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
