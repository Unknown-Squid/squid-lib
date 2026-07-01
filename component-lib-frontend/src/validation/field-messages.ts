import type { FieldValidationResult } from "./validate-field";

/** Map validation result to FormField `error` / `success` props */
export function formFieldMessages(
  result: FieldValidationResult,
  options: {
    showSuccess?: boolean;
    showError?: boolean;
  } = {},
): { error?: string; success?: string } {
  const { showSuccess = true, showError = true } = options;

  if (!result.valid && showError && result.message) {
    return { error: result.message };
  }

  if (result.valid && showSuccess && result.message) {
    return { success: result.message };
  }

  return {};
}

/**
 * Live field: show error/success only after user has typed (or on submit).
 */
export function formFieldMessagesLive(
  result: FieldValidationResult,
  options: {
    touched: boolean;
    submitted: boolean;
    successMessage?: string;
  },
): { error?: string; success?: string } {
  const { touched, submitted, successMessage } = options;
  const show = touched || submitted;

  if (!show) {
    return {};
  }

  if (!result.valid) {
    return { error: result.message };
  }

  return {
    success: successMessage ?? result.message,
  };
}
