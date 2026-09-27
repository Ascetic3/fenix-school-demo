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


## 2026-09-26 — Align Fenix agent tooling with Druzhim

Branch: `chore/fenix-agent-tooling`.

Goal: reuse the proven Druzhim agent workflow without changing the Fenix application stack or rendered UI.

Changed: `AGENTS.md`; added focused project docs for tooling, state, architecture, design, motion, decisions, and content verification; refreshed `docs/agent-context.md`.

Implementation: documented selective use of the user-level `$frontend-app-builder` skill, Figma-first implementation for approved frames, responsive QA targets, protected StudentHub/People invariants, and the existing React/Vite JavaScript stack.

Preserved: application code, assets, dependencies, production `main`, GitHub Pages workflow, Parent/Student behavior, and all rendered design.

Validation: documentation-only change; repository source and package files were not modified.

Status: branch only; not merged to `main`.


## 2026-09-26 — Add repository-local Fenix frontend skill

Branch: `chore/fenix-agent-tooling`.

Goal: make Fenix-specific frontend rules available as an actual Codex skill rather than documentation only.

Changed: added `.agents/skills/fenix-frontend/SKILL.md`; registered it in `AGENTS.md` and `docs/TOOLING.md`.

Implementation: the skill coordinates Figma-first work, the optional global `$frontend-app-builder`, Fenix architecture, Parent/Student scope, StudentHub/People invariants, SVG restrictions, responsive QA and validation.

Preserved: application source, dependencies, assets and production `main`.

Status: branch only; not merged to `main`.

## 2026-09-26 — Stories desktop reference, Stage 1

Branch: `preview/ui-experiments`, synchronized with `origin/main` at `3b4e09a` with user approval; unrelated untracked helpers/backups preserved.

Changed: `src/App.jsx`, `src/styles.css`, `docs/PROJECT_STATE.md`, `docs/agent-log.md`.

Implementation: desktop-only collage at >=1200px, CSS gradient backing, rotated photo and trial CTA, overlapping paper review, static disabled desktop arrows and four visual thumbnails. Reused existing photos, Georgia and icon components. No SVG assets were created or edited. Existing smaller-screen layout and carousel remain; Stage 2 is deferred.

Validation: production build and diff check passed; desktop browser checks at 1440 and 1600px. No commit, push or deployment.

## 2026-09-26 — Stories desktop layers refinement

Changed: desktop rules in `src/styles.css`; this log entry.

Implementation: after the spacing polish, restored a -2.75deg photo tilt and +2.5deg CTA tilt. Two asymmetrically offset CSS pseudo-elements provide red/orange and peach photo backings; CTA has a separate peach backing beneath its original red face. Current typography, content, intro spacing, thumbnails and DOM are unchanged by this pass. Stage 2 remains deferred.

Validation: `npm.cmd run build` and `git diff --check` passed. Browser checked at 1440 and 1600px: document scroll width equals client width at both sizes. No commit or push.

Follow-up with enlarged reference crops: refined only the three desktop backing geometries/gradients. Photo layers use independent +7deg/-6deg rotations; CTA peach backing uses -8deg with a lower/right offset and shortened height to avoid a uniform bottom band. Photo/CTA tilts, typography, content, thumbnails, intro spacing and DOM were retained. Build and diff check passed; no horizontal overflow at 1440/1600px. Stage 2 is not started.

Follow-up, soft backing treatment: changed only the three decorative desktop pseudo-elements to layered translucent linear/radial gradients, radial fade masks, asymmetric corner radii, slight skew and 0.65–1px blur. The project already uses CSS mask-image. No raster assets, SVG, canvas, DOM, typography or interaction changes. Fine grain was omitted to avoid a repetitive CSS dot pattern. Build/diff check passed; browser verified no horizontal overflow at 1440 and 1600px. No commit or push.

Follow-up, explicit spray acceptance: the previous subtle treatment was rejected. Added three aria-hidden decorative divs for independent photo-red/photo-peach/trial backing effects; each uses a solid ::before face, a particle field from three small tiled radial gradients and an expanded ::after halo with 9–11px blur and radial fading. Shapes diverge with +9deg/-8deg backings and -10deg trial backing; photo/CTA rotations and all section content/layout remain unchanged. Browser screenshots checked at 1440/1600px with visible particles and halo; no horizontal overflow. Build and diff check passed. No SVG/raster/canvas, animation, mobile changes, commit or push.

Follow-up, remove rejected speckle: deleted all tiled dot backgrounds from the backing elements. Overspray now uses three large nonrepeating radial gradients per halo, 16–18px blur, opacity .38 and intersecting edge-fade masks to dissolve before the bounding edges. Reduced the photo-red height/top protrusion, thinned photo-peach, narrowed CTA-peach and used adjacent coral/peach color pairs. Only desktop backing CSS changed; existing decorative DOM and main cards retained. Build/diff check passed; screenshot captured at 1600px without dot patterns or horizontal overflow. No commit or push.

Follow-up, raster pigment masking: replaced the rejected blurred halo approach with two deterministic non-tiling alpha-only WebP masks (19,678 and 117,084 bytes). The first fragments the actual gradient pigment near asymmetric edges while preserving the dense interior; the second combines irregular fine droplets with a translucent base and localized CSS radial gradients for exterior overspray. No colored backing bitmap, SVG or canvas is used. Photo/CTA content, main rotations, typography, layout, thumbnails and mobile rules are unchanged. Inspected screenshots at 1600 and 1440px against the supplied reference: pigment variation and fragmented spray edges are visible, without regular tiled dots. No horizontal overflow; build and git diff --check passed. Screenshot saved as fenix-stories-raster-spray-1600.png. No commit, push or stage 2.

