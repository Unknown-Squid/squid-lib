"use client";

import { useState } from "react";

import {
  AlertDialog,
  Badge,
  Button,
  Checkbox,
  FormField,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  Stepper,
  Switch,
  Textarea,
  useToast,
} from "@/components";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-[length:var(--font-size-section-label)] font-medium tracking-[0.08em] text-[var(--color-text-tertiary)] uppercase">
      {children}
    </p>
  );
}

function Divider() {
  return (
    <hr className="my-6 border-0 border-t-[0.5px] border-[var(--color-border-tertiary)]" />
  );
}

export function PlaygroundPanel() {
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("a");
  const [notifOn, setNotifOn] = useState(true);
  const [notifOff, setNotifOff] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const toast = useToast();

  return (
    <div className="pb-8" role="main">
      <section className="mb-10">
        <SectionLabel>Buttons — Variant</SectionLabel>
        <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
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
          <Button type="button" variant="success">
            Success
          </Button>
        </div>
        <SectionLabel>Buttons — Size</SectionLabel>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button type="button" size="sm">
            Small
          </Button>
          <Button type="button">Default</Button>
          <Button type="button" size="lg">
            Large
          </Button>
          <Button type="button" variant="secondary" size="sm" iconOnly aria-label="Settings small">
            ⚙
          </Button>
          <Button type="button" variant="secondary" iconOnly aria-label="Settings">
            ⚙
          </Button>
          <Button type="button" variant="secondary" size="lg" iconOnly aria-label="Settings large">
            ⚙
          </Button>
          <Button type="button" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <Divider />

      <section className="mb-10">
        <SectionLabel>Text Input</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Default" description="Helper text goes here">
            <Input placeholder="Placeholder text" />
          </FormField>
          <FormField label="With icon">
            <Input
              leadingIcon={<span>⌕</span>}
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormField>
          <FormField label="Error state" error="This field is required">
            <Input defaultValue="bad-input" />
          </FormField>
          <FormField label="Success state" success="Looks good.">
            <Input defaultValue="valid-input" />
          </FormField>
          <FormField
            label="Warning state"
            warning="You skipped this field — complete it first."
          >
            <Input placeholder="Last name" />
          </FormField>
          <FormField label="Disabled" description="This field is disabled">
            <Input placeholder="Can't touch this" disabled />
          </FormField>
        </div>
      </section>

      <Divider />

      <section className="mb-10">
        <SectionLabel>Select</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="Dropdown" description="Pick one from the list">
            <Select defaultValue="">
              <option value="" disabled>
                Choose an option
              </option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
          </FormField>
          <FormField label="Pre-selected">
            <Select defaultValue="b">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
              <option value="c">Option C</option>
            </Select>
          </FormField>
        </div>
      </section>

      <Divider />

      <section className="mb-10">
        <SectionLabel>Textarea</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            label="With info"
            info="Include context so we can route your request."
            description="Max 500 characters"
          >
            <Textarea rows={3} placeholder="Write something here…" />
          </FormField>
          <FormField label="Error state" error="Content violates policy">
            <Textarea rows={3} defaultValue="Some content that is invalid" />
          </FormField>
        </div>
      </section>

      <Divider />

      <section className="mb-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <SectionLabel>Checkbox</SectionLabel>
            <div className="flex flex-col gap-2.5">
              <Checkbox defaultChecked label="Checked" />
              <Checkbox indeterminate label="Indeterminate" />
              <Checkbox label="Unchecked" />
              <Checkbox defaultChecked disabled label="Disabled" mutedLabel />
            </div>
          </div>
          <div>
            <SectionLabel>Radio</SectionLabel>
            <RadioGroup value={plan} onValueChange={setPlan}>
              <RadioGroupItem value="a" label="Selected" />
              <RadioGroupItem value="b" label="Unselected" />
              <RadioGroupItem value="c" label="Unselected" />
            </RadioGroup>
            <div className="mt-2.5">
              <RadioGroup defaultValue="x" name="disabled-demo">
                <RadioGroupItem value="x" label="Disabled" disabled />
              </RadioGroup>
            </div>
          </div>
          <div>
            <SectionLabel>Switch</SectionLabel>
            <div className="flex flex-col gap-2.5">
              <Switch checked={notifOn} onCheckedChange={setNotifOn} label="On" />
              <Switch checked={notifOff} onCheckedChange={setNotifOff} label="Off" />
              <Switch checked disabled label="Disabled on" mutedLabel />
              <Switch checked={false} disabled label="Disabled off" mutedLabel />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section>
        <SectionLabel>Badges</SectionLabel>
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge>Default</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      <Divider />

      <section className="mb-10 space-y-4">
        <SectionLabel>Alert, toast, stepper</SectionLabel>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setAlertOpen(true)}
          >
            Open alert dialog
          </Button>
          <Button
            type="button"
            onClick={() => toast({ title: "Example toast", variant: "info" })}
          >
            Show toast
          </Button>
        </div>
        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Discard changes?"
          description="You have unsaved edits. This action cannot be undone."
          variant="warning"
          cancelLabel="Keep editing"
          confirmLabel="Discard"
        />
        <Stepper
          steps={[
            { id: "s1", label: "Profile" },
            { id: "s2", label: "Plan" },
            { id: "s3", label: "Pay" },
            { id: "s4", label: "Done" },
          ]}
          currentIndex={wizardStep}
          onStepClick={setWizardStep}
          aria-label="Checkout steps"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={wizardStep <= 0}
            onClick={() => setWizardStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={wizardStep >= 3}
            onClick={() => setWizardStep((s) => Math.min(3, s + 1))}
          >
            Next
          </Button>
        </div>
      </section>
    </div>
  );
}
