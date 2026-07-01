---
name: library-distribution
description: >-
  Documents and implements how squid-lib-frontend is consumed from other projects
  via npm or git clone, including package exports, peer dependencies, and importing
  vanilla CSS (tokens + fields) vs Tailwind. Use when publishing the package,
  adding export paths, writing consumer README, or wiring a host app to the library.
---

# Library distribution

## Consumer: npm (future public)

```bash
npm install squid-lib-frontend
```

Peer: `react`, `react-dom` (versions aligned with library).

```ts
import { Button, Input, FormField } from "squid-lib-frontend/components/ui";
```

## Consumer: git clone / monorepo

```json
"dependencies": {
  "squid-lib-frontend": "file:../path/to/component-lib-frontend"
}
```

Run `npm install` in host; TypeScript `paths` optional if host resolves `node_modules`.

## CSS in host app

**Tailwind host:** import library global chain once (copy pattern from `styles/globals.css`: `tokens.css` → `index.css`).

**Vanilla host:**

```html
<link rel="stylesheet" href="node_modules/squid-lib-frontend/styles/tokens.css" />
<link rel="stylesheet" href="node_modules/squid-lib-frontend/styles/fields/field-shared.css" />
<link rel="stylesheet" href="node_modules/squid-lib-frontend/styles/fields/input.css" />
```

(Adjust paths if package publishes a `dist` — document actual paths in package README when publishing.)

## Adding a new export

1. `package.json` → `exports`
2. Barrel `src/.../index.ts`
3. Document in `styles/README.md` or root package README
4. Run build + verify host can import

## Do not

- Bundle React into the library build for npm
- Use `@/` in code intended to be copied verbatim by consumers (internal alias is fine inside repo)