Follow-up, clean backing rollback: removed all raster masks and wide spray fields from the desktop backing CSS. Restored opaque adjacent-color gradients on two photo backings and the peach trial backing. Each ::after now extends only 4px beyond its face, uses localized warm-red/peach radial gradients, 2px blur and .28 opacity; no noise, repeating pattern or broad halo. Kept all backing/main-card rotations, photo, quote, CTA content, typography, section layout and thumbnails unchanged. Reduced only the peach photo backing's top/bottom protrusion to clear the heading and thumbnail row. Existing experimental mask assets are no longer referenced but were retained on disk. Build and git diff --check passed; horizontal bounds checked at 1440/1600px. Final screenshot: fenix-clean-backings-1600.png. No commit or push.

Follow-up, separate aerosol contour: preserved the solid backing faces and added independent red-orange/peach gradient outlines using two non-tiling alpha-only WebP masks (6,330 and 6,776 bytes). After the initial outline was rejected as too faint, increased its narrow exterior band and opacity without changing card or backing geometry. At the user's additional request, added the same contour around the white quote card through a desktop-only pseudo-element. No blur/glow, tiled dots, layout, content, image, rotation, mobile or animation changes. Screenshot visually inspected at 1600px: fenix-aerosol-outline-1600.png. Horizontal overflow checks passed at 1440/1600px; browser error log empty; build and git diff --check passed. No commit or push.

Follow-up, remove aerosol contour: removed only the decorative backing ::after overlays, quote ::before outline and CTA ::before outline, plus the unused spray color variable. Solid backing ::before faces and CTA ::after face retained with all geometry, layout, content, images and rotations unchanged. Removed all five spray-only WebP assets from public/images; recoverable copies retained outside the repository in the task visualization directory. Screenshot visually inspected at 1600px: fenix-no-contour-1600.png. Build and git diff --check passed. No commit or push.

Desktop pricing/admission: implemented only the supplied Variant 1 with matching quiet panels, equal pricing cards, coral prices, compact steps, restrained peach background gradients and reused wing/spark assets. All real text/data, CTA hrefs and other sections preserved. New styles scoped to >=1200px; no separate mobile redesign. Screenshot: fenix-practical-1600.png. Visual QA recorded in design-qa.md; build passed; no overflow at 1440/1024/768/390; console error log empty. No commit or push.

Follow-up, three decorative accents only: consolidated pricing background to one wide very pale peach/orange radial spray patch; admission background to one soft vertical patch at the right edge; enlarged existing feather from 215x125 to 254x148px (approximately 18%) and lowered it 8px. No layout, card, text, icon, CTA, mobile or other-section changes. Screenshot inspected: fenix-practical-accents-1600.png. Build and git diff --check passed. No commit or push.

Study desktop reference pass: changed only StudentExperience markup and >=1200px styles keyed to #student-panel-study. Added a 1.53:1 asymmetric grid with a 518px left card, 278px yellow and 224px graphite right cards, large heading/intro, numbered rules and decorative arrows. Reused existing wing and underline geometry; no spray or new animation. Study-only header/decor adjustments leave other active panels unchanged. Existing discussion photo and Russian-teacher demo photo substitute for the unavailable reference photos, so exact visual fidelity remains pending. Fixed yellow-title overflow found at 1440px; confirmed no horizontal overflow and checked People panel restoration (heading, decor, 24 gallery cards). Screenshot: fenix-study-1600.png. Build and diff check passed; browser errors empty. No commit/push.

School Life scoped desktop polish: only #student-panel-life descendants changed in src/styles.css. Label above left title, intro on right; existing three-photo grid adapted to 62/38 columns and 310px height inside unchanged 590px desktop stage. JSX, photos, lightbox, tabs, SVG assets and neighboring panels preserved. No horizontal overflow at 1600/1440/1024/768/390. Shared shell bounds match People and Study apart from the existing transient tab transform. Screenshot: fenix-life-1600.png. No commit/push.

2026-09-27: Replaced School Life with News, preserving internal life tab ID and shared shell/decor. StudentNews maps three explicitly demo records from src/content.js; existing photos only. Removed the obsolete photo-lightbox component from the replaced tab, no router added; hash slug links prepare future article routing. One featured image card and two horizontal cards use scoped student-news CSS. Verified unchanged 590px desktop stage, no card/page overflow at 1600/1440/1024/768/390, People shell restored unchanged. Screenshots: fenix-news-1600.png and fenix-news-people-1600.png. Build/diff check passed. No commit/push.

2026-09-27: Shared final contact/footer reference pass only. Added excursion tel-link, gradient rounded CTA and contact pills; graphite footer columns and legal/copyright row. Preserved existing phone/email/address/license/policy and Documents control. Optional supplied src/assets/cta-wing.svg loads through glob at opacity .18; no new artwork or spray. No overflow at 1600/1440/1024/768/390; build and diff check passed. Screenshot: fenix-cta-footer-1600.png. No commit/push.

2026-09-27: Final CTA only: imported the two user-supplied SVGs byte-for-byte. Removed CSS shape generation and unused WebP rendering. Corrected background letterboxing via an outer preserveAspectRatio=none viewport containing the unchanged SVG image; no artwork paths created or edited. Existing HTML content/footer retained. Screenshots fenix-cta-svg-1600.png and fenix-cta-svg-1440.png inspected; no horizontal overflow at 1600/1440/1024/768/390. No commit/push.
