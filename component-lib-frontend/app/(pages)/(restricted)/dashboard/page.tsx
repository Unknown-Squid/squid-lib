import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
        Dashboard
      </h1>
      <p className="text-[var(--color-text-secondary)]">
        Placeholder route for future app-shell examples. The docs site no longer
        uses login — everything here is public.
      </p>
      <Link
        href="/"
        className="text-sm text-[var(--color-text-secondary)] underline"
      >
        Back home
      </Link>
    </div>
  );
}
