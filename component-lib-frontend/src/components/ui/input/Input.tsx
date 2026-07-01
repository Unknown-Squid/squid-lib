import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import {
  fieldControlClass,
  inputClass,
  resolveFieldStatus,
} from "@/components/ui/styles";
import type { BaseFieldControlProps } from "@/types/fields";
import { cn } from "@/utils";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  BaseFieldControlProps & {
    leadingIcon?: ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    size = "md",
    error,
    fieldStatus: fieldStatusProp,
    disabled,
    leadingIcon,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const status = resolveFieldStatus({
    fieldStatus: fieldStatusProp,
    error: Boolean(error) || ariaInvalid === true,
  });
  const invalid = status === "error";

  const fieldClass = cn(
    fieldControlClass(status),
    inputClass(size),
    className,
  );

  if (leadingIcon == null) {
    return (
      <input
        ref={ref}
        disabled={disabled}
        className={fieldClass}
        aria-invalid={invalid ? true : ariaInvalid}
        {...props}
      />
    );
  }

  return (
    <div className="ui-input-wrap">
      <span className="ui-input-wrap__icon" aria-hidden>
        {leadingIcon}
      </span>
      <input
        ref={ref}
        disabled={disabled}
        className={fieldClass}
        aria-invalid={invalid ? true : ariaInvalid}
        {...props}
      />
    </div>
  );
});
