"use client";

import { useState, type ReactNode } from "react";

import {
  AlertDialog,
  Badge,
  Button,
  Checkbox,
  FieldError,
  FileInput,
  FormField,
  HelperText,
  Input,
  Label,
  PasswordField,
  RadioGroup,
  RadioGroupItem,
  Select,
  Stepper,
  Switch,
  Textarea,
  useToast,
} from "@/components";

import { CodeBlock } from "./code-block";
import type { PropRow } from "./props-table";
import { PropsTable } from "./props-table";

function PreviewCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {children}
    </div>
  );
}

function Section({
  id,
  title,
  description,
  importLine,
  props,
  variants,
  code,
  preview,
}: {
  id: string;
  title: string;
  description: string;
  importLine: string;
  props: PropRow[];
  variants?: { name: string; text: string }[];
  code: string;
  preview: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6 border-b border-zinc-100 pb-16 dark:border-zinc-900">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Live preview
        </p>
        <PreviewCard>{preview}</PreviewCard>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Import
        </p>
        <CodeBlock>{importLine}</CodeBlock>
      </div>
      {variants && variants.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Variants
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {variants.map((v) => (
              <li key={v.name}>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {v.name}
                </span>
                {" — "}
                {v.text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Props
        </p>
        <PropsTable rows={props} />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Example
        </p>
        <CodeBlock>{code}</CodeBlock>
      </div>
    </section>
  );
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button">Primary</Button>
      <Button type="button" variant="secondary">
        Secondary
      </Button>
      <Button type="button" variant="ghost">
        Ghost
      </Button>
      <Button type="button" variant="danger">
        Danger
      </Button>
      <Button type="button" disabled>
        Disabled
      </Button>
    </div>
  );
}

function InputPreview() {
  const [v, setV] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-4">
      <Input
        placeholder="Email"
        value={v}
        onChange={(e) => setV(e.target.value)}
      />
    </div>
  );
}

function TextareaPreview() {
  const [v, setV] = useState("");
  return (
    <Textarea
      className="max-w-md"
      placeholder="Message"
      value={v}
      onChange={(e) => setV(e.target.value)}
    />
  );
}

function SelectPreview() {
  const [v, setV] = useState("md");
  return (
    <Select
      className="max-w-xs"
      value={v}
      onChange={(e) => setV(e.target.value)}
      aria-label="Size"
    >
      <option value="sm">Small</option>
      <option value="md">Medium</option>
      <option value="lg">Large</option>
    </Select>
  );
}

function CheckboxPreview() {
  const [c, setC] = useState(true);
  return (
    <Checkbox
      checked={c}
      onChange={(e) => setC(e.target.checked)}
      label="Accept updates"
    />
  );
}

function RadioPreview() {
  const [v, setV] = useState("a");
  return (
    <RadioGroup value={v} onValueChange={setV} className="max-w-xs">
      <RadioGroupItem value="a" label="Option A" />
      <RadioGroupItem value="b" label="Option B" />
    </RadioGroup>
  );
}

function SwitchPreview() {
  const [on, setOn] = useState(false);
  return <Switch checked={on} onCheckedChange={setOn} aria-label="Enable" />;
}

function PasswordPreview() {
  const [v, setV] = useState("");
  return (
    <PasswordField
      className="max-w-md"
      value={v}
      onChange={(e) => setV(e.target.value)}
      placeholder="Password"
      autoComplete="new-password"
    />
  );
}

function FilePreview() {
  return <FileInput aria-label="Attachment" />;
}

function LabelPreview() {
  return (
    <div className="space-y-2">
      <Label htmlFor="demo-label">Display name</Label>
      <Input id="demo-label" placeholder="Ada Lovelace" />
    </div>
  );
}

function HelperPreview() {
  return <HelperText>Visible on your public profile.</HelperText>;
}

function FieldErrorPreview() {
  return <FieldError>Password must be at least 12 characters.</FieldError>;
}

function FormFieldPreview() {
  const [email, setEmail] = useState("you@company.com");
  return (
    <FormField
      label="Work email"
      description="Invoices go here."
      success="Email looks good."
      required
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
      />
    </FormField>
  );
}

function AlertDialogDocsPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        Open sample dialog
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        description="Accessible modal with focus trap, Escape to close, and alertdialog semantics."
        variant="warning"
        cancelLabel="Cancel"
        confirmLabel="Continue"
      />
    </>
  );
}

function ToastDocsPreview() {
  const toast = useToast();
  return (
    <Button
      type="button"
      onClick={() =>
        toast({ title: "Operation completed.", variant: "success" })
      }
    >
      Trigger toast
    </Button>
  );
}

function StepperDocsPreview() {
  const steps = [
    { id: "1", label: "Basics" },
    { id: "2", label: "Details" },
    { id: "3", label: "Review" },
  ];
  return (
    <Stepper steps={steps} currentIndex={1} aria-label="Wizard progress" />
  );
}

export function DocsContent() {
  return (
    <div className="space-y-16">
      <Section
        id="button"
        title="Button"
        description="Primary actions and secondary actions. Uses native button semantics."
        importLine={`import { Button } from "@/components";`}
        props={[
          {
            name: "variant",
            type: '"primary" | "secondary" | "ghost" | "danger" | "success"',
            default: '"primary"',
            description: "Visual style.",
          },
          {
            name: "className",
            type: "string",
            description: "Tailwind classes merged onto the button.",
          },
          {
            name: "...props",
            type: "ButtonHTMLAttributes",
            description: "All standard button attributes.",
          },
        ]}
        variants={[
          { name: "primary", text: "Filled emphasis for main CTAs." },
          { name: "secondary", text: "Bordered surface style." },
          { name: "ghost", text: "Transparent until hover." },
          { name: "danger", text: "Destructive actions." },
          { name: "success", text: "Positive confirmations." },
        ]}
        code={`<Button type="button">Save</Button>
<Button type="button" variant="secondary">Cancel</Button>
<Button type="button" variant="danger">Delete</Button>`}
        preview={<ButtonPreview />}
      />

      <Section
        id="badge"
        title="Badge"
        description="Pill labels for status and metadata. Background-only, no border."
        importLine={`import { Badge } from "@/components";`}
        props={[
          {
            name: "variant",
            type: '"default" | "info" | "success" | "warning" | "danger"',
            default: '"default"',
            description: "Semantic color pairing.",
          },
          {
            name: "showIcon",
            type: "boolean",
            default: "true",
            description: "Renders the built-in variant icon at 13px.",
          },
          {
            name: "icon",
            type: "ReactNode | null",
            description: "Override variant icon; pass null to hide.",
          },
        ]}
        variants={[
          { name: "default", text: "Neutral metadata." },
          { name: "info", text: "Informational state." },
          { name: "success", text: "Positive state." },
          { name: "warning", text: "Caution state." },
          { name: "danger", text: "Critical state." },
        ]}
        code={`<Badge variant="success">Active</Badge>`}
        preview={
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        }
      />

      <Section
        id="input"
        title="Input"
        description="36px text field using semantic border, focus ring, and error tokens."
        importLine={`import { Input } from "@/components";`}
        props={[
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Height and font scale.",
          },
          {
            name: "error",
            type: "boolean",
            description: "When true, shows invalid styling (also respects aria-invalid).",
          },
          {
            name: "className",
            type: "string",
            description: "Additional classes.",
          },
        ]}
        code={`<Input value={email} onChange={(e) => setEmail(e.target.value)} />`}
        preview={<InputPreview />}
      />

      <Section
        id="textarea"
        title="Textarea"
        description="Multi-line field with shared border and focus tokens (10px 12px padding)."
        importLine={`import { Textarea } from "@/components";`}
        props={[
          {
            name: "error",
            type: "boolean",
            description: "Invalid styling.",
          },
        ]}
        code={`<Textarea value={bio} onChange={(e) => setBio(e.target.value)} />`}
        preview={<TextareaPreview />}
      />

      <Section
        id="select"
        title="Select"
        description="Native select with consistent height, chevron affordance, and error styling."
        importLine={`import { Select } from "@/components";`}
        props={[
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Control size.",
          },
          {
            name: "error",
            type: "boolean",
            description: "Invalid styling.",
          },
        ]}
        code={`<Select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="admin">Admin</option>
  <option value="member">Member</option>
</Select>`}
        preview={<SelectPreview />}
      />

      <Section
        id="checkbox"
        title="Checkbox"
        description="Styled native checkbox; pair with Label for accessible naming."
        importLine={`import { Checkbox } from "@/components";`}
        props={[
          {
            name: "error",
            type: "boolean",
            description: "Invalid styling.",
          },
          {
            name: "...props",
            type: "InputHTMLAttributes",
            description: "Standard input attributes (checked, onChange, etc.).",
          },
        ]}
        code={`<label className="flex gap-2">
  <Checkbox checked={ok} onChange={(e) => setOk(e.target.checked)} />
  I agree
</label>`}
        preview={<CheckboxPreview />}
      />

      <Section
        id="radio-group"
        title="RadioGroup"
        description="Fieldset-based group with controlled or uncontrolled value. Use RadioGroupItem for each option."
        importLine={`import { RadioGroup, RadioGroupItem } from "@/components";`}
        props={[
          {
            name: "value",
            type: "string",
            description: "Controlled selected value.",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            description: "Called when selection changes.",
          },
          {
            name: "defaultValue",
            type: "string",
            default: '""',
            description: "Initial value when uncontrolled.",
          },
          {
            name: "name",
            type: "string",
            description: "Optional radio name override.",
          },
        ]}
        code={`<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioGroupItem value="free" label="Free" />
  <RadioGroupItem value="pro" label="Pro" />
</RadioGroup>`}
        preview={<RadioPreview />}
      />

      <Section
        id="switch"
        title="Switch"
        description="Accessible switch built on a button with role=switch."
        importLine={`import { Switch } from "@/components";`}
        props={[
          {
            name: "checked",
            type: "boolean",
            description: "Whether the switch is on.",
          },
          {
            name: "onCheckedChange",
            type: "(checked: boolean) => void",
            description: "Toggle handler.",
          },
          {
            name: "error",
            type: "boolean",
            description: "Shows invalid ring when true.",
          },
        ]}
        code={`<Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />`}
        preview={<SwitchPreview />}
      />

      <Section
        id="password-field"
        title="PasswordField"
        description="Password input with optional visibility toggle; extends Input styling."
        importLine={`import { PasswordField } from "@/components";`}
        props={[
          {
            name: "showVisibilityToggle",
            type: "boolean",
            default: "true",
            description: "Show show/hide control.",
          },
          {
            name: "visibilityLabels",
            type: "{ show: string; hide: string }",
            description: "Copy for the toggle button.",
          },
          {
            name: "...props",
            type: "InputProps",
            description: "Forwarded to the inner Input (minus type).",
          },
        ]}
        code={`<PasswordField
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="new-password"
/>`}
        preview={<PasswordPreview />}
      />

      <Section
        id="file-input"
        title="FileInput"
        description="Native file picker with consistent field chrome and file button styling."
        importLine={`import { FileInput } from "@/components";`}
        props={[
          {
            name: "variant",
            type: '"outline" | "ghost"',
            default: '"outline"',
            description: "Surface style.",
          },
          {
            name: "multiple",
            type: "boolean",
            description: "From native input — allow multiple files.",
          },
        ]}
        code={`<FileInput accept="image/*" aria-label="Avatar" />`}
        preview={<FilePreview />}
      />

      <Section
        id="label"
        title="Label"
        description="Text label with optional required marker; use htmlFor to target controls."
        importLine={`import { Label } from "@/components";`}
        props={[
          {
            name: "htmlFor",
            type: "string",
            description: "Matches control id.",
          },
          {
            name: "requiredIndicator",
            type: "ReactNode | boolean",
            description: "Pass true for asterisk, or custom node.",
          },
        ]}
        code={`<Label htmlFor="name" requiredIndicator>
  Full name
</Label>`}
        preview={<LabelPreview />}
      />

      <Section
        id="helper-text"
        title="HelperText"
        description="Muted supporting copy under fields; set id for aria-describedby wiring."
        importLine={`import { HelperText } from "@/components";`}
        props={[
          {
            name: "...props",
            type: "HTMLAttributes<p>",
            description: "Standard paragraph attributes.",
          },
        ]}
        code={`<HelperText id="email-hint">Must be unique.</HelperText>`}
        preview={<HelperPreview />}
      />

      <Section
        id="field-error"
        title="FieldError"
        description="Error message with role=alert for assistive tech."
        importLine={`import { FieldError } from "@/components";`}
        props={[
          {
            name: "role",
            type: "string",
            default: '"alert"',
            description: "ARIA role override if needed.",
          },
        ]}
        code={`<FieldError>This slug is taken.</FieldError>`}
        preview={<FieldErrorPreview />}
      />

      <Section
        id="form-field"
        title="FormField"
        description="Composes label, control, helper, and a status badge above the label. Badge priority: error → warning → success → info. Passes fieldStatus to Input/Textarea/Select for focus rings. For RadioGroup set labelAssociation to aria-labelledby."
        importLine={`import { FormField, Input } from "@/components";`}
        props={[
          {
            name: "label",
            type: "ReactNode",
            description: "Primary label.",
          },
          {
            name: "description",
            type: "ReactNode",
            description: "Helper text below the control.",
          },
          {
            name: "error",
            type: "ReactNode",
            description: "Danger badge + red focus ring; sets aria-invalid.",
          },
          {
            name: "success",
            type: "ReactNode",
            description: "Success badge + green ring when validation passes.",
          },
          {
            name: "warning",
            type: "ReactNode",
            description: "Warning badge + amber ring (e.g. skipped field in order).",
          },
          {
            name: "info",
            type: "ReactNode",
            description: "Info badge for extra context (e.g. textarea guidance).",
          },
          {
            name: "labelAssociation",
            type: '"htmlFor" | "aria-labelledby"',
            default: '"htmlFor"',
            description: "How the label associates with the child.",
          },
          {
            name: "children",
            type: "ReactElement",
            description: "Single form control (Input, Select, etc.).",
          },
        ]}
        code={`<FormField label="Email" success="Email looks good." required>
  <Input type="email" value={email} onChange={...} />
</FormField>`}
        preview={<FormFieldPreview />}
      />

      <Section
        id="alert-dialog"
        title="AlertDialog"
        description="Sweet Alert–style confirm dialog: portal overlay, alertdialog role, focus trap, Escape and optional backdrop dismiss."
        importLine={`import { AlertDialog, Button } from "@/components";`}
        props={[
          { name: "open", type: "boolean", description: "Visibility." },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Close handler.",
          },
          { name: "title", type: "ReactNode", description: "Dialog title." },
          { name: "description", type: "ReactNode", description: "Body copy." },
          {
            name: "variant",
            type: `"default" | "info" | "warning" | "danger"`,
            description: "Visual tone.",
          },
          {
            name: "confirmLabel / cancelLabel",
            type: "ReactNode",
            description: "Action labels; omit cancel for single action.",
          },
        ]}
        code={`<AlertDialog open={open} onOpenChange={setOpen} title="Remove?" variant="danger" cancelLabel="Back" confirmLabel="Remove" />`}
        preview={<AlertDialogDocsPreview />}
      />

      <Section
        id="toast"
        title="Toast"
        description="Brief notifications stacked bottom-right; wrap app with ToastProvider (root layout). Fire with useToast()."
        importLine={`import { useToast } from "@/components";`}
        props={[
          {
            name: "ToastProvider",
            type: "component",
            description: "Root wrapper.",
          },
          {
            name: "toast()",
            type: "{ title; variant?; duration? }",
            description: "From useToast().",
          },
        ]}
        code={`const toast = useToast();\ntoast({ title: "Saved.", variant: "success" });`}
        preview={<ToastDocsPreview />}
      />

      <Section
        id="stepper"
        title="Stepper"
        description="Horizontal step indicator for wizards; optional onStepClick for completed and current steps."
        importLine={`import { Stepper } from "@/components";`}
        props={[
          { name: "steps", type: "{ id, label }[]", description: "Step metadata." },
          {
            name: "currentIndex",
            type: "number",
            description: "Active step index.",
          },
          {
            name: "onStepClick",
            type: "(index) => void",
            description: "Optional navigation.",
          },
        ]}
        code={`<Stepper steps={wizardSteps} currentIndex={step} onStepClick={setStep} />`}
        preview={<StepperDocsPreview />}
      />
    </div>
  );
}
