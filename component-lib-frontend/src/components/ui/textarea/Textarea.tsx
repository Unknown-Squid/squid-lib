import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

import {
  fieldControlClass,
  resolveFieldStatus,
  textareaClass,
} from "@/components/ui/styles";
import type { BaseFieldControlProps } from "@/types/fields";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  BaseFieldControlProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
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
      <textarea
        ref={ref}
        disabled={disabled}
        className={fieldControlClass(
          status,
          textareaClass(size, className),
        )}
        aria-invalid={status === "error" ? true : ariaInvalid}
        {...props}
      />
    );
  },
);
