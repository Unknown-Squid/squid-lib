"use client";

import { useMemo } from "react";

export type OrderedField = {
  id: string;
  order: number;
  value: string;
};

const DEFAULT_SKIP_MESSAGE = "This field was skipped. Please complete it first.";

/**
 * When the user focuses a field with a higher `order` while a lower-order field
 * is still empty, returns warning messages for those skipped fields.
 */
export function useSkippedFieldWarnings(
  fields: OrderedField[],
  activeFieldId: string | null,
  message = DEFAULT_SKIP_MESSAGE,
): Record<string, string | undefined> {
  return useMemo(() => {
    const warnings: Record<string, string | undefined> = {};
    const active = fields.find((f) => f.id === activeFieldId);
    if (!active) {
      return warnings;
    }

    for (const field of fields) {
      if (field.order < active.order && !field.value.trim()) {
        warnings[field.id] = message;
      }
    }
    return warnings;
  }, [fields, activeFieldId, message]);
}
