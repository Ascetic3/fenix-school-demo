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
- School Life;
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

- Several Student-mode images and teacher portraits are demo/illustrative material rather than verified production staff/media.
- Demo-week cards intentionally include fields awaiting confirmed school information.
- Decorative People-panel artwork should not be regenerated from the previously rejected inline SVG attempt.
- Production content should be verified before replacing placeholders or publishing new factual claims.

See `docs/CONTENT_TODO.md`.
