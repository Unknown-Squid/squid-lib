import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FieldError } from "./FieldError";

const meta = {
  title: "UI/FieldError",
  component: FieldError,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof FieldError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Please enter a valid email address.",
  },
};
