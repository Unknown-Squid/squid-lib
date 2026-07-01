import type { ReactNode } from "react";

import type {
  LoginFormValues,
  ProfileFormValues,
  RegistrationFormValues,
} from "@/validation/schemas/forms";

/** Re-export inferred form models for pages and templates */
export type {
  LoginFormValues,
  ProfileFormValues,
  RegistrationFormValues,
};

/** Shared layout props (site / docs / templates) */
export type WithChildren = {
  children: ReactNode;
};

export type WithClassName = {
  className?: string;
};

export type TemplateCardProps = WithChildren & {
  title: string;
  subtitle?: string;
};

export type DocsSectionProps = WithChildren & {
  id: string;
  title: string;
  description?: string;
};
