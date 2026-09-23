# Agent Work Log

Append-only notes. Historical entries below summarize verified commits and the current working tree; they do not claim unrecorded past validation results.

## 2026-09-13 — StudentHub bottom transition placement

Branch: `preview/people-carousel` at the time; current history also contains these commits on `main`.

Goal: place the supplied People-to-Stories transition within StudentHub.

Changed: `src/App.jsx`, `src/styles.css`; asset used: `public/images/student-demo/student-people-stories-transition.svg`.

Implementation: commits `5314f88`, `a93910d`, and `52d9916` raised, moved, and finalized `StudentHubBottomDecor`. The component is inside StudentHub after its shell, has its own observer/reveal, and is clipped by the section. The current CSS hides it at `<=820px`.

Preserved: supplied SVG paths and Stories as a separate sibling section.

Validation: historical per-commit checks not reconstructed here; current structure verified in source.

Commit: `5314f88`, `a93910d`, `52d9916`.

Status: commits present in current history; `52d9916` is the current `main` tip at this snapshot.

## 2026-09-20 — UI motion experiments

Branch: `preview/ui-experiments`.

Goal: add subtle StudentHub motion.

Changed: `src/App.jsx`, `src/styles.css`.

Implementation: commit `1ebf8de` introduced the section reveal and motion styling. Commit `aa701a2` later added `.student-hub-stage-reveal` around the keyed stage so first-scroll opacity/translation is separate from `student-panel-forward-in` / `student-panel-backward-in` used for tab switches.

Preserved: internal tab-switch animations and reduced-motion access.

Validation: historical per-commit checks not reconstructed here; current mechanism verified in source.

Commit: `1ebf8de`, `aa701a2`.

Status: pushed to `origin/preview/ui-experiments`; not merged to current `main`.

## 2026-09-20 — People tab redesign

Branch: `preview/ui-experiments`.

Goal: move People toward a large editorial teacher gallery.

Changed: `src/App.jsx`, `src/content.js`, `src/styles.css`.

Implementation: `468652d` rebuilt the People layout/gallery; `8fb37f6` enlarged the cards. Current CSS specifies 236 × 370px desktop, 210 × 340px at 821–1100px, and 205–240 × 340px mobile. Teacher portraits are illustrative assets from `public/images/student-demo/teachers/`.

Preserved: other StudentHub tabs and the bottom transition.

Validation: historical per-commit checks not reconstructed here; current data and styles verified in source.

Commit: `468652d`, `8fb37f6`.

Status: pushed to `origin/preview/ui-experiments`; not merged to current `main`.

## 2026-09-20 — Remove manual marquee control

Branch: `preview/ui-experiments`.

Goal: keep the teacher gallery automatic, with hover pause and no Pause/Play button.

Changed: `src/App.jsx`, `src/styles.css` (current working tree).

Implementation: removed the button, `isPaused`/`pausedRef`, and button-only CSS. Existing `hoveredRef` still pauses the animation frame offset on pointer enter and resumes it on pointer leave. The marquee's speed and card sizes were not changed.

Preserved: teacher data, photos, card layout, and other sections.

Validation: `git diff --check`: PASS; `npm.cmd run build`: PASS in the preceding local task. Recheck after later edits.

Commit: `not committed`.

Status: local only at this snapshot.

## 2026-09-20 — Reject generated People decoration

Branch: `preview/ui-experiments`.

Goal: add lower People-panel decoration, then remove it after visual rejection.

Changed: a temporary inline SVG layer and its CSS in `src/App.jsx` / `src/styles.css` were removed. No generated decorative SVG remains in the current People panel.

Implementation: the generated line-art geometry was visually rejected; the later removal restored the panel's original decoration-free layout while retaining the separate marquee-control change.

Preserved: teacher marquee, hover pause, cards, existing project SVGs, and general StudentHub reveal.

Validation: `git diff --check`: PASS; `npm.cmd run build`: PASS after removal.

Rejected / lessons: generated inline decorative SVG geometry was visually rejected. Do not generate replacement decorative SVG paths; use user-supplied assets instead.

Commit: `not committed`.

Status: local only; rejected artwork removed.

## 2026-09-20 — Add persistent agent context

Branch: `preview/ui-experiments`.

Goal: give future sessions concise rules, a current-state map, and an append-only decision log.

Changed: `AGENTS.md`, `docs/agent-context.md`, `docs/agent-log.md`.

Implementation: documented verified repository structure, protected areas, deployment boundary, StudentHub animation responsibilities, People marquee behavior, and lessons from rejected generated artwork. Existing source and local People changes were preserved.

Preserved: React, CSS, assets, dependencies, site behavior, and `main`.

Validation: `git diff --check`: PASS; `npm.cmd run build`: PASS.

Commit: `not committed`.

Status: local only.
