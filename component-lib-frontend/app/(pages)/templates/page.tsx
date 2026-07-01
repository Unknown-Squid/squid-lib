import { TemplatesShowcase } from "@/site/templates-showcase";
import { ThemeScopeProvider } from "@/site/theme-scope";

export const metadata = {
  title: "Templates",
  description: "Full forms and layouts built from library components.",
};

export default function TemplatesPage() {
  return (
    <div className="border-b border-zinc-100 pb-12 dark:border-zinc-900">
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Templates
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Production-style sections that show how primitives compose: auth flows,
            profile editing, settings, data tables, and modal workflows.
          </p>
        </header>
      </div>
      <ThemeScopeProvider>
        <TemplatesShowcase />
      </ThemeScopeProvider>
    </div>
  );
}
