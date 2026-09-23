# Fenix School — Agent Rules

## Before every task

1. Read this file, `docs/agent-context.md`, and the latest relevant entries in `docs/agent-log.md`.
2. Check `git status --short --branch` and confirm the current branch before editing. Preserve existing changes and untracked files.
3. Check the actual code and assets for the area being changed. Treat the context document as a guide, not a substitute for verification.
4. Keep the diff within the user's requested scope. Do not change approved sections without a direct request.

## Git rules

- `main` is the production branch for GitHub Pages. Make experiments in preview branches first.
- Never merge or push to `main`, or deploy, without explicit user authorization. Push a preview branch only when requested.
- Do not reset, stash, discard, or overwrite existing work without necessity and authorization.
- Do not commit incidental backup files or helper scripts. Stage only intended files and keep diffs small.
- Before finishing, run `git diff --check` and `npm.cmd run build`; report failures accurately.

## Visual rules

- Preserve the Fenix cream, red, and orange palette and its warm, human, editorial school character. Avoid generic SaaS or AI styling, unnecessary glassmorphism, and excessive blur, glow, or neon.
- Reuse existing structure and assets first. Do not redesign approved sections without a request.
- **Never invent or generate decorative SVG path geometry.** Decorative artwork must come from user-supplied SVG/PNG assets unless the user explicitly requests otherwise. Position, scale, mask, and animate supplied artwork as needed without changing its geometry.

## Figma workflow

- Figma is the visual source of truth; this React/Vite repository is the implementation source of truth.
- Before visual changes, check for the corresponding Figma frame. If it exists, read its structured design context through the Figma integration: dimensions, layout, typography, colors, clipping, and assets. Do not recreate it from screenshots.
- Map Figma elements to existing React components and CSS selectors; preserve the application architecture and use the smallest effective diff. Keep desktop faithful and adapt tablet/mobile without copying absolute coordinates throughout the page.
- Use supplied or Figma-exported decorative artwork. Never invent decorative SVG paths.

## Animation rules

- Use subtle motion that supports the composition; no bounce unless requested and no heavy motion library without a clear need.
- Respect `prefers-reduced-motion` and keep content functional when animation is disabled.
- Preserve existing animations. If a node already has a transform animation, inspect the conflict before adding another; use an outer reveal wrapper when appropriate.

## StudentHub protected areas

- Preserve StudentHub's top structure and tabs unless the task names them.
- Preserve the supplied bottom transition SVG and its path geometry. Do not reuse it as decoration inside the People panel.
- A Student-mode task does not authorize Parent-mode changes. A People-only task does not authorize changes to other tabs or Stories.

## People tab

- Keep the editorial layout: large typography on the left and large teacher cards showing portrait, name, and subject only.
- Keep automatic teacher gallery motion and hover pause; do not add Pause/Play controls. Prefer fewer large cards in view over many small ones.
- Keep the existing demo portraits until approved replacements are supplied. Decorative artwork for this panel comes from user-supplied assets.

## After every task

- Append one concise, factual entry to `docs/agent-log.md` covering the decision, technical reason, result, validation, scope, and commit/status.
- Update `docs/agent-context.md` when the current architecture or decisions change. Update this file only for a durable new rule or a mistake that must not recur.
- Record important rejected approaches, but never internal chain-of-thought. Do not rewrite earlier log entries; correct them with a new entry.
