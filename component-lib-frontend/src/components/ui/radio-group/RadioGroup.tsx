"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { resolveFieldStatus } from "@/components/ui/styles";
import type { FieldStatus } from "@/types/fields";
import { cn } from "@/utils";

type RadioGroupContextValue = {
  name: string;
  value: string | undefined;
  setValue: (next: string) => void;
  disabled?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(component: string): RadioGroupContextValue {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within RadioGroup.`);
  }
  return ctx;
}

export type RadioGroupProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  legend?: ReactNode;
};

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  function RadioGroup(
    {
      className,
      value,
      defaultValue = "",
      onValueChange,
      name: nameProp,
      legend,
      disabled,
      children,
      ...fieldsetProps
    },
    ref,
  ) {
    const reactId = useId();
    const name = nameProp ?? `rg-${reactId.replace(/:/g, "")}`;
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);

    const setSelected = useCallback(
      (next: string) => {
        if (!isControlled) {
          setInternal(next);
        }
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const selected = isControlled ? value : internal;

    const ctx = useMemo(
      () => ({
        name,
        value: selected,
        setValue: setSelected,
        disabled,
      }),
      [name, selected, disabled, setSelected],
    );

    return (
      <RadioGroupContext.Provider value={ctx}>
        <fieldset
          ref={ref}
          disabled={disabled}
          className={cn("m-0 min-w-0 border-0 p-0", className)}
          {...fieldsetProps}
        >
          {legend ? (
            <legend className="mb-2 text-[length:var(--font-size-label)] font-medium text-[var(--color-text-primary)]">
              {legend}
            </legend>
          ) : null}
          <div className="flex flex-col gap-2">{children}</div>
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);

export type RadioGroupItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "checked" | "defaultChecked" | "size"
> & {
  value: string;
  label?: ReactNode;
  error?: boolean;
  fieldStatus?: FieldStatus;
};

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  function RadioGroupItem(
    {
      className,
      value,
      label,
      error,
      fieldStatus: fieldStatusProp,
      disabled: itemDisabled,
      id: idProp,
      onChange,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const status = resolveFieldStatus({
      fieldStatus: fieldStatusProp,
      error: Boolean(error) || ariaInvalid === true,
    });

    const ctx = useRadioGroupContext("RadioGroupItem");
    const autoId = useId();
    const inputId =
      idProp ?? `${ctx.name}-${value}-${autoId}`.replace(/[^a-zA-Z0-9-_]/g, "");
    const disabled = Boolean(ctx.disabled || itemDisabled);
    const checked = ctx.value === value;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "radio-item min-w-0 max-w-full",
          status === "error" && "radio-item--error",
          disabled && "cursor-not-allowed",
          className,
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={ctx.name}
          value={value}
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
          onChange={(e) => {
            onChange?.(e);
            ctx.setValue(value);
          }}
        />
        <span className="radio-circle" aria-hidden />
        {label != null ? <span className="check-label">{label}</span> : null}
      </label>
    );
  },
);
