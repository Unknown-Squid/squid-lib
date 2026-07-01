# Form Validation Guide

Comprehensive guide to form validation using squid-lib-frontend with Zod schemas.

## Overview

Form validation in squid-lib-frontend is built on:

- **Zod** — Runtime schema validation library
- **TypeScript** — Static type checking
- **FormField** — UI component for displaying field status
- **Validation utilities** — Helper functions for parsing and formatting errors

## Validation Schemas

### Pre-built Field Schemas

Common field validation patterns are available:

```tsx
import {
  emailFieldSchema,
  passwordFieldSchema,
  phoneFieldSchema,
  requiredTextField,
  optionalTextAreaSchema,
} from "squid-lib-frontend/validation";

// Email validation
const email = emailFieldSchema.parse("user@example.com");

// Password validation
const password = passwordFieldSchema.parse("SecurePass123!");

// Phone validation
const phone = phoneFieldSchema.parse("+1 (555) 123-4567");

// Required text (min 1 character)
const name = requiredTextField.parse("John");

// Optional textarea
const bio = optionalTextAreaSchema.parse(""); // OK — optional
```

### Pre-built Form Schemas

Combine fields into complete form schemas:

```tsx
import { loginFormSchema, type LoginFormValues } from "squid-lib-frontend/validation";

// Create form schema
const formSchema = loginFormSchema;

// Type inference
type FormData = LoginFormValues;

// Validate entire form
try {
  const data = formSchema.parse({
    email: "user@example.com",
    password: "SecurePass123!",
  });
  console.log("Valid:", data);
} catch (error) {
  console.error("Invalid:", error);
}
```

**Available form schemas:**

- `loginFormSchema` — Email + password
- `registrationFormSchema` — Email + password + confirm password
- `profileFormSchema` — Name + bio + settings

## Creating Custom Schemas

### Simple Field Schema

```tsx
import { z } from "zod";

// Username: required, 3-20 chars, alphanumeric only
export const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be less than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

export type Username = z.infer<typeof usernameSchema>;
```

### Complex Field Schema

```tsx
// URL with protocol validation
export const urlSchema = z
  .string()
  .url("Must be a valid URL")
  .refine(
    (url) => url.startsWith("https://"),
    "Must use HTTPS protocol"
  );

// Age with custom logic
export const ageSchema = z
  .number()
  .int("Age must be a whole number")
  .min(18, "Must be 18 or older")
  .max(120, "Please enter a realistic age");
```

### Conditional Validation

```tsx
// Terms: only required if "subscribe" is true
export const signupSchema = z.object({
  email: emailFieldSchema,
  subscribe: z.boolean(),
  terms: z.boolean().optional(),
}).refine(
  (data) => !data.subscribe || data.terms,
  {
    message: "You must accept terms to subscribe",
    path: ["terms"],
  }
);
```

### Dependent Field Validation

```tsx
// Passwords must match
export const passwordChangeSchema = z.object({
  currentPassword: passwordFieldSchema,
  newPassword: passwordFieldSchema,
  confirmPassword: z.string().min(1, "Please confirm password"),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
```

## Validation in Forms

### Single Field Validation

Validate individual field values as users type:

```tsx
import { validateFieldValue, emailFieldSchema } from "squid-lib-frontend/validation";
import { useState } from "react";
import { FormField, Input } from "squid-lib-frontend/components/ui";

export function EmailInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setError("Email is required");
      setSuccess(false);
      return;
    }

    const result = validateFieldValue(emailFieldSchema, value);
    
    if (result.error) {
      setError(result.message);
      setSuccess(false);
    } else {
      setError(undefined);
      setSuccess(true);
    }
  };

  return (
    <FormField
      label="Email"
      error={error}
      success={success ? "Email looks good!" : undefined}
      required
    >
      <Input
        type="email"
        value={email}
        onChange={handleChange}
        fieldStatus={error ? "error" : success ? "success" : "default"}
      />
    </FormField>
  );
}
```

### Form Submission Validation

Validate entire form on submit:

```tsx
import { safeParseForm, loginFormSchema, type LoginFormValues } from "squid-lib-frontend/validation";
import { useState } from "react";
import { FormField, Input, Button } from "squid-lib-frontend/components/ui";

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const result = safeParseForm(loginFormSchema, formData);

    if (!result.success) {
      setErrors(result.errors);
      setIsSubmitting(false);
      return;
    }

    // Form is valid, submit
    try {
      await login(result.data);
      console.log("Login successful!");
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Email"
        error={errors.email}
        required
      >
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fieldStatus={errors.email ? "error" : "default"}
        />
      </FormField>

      <FormField
        label="Password"
        error={errors.password}
        required
      >
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          fieldStatus={errors.password ? "error" : "default"}
        />
      </FormField>

      {errors.submit && (
        <div className="ui-field-error">{errors.submit}</div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
```

## Advanced Validation

### Async Validation

Validate against server (e.g., check if username is available):

```tsx
const usernameSchema = z
  .string()
  .min(3, "Too short")
  .refine(
    async (username) => {
      const response = await fetch(`/api/check-username?u=${username}`);
      const { available } = await response.json();
      return available;
    },
    "Username already taken"
  );

// Usage
const checkUsername = async (username: string) => {
  try {
    const result = await usernameSchema.parseAsync(username);
    setSuccess("Username available!");
  } catch (error) {
    setError(error.message);
  }
};
```

