# API Reference

Complete component and utility API documentation for squid-lib-frontend.

## Table of Contents

1. [Form Components](#form-components)
2. [UI Components](#ui-components)
3. [Composite Components](#composite-components)
4. [Hooks](#hooks)
5. [Utilities](#utilities)
6. [Types](#types)

---

## Form Components

Form components are designed to work with validation and form handling.

### Input

Text input field with optional leading icon.

```tsx
import { Input } from "squid-lib-frontend/components/ui";

<Input
  type="email"
  placeholder="Enter email"
  size="md"
  disabled={false}
  error={false}
  fieldStatus="default"
  leadingIcon={<IconEmail />}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `error` | `boolean` | - | Mark field as error (deprecated, use `fieldStatus`) |
| `fieldStatus` | `FieldStatus` | `"default"` | Field status: `default`, `error`, `success`, `warning` |
| `disabled` | `boolean` | - | Disable the input |
| `leadingIcon` | `ReactNode` | - | Icon displayed before input text |
| `aria-invalid` | `boolean` | - | HTML aria attribute |
| `...rest` | `InputHTMLAttributes` | - | Standard HTML input attributes |

### Textarea

Multi-line text input.

```tsx
import { Textarea } from "squid-lib-frontend/components/ui";

<Textarea
  placeholder="Enter message"
  size="md"
  rows={4}
  fieldStatus="default"
  disabled={false}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Textarea size |
| `rows` | `number` | - | Number of rows |
| `fieldStatus` | `FieldStatus` | `"default"` | Field status |
| `disabled` | `boolean` | - | Disable the textarea |
| `...rest` | `TextareaHTMLAttributes` | - | Standard HTML textarea attributes |

### Select

Dropdown selection field.

```tsx
import { Select } from "squid-lib-frontend/components/ui";

<Select
  size="md"
  fieldStatus="default"
  disabled={false}
>
  <option value="">-- Select --</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Select size |
| `fieldStatus` | `FieldStatus` | `"default"` | Field status |
| `disabled` | `boolean` | - | Disable the select |
| `...rest` | `SelectHTMLAttributes` | - | Standard HTML select attributes |

### Checkbox

Single checkbox control.

```tsx
import { Checkbox } from "squid-lib-frontend/components/ui";

<Checkbox
  checked={true}
  onChange={(e) => console.log(e.target.checked)}
  disabled={false}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Checked state |
| `disabled` | `boolean` | - | Disable the checkbox |
| `...rest` | `InputHTMLAttributes` | - | Standard HTML input attributes |

### RadioGroup

Group of radio buttons.

```tsx
import { RadioGroup, Radio } from "squid-lib-frontend/components/ui";

<RadioGroup name="option" value={selected} onChange={setSelected}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Radio group name |
| `value` | `string` | - | Selected value |
| `onChange` | `(value: string) => void` | - | Change handler |
| `children` | `ReactNode` | - | Radio options |

### Switch

Toggle switch input.

```tsx
import { Switch } from "squid-lib-frontend/components/ui";

<Switch
  checked={true}
  onChange={(e) => console.log(e.target.checked)}
  disabled={false}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Checked state |
| `disabled` | `boolean` | - | Disable the switch |
| `...rest` | `InputHTMLAttributes` | - | Standard HTML input attributes |

### FileInput

File selection input.

```tsx
import { FileInput } from "squid-lib-frontend/components/ui";

<FileInput
  accept="image/*"
  multiple={false}
  size="md"
  fieldStatus="default"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accept` | `string` | - | Accepted file types |
| `multiple` | `boolean` | - | Allow multiple files |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `fieldStatus` | `FieldStatus` | `"default"` | Field status |
| `...rest` | `InputHTMLAttributes` | - | Standard HTML input attributes |

### PasswordField

Specialized password input with show/hide toggle.

```tsx
import { PasswordField } from "squid-lib-frontend/components/ui";

<PasswordField
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  size="md"
  fieldStatus="default"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current password value |
| `onChange` | `ChangeEventHandler` | - | Change handler |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Field size |
| `fieldStatus` | `FieldStatus` | `"default"` | Field status |
| `...rest` | `InputHTMLAttributes` | - | Standard HTML input attributes |

### FormField

Layout wrapper for form fields with label, status badges, and helper text.

```tsx
import { FormField, Input } from "squid-lib-frontend/components/ui";

<FormField
  label="Email"
  htmlFor="email-input"
  description="We'll never share your email"
  required
  requiredIndicator="*"
>
  <Input id="email-input" type="email" />
</FormField>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | **required** | Field label text |
| `htmlFor` | `string` | - | Associates label with input (auto-generated if not provided) |
| `description` | `ReactNode` | - | Helper text below the field |
| `error` | `ReactNode` | - | Error message (shows red badge) |
| `success` | `ReactNode` | - | Success message (shows green badge) |
| `warning` | `ReactNode` | - | Warning message (shows yellow badge) |
| `info` | `ReactNode` | - | Info message (shows blue badge) |
| `required` | `boolean` | - | Mark as required |
| `requiredIndicator` | `ReactNode \| boolean` | - | Required indicator text or `true` for default `*` |
| `labelAssociation` | `"htmlFor" \| "aria-labelledby"` | `"htmlFor"` | How to associate label with input |
| `children` | `ReactElement` | **required** | Form control element |
| `labelClassName` | `string` | - | CSS class for label |
| `className` | `string` | - | CSS class for wrapper |

---

## UI Components

### Button

Action button with variants and sizes.

```tsx
import { Button } from "squid-lib-frontend/components/ui";

<Button
  variant="primary"
  size="md"
  iconOnly={false}
  disabled={false}
>
  Click me
</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"primary"` | Button variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `iconOnly` | `boolean` | `false` | Icon-only button (minimal padding) |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Button type |
| `disabled` | `boolean` | - | Disable the button |
| `children` | `ReactNode` | - | Button content |
| `...rest` | `ButtonHTMLAttributes` | - | Standard HTML button attributes |

**Variants:**

- `primary` — Primary action (filled with primary color)
- `secondary` — Secondary action (outline style)
- `danger` — Destructive action (warning color)
- `ghost` — Minimal style (text only)

### Badge

Small labeled component for status or category.

```tsx
import { Badge } from "squid-lib-frontend/components/ui";

<Badge variant="primary" size="md">
  New
</Badge>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info"` | `"primary"` | Badge variant |
| `size` | `"sm" \| "md"` | `"md"` | Badge size |
| `children` | `ReactNode` | - | Badge content |

### Label

Form field label with required indicator support.

```tsx
import { Label } from "squid-lib-frontend/components/ui";

<Label htmlFor="name-input" required>
  Name
</Label>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | Associates with input via id |
| `required` | `boolean` | - | Show required indicator |
| `requiredIndicator` | `ReactNode` | - | Custom required indicator |
| `children` | `ReactNode` | - | Label text |
| `className` | `string` | - | CSS class |

### HelperText

Descriptive text below form fields.

```tsx
import { HelperText } from "squid-lib-frontend/components/ui";

<HelperText>We'll never share your email</HelperText>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Helper text content |
| `className` | `string` | - | CSS class |

### FieldError

Error message display for form fields.

```tsx
import { FieldError } from "squid-lib-frontend/components/ui";

<FieldError>This field is required</FieldError>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Error message |
| `className` | `string` | - | CSS class |

---

## Composite Components

### AlertDialog

Accessible alert dialog for confirmations or alerts.

```tsx
import { AlertDialog } from "squid-lib-frontend/components/ui";

<AlertDialog
  title="Delete Item"
  description="Are you sure? This cannot be undone."
  actionLabel="Delete"
  cancelLabel="Cancel"
  variant="danger"
  onAction={handleDelete}
  onCancel={handleCancel}
  open={isOpen}
  onOpenChange={setIsOpen}
>
  <button onClick={() => setIsOpen(true)}>Delete</button>
</AlertDialog>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **required** | Dialog title |
| `description` | `string` | - | Dialog description |
| `actionLabel` | `string` | **required** | Action button label |
| `cancelLabel` | `string` | `"Cancel"` | Cancel button label |
| `variant` | `"default" \| "danger"` | `"default"` | Dialog variant |
| `onAction` | `() => void` | **required** | Action button handler |
| `onCancel` | `() => void` | - | Cancel handler |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Open state change handler |
| `children` | `ReactNode` | - | Trigger element |

### Toast

Notification popup using toast system.

```tsx
import { useToast } from "squid-lib-frontend/hooks";

const { showToast } = useToast();

showToast({
  message: "Item saved!",
  variant: "success",
  duration: 3000,
});
```

**Methods:**

| Method | Parameters | Description |
|--------|------------|-------------|
| `showToast` | `ToastMessage` | Show a toast notification |

**ToastMessage:**

```ts
type ToastMessage = {
  message: string;
  variant?: "success" | "error" | "info" | "warning";
  duration?: number; // milliseconds, default 3000
  action?: {
    label: string;
    onClick: () => void;
  };
};
```

**Setup:** Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from "squid-lib-frontend/components/ui";

export default function App() {
  return (
    <ToastProvider>
      {/* Your app */}
    </ToastProvider>
  );
}
```

### Stepper

Multi-step progress indicator.

```tsx
import { Stepper } from "squid-lib-frontend/components/ui";

<Stepper
  steps={["Step 1", "Step 2", "Step 3"]}
  currentIndex={1}
  onStepClick={(index) => setCurrentIndex(index)}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `string[]` | **required** | Array of step labels |
| `currentIndex` | `number` | **required** | Current active step (0-indexed) |
| `onStepClick` | `(index: number) => void` | - | Step click handler |
| `variant` | `"default" \| "compact"` | `"default"` | Stepper variant |

---

## Hooks

### useMounted

Hook to check if component is mounted (client-side).

```tsx
import { useMounted } from "squid-lib-frontend/hooks";

function MyComponent() {
  const isMounted = useMounted();
  
  if (!isMounted) return null;
  
  return <div>Client-side content</div>;
}
```

**Returns:** `boolean` — `true` if mounted, `false` during SSR.

### useToast

Hook for showing toast notifications.

```tsx
import { useToast } from "squid-lib-frontend/hooks";

const { showToast } = useToast();

showToast({
  message: "Success!",
  variant: "success",
});
```

**Returns:**

```ts
{
  showToast: (message: ToastMessage) => void;
}
```

---

## Utilities

### cn (classNames)

Utility for combining CSS class names conditionally.

```tsx
import { cn } from "squid-lib-frontend/utils";

const className = cn(
  "base-class",
  isActive && "active-class",
  { "conditional-class": condition }
);
```

### validateFieldValue

Validate a single field value against a schema.

```tsx
import { validateFieldValue, emailFieldSchema } from "squid-lib-frontend/validation";

const result = validateFieldValue(
  emailFieldSchema,
  "user@example.com"
);

if (result.error) {
  console.error(result.message);
} else {
  console.log("Valid email:", result.value);
}
```

**Returns:**

```ts
type FieldValidationResult = 
  | { success: true; value: unknown; error?: never }
  | { success: false; message: string; error: ZodError };
```

### safeParseForm

Parse form data with Zod schema.

```tsx
import { safeParseForm, loginFormSchema } from "squid-lib-frontend/validation";

const result = safeParseForm(loginFormSchema, formData);

if (!result.success) {
  console.error(result.errors); // Field errors
} else {
  console.log(result.data); // Validated data
}
```

### formatZodFormErrors

Convert Zod validation errors to field error map.

```tsx
import { formatZodFormErrors } from "squid-lib-frontend/validation";

const errors = formatZodFormErrors(zodError);
// Returns: { fieldName: "Error message", ... }
```

---

## Types

### FieldStatus

State of a form field.

```ts
type FieldStatus = "default" | "error" | "success" | "warning" | "info";
```

### FieldSize

Size variants for form fields.

```ts
type FieldSize = "sm" | "md" | "lg";
```

### ButtonVariant

Button style variants.

```ts
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
```

### BaseFieldControlProps

Props shared by form control components.

```ts
type BaseFieldControlProps = {
  size?: FieldSize;
  error?: boolean;
  fieldStatus?: FieldStatus;
  disabled?: boolean;
};
```

---

## CSS Classes

For vanilla HTML or custom styling, these CSS classes are available:

### Form Fields

| Class | Purpose |
|-------|---------|
| `.ui-field-control` | Base field styling |
| `.ui-input` | Input-specific styling |
| `.ui-textarea` | Textarea-specific styling |
| `.ui-select` | Select-specific styling |
| `.ui-field-control--error` | Error state |
| `.ui-field-control--success` | Success state |
| `.ui-field-control--warning` | Warning state |

### Components

| Class | Purpose |
|-------|---------|
| `.ui-button` | Button base |
| `.ui-button--primary` | Primary button |
| `.ui-button--secondary` | Secondary button |
| `.ui-badge` | Badge |
| `.ui-label` | Label |
| `.ui-helper-text` | Helper text |
| `.ui-form-field` | Form field wrapper |

---

## Migration Guide

### From v0.0.x to v0.1.0+

- `error` prop on field components is deprecated; use `fieldStatus="error"` instead
- Component exports are now under `squid-lib-frontend/components/ui` path
- CSS must be imported in the correct order (tokens → fields → components)

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.
