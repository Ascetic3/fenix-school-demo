# Design system

## Character

Fenix should read as a warm, human, editorial school site rather than a generic SaaS landing page.

Use the existing contrast between serious editorial typography and energetic warm accents. Avoid decorative choices that feel synthetic, over-produced, or unrelated to the school.

## Current CSS tokens

The current root tokens include:

- ink: `#242124`;
- wine/red: `#d93620`;
- coral/orange: `#f26522`;
- apricot: `#ffb20f`;
- cream: `#fff9f1`;
- paper: `#fffdf9`;
- muted text: `#675e69`;
- shared radius: `1.15rem`.

Reuse tokens instead of scattering equivalent hard-coded values.

## Typography

Current implementation uses:

- Georgia / Times-style serif for major display headings and blockquotes;
- Arial / Helvetica-style sans serif for body and controls.

Where an approved Figma frame specifies typography, treat Figma as the visual source of truth and reconcile deliberately rather than guessing.

## Shape language

- rounded pills for controls;
- soft editorial cards and panels;
- large image shapes;
- restrained hand-made accents where they already exist or are supplied.

Do not add generic glass cards, neon gradients, large glow effects, or arbitrary AI-style blobs.

## Decorative artwork

Do not invent decorative SVG path geometry for Fenix unless the user explicitly requests generated artwork.

For implementation tasks:

- prefer existing project artwork;
- use user-supplied SVG/PNG;
- use Figma-exported approved assets;
- preserve supplied path geometry;
- positioning, clipping, masking, scaling and reveal motion are allowed.

The previous generated People-panel line-art was rejected and must not be recreated.

## Responsive design

Desktop layouts should recompose rather than simply scale down.

Visual QA should include at least:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px.

Use the existing breakpoints and add new ones only when the composition requires them.

## Accessibility

Preserve sufficient contrast, visible focus, semantic controls, keyboard access and meaningful alternatives for imagery. Interaction must not depend on hover alone.
