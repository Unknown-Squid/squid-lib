import { z } from "zod";

import {
  emailFieldSchema,
  passwordFieldSchema,
  requiredTextField,
} from "./fields";

export const registrationFormSchema = z.object({
  firstName: requiredTextField("First name"),
  lastName: requiredTextField("Last name"),
  email: emailFieldSchema,
  password: passwordFieldSchema,
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms.",
  }),
});

export const loginFormSchema = z.object({
  email: emailFieldSchema,
  password: z.string().min(1, { message: "Password is required." }),
});

export const profileFormSchema = z.object({
  displayName: requiredTextField("Display name"),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required." })
    .regex(/^[a-z0-9]+$/, {
      message: "Lowercase letters and numbers only.",
    }),
  bio: z.string().trim().max(500, { message: "Maximum 500 characters." }),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
