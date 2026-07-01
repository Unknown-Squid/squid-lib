import { DocsContent } from "@/site/docs-content";

export const metadata = {
  title: "Documentation",
  description: "Component API reference and live previews.",
};

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2 border-b border-zinc-100 pb-10 dark:border-zinc-900">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Documentation
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Props, variants, imports, and live previews for every exported primitive. Use the
          sidebar to jump to a component.
        </p>
      </header>
      <DocsContent />
    </div>
  );
}
