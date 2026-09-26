# Fenix School — Current Project Context

Verified against production `main` commit `6b69d1a` on 2026-09-26 for repository state, with implementation invariants retained from the earlier preview work. Recheck the current branch and files before future changes.

## Project

- React 19 + Vite 8 single-page site. `src/main.jsx` mounts `src/App.jsx`; copy, links, gallery, and teacher data live in `src/content.js`; main styles are in `src/styles.css`.
- Static assets live in `public/images/`; student demo images and the bottom transition are in `public/images/student-demo/`. One StudentHub SVG module is in `src/assets/`.
- `vite.config.js` sets the site base to `/fenix-school-demo/`.

## Figma

- Figma is the visual source of truth for layout, proportions, typography, color, and artwork where a matching frame exists. This repository is the implementation source of truth for React structure and behavior.
- Linked file: [`Untitled`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1095) (file key `j4wNELiN1cuU00zMwaqonP`). `Untitled` is the supplied URL title; the Figma plugin reports the generic document root name `Document`. Recheck its display name if the file is renamed.
- Read the exact frame through the Figma integration before visual implementation. Map it to existing components, selectors, and assets; avoid broad refactors and screenshot reconstruction.

### Important verified frames

- The only verified page is `Page 1`. It has three top-level frames, all named `Section (Школа Феникс — демонстрация нового сайта)`: `14:2`, `14:548`, and [`14:1094`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1094). They are each about 2133 × 1362; do not infer separate Hero, Study, or Stories frames from code names.
- In `14:1094`, the supplied selection [`Container` `14:1095`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1095) contains upper decorative vectors. Nearby named nodes are [`Tab List - Феникс изнутри` `14:1172`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1172), [`Tab Panel` `14:1199`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1199), and [`Преподаватели школы, демонстрационные материалы` `14:1214`](https://www.figma.com/design/j4wNELiN1cuU00zMwaqonP/Untitled?node-id=14-1214). The lower 1800 × 600 image container is `14:1586`.
- These names and IDs came from Figma MCP metadata on 2026-09-20. Use a user-supplied selection URL for future tasks; verify its node and current properties before editing.

## Git / deployment

- `main` is production. Use preview/chore branches for experiments or tooling changes.
- `.github/workflows/deploy-pages.yml` builds with Node 22 (`npm ci`, `npm run build`) and deploys `dist` to GitHub Pages on a `main` push or manual workflow dispatch. Do not trigger publication without explicit authorization.
- Production `main` already contains the StudentHub design published in commit `6b69d1a`, including the People gallery without a manual Pause/Play control.

## Main architecture

- `App` selects `parent` or `student` from the `audience` query parameter, then `localStorage` (`fenix-audience`), then defaults to Parent with a welcome chooser. The switch updates the URL and stored choice.
- Student mode renders a dedicated Hero, StudentHub, StudentStories (review carousel and five-day trial CTA), then common contact/footer content. StudentHub has People, Study, School Life, and Photo/Video tabs.
- Parent mode renders its own Hero and `SchoolTabs`/reviews. Shared content is in `src/content.js`; the modes use one React app.

## StudentHub

- `StudentHub` uses one section `IntersectionObserver` (`threshold: 0.4`) to latch `is-revealed`. Reduced motion or missing observer reveals it immediately.
- The heading and tabs have their own reveal CSS. The outer `.student-hub-stage-reveal` fades and lifts the **whole beige panel** on first scroll reveal. Mobile (`<=820px`) shortens that transition; reduced motion removes it.
- The keyed inner `.student-hub-stage` owns tab switching: `student-panel-forward-in` / `student-panel-backward-in` on desktop, with a short mobile animation. Its cream background, padding, rounded lower corners, and `overflow: hidden` stay with the panel. Do not put a second opacity/transform animation directly on this node.
- `StudentHubDecor` is behind the shell (`z-index: 0` vs shell `z-index: 2`). `StudentHubBottomDecor` is a separate child after the shell, displaying the supplied `student-people-stories-transition.svg`. It has its own observer and slow reveal; it is hidden at `<=820px`. StudentHub's overflow clips its decor before Stories.

## People tab

- `.student-people` is a two-column editorial grid: typography on the left and a teacher showcase on the right. At `<=820px` it becomes one column.
- `src/content.js` supplies eight illustrative teacher entries; portraits are under `public/images/student-demo/teachers/`. The names and photos are demo material, not verified staff records. Cards show photo, name, and subject.
- Desktop teacher cards are `236 × 370px`; at 821–1100px they are `210 × 340px`; mobile cards are `clamp(205px, 67vw, 240px) × 340px`.
- The showcase renders three copies of the card set in a flex track. `requestAnimationFrame` advances the offset while the viewport is in view; `ResizeObserver` remeasures, and card focus varies with distance from the viewport center. Pointer hover over the viewport pauses motion; pointer exit resumes it. There is no Pause/Play UI.
- At `<=820px` or with reduced motion, the automatic loop stops, duplicate sets are hidden, and the viewport becomes horizontally scrollable. The current People panel has no added inline decorative SVG layer; future artwork should be supplied by the user.

## Protected / approved areas

Preserve the Student Hero, StudentHub tabs and bottom transition geometry, teacher card content and sizing, other StudentHub tabs, Stories, and Parent mode unless explicitly requested. Keep scroll reveal separate from internal tab switching.

## Known issues / work in progress

- Student teacher portraits and other `student-demo` imagery are illustrative placeholders; the asset README marks them for replacement before production use.
- The People panel awaits user-supplied decorative assets. A generated inline line-art attempt was removed after visual rejection; do not recreate it.
