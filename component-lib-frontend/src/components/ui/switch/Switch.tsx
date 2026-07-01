"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { resolveFieldStatus } from "@/components/ui/styles";
import type { FieldStatus } from "@/types/fields";
import { cn } from "@/utils";

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "role"
> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  mutedLabel?: boolean;
  error?: boolean;
  fieldStatus?: FieldStatus;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    className,
    checked,
    disabled,
    label,
    mutedLabel,
    error,
    fieldStatus: fieldStatusProp,
    onCheckedChange,
    onChange,
    id,
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

  return (
    <label
      className={cn(
        "switch-item min-w-0 max-w-full",
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        aria-invalid={invalid ? true : ariaInvalid}
        onChange={(e) => {
          onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />
      <span className="switch-track" aria-hidden>
        <span className="switch-thumb" />
      </span>
      {label != null ? (
        <span
          className={cn("check-label", mutedLabel && "check-label--muted")}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
});
