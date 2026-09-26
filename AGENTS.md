# Fenix School — Agent Rules

## Context loading

Before changing code:

1. Read this file.
2. Read `docs/PROJECT_STATE.md`.
3. Read `docs/ARCHITECTURE.md`.
4. Read `docs/agent-context.md` for StudentHub/People implementation invariants.
5. Read only the task-relevant documents from `docs/` and the latest relevant entries in `docs/agent-log.md`.
6. Search the repository first and open only the files needed for the task.
7. Check the current branch and working tree before editing. Preserve unrelated changes and untracked files.

Do not scan or rewrite the whole repository by default. Keep diffs within the user's requested scope.

## Skills and integrations

- The user-level Codex skill `$frontend-app-builder` is the same Build Web Apps / `frontend-app-builder` skill used for Druzhim. Use it for a genuinely new visual direction, page concept, or substantial frontend composition.
- Do **not** rerun broad design exploration when an approved Figma frame already exists. In that case use the Figma integration first and implement the approved design.
- Figma is the visual source of truth for approved frames. This React/Vite repository is the implementation source of truth for structure, state, behavior, and deployment.
- Before implementing from Figma, inspect the exact supplied frame/selection and its structured design context: dimensions, layout, typography, colors, clipping, variables, and assets. Do not reconstruct an approved frame from memory or screenshots alone.
- Reuse existing React and CSS conventions. Do not introduce TypeScript, Sass, Tailwind, CSS-in-JS, GSAP, or another dependency merely to mirror another project.

See `docs/TOOLING.md` for the exact workflow.

## Git rules

- `main` is production for GitHub Pages. Use preview/chore branches for experiments and infrastructure changes.
- Never merge or push implementation experiments to `main`, or trigger deployment, without explicit user authorization.
- Do not reset, stash, discard, or overwrite unrelated work.
- Do not commit backup files or helper artifacts.
- Before finishing a code change, run `git diff --check` and `npm run build`. Report failures accurately.

## Visual rules

- Preserve the Fenix cream, red, orange, apricot palette and its warm editorial school character.
- Avoid generic SaaS/AI styling, unnecessary glassmorphism, neon, heavy glow, and arbitrary decoration.
- Reuse approved structure and assets before inventing replacements.
- **Never invent or generate decorative SVG path geometry** unless the user explicitly asks for it. Decorative artwork must come from user-supplied or approved Figma-exported assets; positioning, masking, scaling, and reveal animation are allowed without changing the path geometry.
- Desktop must not simply shrink onto mobile. Validate visual work at minimum around 1440, 1024, 768, and 390 px.

## Current stack

- React 19 + Vite 8.
- JavaScript/JSX, not TypeScript.
- One main stylesheet in `src/styles.css` with CSS custom properties.
- Content/data in `src/content.js`.
- Static assets in `public/images/` and selected source assets in `src/assets/`.
- Keep this stack unless a separate refactor/migration is explicitly requested.

## Accessibility and performance

- Preserve keyboard access, visible focus, semantic controls, meaningful image alternatives, and usable reduced-motion behavior.
- Respect `prefers-reduced-motion`.
- Prefer transform/opacity for motion and avoid layout-thrashing animation.
- Do not add dependency bloat for effects that CSS or the existing code can handle.

## StudentHub protected areas

- Preserve StudentHub's top structure and tabs unless the task explicitly names them.
- Preserve the supplied bottom transition SVG and its path geometry. Do not reuse it as People-panel decoration.
- A Student-mode task does not authorize Parent-mode changes.
- A People-only task does not authorize changes to other StudentHub tabs or Stories.
- Keep scroll-reveal motion separate from keyed tab-switch animation.

## People tab

- Keep the editorial two-column composition with large teacher cards.
- Cards show portrait, name, and subject only unless the user asks otherwise.
- Keep automatic gallery motion with hover pause on desktop; do not reintroduce Pause/Play controls.
- Keep current demo portraits until approved replacements are supplied.
- Do not regenerate the rejected inline decorative line-art attempt.

## Documentation maintenance

After meaningful work:

- update `docs/PROJECT_STATE.md` when current state changes;
- update `docs/ARCHITECTURE.md` after architecture changes;
- update `docs/DESIGN_SYSTEM.md` after durable visual-system changes;
- update `docs/MOTION.md` after motion-system changes;
- record durable non-obvious choices in `docs/DECISIONS.md`;
- append one concise factual entry to `docs/agent-log.md`;
- keep `docs/agent-context.md` focused on implementation invariants and verified Figma context.

Do not use documentation as a replacement for checking the actual code.
