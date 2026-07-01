"use client";

import { forwardRef, useId, useState } from "react";

import { cn } from "@/utils";

import { Input, type InputProps } from "../input";

export type PasswordFieldProps = Omit<InputProps, "type"> & {
  showVisibilityToggle?: boolean;
  visibilityLabels?: { show: string; hide: string };
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      className,
      showVisibilityToggle = true,
      visibilityLabels = { show: "Show", hide: "Hide" },
      disabled,
      id: idProp,
      ...props
    },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    const baseId = useId();
    const inputId = idProp ?? `${baseId}-input`;

    return (
      <div className="relative w-full min-w-0 max-w-full">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={cn(
            showVisibilityToggle && "ui-input--with-toggle",
            className,
          )}
          {...props}
          id={inputId}
        />
        {showVisibilityToggle ? (
          <button
            type="button"
            className="ui-field-toggle absolute end-2 top-1/2 z-10 -translate-y-1/2"
            disabled={disabled}
            aria-pressed={visible}
            aria-controls={inputId}
            id={`${baseId}-toggle`}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? visibilityLabels.hide : visibilityLabels.show}
          </button>
        ) : null}
      </div>
    );
  },
);
