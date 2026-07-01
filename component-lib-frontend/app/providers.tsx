"use client";

import type { ReactNode } from "react";

import { ToastProvider } from "@/components/ui/toast";
import { ThemeCleanup } from "@/site/theme-cleanup";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ThemeCleanup />
      {children}
    </ToastProvider>
  );
}
