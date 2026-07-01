import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,22rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLegend: Story = {
  render: () => {
    const [value, setValue] = useState("pro");
    return (
      <RadioGroup
        legend="Billing plan"
        value={value}
        onValueChange={setValue}
        name="plan"
      >
        <RadioGroupItem value="free" label="Free" />
        <RadioGroupItem value="pro" label="Pro" />
        <RadioGroupItem value="team" label="Team" />
      </RadioGroup>
    );
  },
};
