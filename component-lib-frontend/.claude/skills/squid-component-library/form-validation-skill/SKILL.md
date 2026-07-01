---
name: form-validation
description: >-
  Adds or updates Zod field and form validation in component-lib-frontend,
  maps results to FormField error/success badges, and exports strict inferred
  types. Use when validating forms, email/password/phone fields, registration
  or login schemas, or integrating validation with UI components.
---

# Form validation (Zod)

## Stack

- **Zod** (`zod` dependency) — single source for rules and messages
- **UI** — `FormField` props: `error`, `success`, `warning`, `info`
- **Types** — `z.infer<typeof schema>`; page types in `src/types/components.ts`

## File map

```
src/validation/
  schemas/fields.ts    # emailFieldSchema, passwordFieldSchema, requiredTextField()
  schemas/forms.ts     # registrationFormSchema, loginFormSchema, …
  validate-field.ts    # validateFieldValue()
  form-errors.ts       # safeParseForm(), formatZodFormErrors()
  field-messages.ts    # formFieldMessagesLive()
  index.ts
```

## Add a new field rule

1. Define schema in `schemas/fields.ts`
2. Export inferred type if needed: `export type FooFieldValue = z.infer<typeof fooFieldSchema>`
3. Use in forms: `z.object({ foo: fooFieldSchema })`

## Wire to FormField

```tsx
const result = validateFieldValue(emailFieldSchema, email, {
  successMessage: "Email looks good.",
});

<FormField
  label="Email"
  required
  {...formFieldMessagesLive(result, { touched: email.length > 0, submitted })}
>
  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</FormField>
```

## Full form submit

```tsx
const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

const onSubmit = (e: FormEvent) => {
  e.preventDefault();
  const parsed = safeParseForm(registrationFormSchema, values);
  if (!parsed.success) {
    setSubmitted(true);
    setFieldErrors(parsed.fieldErrors);
    return;
  }
  setFieldErrors({});
  // use parsed.data
};
```

Static fields: `error={fieldErrors.firstName}` on `FormField`.

## Component prop types (non-validation)

UI enums: `src/types/fields.ts` (`FieldSize`, `ButtonVariant`, …).

Layout/forms: `src/types/components.ts` (`TemplateCardProps`, `RegistrationFormValues`, …).

Do not duplicate `z.infer` types in random files — import from `@/validation` or `@/types`.

## Project rule

Follow **`.cursor/rules/form-validation-zod.mdc`** when editing validation or form pages.
