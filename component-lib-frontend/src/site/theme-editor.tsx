"use client";

import { useState } from "react";

import { Badge, Button, FormField, Input } from "@/components";

import { type ThemeTokenKey, useThemeScope } from "./theme-scope";

const TOKEN_LABELS: Record<ThemeTokenKey, string> = {
  "background-primary": "Background primary",
  "background-secondary": "Background secondary",
  "text-primary": "Text primary",
  "text-secondary": "Text secondary",
  accent: "Accent (links)",
  "border-tertiary": "Border rest",
  "border-danger": "Border danger",
  radius: "Radius md (px)",
};

export function ThemeEditor() {
  const { tokens, updateToken, resetTokens } = useThemeScope();
  const [copied, setCopied] = useState(false);

  const copyCss = async () => {
    const block = `.squid-theme-scope {
  --color-background-primary: ${tokens["background-primary"]};
  --color-background-secondary: ${tokens["background-secondary"]};
  --color-text-primary: ${tokens["text-primary"]};
  --color-text-secondary: ${tokens["text-secondary"]};
  --color-border-tertiary: ${tokens["border-tertiary"]};
  --color-border-danger: ${tokens["border-danger"]};
  --border-radius-md: ${tokens.radius}px;
}`;
    await navigator.clipboard.writeText(block);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="space-y-6">
        <div className="rounded-[var(--border-radius-lg)] border-[0.5px] border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Tokens</h2>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Overrides apply only inside{" "}
            <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">.squid-theme-scope</code>{" "}
            on Playground and Templates (preview below uses the same scope).
          </p>
          <ul className="mt-5 space-y-4">
            {(Object.keys(TOKEN_LABELS) as ThemeTokenKey[]).map((key) => (
              <li key={key} className="space-y-1.5">
                <label
                  htmlFor={`token-${key}`}
                  className="text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  {TOKEN_LABELS[key]}
                </label>
                {key === "radius" ? (
                  <>
                    <input
                      id={`token-${key}`}
                      type="range"
                      min={4}
                      max={24}
                      value={tokens.radius}
                      onChange={(e) => updateToken("radius", e.target.value)}
                      className="w-full"
                    />
                    <p className="font-mono text-xs text-zinc-500">{tokens.radius}px</p>
                  </>
                ) : key === "border-tertiary" ? (
                  <input
                    id={`token-${key}`}
                    type="text"
                    value={tokens[key]}
                    onChange={(e) => updateToken(key, e.target.value)}
                    className="w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      id={`token-${key}`}
                      type="color"
                      value={tokens[key].startsWith("#") ? tokens[key] : "#ffffff"}
                      onChange={(e) => updateToken(key, e.target.value)}
                      className="h-10 w-12 shrink-0 cursor-pointer rounded-md border border-zinc-200 dark:border-zinc-700"
                    />
                    <input
                      type="text"
                      value={tokens[key]}
                      onChange={(e) => updateToken(key, e.target.value)}
                      className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={resetTokens}>
              Reset
            </Button>
            <Button type="button" size="sm" onClick={() => void copyCss()}>
              {copied ? "Copied" : "Copy CSS"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="overflow-hidden rounded-[var(--border-radius-lg)] border-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] shadow-sm">
          <div className="border-b-[0.5px] border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)] px-6 py-4">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Scoped preview</p>
          </div>
          <div className="flex flex-wrap gap-2 p-6">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Button type="button">Primary</Button>
            <Button type="button" variant="secondary">
              Secondary
            </Button>
          </div>
          <div className="border-t-[0.5px] border-[var(--color-border-tertiary)] p-6">
            <FormField label="Email" description="Uses scoped theme tokens only.">
              <Input placeholder="you@example.com" />
            </FormField>
          </div>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Docs, About, and Home keep the default token palette from{" "}
          <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">tokens.css</code>.
        </p>
      </div>
    </div>
  );
}
