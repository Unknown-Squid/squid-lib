# Installation Guide

This guide covers all methods to install and use squid-lib-frontend in your project.

## Quick Start

### Option 1: npm Package (Recommended)

```bash
npm install squid-lib-frontend
```

**Peer Dependencies (required):**

- `react@^19.0.0`
- `react-dom@^19.0.0`

### Option 2: Git Clone with Path Dependency

For monorepo or local development:

```bash
# Clone or copy to your workspace
npm install "file:../path/to/component-lib-frontend"
```

Update your `package.json`:

```json
{
  "dependencies": {
    "squid-lib-frontend": "file:../component-lib-frontend"
  }
}
```

### Option 3: GitHub (When Published)

```bash
npm install github:geraldfegalan/squid-lib#path:component-lib-frontend
```

## CSS Setup

### For Next.js + Tailwind

Import in your app shell (e.g., `app/globals.css` or root layout):

```css
@import "squid-lib-frontend/styles/tokens.css";
@import "squid-lib-frontend/styles/index.css";
```

Then use components in your code:

```tsx
import { Button, Input, FormField } from "squid-lib-frontend/components/ui";

export default function MyPage() {
  return (
    <FormField label="Name">
      <Input placeholder="Enter your name" />
    </FormField>
  );
}
```

### For Vanilla CSS / Non-Tailwind Projects

1. **Load tokens first:**

```css
@import "squid-lib-frontend/styles/tokens.css";
```

2. **Import field and component CSS as needed:**

```css
/* Fields */
@import "squid-lib-frontend/styles/fields/field-shared.css";
@import "squid-lib-frontend/styles/fields/input.css";
@import "squid-lib-frontend/styles/fields/checkbox.css";

/* Components */
@import "squid-lib-frontend/styles/components/button.css";
@import "squid-lib-frontend/styles/components/form-field.css";
```

Or use the bundled version:

```css
@import "squid-lib-frontend/styles/index.css";
```

### CSS Import Order

Always import in this order:

1. `tokens.css` (CSS variables)
2. `fields/*.css` (form field styles)
3. `components/*.css` (component styles)

## Runtime Setup

### Toast Provider (Required for Toast Notifications)

Wrap your app with `ToastProvider` to enable toast notifications:

```tsx
// app/layout.tsx or pages/_app.tsx
import { ToastProvider } from "squid-lib-frontend/components/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

## Component Imports

All components are available from the main entry point:

```tsx
import {
  Button,
  Input,
  Select,
  Checkbox,
  FormField,
  Label,
  HelperText,
  FieldError,
  Badge,
  AlertDialog,
  Toast,
  Stepper,
} from "squid-lib-frontend/components/ui";
```

### Export Paths

| Module | Export Path | Contents |
|--------|------------|----------|
| **UI Components** | `squid-lib-frontend/components/ui` | All form fields and UI primitives |
| **Hooks** | `squid-lib-frontend/hooks` | Custom React hooks |
| **Utils** | `squid-lib-frontend/utils` | Utility functions |
| **Validation** | `squid-lib-frontend/validation` | Zod schemas and validation helpers |
| **Types** | `squid-lib-frontend/types` | TypeScript type definitions |
| **Main** | `squid-lib-frontend` | Re-exports all modules |

## Styling Customization

### CSS Variables (Theming)

Override CSS variables in your `:root` or within a specific scope:

```css
:root {
  --color-primary: #3b82f6;
  --color-surface-field: #ffffff;
  --color-text-primary: #1f2937;
  --border-radius-md: 0.5rem;
}
```

See [DESIGN.md](./DESIGN.md) for complete token reference.

### Tailwind CSS

If your host app uses Tailwind, component classes are still applied. You can extend Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
    },
  },
};
```

## Troubleshooting

### Build Errors

**"Cannot find module 'squid-lib-frontend'"**

- Ensure package is installed: `npm install`
- For file dependencies, verify path is correct
- Run `npm install` again to update `node_modules`

**"CSS not loading"**

- Verify import order (tokens first)
- Check that CSS files are in the installed package
- For monorepo setup, ensure build completes before importing

### Runtime Errors

**"ToastProvider not found when using useToast"**

- Wrap your app with `<ToastProvider>` at the root level
- Ensure it's imported from `squid-lib-frontend/components/ui`

**Component not rendering**

- Verify CSS is imported in your app
- Check browser DevTools console for errors
- Ensure React 19+ is installed

## Next Steps

- See [API.md](./API.md) for detailed component documentation
- See [EXAMPLES.md](./EXAMPLES.md) for usage examples
- See [VALIDATION.md](./VALIDATION.md) for form validation patterns
- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute improvements

## Support

For issues or questions:

1. Check [examples](./EXAMPLES.md)
2. Review component Storybook: `npm run storybook`
3. See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md)
