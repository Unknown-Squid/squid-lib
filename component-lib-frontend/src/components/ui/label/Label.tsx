import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  requiredIndicator?: ReactNode | boolean;
};

export function Label({
  className,
  children,
  requiredIndicator,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn("ui-label", className)}
      {...props}
    >
      {children}
      {requiredIndicator != null && requiredIndicator !== false ? (
        <span className="ui-label__required" aria-hidden>
          {requiredIndicator === true ? " *" : requiredIndicator}
        </span>
      ) : null}
    </label>
  );
}
