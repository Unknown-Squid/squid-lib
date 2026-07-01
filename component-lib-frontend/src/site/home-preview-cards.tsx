"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  Button,
  FormField,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
} from "@/components";

const previews = [
  {
    title: "Button",
    hint: "Primary & secondary actions",
    href: "/docs#button",
    render: () => (
      <div className="flex flex-wrap justify-center gap-2">
        <Button type="button" className="px-4 py-1.5 text-xs">
          Primary
        </Button>
        <Button type="button" variant="secondary" className="px-4 py-1.5 text-xs">
          Secondary
        </Button>
      </div>
    ),
  },
  {
    title: "Input",
    hint: "Outline, ghost, sizes",
    href: "/docs#input",
    render: () => (
      <Input
        readOnly
        size="sm"
        className="max-w-[11rem]"
        value="you@example.com"
        aria-hidden
        tabIndex={-1}
      />
    ),
  },
  {
    title: "FormField",
    hint: "Label, helper, error wiring",
    href: "/docs#form-field",
    render: () => (
      <FormField
        label="Email"
        className="w-full max-w-[11rem] origin-center scale-[0.92]"
        required
      >
        <Input readOnly size="sm" value="ada@co.dev" aria-hidden tabIndex={-1} />
      </FormField>
    ),
  },
  {
    title: "Select",
    hint: "Native select, consistent chrome",
    href: "/docs#select",
    render: () => (
      <Select
        size="sm"
        className="max-w-[11rem]"
        defaultValue="md"
        aria-label="Preview"
        tabIndex={-1}
      >
        <option value="sm">Small</option>
        <option value="md">Medium</option>
        <option value="lg">Large</option>
      </Select>
    ),
  },
  {
    title: "Switch",
    hint: "Accessible toggle control",
    href: "/docs#switch",
    render: () => (
      <Switch checked onCheckedChange={() => {}} aria-label="Preview" tabIndex={-1} />
    ),
  },
  {
    title: "RadioGroup",
    hint: "Single choice sets",
    href: "/docs#radio-group",
    render: () => (
      <RadioGroup
        defaultValue="pro"
        className="origin-center scale-[0.92]"
        name="home-preview-plan"
      >
        <RadioGroupItem value="free" label="Free" />
        <RadioGroupItem value="pro" label="Pro" />
      </RadioGroup>
    ),
  },
] as const;

function PreviewSandbox({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-zinc-50 px-3 dark:bg-zinc-900/80 [&_*]:pointer-events-none"
      aria-hidden
    >
      {children}
    </div>
  );
}

export function HomePreviewCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {previews.map((p) => (
        <Link
          key={p.title}
          href={p.href}
          className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <PreviewSandbox>{p.render()}</PreviewSandbox>
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-violet-600 dark:text-zinc-50 dark:group-hover:text-violet-400">
            {p.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{p.hint}</p>
        </Link>
      ))}
    </div>
  );
}
