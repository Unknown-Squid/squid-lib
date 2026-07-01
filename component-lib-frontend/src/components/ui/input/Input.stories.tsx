import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,20rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="you@example.com"
      />
    );
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState("bad");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error
        aria-invalid
      />
    );
  },
};
