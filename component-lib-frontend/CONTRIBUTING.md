# Contributing to squid-lib-frontend

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Basic understanding of React and TypeScript

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/your-username/squid-lib.git
cd squid-lib/component-lib-frontend

# Add upstream remote
git remote add upstream https://github.com/geraldfegalan/squid-lib.git
```

### Install and Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the development environment.

## Development Workflow

### 1. Create a Branch

Use a descriptive branch name:

```bash
git checkout -b feature/add-date-picker
git checkout -b fix/button-hover-state
git checkout -b docs/update-readme
```

### 2. Make Changes

Follow the project standards:

- **Code style** — Follow ESLint rules
- **Types** — Use TypeScript, avoid `any`
- **Components** — Follow the [DEVELOPMENT.md](./DEVELOPMENT.md) guide
- **Tests** — Update tests as needed
- **Documentation** — Document new features

### 3. Commit Changes

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "feat: add date picker component with keyboard support"
git commit -m "fix: resolve button focus state in dark mode"
git commit -m "docs: update component API documentation"

# Follow conventional commits format
# feat: new feature
# fix: bug fix
# docs: documentation
# style: code style (formatting)
# test: add tests
# chore: maintenance
```

### 4. Test Your Changes

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build
npm run build

# Start Storybook for component testing
npm run storybook
```

All checks must pass before submitting a pull request.

### 5. Push and Create Pull Request

```bash
git push origin feature/add-date-picker
```

Visit GitHub and create a pull request. Fill out the PR template completely.

## Code Standards

### Component Files

Follow the structure from [code-file-layout.mdc](./.cursor/rules/code-file-layout.mdc):

```tsx
/**
 * ComponentName description
 *
 * Features:
 * - Feature one
 * - Feature two
 */

import type { FC, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import styles from "../styles";
import type { MyProp } from "@/types/fields";

// ============ TYPES ============
export type ComponentNameProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

// ============ COMPONENT ============
export const ComponentName: FC<ComponentNameProps> = ({
  variant = "primary",
  size = "md",
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(styles.base, styles[variant], styles.size[size], className)}
      {...rest}
    />
  );
};
```

### CSS Standards

- Use **CSS variables** from `tokens.css`, no hardcoded colors
- Apply **`ui-*` classes** for consistency
- Support **responsive design** with mobile-first approach
- Support **dark mode** with `@media (prefers-color-scheme: dark)`

Example:

```css
.ui-my-component {
  padding: var(--space-md);
  background: var(--color-surface-field);
  border-radius: var(--border-radius-md);
  color: var(--color-text-primary);
}

.ui-my-component--dark {
  background: var(--color-surface-dark);
  color: var(--color-text-primary-dark);
}

@media (max-width: 640px) {
  .ui-my-component {
    padding: var(--space-sm);
  }
}
```

### TypeScript Best Practices

- Use strict mode (default in project)
- Export types alongside components
- Use `type` for types, `interface` for objects only
- Avoid `any`, use `unknown` if needed
- Use utility types: `Partial<T>`, `Pick<T>`, `Record<K, V>`

```tsx
// Good
export type ButtonProps = HTMLButtonElement & {
  variant: "primary" | "secondary";
};

export interface ButtonConfig {
  variants: Record<string, string>;
}

// Avoid
export type BadProps = {
  onClick: any;
  className: any;
};
```

### Accessibility Requirements

- Use semantic HTML (`button`, `input`, `label`, etc.)
- Include `aria-*` attributes where needed
- Ensure proper focus management
- Support keyboard navigation
- Check contrast ratios (WCAG AA minimum)
- Test with screen readers

Example:

```tsx
<button
  className={buttonClasses}
  aria-pressed={isActive}
  aria-label={label}
  aria-describedby={descriptionId}
>
  {children}
</button>
```

## Creating New Components

### Step 1: Plan & Document

1. Create an issue describing the component
2. Wait for feedback before implementing
3. Sketch the API and props

### Step 2: Create Component File

```bash
mkdir -p src/components/ui/my-component
touch src/components/ui/my-component/MyComponent.tsx
touch src/components/ui/my-component/index.ts
```

### Step 3: Implement Component

Follow the component template above. Include:
- Clear JSDoc comments
- TypeScript types for all props
- Proper accessibility attributes
- CSS class application via styles helper

### Step 4: Add Styles

Create `styles/components/my-component.css`:

```css
.ui-my-component {
  /* Base styles */
}

.ui-my-component--variant-primary {
  /* Variant specific */
}

@media (prefers-color-scheme: dark) {
  .ui-my-component {
    /* Dark mode styles */
  }
}
```

Update `styles/index.css` to import the new CSS.

### Step 5: Add Storybook Story

Create `src/stories/MyComponent.stories.ts`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "@/components/ui";

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
} satisfies Meta<typeof MyComponent>;

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
    children: "Secondary",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};
```

### Step 6: Update Exports

Add to `src/components/ui/index.ts`:

```ts
export { MyComponent, type MyComponentProps } from "./my-component";
```

### Step 7: Document

Add to `src/site/docs-nav.ts` and create documentation in `docs-content.tsx`.

### Step 8: Test

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run storybook
```

## Fixing Bugs

1. Create an issue describing the bug with reproduction steps
2. Create a branch: `git checkout -b fix/bug-name`
3. Write a test that reproduces the bug
4. Fix the bug
5. Verify the test passes
6. Submit a pull request with the fix and test

## Improving Documentation

Documentation is as important as code. To improve docs:

1. Fix typos and unclear sections
2. Add missing information
3. Improve examples
4. Update API references if components change

Documentation files:

- `README.md` — Overview and quick start
- `INSTALLATION.md` — Setup and installation
- `API.md` — Component and utility reference
- `VALIDATION.md` — Form validation patterns
- `DEVELOPMENT.md` — Developer guide
- `EXAMPLES.md` — Code examples and recipes
- `DESIGN.md` — Design system reference
- `CONTRIBUTING.md` — This file

## Pull Request Process

### Before Submitting

1. **Update main** from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test everything**:
   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   npm run storybook
   ```

3. **Update documentation** if needed

4. **Add tests** if applicable

### PR Checklist

- [ ] Branch is up to date with main
- [ ] Code passes linting (`npm run lint`)
- [ ] Types pass (`npx tsc --noEmit`)
- [ ] Build succeeds (`npm run build`)
- [ ] Storybook stories added/updated
- [ ] Documentation updated
- [ ] Commit messages follow conventional commits
- [ ] No breaking changes (or noted in description)

### PR Description Template

```markdown
## Description
Brief explanation of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots (if applicable)
Before/after screenshots.

## Related Issues
Closes #123

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No new warnings
```

## Review Process

1. At least one maintainer review required
2. Address feedback and suggestions
3. Maintainer will merge when approved

## Release Process

Maintainers only:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push to GitHub
5. Publish to npm: `npm publish`

## Questions?

- Check existing issues and discussions
- Open a new discussion for questions
- Review [DEVELOPMENT.md](./DEVELOPMENT.md)

## Code of Conduct

Be respectful and constructive. We value:
- Inclusive environment
- Professional communication
- Focus on code, not personal attacks
- Willingness to learn and help others

Thank you for contributing! 🎉
