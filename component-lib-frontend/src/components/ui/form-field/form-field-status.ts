import type { ReactNode } from "react";

import type { BadgeVariantIconName } from "@/components/ui/badge/badge-icons";
import type { FieldStatus } from "@/types/fields";

export type FormFieldStatusMessage = {
  variant: Exclude<BadgeVariantIconName, "default">;
  message: ReactNode;
  status: FieldStatus;
  /** For aria-describedby / live region */
  id?: string;
};

/**
 * Resolves which status badge to show. Priority: error → warning → success → info.
 */
export function resolveFormFieldStatus(props: {
  error?: ReactNode;
  warning?: ReactNode;
  success?: ReactNode;
  info?: ReactNode;
}): FormFieldStatusMessage | null {
  if (props.error) {
    return {
      variant: "danger",
      message: props.error,
      status: "error",
    };
  }
  if (props.warning) {
    return {
      variant: "warning",
      message: props.warning,
      status: "warning",
    };
  }
  if (props.success) {
    return {
      variant: "success",
      message: props.success,
      status: "success",
    };
  }
  if (props.info) {
    return {
      variant: "info",
      message: props.info,
      status: "info",
    };
  }
  return null;
}
