import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../Button";
import { ToastProvider, useToast } from "./ToastProvider";

const meta = {
  title: "UI/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => toast({ title: "Default toast" })}>
        Default
      </Button>
      <Button
        type="button"
        variant="success"
        onClick={() =>
          toast({ title: "Saved successfully", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        type="button"
        variant="danger"
        onClick={() => toast({ title: "Something failed", variant: "danger" })}
      >
        Danger
      </Button>
    </div>
  );
}

export const Showcase: Story = {
  args: {
    children: null,
  },
  render: () => <Demo />,
};
