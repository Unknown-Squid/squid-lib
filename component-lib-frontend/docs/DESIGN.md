# Design System Surface & Contrast Contract

## Goal

All pages and all components must keep form fields and text readable against their surrounding background in both light and dark mode.

## Background + field visibility rules

- Page-level backgrounds must use surface tokens (`--color-surface-page`, `--color-surface-panel`) instead of random one-off colors.
- Field controls must render on `--color-surface-field` with `--color-border-primary` so the field edge is always visible.
- Labels, helper text, and error text must use tokenized text colors (`--color-text-*`) with clear contrast against the active surface.
- If a section background is customized, check fields inside that section immediately; if visibility drops, adjust surface tokens first, then text/border tokens.

## Required tokens

- `--color-surface-page`
- `--color-surface-panel`
- `--color-surface-field`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-tertiary`
- `--color-border-primary`
- `--color-border-secondary`

## Implementation notes

- Surface/contrast defaults are defined in `styles/tokens.css`.
- App-wide background and field readability guardrail are enforced in `styles/globals.css`.
- Component field chrome still comes from `styles/fields/field-shared.css`; global surface tokens ensure it remains legible across pages.

## Scoped theme experiments

- `/theme` edits are stored in `localStorage` and applied only inside `.squid-theme-scope`.
- **Playground** and **Templates** wrap their interactive content with `ThemeScopeProvider`.
- Docs, About, Home, and other pages always use the default `:root` tokens from `tokens.css`.
