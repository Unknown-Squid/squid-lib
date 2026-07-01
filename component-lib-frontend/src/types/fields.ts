/**
 * Strict shared types for form primitives.
 * Component props should compose these — do not widen with loose strings.
 */

export const FIELD_STATUSES = [
  "default",
  "error",
  "success",
  "warning",
  "info",
] as const;

export type FieldStatus = (typeof FIELD_STATUSES)[number];

export const FIELD_SIZES = ["sm", "md", "lg"] as const;

export type FieldSize = (typeof FIELD_SIZES)[number];

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "ghost",
  "danger",
  "success",
] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BADGE_VARIANTS = [
  "default",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const FILE_INPUT_VARIANTS = ["outline", "ghost"] as const;

export type FileInputVariant = (typeof FILE_INPUT_VARIANTS)[number];

/** Props every text-like control shares */
export type BaseFieldControlProps = {
  size?: FieldSize;
  error?: boolean;
  fieldStatus?: FieldStatus;
  className?: string;
  disabled?: boolean;
};

export type ResolvedFieldState = {
  status: FieldStatus;
  invalid: boolean;
};
