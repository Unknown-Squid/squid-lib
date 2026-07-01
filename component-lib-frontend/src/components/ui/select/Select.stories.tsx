import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Select } from "./Select";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,20rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("md");
    return (
      <Select
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Density"
      >
        <option value="sm">Compact</option>
        <option value="md">Comfortable</option>
        <option value="lg">Spacious</option>
      </Select>
    );
  },
};
