# Site Upgrade Progress

Branch: `cms-to-filesystem`

## Completed ✅

### 1. New branch
Working on `cms-to-filesystem` branch off `next-app`.

### 2. Dependencies updated
All packages bumped to latest, including major versions:
- next 14 → 15.5.12
- react/react-dom 18 → 19.2.4
- @reduxjs/toolkit 2.5 → 2.11.2
- tailwindcss 3 → 3.4.19 (kept v3, v4 would need full config rewrite)
- @biomejs/biome 1 → kept at 1.9.4 (v2 is a bigger migration)
- ramda, sass, postcss, autoprefixer, react-redux, etc. all updated

### 3. CMS migration to filesystem
- **Contentful** → already done in codebase, `data/content.json` existed and `src/server/api.js` read from it
- **Strava** → token was expired (401). Created `data/cycling.json` with static data. Updated `src/server/api.js` to read from file instead of hitting Strava API
- **Instagram** → already done, photos are local static files in `public/instagram/`
- Removed `isomorphic-fetch` and `dotenv` usage from `src/server/api.js` (now just uses Node.js `fs`)

### 4. react-helmet → next/head
- `pages/_document.js` — removed react-helmet, fixed duplicate `<head>` tag
- `src/components/Gif/index.js` — replaced `<Helmet title="...">` with `<Head><title>...</title></Head>`
- `src/components/HomePage/index.js` — same replacement

### 5. Footer updated
`data/content.json` footer updated to remove "Content via Contentful, Instagram, and Strava APIs" and update copyright year to 2025.

### 6. simple-markdown React 19 fixes
- `src/utils/markdown.js` — switched from deprecated `defaultOutput` to `defaultReactOutput`
- `src/components/Bio/index.js` — fixed `{...state}` spreads in custom markdown rules to destructure `key` explicitly (React 19 no longer accepts `key` as a spread prop)
- `src/components/Bio/index.js` — fixed link rule to extract text string from AST nodes instead of passing a React element as the `label` prop to `Toggle`

---

## Blocking Issue 🛑

### react-draggable incompatible with React 19
`react-draggable@4.4.6` (and latest `4.5.0`) uses `ReactDOM.findDOMNode()` which was **removed in React 19**. This causes a runtime crash on page load.

The `Toggle` component (used in `Bio` to render bio links like "venn diagram", "technology", etc.) wraps its content in `<Draggable>`.

**Options to fix:**
1. **Replace react-draggable** with a React 19-compatible alternative (e.g. `@dnd-kit/core`, or custom pointer event handlers)
2. **Remove drag functionality from Toggle** — the dragging is a fun interaction but not core. Could simplify Toggle to just use hover/click without drag.
3. **Downgrade react back to 18** — safest if we want to keep the drag UX exactly as-is
4. **Fork/patch react-draggable** to use `nodeRef` prop instead of `findDOMNode` (react-draggable supports this but it requires passing a ref)

Option 2 (simplify Toggle) is probably cleanest for a personal site — the drag interaction is fun but removing it would unblock React 19 upgrade without much visible impact.

---

## Next Steps

1. Fix the react-draggable / Toggle issue (pick one of the options above)
2. Run `yarn build` and confirm clean build
3. Use agent-browser to verify all pages visually:
   - `/` homepage
   - `/venn`, `/technology`, `/internet`, `/travel`, `/cycling`, `/photography`, `/ai`, `/weirder`
4. Commit and push branch
5. Open PR

---

## Key Files Changed
- `package.json` — dep versions
- `yarn.lock` — updated lockfile
- `data/cycling.json` — NEW: static cycling data (replaces Strava API)
- `data/content.json` — footer text updated
- `src/server/api.js` — removed Strava/Contentful API calls, reads from filesystem
- `pages/_document.js` — removed react-helmet
- `src/components/Gif/index.js` — react-helmet → next/head
- `src/components/HomePage/index.js` — react-helmet → next/head
- `src/utils/markdown.js` — defaultOutput → defaultReactOutput
- `src/components/Bio/index.js` — React 19 key prop fixes in markdown rules
