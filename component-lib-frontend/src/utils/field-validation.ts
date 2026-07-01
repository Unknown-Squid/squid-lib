/**
 * @deprecated Prefer `@/validation` (Zod schemas). Kept for backward-compatible imports.
 */
import {
  emailFieldSchema,
  passwordFieldSchema,
  phoneFieldSchema,
  validateFieldValue,
  type FieldValidationResult,
} from "@/validation";

export type { FieldValidationResult };

export function validatePassword(value: string): FieldValidationResult {
  return validateFieldValue(passwordFieldSchema, value, {
    successMessage: "Password meets requirements.",
  });
}

export function validateEmail(value: string): FieldValidationResult {
  return validateFieldValue(emailFieldSchema, value, {
    successMessage: "Email looks good.",
  });
}

export function validatePhone(value: string): FieldValidationResult {
  return validateFieldValue(phoneFieldSchema, value, {
    successMessage: "Phone number looks good.",
  });
}
