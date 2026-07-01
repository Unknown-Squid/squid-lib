# MIDDLEWARE FOLDER DOCUMENTATION

- File/Module Name: middleware
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `middleware/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Describe request gate logic for restricted routes | All |

## Purpose

- Encapsulate request interception logic used by root `middleware.ts`.
- Enforce authentication gate for restricted URL prefixes.

## Location

- Folder path: `middleware/`
- Main files:
  - `middleware/restrictedGate.ts`

## Responsibilities

- Detect whether a request targets a restricted prefix.
- Allow public routes to pass through untouched.
- Redirect unauthenticated restricted requests to `/login` with `from` param.

## Dependencies

- Imports:
  - `next/server` (`NextRequest`, `NextResponse`)
- Called by:
  - `middleware.ts`

## Data Flow

- Input:
  - `NextRequest`
- Output:
  - `NextResponse.next()` or `NextResponse.redirect(...)`
- Side effects:
  - Reads cookie `session`
  - Modifies redirect URL query string (`from`)

## Key Functions / Methods

- `restrictedGate(request)`
  - Checks `pathname` against `RESTRICTED_PREFIXES`
  - Reads `session` cookie
  - Redirects to `/login?from=<pathname>` when missing auth

## Usage Example

```ts
import { restrictedGate } from "./middleware/restrictedGate";

export default function middleware(request: NextRequest) {
  return restrictedGate(request);
}
```

## Edge Cases

- Route group names like `(restricted)` are not part of URL path; matching must use real URL segments.
- Any route not included in matcher/prefix lists will bypass auth gate.

## Related Files

- `middleware.ts`
- `services/auth.server.ts`
- `app/(pages)/(restricted)/dashboard/page.tsx`
