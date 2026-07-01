import type { ButtonHTMLAttributes, ReactNode } from "react";

import { buttonClass } from "@/components/ui/styles";
import type { ButtonVariant, FieldSize } from "@/types/fields";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: FieldSize;
  iconOnly?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  iconOnly = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, iconOnly, className })}
      {...props}
    >
      {children as ReactNode}
    </button>
  );
}
