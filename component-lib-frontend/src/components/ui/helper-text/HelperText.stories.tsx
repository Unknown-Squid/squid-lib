import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HelperText } from "./HelperText";

const meta = {
  title: "UI/HelperText",
  component: HelperText,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "We will never share your email.",
  },
};
