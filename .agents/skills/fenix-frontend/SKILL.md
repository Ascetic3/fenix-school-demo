---
name: fenix-frontend
description: Use for frontend design, implementation, refinement, and review tasks in the Fenix School repository. Trigger for Fenix page/section work, StudentHub, Parent/Student modes, responsive layout, motion, Figma-to-code implementation, or substantial visual changes. Do not use for unrelated repositories.
---

# Fenix Frontend

Use this skill only inside the Fenix School repository.

## Purpose

Implement and refine the Fenix School website without losing its existing visual language, audience-mode separation, approved StudentHub behavior, or supplied artwork.

This skill complements the generic `frontend-app-builder` skill:

- use `frontend-app-builder` when a task needs a genuinely new visual direction, redesign exploration, or a new substantial composition;
- use this `fenix-frontend` skill for Fenix-specific architecture, constraints, implementation decisions, and scope protection;
- when an approved Figma frame exists, Figma takes precedence over freeform concept generation.

## Required context

Before editing:

1. Read the repository root `AGENTS.md`.
2. Read `docs/PROJECT_STATE.md`.
3. Read `docs/ARCHITECTURE.md`.
4. For StudentHub/People work, read `docs/agent-context.md`.
5. Read only the task-relevant design/motion docs.
6. Inspect the actual source and assets for the requested area.
7. Check branch/status and preserve unrelated work.

Do not scan or refactor the entire app by default.

## Existing stack

Preserve the current stack unless the user explicitly requests a migration:

- React 19;
- Vite 8;
- JavaScript/JSX;
- plain CSS in `src/styles.css`;
- shared content/data in `src/content.js`;
- static assets under `public/images/` and selected imported assets under `src/assets/`.

Do not introduce TypeScript, Sass, Tailwind, CSS-in-JS, GSAP, or another dependency just because another project uses it.

## Visual direction

Fenix is a warm editorial school site.

Preserve:

- cream / paper backgrounds;
- red / coral / apricot accents;
- large editorial serif headings;
- human, non-corporate composition;
- clear hierarchy and generous spacing;
- restrained hand-made accents when supplied or approved.

Avoid:

- generic SaaS layouts;
- repeated card-grid clichés;
- unnecessary glassmorphism;
- neon/glow-heavy effects;
- arbitrary AI-style blobs;
- decoration that competes with content.

## Figma workflow

When the user supplies or references an approved Figma frame:

1. inspect the exact frame/selection through the Figma integration;
2. read dimensions, layout, typography, colors, clipping, variables, and assets;
3. map it onto the existing React/CSS structure;
4. reuse existing components/assets where appropriate;
5. implement the smallest effective diff;
6. adapt tablet/mobile intentionally rather than copying absolute desktop coordinates;
7. visually compare the implementation with the approved frame.

Do not reconstruct an approved Figma frame from memory.

Known Fenix Figma context and node IDs are recorded in `docs/agent-context.md`.

## SVG and decorative assets

Do not invent decorative SVG path geometry unless the user explicitly asks for generated artwork.

For ordinary implementation:

- prefer user-supplied SVG/PNG;
- prefer approved Figma-exported assets;
- preserve supplied path geometry;
- positioning, scale, masks, clipping and reveal animation are allowed;
- do not recreate the rejected generated People-panel line-art.

## Audience scope

Parent and Student are separate information modes in one app.

A task scoped to one mode does not authorize edits to the other.

When changing Student mode, verify that Parent mode is unaffected unless a shared component is intentionally changed.

## StudentHub invariants

Unless explicitly requested otherwise:

- preserve the StudentHub top structure and tabs;
- preserve the bottom transition SVG geometry;
- keep People-only work isolated from Study, School Life, Photo/Video and Stories;
- keep first-scroll reveal separate from keyed tab-switch animation;
- preserve reduced-motion behavior.

## People tab invariants

Unless explicitly requested otherwise:

- keep the editorial two-column layout;
- keep large teacher cards;
- cards show portrait, name and subject;
- desktop gallery moves automatically;
- pointer hover pauses gallery motion;
- no manual Pause/Play control;
- mobile/reduced-motion uses a simpler horizontal scroll treatment;
- demo portraits remain until approved replacements are supplied.

## Motion

Motion must explain state, hierarchy, or flow.

- Prefer CSS transitions/keyframes.
- Respect `prefers-reduced-motion`.
- Prefer transform and opacity.
- Do not hijack scrolling.
- Do not attach two transform/opacity animation systems to the same node.
- Use an outer wrapper when a reveal would conflict with an existing inner animation.

Read `docs/MOTION.md` for current ownership rules.

## Responsive QA

For substantial visual work, check at least:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px.

Do not simply shrink desktop. Recompose where necessary.

## Content integrity

Do not invent school facts, staff details, prices, statistics, admissions conditions, testimonials, or contacts.

Use `src/content.js` for shared editable content and consult `docs/CONTENT_TODO.md` for unverified fields.

## Validation

For code changes:

1. inspect the final diff;
2. run `git diff --check`;
3. run `npm run build`;
4. perform visual/browser QA when the task is visual and the available environment permits it;
5. verify the requested scope only;
6. update durable project documentation when the implementation changes an invariant.

Do not publish or merge to `main` unless the user explicitly authorizes it.
