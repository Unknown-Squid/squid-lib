import Link from "next/link";

import { SiteHeader } from "@/site/site-header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-200 bg-zinc-50/80 py-10 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Squid UI — reusable primitives for product teams.
          </p>
          <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link className="hover:text-zinc-900 dark:hover:text-zinc-200" href="/changelog">
              Changelog
            </Link>
            <Link className="hover:text-zinc-900 dark:hover:text-zinc-200" href="/about">
              About
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
