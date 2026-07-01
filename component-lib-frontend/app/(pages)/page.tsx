import Link from "next/link";

import { HomePreviewCards } from "@/site/home-preview-cards";
import { cn } from "@/utils";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white px-4 py-20 dark:border-zinc-800/80 dark:from-zinc-950 dark:to-zinc-950 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            Component library
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Build consistent interfaces without reinventing the basics.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Squid UI is a focused set of form primitives, actions, and patterns you can
            ship in a Next.js app today or extract into a published package tomorrow.
            Typed props, accessible defaults, and Tailwind-first styling.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white",
              )}
            >
              Documentation
            </Link>
            <Link
              href="/templates"
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-6 py-2.5 text-sm font-medium transition-colors",
                "hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900",
              )}
            >
              View templates
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            What ships in the box
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Each card is a live preview — click through to full docs.
          </p>
        </div>
        <HomePreviewCards />
      </section>
    </div>
  );
}
