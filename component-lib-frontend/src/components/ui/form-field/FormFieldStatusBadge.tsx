import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { BadgeVariantIconName } from "@/components/ui/badge/badge-icons";

type Props = {
  variant: Exclude<BadgeVariantIconName, "default">;
  children: ReactNode;
  id?: string;
};

export function FormFieldStatusBadge({ variant, children, id }: Props) {
  return (
    <div
      id={id}
      role={variant === "danger" ? "alert" : "status"}
      className="mb-1"
      aria-live={variant === "danger" ? "assertive" : "polite"}
    >
      <Badge variant={variant}>{children}</Badge>
    </div>
  );
}
