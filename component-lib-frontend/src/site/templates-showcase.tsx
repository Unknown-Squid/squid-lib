"use client";

import { useRef, useState } from "react";

import {
  AlertDialog,
  Badge,
  Button,
  Checkbox,
  FieldError,
  FileInput,
  FormField,
  Input,
  PasswordField,
  RadioGroup,
  RadioGroupItem,
  Select,
  Stepper,
  Switch,
  Textarea,
  useToast,
} from "@/components";
import { useSkippedFieldWarnings } from "@/hooks";
import type { TemplateCardProps } from "@/types/components";
import {
  emailFieldSchema,
  formFieldMessagesLive,
  passwordFieldSchema,
  registrationFormSchema,
  safeParseForm,
  validateFieldValue,
} from "@/validation";

function Card({ title, subtitle, children }: TemplateCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-100 px-6 py-5 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export function TemplatesShowcase() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <Card
        title="Registration"
        subtitle="Full-width fields, validation hints, and terms acceptance."
      >
        <RegistrationForm />
      </Card>
      <Card title="Login" subtitle="Email + password with compact layout.">
        <LoginForm />
      </Card>
      <Card title="Profile" subtitle="Bio, social handle, and avatar upload.">
        <ProfileForm />
      </Card>
      <Card title="Settings" subtitle="Toggles, locale, and theme preference.">
        <SettingsForm />
      </Card>
      <Card title="Team directory" subtitle="Search, filters, and row actions.">
        <CrudTable />
      </Card>
      <Card title="Invite member" subtitle="Modal dialog with embedded form.">
        <ModalInvite />
      </Card>
      <Card
        title="Wizard checkout"
        subtitle="Stepper + confirm dialog pattern (squid overlays)."
      >
        <WizardCheckoutDemo />
      </Card>
    </div>
  );
}

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const skipWarnings = useSkippedFieldWarnings(
    [
      { id: "firstName", order: 0, value: firstName },
      { id: "lastName", order: 1, value: lastName },
    ],
    activeField,
    "You skipped this field — complete it before continuing.",
  );

  const emailCheck = validateFieldValue(emailFieldSchema, email, {
    successMessage: "Email looks good.",
  });
  const passwordCheck = validateFieldValue(passwordFieldSchema, password, {
    successMessage: "Password meets requirements.",
  });

  return (
    <form
      className="mx-auto max-w-md space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        const parsed = safeParseForm(registrationFormSchema, {
          firstName,
          lastName,
          email,
          password,
          terms,
        });
        if (!parsed.success) {
          setFieldErrors(parsed.fieldErrors);
          return;
        }
        setFieldErrors({});
      }}
    >
      <FormField
        label="First name"
        required
        error={fieldErrors.firstName}
      >
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onFocus={() => setActiveField("firstName")}
          autoComplete="given-name"
        />
      </FormField>
      <FormField
        label="Last name"
        required
        error={fieldErrors.lastName}
        warning={skipWarnings.lastName}
      >
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onFocus={() => setActiveField("lastName")}
          autoComplete="family-name"
        />
      </FormField>
      <FormField
        label="Work email"
        description="We send a verification link."
        required
        {...formFieldMessagesLive(emailCheck, {
          touched: email.length > 0,
          submitted,
        })}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </FormField>
      <FormField
        label="Password"
        description="At least 6 characters with one letter and one number."
        required
        {...formFieldMessagesLive(passwordCheck, {
          touched: password.length > 0,
          submitted,
        })}
      >
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </FormField>
      <Checkbox
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
        label="I agree to the Terms of Service and Privacy Policy."
      />
      <Button type="submit" className="w-full">
        Create account
      </Button>
    </form>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="mx-auto max-w-sm space-y-5">
      <FormField label="Email" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
      </FormField>
      <FormField label="Password" required>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <div className="flex items-center justify-between text-sm">
        <Checkbox defaultChecked label="Remember me" />
        <button
          type="button"
          className="font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Forgot password?
        </button>
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  );
}

