import { ThemeEditor } from "@/site/theme-editor";
import { ThemeScopeProvider } from "@/site/theme-scope";

export const metadata = {
  title: "Theme",
  description: "Edit design tokens and preview surfaces live.",
};

export default function ThemePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Theme
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Tune scoped CSS variables for Playground and Templates only. Copy a{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            .squid-theme-scope
          </code>{" "}
          block for your project, or reset to defaults.
        </p>
      </header>
      <ThemeScopeProvider>
        <ThemeEditor />
      </ThemeScopeProvider>
    </div>
  );
}
