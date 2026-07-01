import type { z } from "zod";

export type FieldValidationResult = {
  valid: boolean;
  message?: string;
};

export type ValidateFieldOptions = {
  /** Shown on FormField `success` when parse passes */
  successMessage?: string;
  /** If false, empty string is valid without running schema (default: false) */
  allowEmpty?: boolean;
};

/**
 * Run a Zod field schema and map to FormField-friendly result.
 */
export function validateFieldValue<T>(
  schema: z.ZodType<T>,
  value: unknown,
  options: ValidateFieldOptions = {},
): FieldValidationResult {
  const { successMessage, allowEmpty = false } = options;

  if (
    allowEmpty &&
    (value === "" || value === undefined || value === null)
  ) {
    return { valid: true };
  }

  const result = schema.safeParse(value);

  if (result.success) {
    return {
      valid: true,
      message: successMessage,
    };
  }

  const message = result.error.issues[0]?.message ?? "Invalid value.";
  return { valid: false, message };
}
