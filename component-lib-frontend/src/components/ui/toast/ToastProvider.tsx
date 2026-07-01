"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/utils";

export type ToastVariant = "default" | "success" | "danger" | "warning" | "info";

export type ShowToastOptions = {
  title: string;
  variant?: ToastVariant;
  /** ms; default 4500 */
  duration?: number;
};

type ToastRecord = ShowToastOptions & { id: number };

type ToastContextValue = (options: ShowToastOptions) => void;

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastItem({
  item,
  onRemove,
}: {
  item: ToastRecord;
  onRemove: (id: number) => void;
}) {
  const duration = item.duration ?? 4500;

  useEffect(() => {
    const t = window.setTimeout(() => onRemove(item.id), duration);
    return () => window.clearTimeout(t);
  }, [item.id, duration, onRemove]);

  const live = item.variant === "danger" ? "assertive" : "polite";

  return (
    <div
      role="status"
      aria-live={live}
      className={cn(
        "ui-toast",
        item.variant && item.variant !== "default" && `ui-toast--${item.variant}`,
      )}
    >
      <div className="ui-toast__body">
        <span className="ui-toast__title">{item.title}</span>
      </div>
      <button
        type="button"
        className="ui-toast__dismiss"
        aria-label="Dismiss notification"
        onClick={() => onRemove(item.id)}
      >
        ×
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((list) => list.filter((x) => x.id !== id));
  }, []);

  const showToast = useCallback((options: ShowToastOptions) => {
    const id = ++idRef.current;
    setToasts((list) => [...list, { ...options, id }]);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="ui-toast-region" aria-label="Notifications">
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider.");
  }
  return ctx;
}
