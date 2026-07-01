# squid-lib-frontend

[![npm version](https://img.shields.io/npm/v/squid-lib-frontend.svg?style=flat)](https://www.npmjs.com/package/squid-lib-frontend)
[![Build status](https://img.shields.io/github/actions/workflow/status/geraldfegalan/squid-lib/ci.yml?branch=main)](https://github.com/geraldfegalan/squid-lib)

A **production-ready React UI component library** with form validation, design tokens, accessibility, and mobile responsiveness built-in.

## Features ✨

- 🎨 **Token-Driven Design** — Consistent theming via CSS variables
- 📱 **Mobile Responsive** — Mobile-first CSS with `@media` queries
- ♿ **Accessible** — WCAG 2.1 compliance, proper ARIA attributes
- 🔐 **Form Validation** — Zod schemas with built-in validation helpers
- 📚 **Well Documented** — Storybook, API docs, examples, and guides
- 🎯 **TypeScript** — Strict types, full IDE support
- 🚀 **Tree-Shakeable** — Import only what you need
- 🌓 **Dark Mode** — Automatic light/dark theme support
- 📦 **Zero Dependencies** — React & React-DOM are peer dependencies

## Quick Start

### Install

```bash
npm install squid-lib-frontend
```

**Requirements:**
- React 19+
- React-DOM 19+

### Setup

Import styles in your app:

```css
/* app/globals.css */
@import "squid-lib-frontend/styles/tokens.css";
@import "squid-lib-frontend/styles/index.css";
```

Wrap your app with `ToastProvider`:

```tsx
// app/layout.tsx
import { ToastProvider } from "squid-lib-frontend/components/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```

### Usage

```tsx
import {
  Button,
  Input,
  FormField,
} from "squid-lib-frontend/components/ui";
import { useState } from "react";

export function MyForm() {
  const [email, setEmail] = useState("");

  return (
    <FormField label="Email" required>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
    </FormField>
  );
}
```

## Components

### Form Fields

- **Input** — Text, email, password, number inputs with validation
- **Textarea** — Multi-line text input
- **Select** — Dropdown selection
- **Checkbox** — Single checkbox
- **RadioGroup** — Radio button groups
- **Switch** — Toggle switch
- **FileInput** — File upload field
- **PasswordField** — Password input with show/hide toggle
- **FormField** — Wrapper with label, status badges, and helper text

### UI Components

- **Button** — Action button with variants and sizes
- **Badge** — Status or category label
- **Label** — Form field label
- **HelperText** — Descriptive text below fields
- **FieldError** — Error message display

### Composite Components

- **AlertDialog** — Modal confirmation dialog
- **Toast** — Non-blocking notifications
- **Stepper** — Multi-step progress indicator

## Documentation

| Document | Purpose |
|----------|---------|
| [**INSTALLATION.md**](./INSTALLATION.md) | Setup and installation guide |
| [**API.md**](./API.md) | Complete component and utility reference |
| [**VALIDATION.md**](./VALIDATION.md) | Form validation patterns with Zod |
| [**EXAMPLES.md**](./EXAMPLES.md) | Real-world usage examples |
| [**DEVELOPMENT.md**](./DEVELOPMENT.md) | Contributing and development guide |
| [**DESIGN.md**](./DESIGN.md) | Design system and token reference |
| [**CONSUMING.md**](./CONSUMING.md) | How to use in your app |
| [**CHANGELOG.md**](./CHANGELOG.md) | Version history |

## Try It Out

### Interactive Playground

```bash
npm run dev
# Opens http://localhost:3000
# Visit /playground for interactive examples
```

### Storybook (Component Development)

```bash
npm run storybook
# Opens http://localhost:6006
```

### Run Locally

```bash
git clone https://github.com/geraldfegalan/squid-lib.git
cd squid-lib/component-lib-frontend
npm install
npm run dev
```

## Usage Patterns

### Form with Validation

```tsx
import {
  FormField,
  Input,
  Button,
  type InputProps,
} from "squid-lib-frontend/components/ui";
import {
  emailFieldSchema,
  safeParseForm,
  loginFormSchema,
  type LoginFormValues,
} from "squid-lib-frontend/validation";
import { useState } from "react";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = safeParseForm(loginFormSchema, formData);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    try {
      await loginUser(result.data);
    } catch (error) {
      setErrors({ submit: "Login failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email" error={errors.email} required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          fieldStatus={errors.email ? "error" : "default"}
        />
      </FormField>

      <FormField label="Password" error={errors.password} required>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          fieldStatus={errors.password ? "error" : "default"}
        />
      </FormField>

      {errors.submit && <div className="ui-field-error">{errors.submit}</div>}

      <Button type="submit" className="mt-4">
        Login
      </Button>
    </form>
  );
}
```

### Custom Theme

Override CSS variables:

```css
:root {
  --color-primary: #3b82f6;
  --color-surface-field: #ffffff;
  --color-text-primary: #1f2937;
  --border-radius-md: 0.5rem;
  --font-size-base: 1rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-page: #1f2937;
    --color-surface-field: #111827;
    --color-text-primary: #f3f4f6;
  }
}
```

See [DESIGN.md](./DESIGN.md) for all token names.

## Development

### Start Development Server

```bash
npm run dev
```

Available routes:
- `/` — Home
- `/docs` — Component documentation
- `/playground` — Interactive playground
- `/templates` — Template examples
- `/theme` — Theme editor
- `/changelog` — Version history

### Build for Production

```bash
npm run build
```

### Quality Checks

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build
npm run build

# Storybook
npm run storybook
```

## Publishing

### Publish to npm

```bash
npm version patch  # or minor, major
npm publish
```

### Prepare Release

1. Update [CHANGELOG.md](./CHANGELOG.md)
2. Run all quality checks
3. Create git tag
4. Publish to npm

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- How to report bugs
- How to submit pull requests
- Coding standards
- Design system guidelines

## Community

- 🐛 [Report Issues](https://github.com/geraldfegalan/squid-lib/issues)
- 💬 [Discussions](https://github.com/geraldfegalan/squid-lib/discussions)
- 📖 [Docs](https://github.com/geraldfegalan/squid-lib/blob/main/README.md)

## Support

Need help?

1. Check the [documentation](./INSTALLATION.md)
2. See [EXAMPLES.md](./EXAMPLES.md)
3. Review [API.md](./API.md)
4. Visit `/docs` page in development
5. Open an issue on GitHub
