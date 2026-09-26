# Motion

Motion in Fenix should support orientation, state changes and editorial rhythm.

## Rules

- Prefer CSS transitions/keyframes for simple local motion.
- Do not add a heavy animation library unless the interaction genuinely requires coordinated timelines that the existing approach cannot express clearly.
- Respect `prefers-reduced-motion`.
- Information must remain available when motion is disabled.
- Avoid scroll hijacking.
- Prefer transforms and opacity; avoid layout-thrashing animation.
- Mobile motion may be simplified.

## Existing patterns

### Audience switching

Audience content uses short transitions to make the Parent/Student state change legible without making the page feel like a separate app reload.

### StudentHub reveal

StudentHub uses scroll-based reveal behavior with a reduced-motion fallback.

Keep first-scroll reveal on an outer wrapper so it does not fight the inner tab-switch transform/opacity animation.

### People teacher gallery

Desktop gallery movement is automatic and pauses on pointer hover. Mobile/reduced-motion uses a simpler scrollable layout rather than forcing the desktop marquee.

Do not reintroduce a manual Pause/Play control unless the user explicitly requests it.

### Bottom transition artwork

The supplied StudentHub-to-Stories transition is its own decorative element and reveal. Preserve its SVG geometry.

## New motion

For each new effect, verify:

- what state or relationship the motion explains;
- how it behaves on mobile;
- how it behaves with reduced motion;
- whether it conflicts with an existing transform/opacity animation;
- whether CSS is sufficient before adding dependencies.
