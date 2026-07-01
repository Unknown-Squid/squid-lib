"use client";

import { forwardRef, useEffect, useRef, type ReactNode } from "react";
import type { InputHTMLAttributes } from "react";

import { resolveFieldStatus } from "@/components/ui/styles";
import type { FieldStatus } from "@/types/fields";
import { cn } from "@/utils";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  error?: boolean;
  fieldStatus?: FieldStatus;
  indeterminate?: boolean;
  label?: ReactNode;
  /** Muted label color (reference `.check-label.muted`). */
  mutedLabel?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      error,
      fieldStatus: fieldStatusProp,
      indeterminate,
      label,
      mutedLabel,
      disabled,
      id: idProp,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const status = resolveFieldStatus({
      fieldStatus: fieldStatusProp,
      error: Boolean(error) || ariaInvalid === true,
    });
    const invalid = status === "error";

    useEffect(() => {
      const el = innerRef.current;
      if (el) {
        el.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <label
        className={cn(
          "check-item min-w-0 max-w-full",
          disabled && "cursor-not-allowed",
          className,
        )}
      >
        <input
          ref={setRef}
          id={idProp}
          type="checkbox"
          disabled={disabled}
          className="sr-only"
          aria-invalid={invalid ? true : ariaInvalid}
          {...props}
        />
        <span className="check-box" aria-hidden />
        {label != null ? (
          <span
            className={cn("check-label", mutedLabel && "check-label--muted")}
          >
            {label}
          </span>
        ) : null}
      </label>
    );
  },
);
