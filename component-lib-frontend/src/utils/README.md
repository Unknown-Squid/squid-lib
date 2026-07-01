# UTILS FOLDER DOCUMENTATION

- File/Module Name: utils
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `src/utils/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Define pure utility layer behavior | All |
| 2026-05-14 | Moved to `src/utils` | Align with AI-PROJECT-GOALS | Location |

## Purpose

- Store pure helper functions with no framework-side effects.
- Current utility `cn` standardizes class name composition.

## Location

- Folder path: `src/utils/`
- Main files:
  - `src/utils/cn.ts`
  - `src/utils/index.ts`

## Responsibilities

- Provide deterministic utility functions.
- Keep reusable low-level logic out of components and pages.

## Dependencies

- No runtime dependencies.
- Used by:
  - `components/Button.tsx`
  - `app/(pages)/(public)/page.tsx`

## Data Flow

- Input:
  - List of class tokens (`string | undefined | false`)
- Output:
  - Single space-joined class string
- Side effects:
  - None

## Key Functions / Methods

- `cn(...parts)`
  - Filters falsy values
  - Joins remaining tokens with a single space

## Usage Example

```ts
const className = cn("px-4", isActive && "bg-black", customClass);
```

## Edge Cases

- Does not deduplicate conflicting Tailwind classes.
- Truthy non-string values are not accepted by type signature.

## Related Files

- `components/Button.tsx`
- `app/(pages)/(public)/page.tsx`
