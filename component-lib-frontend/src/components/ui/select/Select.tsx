import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

import {
  fieldControlClass,
  inputClass,
  resolveFieldStatus,
} from "@/components/ui/styles";
import type { BaseFieldControlProps } from "@/types/fields";
import { cn } from "@/utils";

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> &
  BaseFieldControlProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    size = "md",
    error,
    fieldStatus: fieldStatusProp,
    disabled,
    "aria-invalid": ariaInvalid,
    children,
    ...props
  },
  ref,
) {
  const status = resolveFieldStatus({
    fieldStatus: fieldStatusProp,
    error: Boolean(error) || ariaInvalid === true,
  });

  return (
    <select
      ref={ref}
      disabled={disabled}
      className={cn(
        fieldControlClass(status),
        inputClass(size),
        "ui-select",
        className,
      )}
      aria-invalid={status === "error" ? true : ariaInvalid}
      {...props}
    >
      {children}
    </select>
  );
});
