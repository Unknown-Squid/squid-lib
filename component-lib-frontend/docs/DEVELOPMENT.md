# Development Guide

Instructions for setting up the development environment and contributing to squid-lib-frontend.

## Prerequisites

- Node.js 18+
- npm 9+ or yarn
- Git

## Getting Started

### Clone and Install

```bash
git clone https://github.com/geraldfegalan/squid-lib.git
cd squid-lib/component-lib-frontend
npm install
```

### Project Structure

```
component-lib-frontend/
├── src/
│   ├── components/ui/          # React UI components
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── validation/             # Zod schemas and validation
│   ├── types/                  # TypeScript type definitions
│   ├── site/                   # Documentation and demo pages
│   └── stories/                # Storybook stories
├── styles/
│   ├── tokens.css              # Design tokens (CSS variables)
│   ├── fields/                 # Form field styles
│   ├── components/             # Component-specific styles
│   └── globals.css             # Global styles
├── app/                        # Next.js app directory
├── public/                     # Static assets
└── package.json
```

## Development Commands

### Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:3000` with:
- Documentation (`/docs`)
- Component playground (`/playground`)
- Theme editor (`/theme`)
- Templates (`/templates`)

### Build for Production

```bash
npm run build
```

Verifies:
- TypeScript compilation
- Next.js build
- All pages generate correctly

### Storybook (Component Testing)

```bash
npm run storybook
```

Isolated component development at `http://localhost:6006`

### Type Checking

```bash
npx tsc --noEmit
```

Verify TypeScript types without emitting files.

### Linting

```bash
npm run lint
```

ESLint checks code quality.

## Creating New Components

### Follow the Component Creation Pattern

1. Create component file in `src/components/ui/<component-name>/`
2. Export from `src/components/ui/index.ts`
3. Add Storybook story in `src/stories/`
4. Add documentation to `/docs` page
5. Add CSS in `styles/components/` or `styles/fields/`

### Example: New Button Variant

**File: `src/components/ui/button/MyVariant.tsx`**

```tsx
/**
 * MyVariant component description.
 * 
 * Features:
 * - Feature one
 * - Feature two
 */

import { cn } from "@/utils/cn";
import styles from "../styles";
import type { FC, ButtonHTMLAttributes } from "react";

export interface MyVariantProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

/**
 * MyVariant — a specialized button component.
 */
export const MyVariant: FC<MyVariantProps> = ({
  variant = "primary",
  size = "md",
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        styles.button.base,
        styles.button.variant[variant],
        styles.button.size[size],
        className
      )}
      {...rest}
    />
  );
};
```

### Design System Guidelines

Follow these rules when creating components:

1. **Use CSS Variables** — No hardcoded colors. Use tokens from `styles/tokens.css`
2. **Apply UI Classes** — Use `ui-*` class names from `styles/`
3. **Mobile First** — Use `width: 100%`, `min-width: 0` for responsive fields
4. **Accessibility** — Use semantic HTML, proper `aria-*` attributes, focus management
5. **TypeScript** — Strict types, no `any`
6. **Props Last** — In `cn()`, put component `className` last so hosts can override

### Storybook Story Example

**File: `src/stories/MyVariant.stories.ts`**

```ts
import type { Meta, StoryObj } from "@storybook/react";
import { MyVariant } from "@/components/ui";

const meta = {
  title: "Components/MyVariant",
  component: MyVariant,
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof MyVariant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary action",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};
```

## Adding CSS Styles

### Token-Driven Design

1. **Add CSS variables to `styles/tokens.css`:**

```css
--color-my-new-color: #...;
--size-my-new-size: ...;
```

2. **Create component-specific CSS:**

```css
/* styles/components/my-component.css */
.ui-my-component {
  color: var(--color-my-new-color);
  padding: var(--size-my-new-size);
}
```

3. **Import in `styles/index.css`:**

```css
@import "./components/my-component.css";
```

### Mobile Responsiveness

Use media queries for responsive design:

```css
.ui-my-component {
  width: 100%;
  font-size: var(--font-size-sm);
}

@media (min-width: 640px) {
  .ui-my-component {
    font-size: var(--font-size-base);
  }
}
```

## Form Validation

### Adding Zod Schemas

**File: `src/validation/schemas/fields.ts`**

```ts
import { z } from "zod";

export const myFieldSchema = z
  .string()
  .min(1, "This field is required")
  .max(100, "Must be less than 100 characters");

export type MyFieldValue = z.infer<typeof myFieldSchema>;
```

**File: `src/validation/schemas/forms.ts`**

```ts
import { myFieldSchema } from "./fields";

export const myFormSchema = z.object({
  myField: myFieldSchema,
});

export type MyFormValues = z.infer<typeof myFormSchema>;
```

## Documentation

### Adding Component Documentation

1. Add section to `src/site/docs-content.tsx`
2. Update `src/site/docs-nav.ts` with navigation entry
3. Document props, usage examples, validation patterns
4. Include accessibility notes

### Markdown Guidelines

Follow `rules/ai-doc-standard.mdc` for markdown:
- Clear headings
- Code examples
- Cross-references
- Search-friendly content

## Testing & Quality

### Before Committing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build
```

### Storybook A11y Testing

Storybook includes accessibility (a11y) add-on:

1. Run Storybook
2. Click "a11y" tab
3. Check for violations
4. Fix issues in component or styles

### Browser Testing

Test on multiple devices:
- Desktop (Chrome, Firefox, Safari)
- Mobile (iOS Safari, Android Chrome)
- Dark mode (toggle in `/theme`)

## Common Tasks

### Add a new export

1. Create the file in appropriate folder
2. Export from module's `index.ts` (e.g., `src/components/ui/index.ts`)
3. Update `package.json` exports if it's a new entry point
4. Document in this guide

### Update styles/tokens.css

1. Make changes to `styles/tokens.css`
2. Verify all components still look correct
3. Update `DESIGN.md` if adding new tokens
4. Test dark mode

### Update dependencies

```bash
npm update
npm audit fix
npm run build
```

Commit `package-lock.json` after updates.

## Troubleshooting

### `npm run dev` fails

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Type errors in VS Code

```bash
# Reload TypeScript
npx tsc --noEmit

# Restart VS Code
```

### Storybook not updating

```bash
# Clear cache
rm -rf .storybook/cache
npm run storybook
```

## Publishing

See [CONSUMING.md](./CONSUMING.md) for distribution information and npm publishing details.

## Code of Conduct

Be respectful. Follow the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## Need Help?

- Check [EXAMPLES.md](./EXAMPLES.md) for usage patterns
- Review existing components for patterns
- Check [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for phase status
- See `.cursor/rules` for design system guidelines
