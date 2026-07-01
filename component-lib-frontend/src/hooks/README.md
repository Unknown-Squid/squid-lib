# HOOKS FOLDER DOCUMENTATION

- File/Module Name: hooks
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `src/hooks/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Document reusable custom hook contract | All |
| 2026-05-14 | Moved to `src/hooks` | Align with AI-PROJECT-GOALS | Location |

## Purpose

- Store reusable React hooks only.
- Current hook `useMounted` solves client-hydration timing checks.

## Location

- Folder path: `src/hooks/`
- Main files:
  - `src/hooks/useMounted.ts`
  - `src/hooks/index.ts`

## Responsibilities

- Provide reusable hook logic that can be imported by multiple components/pages.
- Keep hook behavior side-effect scoped and predictable.

## Dependencies

- Imports from React:
  - `useState`
  - `useEffect`
- No current in-repo consumers yet.

## Data Flow

- Input:
  - No arguments
- Output:
  - `boolean` (`false` before mount, `true` after first client effect)
- Side effects:
  - One client-side state update in `useEffect`

## Key Functions / Methods

- `useMounted(): boolean`
  - Initializes `mounted` as `false`
  - Sets `mounted` to `true` on first client render cycle

## Usage Example

```tsx
const mounted = useMounted();
if (!mounted) return null;
```

## Edge Cases

- Must run in a Client Component because file is marked `"use client"`.
- Returns `false` during SSR/hydration phase by design.

## Related Files

- `src/hooks/useMounted.ts`
- `components/README.md`
- `app/(pages)/(public)/README.md`
