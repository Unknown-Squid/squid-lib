---
name: component-creation
description: >-
  Creates or refactors UI primitives in component-lib-frontend so all components
  share uniform tokens and patterns, are responsive in layouts, and customizable
  via props (size, variant, className, state). Use when adding or editing anything
  under src/components/ui, fixing style drift, Storybook, or barrel exports.
---

# Component creation (squid-lib)

Package root: `component-lib-frontend/`. Alias: `@/*` → `src/*`.

## Design system contract (all components)

Applies to **every new component** and **every edit** to existing `src/components/ui/*`:

1. **Uniform style** — Same tokens, borders (0.5px), radii, focus rings, typography scale, and semantic colors. No one-off hex, shadows, or focus treatment unless added to `styles/globals.css` for the whole system.
2. **Responsive** — Controls adapt to container width and small viewports without horizontal overflow or broken touch targets (see § Responsive).
3. **Customizable via props** — Behavior and look controlled through a typed props API + `className`; not by forking CSS per call site (see § Props surface).

When touching an older file that drifts from this contract, **refactor toward uniformity** in the same change (minimal diff, same public API).

Before coding, open the **closest existing component** (Input, Checkbox, Button, Badge) and mirror its structure.

**File layout:** follow project rule **`code-file-layout`** — grouped imports with comments, body sections (hooks → derived → handlers), concise `{/* … */}` comments on each major JSX block.

## 1. Folder layout

```
src/components/ui/<kebab-name>/
  ComponentName.tsx    # PascalCase export
  index.ts             # export { X, type XProps } from "./ComponentName"
  ComponentName.stories.tsx   # optional but expected for primitives
```

Exceptions (already in repo):

- Single-file primitives: `src/components/ui/Button.tsx` (no subfolder).
- Shared field styles: `src/components/ui/styles.ts` — do not duplicate; import from here.

After adding a folder component, export from `src/components/ui/index.ts`:

```ts
export * from "./my-component";
```

Public API also flows via `package.json` → `"./components/ui"`.

## 2. Pick a component archetype

| Archetype | Examples | Pattern |
|-----------|----------|---------|
| **Text field** | Input, Textarea, Select | `forwardRef`, `fieldControlClass` + `resolveFieldStatus`, `fieldStatus` + `error` props |
| **Custom control** | Checkbox, Radio, Switch | `"use client"` if needed; hide native input (`.sr-only`); style via `styles/components.css` class hooks |
| **Composite field** | PasswordField, FormField | Wrap lower primitive; pass through `fieldStatus` / refs |
| **Presentational** | Badge, Button, Label, HelperText | Plain function component; semantic tokens only |
| **Layout / form shell** | FormField | `cloneElement` child; wire ids + `aria-*`; status badges |

Do not invent a new styling system. Extend tokens in `styles/globals.css` only when the design truly needs a new semantic color.

## 3. TypeScript API conventions

Strict types: **`src/types/fields.ts`** (`FieldSize`, `FieldStatus`, `BaseFieldControlProps`, …). Compose them; avoid loose `string` for enums.

```tsx
import type { BaseFieldControlProps } from "@/types/fields";

export type FooProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  BaseFieldControlProps;

export const Foo = forwardRef<HTMLInputElement, FooProps>(function Foo(
  { className, size = "md", error, fieldStatus: fieldStatusProp, disabled, "aria-invalid": ariaInvalid, ...props },
  ref,
) { /* ... */ });
```

- **`size`**: library uses `sm | md | lg`; HTML `size` on `<select>`/`<input>` is omitted via `Omit<..., "size">`.
- **`className`**: always last in `cn(...)` so callers can override.
- **`disabled`**: explicit destructure when applying disabled styles.
- **Display name**: use `function Foo` inside `forwardRef` (named function), not anonymous.
- **Client boundary**: add `"use client"` only for `useState`, `useEffect`, `useId` in interactive-only wrappers (Checkbox, PasswordField, FormField consumers).

## 4. Props surface (customization)

Every primitive must be configurable **without editing its source**. Standard props:

