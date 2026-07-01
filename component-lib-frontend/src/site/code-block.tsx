import { cn } from "@/utils";

type Props = { children: string; className?: string };

export function CodeBlock({ children, className }: Props) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200",
        className,
      )}
    >
      <code>{children.trim()}</code>
    </pre>
  );
}
