import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Stepper } from "./Stepper";

const steps = [
  { id: "1", label: "Account" },
  { id: "2", label: "Organization" },
  { id: "3", label: "Billing" },
  { id: "4", label: "Review" },
];

const meta = {
  title: "UI/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step2: Story = {
  args: {
    steps,
    currentIndex: 1,
    "aria-label": "Onboarding progress",
  },
};

export const Interactive: Story = {
  args: {
    steps,
    currentIndex: 0,
  },
  render: () => {
    const [i, setI] = useState(0);
    return (
      <div className="w-full max-w-2xl space-y-4">
        <Stepper steps={steps} currentIndex={i} onStepClick={setI} />
        <div className="flex gap-2">
          <button type="button" className="ui-btn ui-btn--secondary ui-btn--md" disabled={i <= 0} onClick={() => setI((x) => Math.max(0, x - 1))}>
            Back
          </button>
          <button type="button" className="ui-btn ui-btn--primary ui-btn--md" disabled={i >= steps.length - 1} onClick={() => setI((x) => Math.min(steps.length - 1, x + 1))}>
            Next
          </button>
        </div>
      </div>
    );
  },
};