| Prop | Who | Purpose |
|------|-----|---------|
| `className` | All | Caller overrides; **always last** in `cn(...)` |
| `size?: "sm" \| "md" \| "lg"` | Fields, Button | Density / height scale from tokens |
| `variant?` | Button, Badge | Semantic visual style |
| `disabled?` | Interactive | Shared disabled opacity + cursor |
| `error?` / `fieldStatus?` | Fields | Validation chrome via `resolveFieldStatus` |
| `...nativeProps` | All | Spread remaining `ButtonHTMLAttributes`, `InputHTMLAttributes`, etc. |

Rules:

- Export `ComponentProps` type from `index.ts`.
- Support **controlled** usage: `value` + `onChange` (or `checked` + `onChange`) and `forwardRef` on focusable natives.
- Optional presentation props (`leadingIcon`, `label`, `showIcon`) — document in Storybook.
- **Do not** require global CSS or wrapper divs at call sites for normal customization.
- New boolean/enum props only when they map to **reused** system behavior (not one consumer).

## 5. Responsive behavior

Primitives are **layout-agnostic** but **container-friendly**:

| Rule | Implementation |
|------|----------------|
| Fluid width | Fields: `w-full` via `fieldControlClass`. Buttons in forms: default inline-flex; optional `className="w-full"` from caller. |
| Flex/grid safe | Add `min-w-0` on roots inside flex rows (see `RadioGroup`) so text truncates instead of overflowing. |
| Max width | `max-w-full` on anything that can sit in narrow columns; badges use `max-w-fit` intentionally. |
| Touch targets | Keep default `md` heights (`--field-height`, `--button-height`); use `sm` only when density is explicit. |
| Font scaling | Use token font sizes (`var(--font-size-input)`), not raw `text-sm` unless matching an existing size tier. |
| No fixed pixel widths | Avoid `w-[320px]` on primitives; width comes from parent layout. |

**Storybook:** decorator `w-[min(100vw-2rem,20rem)]` (or wider for groups). Add a **Narrow** story in a `max-w-xs` wrapper when the component is new or complex.

**Not in scope for primitives:** page-level breakpoints (`sm:grid-cols-2` on marketing sections) — those live in `src/site/` / `app/(pages)/`.

## 6. Styling rules

### CSS files (required — not Tailwind in components)

| Layer | Path |
|-------|------|
| Tokens | `styles/tokens.css` |
| Field | `styles/fields/<control>.css` (e.g. `input.css`) |
| Other UI | `styles/components/<name>.css` |
| Bundle | `styles/index.css` via `globals.css` |

Apply classes: `ui-field-control`, `ui-input`, `ui-btn--primary`, etc. Helpers in `src/components/ui/styles.ts`.

### Design tokens (required)

Use CSS variables from `styles/tokens.css` (loaded by `globals.css`):

- Colors: `var(--color-text-primary)`, `var(--color-background-primary)`, `var(--color-border-primary)`, semantic `*-info|success|warning|danger`
- Typography: `var(--font-size-input)`, `var(--font-size-label)`, `var(--font-size-badge)`
- Radii: `var(--border-radius-md)`, `var(--border-radius-pill)`
- Focus: `var(--focus-ring-default)`, `var(--focus-ring-error)`, etc.
- Spacing: `var(--gap-label-control)`, `var(--field-height)`, `var(--button-height)`

### Text inputs / selects

```tsx
import { fieldControlClass, inputClass, resolveFieldStatus } from "@/components/ui/styles";
import type { BaseFieldControlProps } from "@/types/fields";

const status = resolveFieldStatus({ fieldStatus: fieldStatusProp, error: Boolean(error) });

className={cn(fieldControlClass(status), inputClass(size), className)}
```

- Borders: **0.5px** (see `fieldControlClass`).
- Status rings: error / success / warning via `fieldStatus` (FormField clones this onto children).
- **Do not** put `url(...)` data-URI backgrounds in Tailwind arbitrary classes (breaks PostCSS). Put them in `styles/components.css` (see `.ui-select` chevron).

### Checkbox / radio / switch

1. Native input visually hidden (`.sr-only` or equivalent in `components.css`).
2. Decorative span: `.check-box`, `.radio-circle`, `.switch-track`, etc.
3. State via adjacent selectors: `input:checked + .check-box`, `input:focus-visible + .check-box`.
4. Label copy via optional `label` prop + `.check-label` / `.radio-label`.

