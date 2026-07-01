import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactElement } from "react";
import { useState } from "react";

import { FormField } from "./FormField";
import { Input } from "../input";
import { PasswordField } from "../password-field";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Textarea } from "../textarea";
import { passwordFieldSchema, validateFieldValue } from "@/validation";

const meta = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,22rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const dummyChild = <span /> as unknown as ReactElement<Record<string, unknown>>;

export const WithInput: Story = {
  args: {
    label: "Email",
    description: "Used for login and receipts.",
    required: true,
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("");
    return (
      <FormField {...rest}>
        <Input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </FormField>
    );
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    description: "Used for login and receipts.",
    error: "Enter a valid email address.",
    required: true,
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("oops");
    return (
      <FormField {...rest}>
        <Input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </FormField>
    );
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Password",
    description: "Min 6 chars, one letter and one number.",
    required: true,
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("secret1");
    const check = validateFieldValue(passwordFieldSchema, value, {
      successMessage: "Password meets requirements.",
    });
    return (
      <FormField
        {...rest}
        error={value && !check.valid ? check.message : undefined}
        success={value && check.valid ? check.message : undefined}
      >
        <PasswordField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="new-password"
        />
      </FormField>
    );
  },
};

export const WithWarning: Story = {
  args: {
    label: "Last name",
    required: true,
    warning: "You skipped this field — complete it first.",
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("");
    return (
      <FormField {...rest}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="family-name"
        />
      </FormField>
    );
  },
};

export const WithInfo: Story = {
  args: {
    label: "Message",
    info: "We usually reply within one business day.",
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("");
    return (
      <FormField {...rest}>
        <Textarea
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="How can we help?"
        />
      </FormField>
    );
  },
};

export const WithRadioGroup: Story = {
  args: {
    label: "Plan",
    description: "You can change this later.",
    required: true,
    labelAssociation: "aria-labelledby",
    children: dummyChild,
  },
  render: ({ children, ...rest }) => {
    void children;
    const [value, setValue] = useState("pro");
    return (
      <FormField {...rest}>
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupItem value="free" label="Free" />
          <RadioGroupItem value="pro" label="Pro" />
          <RadioGroupItem value="team" label="Team" />
        </RadioGroup>
      </FormField>
    );
  },
};
