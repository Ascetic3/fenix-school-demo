# Project state

Last updated: 2026-09-26.

## Current phase

Fenix School is a React/Vite single-page demo with two audience modes: Parent and Student. The production branch is `main`; the latest verified production commit at the time of this tooling update is `6b69d1a` ("Publish current StudentHub design").

This documentation/tooling change is being prepared on `chore/fenix-agent-tooling` and does not change the rendered site.

## Current implementation

- `src/main.jsx` mounts `src/App.jsx`.
- `src/content.js` contains editable navigation, programs, prices, reviews, student content, teacher/demo data and related copy.
- `src/styles.css` contains the shared design tokens and page styling.
- `public/images/` contains site media; `public/images/student-demo/` contains Student-mode demo imagery.
- `src/assets/` contains selected source assets imported by the app.
- `vite.config.js` uses the GitHub Pages base `/fenix-school-demo/`.

## Audience modes

`App` resolves the audience from:

1. the `audience` query parameter;
2. `localStorage` key `fenix-audience`;
3. the Parent default with a welcome chooser.

Changing audience updates both the URL and stored choice.

## Student mode

Student mode contains its own Hero, StudentHub, Student Stories/reviews and trial CTA, followed by shared contact/footer content.

StudentHub includes:

- People;
- Study;
- News (replaces School Life, internal tab ID remains life);
- Photo/Video.

The People panel uses a large editorial teacher-gallery composition. Desktop motion is automatic and pauses on pointer hover; reduced-motion/mobile fall back to a simpler horizontally scrollable layout. There is no manual Pause/Play control.

## Figma state

Figma is the visual source of truth where a matching approved frame exists. Verified historical node information is preserved in `docs/agent-context.md`.

Do not assume a code section has a one-to-one Figma frame name. Verify the exact supplied node before visual implementation.

## Protected / approved behavior

Unless explicitly requested, preserve:

- Parent mode while editing Student mode;
- Student Hero;
- StudentHub top structure and tabs;
- StudentHub bottom transition SVG geometry;
- other StudentHub tabs while editing People;
- Stories section;
- current teacher-card scale and marquee behavior.

## Known incomplete content

- Final CTA uses the supplied src/assets/cta-shape.svg and cta-wing.svg unchanged. A geometry-free outer SVG viewport stretches the background to the full CTA bounds, avoiding intrinsic-aspect-ratio letterboxing. Wing opacity is .24 on desktop; the old CSS-generated shape and WebP are no longer rendered. Contact pills, excursion tel-link, footer and blocks above are preserved. Verified at 1600/1440px with no horizontal overflow through 390px; local only, not committed/published.

- News replaces School Life within the unchanged StudentHub shell. Three demo articles render from studentNews in src/content.js, using existing photos and hash links with slugs. Article routing/pages remain a separate next stage. Desktop uses a 58/42 grid inside the same 590px stage; local-only, not committed/published.

- Study desktop composition is locally updated from the supplied reference at >=1200px. People and other panels retain existing styles/behavior. Exact photo and stroke fidelity remains pending: current project demo photos and existing wing/underline artwork are reused; no spray was added. Not committed/published.

- Local desktop pricing/admission refinement uses only Variant 1 (calm premium) from the supplied reference. Existing prices/texts and smaller-screen implementation are retained; CSS changes apply at >=1200px. Existing wing artwork is reused with restrained CSS background accents. This work is not committed or published.

- Local Stage 1 Stories work on `preview/ui-experiments`: static desktop collage at >=1200px based on the supplied image reference, with overlapping photo/review/trial cards and four visual thumbnails. Smaller-screen layout retains its existing implementation. Thumbnail switching, new transitions and responsive adaptation are deferred to separately approved Stage 2; feather/SVG decoration is not included. This work is not committed or published.

- Several Student-mode images and teacher portraits are demo/illustrative material rather than verified production staff/media.
- Demo-week cards intentionally include fields awaiting confirmed school information.
- Decorative People-panel artwork should not be regenerated from the previously rejected inline SVG attempt.
- Production content should be verified before replacing placeholders or publishing new factual claims.

See `docs/CONTENT_TODO.md`.