### Buttons / badges

- Tailwind in component file with `cn()` from `@/utils`.
- Button: `variant` + `size` + `iconOnly`; `type="button"` default.
- Badge: `variant` maps to semantic background/text tokens; icons via `badge-icons.tsx` when applicable.

## 7. Accessibility

- Prefer native elements (`button`, `input`, `select`, `textarea`, `label`).
- `aria-invalid` only when `status === "error"` (or explicit error).
- `aria-describedby` for helper + status ids — **FormField** handles this when wrapped.
- Focus: `focus-visible:outline-none` + token shadow rings; never remove focus outline without a replacement.
- Icon-only controls: require `aria-label` from caller.

## 8. FormField integration

Field controls used inside `FormField` must accept (via props or spread):

- `id`, `aria-describedby`, `aria-labelledby` (when applicable)
- `fieldStatus`, `error`, `aria-invalid`, `aria-required`

FormField clones:

```tsx
fieldStatus,
error: fieldStatus === "error",
"aria-invalid": fieldStatus === "error" ? true : ...,
```

Status messages on FormField (not inside the control):

- `error` → danger badge + red ring
- `warning` → warning badge + amber ring
- `success` → success badge + green ring
- `info` → info badge only

Priority: error → warning → success → info.

## 8b. Validation (Zod)

- Schemas: `src/validation/schemas/fields.ts` + `forms.ts`
- Helpers: `validateFieldValue`, `formFieldMessagesLive`, `safeParseForm` from `@/validation`
- Inferred form types: export via `src/types/components.ts`
- Rule: **`form-validation-zod.mdc`** · skill: **`form-validation`**

## 9. Storybook

Path: `ComponentName.stories.tsx` next to the component.

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "UI/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,20rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
```

Use `useState` in `render` for controlled demos. Include at least **Default**, **Disabled**, and state stories (**Error** / **Success** when applicable). Add **Narrow** for responsive check.

## 10. Creation checklist

Copy and track:

```
- [ ] Matches design system contract (uniform / responsive / props-driven)
- [ ] Folder + ComponentName.tsx + index.ts
- [ ] Props: className last, size/variant/state as needed, native attrs spread
- [ ] w-full + min-w-0 where layout can shrink; no fixed primitive widths
- [ ] Tokens / fieldControlClass / components.css (correct layer)
- [ ] aria-* and disabled handling
- [ ] FormField-compatible props if form control
- [ ] Storybook: Default + Disabled + state stories + Narrow if needed
- [ ] Export in src/components/ui/index.ts
- [ ] npx tsc --noEmit && npm run build (from component-lib-frontend)
```

Optional follow-ups (only if user asked):

- Docs section in `src/site/docs-content.tsx`
- Template usage in `src/site/templates-showcase.tsx` or `playground-panel.tsx`

## 11. Anti-patterns

| Avoid | Do instead |
|-------|------------|
| Hard-coded hex for semantic states | `var(--color-border-danger)` etc. |
| Duplicate field border/focus classes | `fieldControlClass` from `styles.ts` |
| `bg-[url('data:...')]` in Tailwind | Class in `components.css` |
| Huge god components | Split primitive + FormField shell |
| Uncontrolled-only APIs for form fields | Support `value` + `onChange` / ref |
| Bottom inline error only | Top badge via FormField `error` prop |
| Fixed width primitives | `w-full` + parent layout |
| Style overrides only via CSS modules / globals | `className` + `variant` / `size` props |
| One component with custom focus ring | `fieldControlClass` / token focus rings |

## 12. Reference map

| Need | Read first |
|------|------------|
| Text field | `src/components/ui/input/Input.tsx` |
| Select + CSS chevron | `select/Select.tsx`, `styles/components.css` `.ui-select` |
| Custom control | `checkbox/Checkbox.tsx`, `components.css` |
| Status field shell | `form-field/FormField.tsx`, `form-field-status.ts` |
| Shared field chrome | `styles.ts` |
| Tokens | `styles/globals.css` |
| Package exports | `src/components/ui/index.ts`, `package.json` exports |
