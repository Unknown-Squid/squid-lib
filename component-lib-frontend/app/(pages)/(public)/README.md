# PUBLIC PAGES DOCUMENTATION

- File/Module Name: app/(pages)/(public)
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `app/(pages)/(public)/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Explain unauthenticated route behavior | All |

## Purpose

- Hold routes accessible without session/auth checks.
- Provide public landing and login entry points.

## Location

- Folder path: `app/(pages)/(public)/`
- Main files:
  - `app/(pages)/(public)/page.tsx`
  - `app/(pages)/(public)/login/page.tsx`

## Responsibilities

- Render public home route (`/`) with reusable UI preview.
- Render login route (`/login`) and submit auth server action.

## Dependencies

- Imports:
  - `next/link`
  - `@/components` (`Button`)
  - `@/utils` (`cn`) on home page
  - `@/services/auth.server` (`setDemoSession`) on login page

## Data Flow

- Home page:
  - Input: none
  - Output: static UI and navigation links
- Login page:
  - Input: `searchParams.from`
  - Output: form posting to `setDemoSession`
  - Side effects: via service action, sets cookie + redirects

## Key Functions / Methods

- `HomePage()`
- `LoginPage({ searchParams })`

## Usage Example

```tsx
<form action={setDemoSession}>
  <input type="hidden" name="from" value={nextPath} />
</form>
```

## Edge Cases

- `from` is sanitized before redirect to avoid external/protocol-relative redirect targets.
- Public pages intentionally remain reachable even without cookie.

## Related Files

- `services/auth.server.ts`
- `components/Button.tsx`
- `middleware.ts`
