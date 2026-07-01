# PAGES GROUP DOCUMENTATION

- File/Module Name: app/(pages)
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `app/(pages)/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Define route grouping architecture | All |

## Purpose

- Organize route tree by access boundary, not URL.
- Separate public routes and authenticated routes in App Router structure.

## Location

- Folder path: `app/(pages)/`
- Subgroups:
  - `app/(pages)/(public)/`
  - `app/(pages)/(restricted)/`

## Responsibilities

- Provide architectural grouping for page ownership.
- Keep access concerns explicit at folder level.

## Dependencies

- Public routes consume:
  - `@/components`
  - `@/services/auth.server`
- Restricted routes depend on:
  - `middleware.ts` and `middleware/restrictedGate.ts` for gate enforcement

## Data Flow

- Incoming request path resolves to page in either subgroup.
- Middleware gate decides whether restricted URLs continue or redirect.

## Key Functions / Methods

- No direct functions in this group root; it is a structural folder.

## Usage Example

```txt
app/
  (pages)/
    (public)/
    (restricted)/
```

## Edge Cases

- Route group names in parentheses do not appear in final URL.
- Access control must target real URL prefixes (`/dashboard`, not `/(restricted)/dashboard`).

## Related Files

- `app/(pages)/(public)/README.md`
- `app/(pages)/(restricted)/README.md`
- `middleware.ts`
