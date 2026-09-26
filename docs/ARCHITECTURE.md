# Architecture

## Entry points

- `src/main.jsx` — React mount.
- `src/App.jsx` — application composition, audience switching, Parent/Student sections and interactive behavior.
- `src/content.js` — editable content/data.
- `src/styles.css` — global tokens and component/page styles.
- `vite.config.js` — Vite configuration and GitHub Pages base path.

## Assets

- `public/images/` — static site media.
- `public/images/student-demo/` — Student-mode demo media.
- `src/assets/` — assets imported through the Vite module graph, including StudentHub source artwork.

## Application composition

The site is one React application with two audience presentations rather than two separate apps.

Audience state is resolved from URL query, then local storage, then the default chooser. Parent and Student modes share the application shell and common content while rendering different main sections.

## Current component strategy

The current project intentionally remains simple. Much of the composition is in `src/App.jsx` and one primary stylesheet.

Do not split the application into many files merely to imitate another repository. Extract a component/module when it has a clear independent responsibility, repeated use, complex local state, or durable section-specific invariants.

Large refactors should be separate tasks from visual adjustments.

## Data and content

Keep repeatable/editable content in `src/content.js` rather than duplicating data in JSX. Do not silently convert placeholder/demo content into factual production claims.

## Styling

The project uses CSS custom properties in `:root` and plain CSS selectors. Preserve existing token usage and responsive conventions.

Do not migrate to SCSS Modules, CSS-in-JS, Tailwind, or a new design-system library without an explicit migration request.

## StudentHub motion ownership

- Section/heading reveal is separate from tab-switch animation.
- The outer reveal wrapper owns first-scroll reveal.
- The keyed inner stage owns tab-change animation.
- The bottom supplied transition asset is a separate decorative child with its own reveal behavior.
- Reduced-motion/mobile behavior must remain functional.

This separation is a durable invariant because applying multiple transform/opacity animations to the same node previously creates conflicts.

## Deployment

`.github/workflows/deploy-pages.yml` builds on Node 22 and deploys `dist` for pushes to `main`.

Production path base: `/fenix-school-demo/`.
