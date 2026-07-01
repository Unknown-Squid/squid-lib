import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

export function FieldError({
  className,
  role = "alert",
  ...props
}: FieldErrorProps) {
  return (
    <p role={role} className={cn("ui-field-error", className)} {...props} />
  );
}
