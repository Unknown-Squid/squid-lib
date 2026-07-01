# COMPONENTS FOLDER DOCUMENTATION

- File/Module Name: components
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `src/components/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Define role and usage of reusable UI layer | All |
| 2026-05-14 | Moved to `src/components` with `ui/`, `layout/`, `data/`, `feedback/` | Align with AI-PROJECT-GOALS library layout | All |

## Purpose

- Central place for reusable UI primitives.
- Current implementation provides a shared `Button` component used by page modules.

## Location

- Folder path: `src/components/`
- Main files:
  - `src/components/ui/Button.tsx`
  - `src/components/ui/index.ts`
  - `src/components/index.ts`

## Responsibilities

- Export reusable presentational components.
- Keep component APIs small and composable (`variant`, `className`, native button props).
- Avoid page-specific business logic.

## Dependencies

- Imports from:
  - React types (`ButtonHTMLAttributes`)
  - `@/utils` (`cn`)
- Used by:
  - `app/(pages)/(public)/page.tsx`
  - `app/(pages)/(public)/login/page.tsx`

## Data Flow

- Input:
  - `ButtonProps` from caller (`variant`, native button attributes)
- Output:
  - Rendered `<button>` with merged Tailwind classes
- Side effects:
  - None

## Key Functions / Methods

- `Button(props: ButtonProps)`
  - Normalizes button type (`button` default)
  - Applies style variants (`primary`, `secondary`)
  - Forwards all other native props

## Usage Example

```tsx
import { Button } from "@/components";

<Button type="submit">Save</Button>;
```

## Edge Cases

- Invalid `variant` values are prevented by TypeScript union type.
- `className` is appended after base styles, so caller classes can override where CSS specificity allows.

## Related Files

- `src/utils/cn.ts`
- `app/(pages)/(public)/page.tsx`
- `app/(pages)/(public)/login/page.tsx`
