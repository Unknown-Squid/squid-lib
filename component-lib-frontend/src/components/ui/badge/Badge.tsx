import type { HTMLAttributes, ReactNode } from "react";

import { badgeClass } from "@/components/ui/styles";
import type { BadgeVariant } from "@/types/fields";

import {
  BadgeVariantIcon,
  type BadgeVariantIconName,
} from "./badge-icons";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  icon?: ReactNode | null;
  showIcon?: boolean;
};

export function Badge({
  className,
  variant = "default",
  icon,
  showIcon = true,
  children,
  ...props
}: BadgeProps) {
  const resolvedIcon =
    icon === null
      ? null
      : icon !== undefined
        ? icon
        : showIcon
          ? (
              <BadgeVariantIcon variant={variant as BadgeVariantIconName} />
            )
          : null;

  return (
    <span className={badgeClass(variant, className)} {...props}>
      {resolvedIcon ? (
        <span className="ui-badge__icon">{resolvedIcon}</span>
      ) : null}
      {children}
    </span>
  );
}