function ProfileForm() {
  const [display, setDisplay] = useState("Jordan Lee");
  const [handle, setHandle] = useState("jordan");
  const [bio, setBio] = useState(
    "Design systems engineer. Building calm interfaces.",
  );

  return (
    <form className="mx-auto max-w-2xl space-y-5">
      <FormField label="Display name" required>
        <Input value={display} onChange={(e) => setDisplay(e.target.value)} />
      </FormField>
      <FormField
        label="Username"
        description="Lowercase letters and numbers only."
        required
      >
        <Input value={handle} onChange={(e) => setHandle(e.target.value)} />
      </FormField>
      <FormField
        label="Bio"
        info="Include a short intro — this appears on your public profile and in search."
      >
        <Textarea rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
      </FormField>
      <FormField
        label="Avatar"
        description="PNG or JPG, up to 2 MB. Shown on your profile card."
      >
        <FileInput accept="image/*" aria-label="Upload avatar" />
      </FormField>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary">
          Discard
        </Button>
        <Button type="submit">Save profile</Button>
      </div>
    </form>
  );
}

function SettingsForm() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [locale, setLocale] = useState("en-US");
  const [density, setDensity] = useState("comfortable");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Notifications
        </h3>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Product updates
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Security patches and changelog highlights.
            </p>
          </div>
          <Switch
            checked={emailNotif}
            onCheckedChange={setEmailNotif}
            aria-label="Product updates"
          />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Marketing
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Tips, webinars, and partner offers.
            </p>
          </div>
          <Switch
            checked={marketing}
            onCheckedChange={setMarketing}
            aria-label="Marketing emails"
          />
        </div>
      </div>
      <div className="space-y-6">
        <FormField label="Language & region">
          <Select
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            aria-label="Locale"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="ja-JP">日本語</option>
          </Select>
        </FormField>
        <FormField label="Density" labelAssociation="aria-labelledby">
          <RadioGroup value={density} onValueChange={setDensity}>
            <RadioGroupItem value="compact" label="Compact" />
            <RadioGroupItem value="comfortable" label="Comfortable" />
            <RadioGroupItem value="spacious" label="Spacious" />
          </RadioGroup>
        </FormField>
      </div>
    </div>
  );
}

const rows = [
  { id: "1", name: "Avery Chen", role: "Admin", status: "Active" },
  { id: "2", name: "Morgan Blake", role: "Editor", status: "Active" },
  { id: "3", name: "Riley Park", role: "Viewer", status: "Invited" },
];

function CrudTable() {
  const [q, setQ] = useState("");

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          className="max-w-xs"
          placeholder="Search people…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search"
        />
        <Button type="button">Add member</Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((r) => (
              <tr key={r.id} className="bg-white dark:bg-zinc-950">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {r.name}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {r.role}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={r.status === "Invited" ? "warning" : "success"}>
                    {r.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-end">
                  <Button type="button" variant="secondary" className="px-3 py-1.5 text-xs">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 ? (
        <FieldError>No matches for that search.</FieldError>
      ) : null}
    </div>
  );
}

function ModalInvite() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  return (
    <div>
      <Button type="button" onClick={() => dialogRef.current?.showModal()}>
        Open invite dialog
      </Button>
      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-black/40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
      >
        <form
          method="dialog"
          className="flex flex-col"
          onSubmit={() => {
            setEmail("");
            setRole("editor");
          }}
        >
          <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <h3 className="text-base font-semibold">Invite teammate</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              They will receive an email with a secure join link.
            </p>
          </div>
          <div className="space-y-4 px-6 py-5">
            <FormField label="Email" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
              />
            </FormField>
            <FormField label="Role">
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Role"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </Select>
            </FormField>
          </div>
          <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <Button
              type="button"
              variant="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </Button>
            <Button type="submit">Send invite</Button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

function WizardCheckoutDemo() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const steps = [
    { id: "cart", label: "Cart" },
    { id: "ship", label: "Shipping" },
    { id: "pay", label: "Payment" },
    { id: "done", label: "Confirm" },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Stepper steps={steps} currentIndex={step} onStepClick={setStep} />
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        Step {step + 1} of {steps.length} — wire your own step content here.
      </div>
      <div className="flex justify-between gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={step <= 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
            Continue
          </Button>
        ) : (
          <Button type="button" variant="danger" onClick={() => setConfirmOpen(true)}>
            Place order
          </Button>
        )}
      </div>
      <AlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Submit order?"
        description="Payment will be processed using your saved method."
        variant="danger"
        cancelLabel="Review"
        confirmLabel="Place order"
        onConfirm={() => toast({ title: "Order submitted", variant: "success" })}
      />
    </div>
  );
}
