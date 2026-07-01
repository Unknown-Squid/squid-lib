# RESTRICTED PAGES DOCUMENTATION

- File/Module Name: app/(pages)/(restricted)
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `app/(pages)/(restricted)/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Explain authenticated route structure | All |

## Purpose

- Hold routes intended for authenticated users.
- Provide shared layout boundary for protected pages.

## Location

- Folder path: `app/(pages)/(restricted)/`
- Main files:
  - `app/(pages)/(restricted)/layout.tsx`
  - `app/(pages)/(restricted)/dashboard/page.tsx`

## Responsibilities

- Wrap restricted pages with a dedicated layout shell.
- Serve restricted dashboard route content.

## Dependencies

- Imports:
  - `next/link` in dashboard page
- Access control dependency:
  - `middleware.ts`
  - `middleware/restrictedGate.ts`

## Data Flow

- Input:
  - Request to `/dashboard` (or other matched restricted URL)
- Output:
  - Restricted page content when session exists
  - Redirect to `/login` when session missing (handled before render by middleware)
- Side effects:
  - None in page/layout files directly

## Key Functions / Methods

- `RestrictedLayout({ children })`
- `DashboardPage()`

## Usage Example

```tsx
export default function RestrictedLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
```

## Edge Cases

- Folder grouping name `(restricted)` is invisible in URL.
- Middleware matcher and folder structure can drift if not maintained together.

## Related Files

- `middleware.ts`
- `middleware/restrictedGate.ts`
- `app/(pages)/(public)/login/page.tsx`
