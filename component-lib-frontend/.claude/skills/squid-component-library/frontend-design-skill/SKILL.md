---
name: frontend-design
description: >-
  Builds distinctive, production-grade marketing pages, docs layouts, and one-off
  UIs with bold aesthetic direction. Use for landing pages, templates showcase,
  site pages, or beautifying web UI outside the core component library. Do not use
  when editing src/components/ui primitives (use component-creation instead).
---

# Frontend design (creative / marketing)

Use for **site pages and experiments**, not design-system primitives.

## When to use

| Use this skill | Use **component-creation** instead |
|----------------|-----------------------------------|
| `app/(pages)/`, `src/site/`, templates, marketing | `src/components/ui/*`, Storybook primitives |
| New landing / docs layout | New Input, Button, FormField, etc. |

Inside `component-lib-frontend`, respect existing tokens in `styles/globals.css` unless the user explicitly wants a break from the system.

## Design thinking

Before coding, pick a clear direction:

- **Purpose** — Who uses this and what job does the UI do?
- **Tone** — e.g. minimal, editorial, brutalist, playful, luxury, industrial
- **Constraints** — Framework, a11y, performance
- **Differentiation** — One memorable hook

Execute with intentionality (bold or restrained both work).

## Guidelines

- **Typography** — Distinctive pairing (display + body); avoid default “AI” stacks only on *marketing* pages
- **Color** — Cohesive palette; CSS variables; strong accent vs muddy evenly-mixed neutrals
- **Field contrast guardrail** — Backgrounds must complement existing field styles. Never ship a section where inputs, labels, helper/error text, or field borders lose visibility against the page/background surface. If contrast is weak, adjust the surface/background token first, then text/border tokens.
- **Motion** — Few high-impact moments (staggered load, hover) over noise; CSS-first
- **Layout** — Asymmetry, overlap, or generous whitespace — match the chosen tone
- **Depth** — Textures, gradients, grain only when they serve the concept

## Avoid

- Generic purple-gradient-on-white “AI slop”
- Cookie-cutter layouts with no context
- Applying this skill to **library components** (breaks token consistency)

## Output

Working React/HTML/CSS that is functional, accessible, and visually cohesive with the chosen direction.