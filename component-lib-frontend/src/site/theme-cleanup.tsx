"use client";

import { useEffect } from "react";

import { clearDocumentThemeOverrides } from "./theme-scope";

/** Strip legacy :root overrides from older theme editor builds. */
export function ThemeCleanup() {
  useEffect(() => {
    clearDocumentThemeOverrides();
  }, []);
  return null;
}
