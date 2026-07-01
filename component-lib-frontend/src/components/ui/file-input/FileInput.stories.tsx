import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FileInput } from "./FileInput";

const meta = {
  title: "UI/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(100vw-2rem,24rem)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Upload file",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    "aria-label": "Upload file",
  },
};

export const Error: Story = {
  args: {
    error: true,
    "aria-label": "Upload file",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Upload file",
  },
};

export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
  args: {
    "aria-label": "Upload file",
  },
};
