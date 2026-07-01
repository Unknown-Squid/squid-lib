import Link from "next/link";

import { PlaygroundPanel } from "@/site/playground-panel";
import { ThemeScopeProvider } from "@/site/theme-scope";

export const metadata = {
  title: "Playground",
  description: "Interactive controls to try components quickly.",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Playground
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Tweak a few wired-up controls in one place. For full API detail, use{" "}
          <Link className="font-medium text-violet-600 underline dark:text-violet-400" href="/docs">
            Documentation
          </Link>
          .
        </p>
      </header>
      <ThemeScopeProvider>
        <PlaygroundPanel />
      </ThemeScopeProvider>
    </div>
  );
}
