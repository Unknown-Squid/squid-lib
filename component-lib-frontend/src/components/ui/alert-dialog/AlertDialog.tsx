"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils";

function focusableFrom(root: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");
  return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.tabIndex !== -1,
  );
}

export type AlertDialogVariant = "default" | "info" | "warning" | "danger";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  variant?: AlertDialogVariant;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Default true — click backdrop to dismiss (calls onCancel) */
  closeOnOverlayClick?: boolean;
  className?: string;
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "default",
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
  onCancel,
  closeOnOverlayClick = true,
  className,
}: AlertDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const handleDismiss = useCallback(() => {
    onOpenChange(false);
    onCancel?.();
  }, [onOpenChange, onCancel]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      panelRef.current?.focus();
    });
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const els = focusableFrom(panelRef.current);
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [handleDismiss],
  );

  const onConfirmClick = useCallback(() => {
    onConfirm?.();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="ui-alert-dialog-overlay"
      role="presentation"
      onClick={closeOnOverlayClick ? handleDismiss : undefined}
    >
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          "ui-alert-dialog-panel",
          variant !== "default" && `ui-alert-dialog-panel--${variant}`,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <h2 id={titleId} className="ui-alert-dialog-title">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="ui-alert-dialog-description">
            {description}
          </p>
        ) : null}
        <div className="ui-alert-dialog-actions">
          {cancelLabel != null ? (
            <Button type="button" variant="secondary" onClick={handleDismiss}>
              {cancelLabel}
            </Button>
          ) : null}
          {confirmLabel != null ? (
            <Button
              type="button"
              variant={variant === "danger" ? "danger" : "primary"}
              onClick={onConfirmClick}
            >
              {confirmLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
