---
name: planned-overlays
description: >-
  Guidelines for alert dialogs, toast-style messages, and multi-step form progress
  UI in squid-lib-frontend before or while implementing them. Use when the user
  asks for Sweet Alert–like modals, toast notifications, stepper, wizard progress,
  or form section indicators in the design system.
---

# Planned overlays & progress UI

These components are **roadmap items** — when implementing, follow **component-creation**, **tokens-css-typescript**, and **library-guardrails**.

## Alert / confirm (Sweet Alert–like)

- Prefer **native semantics**: `role="alertdialog"`, `aria-modal="true"`, labelled title, focus trap, Escape to close, return focus to trigger.
- Structure: backdrop + panel; tokens for shadow/border; **`styles/components/alert-dialog.css`** when added.
- API sketch: `open`, `title`, `description`, `variant` (`info` | `warning` | `danger`), `confirmLabel`, `cancelLabel`, `onConfirm`, `onCancel`.
- Avoid heavy third-party modal libs unless product requires — keep bundle small.

## Toast / ephemeral message

- `role="status"` or `role="alert"` for errors; `aria-live="polite"` default.
- Stack at corner; auto-dismiss; pause on hover optional.
- CSS: **`styles/components/toast.css`**; z-index token if needed.

## Form progress / stepper

- Horizontal **steps** with `aria-current="step"` on active; optional click to navigate if UX allows.
- Props: `steps: { id, label, optional description }[]`, `currentStepId` or index, `orientation?: "horizontal" | "vertical"`.
- Use **tokens** for inactive/active/disabled segments; **`styles/components/stepper.css`**.

## Uniformity

- Same `FieldSize`-style enums where density matters.
- `className` escape hatch on root.
- Storybook: default, mobile width, keyboard story.
