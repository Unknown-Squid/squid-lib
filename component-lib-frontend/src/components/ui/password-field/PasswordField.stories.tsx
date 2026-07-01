import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { PasswordField } from "./PasswordField";

const meta = {
  title: "UI/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,20rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <PasswordField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Password"
        autoComplete="new-password"
        visibilityLabels={{ show: "Show", hide: "Hide" }}
      />
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState("short");
    return (
      <PasswordField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error
        placeholder="Password"
        autoComplete="new-password"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Password",
    value: "••••••••",
  },
};