### Array Validation

Validate lists of items:

```tsx
// Array of emails
const emailListSchema = z
  .array(emailFieldSchema)
  .min(1, "At least one email required")
  .max(10, "Maximum 10 emails");

// Array of objects
const itemsSchema = z.array(
  z.object({
    name: requiredTextField,
    quantity: z.number().int().min(1),
  })
);
```

### Discriminated Union

Validate different shapes based on a discriminator field:

```tsx
const paymentSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("credit_card"),
    cardNumber: z.string().regex(/^\d{16}$/),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/),
  }),
  z.object({
    method: z.literal("paypal"),
    email: emailFieldSchema,
  }),
]);
```

## Error Handling

### Format Zod Errors

Convert Zod validation errors to field-by-field error map:

```tsx
import { formatZodFormErrors } from "squid-lib-frontend/validation";
import { z } from "zod";

const schema = z.object({
  email: emailFieldSchema,
  name: requiredTextField,
});

try {
  schema.parse({ email: "invalid", name: "" });
} catch (error) {
  if (error instanceof z.ZodError) {
    const fieldErrors = formatZodFormErrors(error);
    console.log(fieldErrors);
    // Output:
    // {
    //   email: "Invalid email address",
    //   name: "This field is required"
    // }
  }
}
```

### Display Error Messages

Use `formFieldMessages` for consistent error display:

```tsx
import { formFieldMessages } from "squid-lib-frontend/validation";

// Get field-specific messages
const messages = formFieldMessages();
console.log(messages.email.invalid_email);  // "Invalid email address"
console.log(messages.password.too_short);   // "Password too short"
```

### Custom Error Messages

Override validation messages:

```tsx
const emailSchema = emailFieldSchema
  .refine(
    (email) => !email.includes("+"),
    "Email aliases not allowed"
  );

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters for security");
```

## Best Practices

### 1. Validate Early, Validate Often

- **As they type** — Provide instant feedback
- **On blur** — Confirm field is valid before moving to next
- **On submit** — Final comprehensive validation

```tsx
const [touched, setTouched] = useState(false);

<Input
  onBlur={() => setTouched(true)}
  fieldStatus={
    touched && error ? "error" : success ? "success" : "default"
  }
/>
```

### 2. Show Progressive Validation

Use `fieldStatus` to communicate validation state:

```tsx
<FormField
  label="Password"
  success={password.length >= 12 ? "Strong password!" : undefined}
  error={touched && error ? error : undefined}
  warning={password.length > 0 && password.length < 8 ? "Weak password" : undefined}
>
  <Input type="password" />
</FormField>
```

### 3. Prevent Invalid Submissions

Disable submit button if form is invalid:

```tsx
const isValid = formSchema.safeParse(formData).success;

<Button type="submit" disabled={!isValid || isSubmitting}>
  Submit
</Button>
```

### 4. Handle Server Errors

Map server validation errors to form fields:

```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/submit", { method: "POST", body: JSON.stringify(formData) });
    if (!response.ok) {
      const serverErrors = await response.json();
      setErrors(serverErrors.fieldErrors || {});
    }
  } catch (error) {
    setErrors({ submit: "Network error" });
  }
};
```

### 5. Debounce Async Validation

For expensive operations (API calls), add debouncing:

```tsx
import { useEffect, useCallback } from "react";

const [validating, setValidating] = useState(false);
const timeoutRef = useRef<NodeJS.Timeout>();

const validateAsync = useCallback((value: string) => {
  clearTimeout(timeoutRef.current);
  setValidating(true);

  timeoutRef.current = setTimeout(async () => {
    const result = validateFieldValue(usernameSchema, value);
    setValidating(false);
  }, 300); // Wait 300ms after user stops typing
}, []);
```

## Testing Validation

### Unit Test Example

```tsx
import { emailFieldSchema } from "squid-lib-frontend/validation";

describe("emailFieldSchema", () => {
  it("accepts valid emails", () => {
    expect(() => emailFieldSchema.parse("user@example.com")).not.toThrow();
  });

  it("rejects invalid emails", () => {
    expect(() => emailFieldSchema.parse("invalid")).toThrow();
  });

  it("rejects empty string", () => {
    expect(() => emailFieldSchema.parse("")).toThrow();
  });
});
```

## Troubleshooting

### "Schema contains async validators"

If using async validators, use `parseAsync` instead of `parse`:

```tsx
// ❌ Wrong
const result = schema.parse(data);

// ✅ Correct
const result = await schema.parseAsync(data);
```

### "Validation error message is unclear"

Add custom error messages:

```tsx
emailFieldSchema.refine(
  (email) => email.length < 255,
  { message: "Email address is too long" }
);
```

### "Form state gets out of sync"

Keep validation state separate from form data:

```tsx
// ✅ Good pattern
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({...});
const [touched, setTouched] = useState({...});

// ❌ Avoid mixing
const [formState, setFormState] = useState({
  data: {...},
  errors: {...}, // Gets out of sync easily
});
```

## Resources

- [Zod Documentation](https://zod.dev)
- [API Reference](./API.md) — Validation utility APIs
- [EXAMPLES.md](./EXAMPLES.md) — Complete form examples
- See `/playground` for interactive examples
