import type { z } from "zod";

/** First issue per top-level field key — for FormField `error` props */
export function formatZodFormErrors(
  error: z.ZodError,
): Record<string, string> {
  const messages: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && messages[key] === undefined) {
      messages[key] = issue.message;
    }
  }

  return messages;
}

export function safeParseForm<T extends z.ZodType>(
  schema: T,
  values: unknown,
):
  | { success: true; data: z.infer<T> }
  | { success: false; fieldErrors: Record<string, string> } {
  const result = schema.safeParse(values);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    fieldErrors: formatZodFormErrors(result.error),
  };
}
