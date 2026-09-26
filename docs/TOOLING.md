# Tooling

Last checked: 2026-09-26.

## Runtime and frontend stack

Current repository package versions:

- React / React DOM: 19.2.6.
- Vite: 8.0.13.
- @vitejs/plugin-react: 6.0.2.
- JavaScript/JSX.
- Plain CSS with CSS custom properties.

The repository currently has no TypeScript, Sass, ESLint, Prettier, Tailwind, or runtime animation-library dependency. Do not assume commands for tools that are not configured.

## Repository-local Fenix skill

The repository contains:

`.agents/skills/fenix-frontend/SKILL.md`

Codex discovers repository skills from `.agents/skills`. The skill contains Fenix-specific routing, architecture, Figma, StudentHub, motion, SVG, responsive QA and content-integrity rules.

Invoke it as:

`$fenix-frontend`

It complements rather than duplicates the generic frontend builder.

## frontend-app-builder / Build Web Apps

The same user-level Codex skill used for Druzhim is intended for Fenix:

`$frontend-app-builder`

It was installed previously from the OpenAI Build Web Apps skill source under:

`openai/plugins/plugins/build-web-apps/skills/frontend-app-builder`

Because this is a user-level Codex skill, it is not copied into this repository. Use it when the task requires a genuinely new frontend concept, major page composition, or fresh visual direction.

Do not invoke broad concept exploration for an already approved Figma frame. For approved designs, inspect Figma first and implement the supplied frame.

If the skill is not visible in a new Codex session, verify the user-level skill installation/restart Codex rather than creating a duplicate project copy.

## Figma integration

Figma MCP/integration is part of the visual workflow.

Known Fenix file:

- file key: `j4wNELiN1cuU00zMwaqonP`;
- current recorded selection: node `14:1095`;
- repository context with verified node IDs is in `docs/agent-context.md`.

Workflow for approved visual work:

1. obtain/use the exact user-supplied frame or selection;
2. inspect structured Figma design context;
3. map the design to existing React/CSS and assets;
4. keep the smallest effective implementation diff;
5. verify desktop and responsive behavior;
6. compare the result visually before considering the task complete.

Do not replace a Figma-approved asset with generated decorative SVG geometry.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

For a clean CI-style install use `npm ci` when the lockfile is present.

There are currently no repository scripts for `typecheck`, `lint`, or `format:check`.

## GitHub Pages

- Production branch: `main`.
- Vite base: `/fenix-school-demo/`.
- Workflow: `.github/workflows/deploy-pages.yml`.
- CI uses Node 22, `npm ci`, then `npm run build`.
- A push to `main` deploys `dist` to GitHub Pages.
