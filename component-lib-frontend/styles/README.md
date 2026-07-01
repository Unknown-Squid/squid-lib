# Squid UI styles

## Structure

```
styles/
  tokens.css          # CSS variables — edit to retheme
  globals.css         # Next app entry (Tailwind + tokens + index)
  index.css           # Bundles all partials
  utilities.css       # sr-only, input wrap
  fields/
    field-shared.css  # .ui-field-control + status modifiers
    input.css
    textarea.css
    select.css
    file-input.css
    checkbox.css
    radio.css
    switch.css
  components/
    button.css
    badge.css
    label.css
    helper-text.css
    form-field.css
```

## Vanilla HTML

Load tokens first, then the field files you need:

```html
<link rel="stylesheet" href="/path/to/tokens.css" />
<link rel="stylesheet" href="/path/to/fields/field-shared.css" />
<link rel="stylesheet" href="/path/to/fields/input.css" />

<label class="ui-label" for="email">Email</label>
<input id="email" type="email" class="ui-field-control ui-input" />
```

Checkbox:

```html
<link rel="stylesheet" href="fields/checkbox.css" />
<label class="ui-check-item">
  <input type="checkbox" class="ui-sr-only" />
  <span class="ui-check-box"></span>
  <span class="ui-check-label">Accept</span>
</label>
```

Legacy class names (`check-item`, `input-wrap`) remain aliases for existing markup.

## React

Import `globals.css` in the app. Components apply the same `ui-*` classes via `src/components/ui/styles.ts` helpers.

## Surface contrast rules

- Backgrounds should come from surface tokens (`--color-surface-page`, `--color-surface-panel`, `--color-surface-field`).
- Fields must remain visually distinct from their parent surface; do not set backgrounds that hide field borders/text.
- For the full contract, see `DESIGN.md`.
