# Consuming `squid-lib-frontend`

## Install from npm (preferred)

```bash
npm i squid-lib-frontend
```

Required host peers:

- `react@^19`
- `react-dom@^19`

## Clone / file dependency

```bash
npm i "file:../component-lib-frontend"
```

## CSS import strategy

### Tailwind / Next host

Import one entry in your app shell (e.g. `app/globals.css` or root layout):

```css
@import "squid-lib-frontend/styles/tokens.css";
@import "squid-lib-frontend/styles/index.css";
```

### Vanilla host

Load `tokens.css` first, then the subset of field/component files you need, or use `styles/index.css` for the full bundle.

Recommended order:

1. `styles/tokens.css`
2. `styles/fields/*` and `styles/components/*` (or `styles/index.css`)

## Runtime providers

- Toast API requires `ToastProvider` at app root.
- Alert dialog and stepper are standalone.

```tsx
import { ToastProvider } from "squid-lib-frontend/components/ui";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
```
