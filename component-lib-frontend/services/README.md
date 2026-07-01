# SERVICES FOLDER DOCUMENTATION

- File/Module Name: services
- Document Created: 2026-05-12
- Last Updated: 2026-05-12
- Author: AI Documentation System
- Source Code Path: `services/`

## CHANGE TIMELINE

| Date | What Changed | Reason | Sections Updated |
|------|---------------|--------|------------------|
| 2026-05-12 | 🆕 Added initial documentation | Define business-logic layer and current service APIs | All |

## Purpose

- Hold business logic and server-capable actions.
- Centralize network and auth-related behavior outside UI components.

## Location

- Folder path: `services/`
- Main files:
  - `services/http.ts`
  - `services/auth.server.ts`
  - `services/index.ts`

## Responsibilities

- Provide typed HTTP JSON request wrapper (`jsonRequest`).
- Provide login/session server action (`setDemoSession`).
- Keep page files thin by moving non-UI logic here.

## Dependencies

- `http.ts` depends on native `fetch`.
- `auth.server.ts` depends on:
  - `next/headers` (`cookies`)
  - `next/navigation` (`redirect`)
- Used by:
  - `app/(pages)/(public)/login/page.tsx` (`setDemoSession`)

## Data Flow

- `jsonRequest`
  - Input: `path`, HTTP method, optional request init + body
  - Output: parsed JSON payload (`Promise<T>`)
  - Side effects: outbound HTTP request, throws on non-2xx
- `setDemoSession`
  - Input: `FormData` with optional `from`
  - Output: none (terminates via redirect)
  - Side effects: sets `session` cookie, redirects user

## Key Functions / Methods

- `jsonRequest<T>(path, method, init)`
  - Injects default `Accept: application/json`
  - Conditionally sets `Content-Type: application/json`
  - Serializes `body` and throws detailed error on failure status
- `setDemoSession(formData)`
  - Validates redirect target as internal path
  - Writes secure-ish demo cookie (`httpOnly`, `sameSite=lax`)

## Usage Example

```ts
const data = await jsonRequest<User[]>("/api/users", "GET");
```

```tsx
<form action={setDemoSession}>{/* ... */}</form>
```

## Edge Cases

- `jsonRequest` assumes response body is JSON on success.
- `setDemoSession` sanitizes `from` to prevent protocol-relative redirect (`//...`).
- `auth.server.ts` is intentionally not re-exported in `services/index.ts` to avoid accidental client import of `"use server"` code.

## Related Files

- `app/(pages)/(public)/login/page.tsx`
- `middleware/restrictedGate.ts`
- `middleware.ts`
