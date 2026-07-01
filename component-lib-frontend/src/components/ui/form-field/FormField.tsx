import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";

import { HelperText } from "@/components/ui/helper-text";
import { Label } from "@/components/ui/label";
import type { FieldStatus } from "@/types/fields";
import { cn } from "@/utils";

import { FormFieldStatusBadge } from "./FormFieldStatusBadge";
import { resolveFormFieldStatus } from "./form-field-status";

function mergeDescribedBy(
  a: string | undefined,
  b: string | undefined,
): string | undefined {
  if (!a && !b) return undefined;
  if (!a) return b;
  if (!b) return a;
  return `${a} ${b}`.replace(/\s+/g, " ").trim();
}

export type FormFieldProps = {
  label: ReactNode;
  htmlFor?: string;
  /** Helper text below the control */
  description?: ReactNode;
  /** Danger badge at top + red field ring */
  error?: ReactNode;
  /** Success badge at top (e.g. password/email/phone validation passed) */
  success?: ReactNode;
  /** Warning badge at top (e.g. skipped field in form order) */
  warning?: ReactNode;
  /** Info badge at top — pass message when extra context is needed */
  info?: ReactNode;
  required?: boolean;
  requiredIndicator?: ReactNode | boolean;
  labelAssociation?: "htmlFor" | "aria-labelledby";
  children: ReactElement<Record<string, unknown>>;
  className?: string;
  labelClassName?: string;
};

export function FormField({
  label,
  htmlFor: htmlForProp,
  description,
  error,
  success,
  warning,
  info,
  required,
  requiredIndicator,
  labelAssociation = "htmlFor",
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  const baseId = useId();
  const autoControlId = `${baseId}-control`;
  const controlId = htmlForProp ?? autoControlId;
  const labelTextId = `${baseId}-label-text`;
  const helperId = description ? `${baseId}-helper` : undefined;

  const status = resolveFormFieldStatus({ error, warning, success, info });
  const statusId = status ? `${baseId}-status` : undefined;
  const describedByIds =
    [helperId, statusId].filter(Boolean).join(" ") || undefined;

  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error("FormField expects a single React element child.");
  }

  const childProps = child.props as Record<string, unknown>;
  const mergedDescribedBy = mergeDescribedBy(
    typeof childProps["aria-describedby"] === "string"
      ? childProps["aria-describedby"]
      : undefined,
    describedByIds,
  );

  const resolvedRequiredIndicator =
    requiredIndicator !== undefined
      ? requiredIndicator
      : required
        ? true
        : undefined;

  const mergedLabelledBy = mergeDescribedBy(
    typeof childProps["aria-labelledby"] === "string"
      ? childProps["aria-labelledby"]
      : undefined,
    labelAssociation === "aria-labelledby" ? labelTextId : undefined,
  );

  const fieldStatus: FieldStatus = status?.status ?? "default";

  const control = cloneElement(child, {
    ...(labelAssociation === "htmlFor"
      ? { id: (childProps["id"] as string | undefined) ?? controlId }
      : childProps["id"] !== undefined
        ? { id: childProps["id"] as string | undefined }
        : {}),
    "aria-describedby": mergedDescribedBy,
    ...(labelAssociation === "aria-labelledby"
      ? { "aria-labelledby": mergedLabelledBy }
      : {}),
    "aria-invalid": fieldStatus === "error" ? true : childProps["aria-invalid"],
    "aria-required": required ? true : childProps["aria-required"],
    fieldStatus,
    error: fieldStatus === "error",
  } as Record<string, unknown>);

  const requiredSuffix =
    resolvedRequiredIndicator != null && resolvedRequiredIndicator !== false ? (
      <span className="ui-label__required" aria-hidden>
        {resolvedRequiredIndicator === true ? " *" : resolvedRequiredIndicator}
      </span>
    ) : null;

  return (
    <div className={cn("ui-form-field", className)}>
      {status ? (
        <div className="ui-form-field__status">
          <FormFieldStatusBadge variant={status.variant} id={statusId}>
            {status.message}
          </FormFieldStatusBadge>
        </div>
      ) : null}
      <div className="ui-form-field__label-block">
        {labelAssociation === "htmlFor" ? (
          <Label
            htmlFor={controlId}
            className={labelClassName}
            requiredIndicator={resolvedRequiredIndicator}
          >
            {label}
          </Label>
        ) : (
          <span
            id={labelTextId}
            className={cn("ui-label", labelClassName)}
          >
            {label}
            {requiredSuffix}
          </span>
        )}
        {control}
      </div>
      {description ? (
        <HelperText id={helperId}>{description}</HelperText>
      ) : null}
    </div>
  );
}
