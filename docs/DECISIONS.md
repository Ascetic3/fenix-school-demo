# Durable decisions

## Keep the existing JavaScript/Vite architecture

**Decision:** Keep Fenix on the current React + Vite + JavaScript + plain CSS stack.

**Reason:** The site is already implemented and deployed with this stack. Tooling parity with Druzhim does not require a framework/style migration.

**Consequence:** TypeScript, Sass, lint/format stacks and other dependencies are separate migration decisions, not part of agent-tooling setup.

## Use the global frontend-app-builder skill selectively

**Decision:** Reuse the existing user-level `$frontend-app-builder` skill for genuinely new visual directions or major frontend composition.

**Reason:** The skill was already installed for Druzhim and user-level skills are available across projects.

**Consequence:** Do not copy the whole skill into the Fenix repository. Do not rerun broad creative exploration for sections that already have approved Figma designs.

## Figma for approved visual truth

**Decision:** Approved Figma frames supersede visual approximation from memory.

**Reason:** Structured design context is more reliable than reverse-engineering screenshots.

**Consequence:** Inspect the exact user-supplied Figma node before implementation and map it to the existing code with the smallest effective diff.

## Protect supplied SVG geometry

**Decision:** Do not generate replacement decorative SVG paths for approved/supplied Fenix artwork.

**Reason:** A generated decorative line-art attempt in the People panel was visually rejected.

**Consequence:** Reuse existing/user-supplied/Figma-exported artwork. Position or animate it without altering path geometry unless explicitly requested.

## Separate StudentHub reveal from tab animation

**Decision:** First-scroll reveal and keyed tab switching must live on separate wrappers/nodes.

**Reason:** Both behaviors use transform/opacity and conflict when attached to the same element.

**Consequence:** New motion must preserve this ownership boundary.

## Keep Parent and Student scopes independent

**Decision:** A task scoped to one audience does not authorize changes to the other audience.

**Reason:** The application deliberately supports two different information priorities in one codebase.

**Consequence:** Keep cross-mode changes explicit and reviewable.
