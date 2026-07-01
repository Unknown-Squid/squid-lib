import type { FieldSize, FieldStatus } from "@/types/fields";
import { cn } from "@/utils";

export type { FieldSize, FieldStatus } from "@/types/fields";

export function resolveFieldStatus(options: {
  fieldStatus?: FieldStatus;
  error?: boolean;
}): FieldStatus {
  if (options.fieldStatus && options.fieldStatus !== "default") {
    return options.fieldStatus;
  }
  if (options.error) {
    return "error";
  }
  return "default";
}

/** Shared field chrome — maps to styles/fields/field-shared.css */
export function fieldControlClass(
  status: FieldStatus = "default",
  className?: string,
) {
  return cn(
    "ui-field-control",
    status !== "default" && `ui-field-control--${status}`,
    className,
  );
}

/** styles/fields/input.css */
export function inputClass(size: FieldSize = "md", className?: string) {
  return cn("ui-input", size !== "md" && `ui-input--${size}`, className);
}

/** styles/fields/textarea.css */
export function textareaClass(size: FieldSize = "md", className?: string) {
  return cn("ui-textarea", size !== "md" && `ui-textarea--${size}`, className);
}

/** styles/components/button.css */
export function buttonClass(options: {
  variant: string;
  size: FieldSize;
  iconOnly?: boolean;
  className?: string;
}) {
  const { variant, size, iconOnly, className } = options;
  return cn(
    "ui-btn",
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    iconOnly && "ui-btn--icon-only",
    className,
  );
}

/** styles/components/badge.css */
export function badgeClass(variant: string, className?: string) {
  return cn("ui-badge", `ui-badge--${variant}`, className);
}
