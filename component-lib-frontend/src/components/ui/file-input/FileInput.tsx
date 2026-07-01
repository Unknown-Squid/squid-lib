import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { fieldControlClass, resolveFieldStatus } from "@/components/ui/styles";
import type {
  BaseFieldControlProps,
  FileInputVariant,
} from "@/types/fields";
import { cn } from "@/utils";

export type FileInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> &
  BaseFieldControlProps & {
    variant?: FileInputVariant;
  };

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      className,
      variant = "outline",
      size = "md",
      error,
      fieldStatus: fieldStatusProp,
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const status = resolveFieldStatus({
      fieldStatus: fieldStatusProp,
      error: Boolean(error) || ariaInvalid === true,
    });

    return (
      <input
        ref={ref}
        type="file"
        disabled={disabled}
        className={cn(
          fieldControlClass(status),
          "ui-file-input",
          variant === "ghost" && "ui-file-input--ghost",
          size === "sm" && "ui-file-input--sm",
          size === "lg" && "ui-file-input--lg",
          className,
        )}
        aria-invalid={status === "error" ? true : ariaInvalid}
        {...props}
      />
    );
  },
);
