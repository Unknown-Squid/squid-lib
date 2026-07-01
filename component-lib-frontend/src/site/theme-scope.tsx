"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Subset of tokens editable in /theme (maps to CSS variables inside a scope wrapper). */
export const THEME_DEFAULTS = {
  "background-primary": "#fcfcfa",
  "background-secondary": "#f3f2ed",
  "text-primary": "#161712",
  "text-secondary": "#4d4f48",
  accent: "#7c3aed",
  "border-tertiary": "rgba(22, 23, 18, 0.18)",
  "border-danger": "#a32d2d",
  radius: "8",
} as const;

export type ThemeTokenKey = keyof typeof THEME_DEFAULTS;
export type ThemeTokens = Record<ThemeTokenKey, string>;

export const THEME_STORAGE_KEY = "squid-ui-theme-overrides";
export const THEME_UPDATE_EVENT = "squid-ui-theme-update";

const ROOT_INLINE_VARS = [
  "--color-background-primary",
  "--color-background-secondary",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-border-tertiary",
  "--color-border-danger",
  "--border-radius-md",
] as const;

export function loadThemeTokens(): ThemeTokens {
  if (typeof window === "undefined") {
    return { ...THEME_DEFAULTS };
  }
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    return raw ? { ...THEME_DEFAULTS, ...JSON.parse(raw) } : { ...THEME_DEFAULTS };
  } catch {
    return { ...THEME_DEFAULTS };
  }
}

export function tokensToScopeStyle(tokens: ThemeTokens): CSSProperties {
  return {
    "--color-background-primary": tokens["background-primary"],
    "--color-background-secondary": tokens["background-secondary"],
    "--color-background-tertiary": tokens["background-secondary"],
    "--color-surface-page": tokens["background-secondary"],
    "--color-surface-panel": tokens["background-primary"],
    "--color-surface-field": tokens["background-primary"],
    "--color-text-primary": tokens["text-primary"],
    "--color-text-secondary": tokens["text-secondary"],
    "--color-border-tertiary": tokens["border-tertiary"],
    "--color-border-primary": tokens["border-tertiary"],
    "--color-border-danger": tokens["border-danger"],
    "--border-radius-md": `${tokens.radius}px`,
  } as CSSProperties;
}

/** Remove legacy global overrides that were previously applied on :root. */
export function clearDocumentThemeOverrides() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const key of ROOT_INLINE_VARS) {
    root.style.removeProperty(key);
  }
}

type ThemeScopeContextValue = {
  tokens: ThemeTokens;
  setTokens: (next: ThemeTokens) => void;
  updateToken: (key: ThemeTokenKey, value: string) => void;
  resetTokens: () => void;
};

const ThemeScopeContext = createContext<ThemeScopeContextValue | null>(null);

export function useThemeScope(): ThemeScopeContextValue {
  const ctx = useContext(ThemeScopeContext);
  if (!ctx) {
    throw new Error("useThemeScope must be used within ThemeScopeProvider.");
  }
  return ctx;
}

export function ThemeScopeProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokensState] = useState<ThemeTokens>(loadThemeTokens);

  const persist = useCallback((next: ThemeTokens) => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(THEME_UPDATE_EVENT));
  }, []);

  const setTokens = useCallback(
    (next: ThemeTokens) => {
      setTokensState(next);
      persist(next);
    },
    [persist],
  );

  const updateToken = useCallback(
    (key: ThemeTokenKey, value: string) => {
      setTokensState((prev) => {
        const next = { ...prev, [key]: value };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const resetTokens = useCallback(() => {
    const next = { ...THEME_DEFAULTS };
    setTokensState(next);
    localStorage.removeItem(THEME_STORAGE_KEY);
    window.dispatchEvent(new Event(THEME_UPDATE_EVENT));
  }, []);

  useEffect(() => {
    clearDocumentThemeOverrides();
  }, []);

  useEffect(() => {
    const sync = () => setTokensState(loadThemeTokens());
    window.addEventListener("storage", sync);
    window.addEventListener(THEME_UPDATE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(THEME_UPDATE_EVENT, sync);
    };
  }, []);

  const style = useMemo(() => tokensToScopeStyle(tokens), [tokens]);

  const value = useMemo(
    () => ({ tokens, setTokens, updateToken, resetTokens }),
    [tokens, setTokens, updateToken, resetTokens],
  );

  return (
    <ThemeScopeContext.Provider value={value}>
      <div className="squid-theme-scope min-w-0 w-full" style={style}>
        {children}
      </div>
    </ThemeScopeContext.Provider>
  );
}
