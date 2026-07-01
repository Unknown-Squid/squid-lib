import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { AlertDialog } from "./AlertDialog";
import { Button } from "../Button";

const meta = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Stateful() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This cannot be undone. All data for this project will be removed."
        variant="danger"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onConfirm={() => {}}
      />
    </>
  );
}

export const DangerConfirm: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Delete project?",
  },
  render: () => <Stateful />,
};

export const Info: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Invitation sent",
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
          Open
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Invitation sent"
          description="They will receive an email with a link to join."
          variant="info"
          confirmLabel="Great"
          cancelLabel={undefined}
        />
      </>
    );
  },
};
