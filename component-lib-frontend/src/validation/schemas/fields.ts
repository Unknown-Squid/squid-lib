import { z } from "zod";

/** Non-empty trimmed string */
export function requiredTextField(label: string) {
  return z
    .string()
    .trim()
    .min(1, { message: `${label} is required.` });
}

export const emailFieldSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required." })
  .email({ message: "Enter a valid email address." });

/** Min 6 chars, at least one letter and one number */
export const passwordFieldSchema = z
  .string()
  .min(6, { message: "Use at least 6 characters." })
  .refine((value) => /[a-zA-Z]/.test(value) && /\d/.test(value), {
    message: "Include at least one letter and one number.",
  });

/** Loose E.164-friendly — digits only, min 10 */
export const phoneFieldSchema = z
  .string()
  .trim()
  .min(1, { message: "Phone number is required." })
  .refine((value) => value.replace(/\D/g, "").length >= 10, {
    message: "Enter at least 10 digits.",
  });

export const optionalTextAreaSchema = z
  .string()
  .trim()
  .max(500, { message: "Maximum 500 characters." })
  .optional()
  .or(z.literal(""));

export type EmailFieldValue = z.infer<typeof emailFieldSchema>;
export type PasswordFieldValue = z.infer<typeof passwordFieldSchema>;
export type PhoneFieldValue = z.infer<typeof phoneFieldSchema>;
