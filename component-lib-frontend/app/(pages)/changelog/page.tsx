export const metadata = {
  title: "Changelog",
  description: "Recent updates to the component library.",
};

export default function ChangelogPage() {
  const entries = [
    {
      version: "0.2.0",
      date: "2026-05-20",
      items: [
        "New primitives: AlertDialog, ToastProvider/useToast, and Stepper with Storybook coverage.",
        "Docs and playground now include alert, toast, and stepper usage patterns.",
        "Templates include a wizard checkout flow using stepper + confirmation dialog.",
      ],
    },
    {
      version: "0.1.0",
      date: "2026-05-14",
      items: [
        "Documentation site: home, docs, templates, playground, about.",
        "Form primitives: Input, Textarea, Select, Checkbox, RadioGroup, Switch, PasswordField, FileInput, FormField, Label, HelperText, FieldError.",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Changelog
      </h1>
      <ul className="space-y-10">
        {entries.map((e) => (
          <li key={e.version} className="border-b border-zinc-100 pb-10 dark:border-zinc-900">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {e.version}
              </span>
              <time className="text-sm text-zinc-500" dateTime={e.date}>
                {e.date}
              </time>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {e.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
