import Link from "next/link";

import { cn } from "@/utils";

import { DOC_NAV } from "./docs-nav";

type Props = { className?: string };

export function DocSidebar({ className }: Props) {
  return (
    <aside
      className={cn(
        "w-56 shrink-0 self-start border-r border-zinc-200 pr-6 dark:border-zinc-800 lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto",
        className,
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Components
      </p>
      <ul className="space-y-1">
        {DOC_NAV.map((item) => (
          <li key={item.id}>
            <Link
              href={`/docs#${item.id}`}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
                "dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function DocMobileNav() {
  return (
    <nav className="mb-8 flex gap-2 overflow-x-auto pb-1 md:hidden" aria-label="Components">
      {DOC_NAV.map((item) => (
        <Link
          key={item.id}
          href={`/docs#${item.id}`}
          className={cn(
            "shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700",
            "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
