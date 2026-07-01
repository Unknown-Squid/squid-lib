export const metadata = {
  title: "About",
  description:
    "Why Squid UI exists — a personal, centralized component library open to everyone.",
};

const sections = [
  {
    title: "Purpose",
    body: [
      "Squid UI started as a library for my own work, but it is open to anyone who wants to use it.",
      "You can adopt it as-is, fork it, or pull only the pieces you need — no gatekeeping.",
    ],
  },
  {
    title: "Why I built it",
    body: [
      "I freelance and ship many different projects. On almost every engagement I ended up rebuilding the same inputs, buttons, validation patterns, and layout primitives from scratch.",
      "That repetition slowed me down and made each codebase drift in small ways — spacing, states, accessibility, and error handling never stayed perfectly aligned.",
    ],
  },
  {
    title: "What I wanted instead",
    body: [
      "One centralized component layer that stays dynamic: configurable through props, tokens, and class names instead of hard-coded one-off markup.",
      "Reusable across all of my projects, not locked inside a single app.",
      "Friendly to both vanilla HTML/CSS consumers and framework hosts (React/Next today, with the same token and class contract either way).",
    ],
  },
  {
    title: "How it works today",
    body: [
      "Primitives live in TypeScript/React for the docs site and Storybook, while styles are token-driven CSS you can import without a framework.",
      "FormField, validation helpers, overlays (alert, toast, stepper), and the theme playground are all part of the same system so new projects start from a consistent baseline.",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-surface-page)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-4 rounded-[var(--border-radius-xl)] border border-[var(--color-border-secondary)] bg-[var(--color-surface-field)] p-8 shadow-sm">
          <p className="text-sm font-medium tracking-wide text-[var(--color-text-info)]">
            Squid UI
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            About this library
          </h1>
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
            A personal design system made for real client work — shared openly so
            others can ship faster with the same foundations.
          </p>
        </header>

        <div className="mt-10 space-y-6">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={
                index % 2 === 0
                  ? "rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] bg-[var(--color-surface-panel)] p-6 sm:p-8"
                  : "rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] bg-[var(--color-surface-field)] p-6 sm:p-8"
              }
            >
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[var(--color-text-secondary)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-10 rounded-[var(--border-radius-lg)] border border-[var(--color-border-info)] bg-[var(--color-background-info)] p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-info)]">
            In short
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[var(--color-text-info)]">
            <li>Built for my own freelancing workflow</li>
            <li>Open for anyone who finds it useful</li>
            <li>Centralized, dynamic, and cross-project reusable</li>
            <li>Vanilla CSS + framework-friendly consumption</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
