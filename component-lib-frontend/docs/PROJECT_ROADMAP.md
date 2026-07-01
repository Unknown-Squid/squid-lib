# Squid lib frontend — project roadmap (checklist)

Phased checklist for **uniform components**, **design**, **functionality**, **responsiveness**, **flexibility** (props + vanilla CSS + npm/clone), and **ship-ready** output. Check boxes as you complete work.

> **Baseline:** Days **01–05** largely exist in the repo — walk through and tick when verified end-to-end.

---

## Phase 0 — Foundation (done / in progress)

| Day | Focus | Deliverables | ✓ |
|-----|--------|--------------|---|
| **Day_01** | Tokens & CSS architecture | `styles/tokens.css`, `styles/fields/*`, `styles/components/*`, `styles/index.css`, `styles/README.md` (vanilla usage) | ☑ |
| **Day_02** | TypeScript strict layer | `src/types/fields.ts`, `src/types/components.ts`, `styles.ts` class helpers aligned with CSS | ☑ |
| **Day_03** | Core form primitives | Input, Textarea, Select, Label, HelperText, FieldError, FormField + status badges | ☑ |
| **Day_04** | Actions & selection | Button, Checkbox, RadioGroup, Switch, Badge | ☑ |
| **Day_05** | Composite fields | PasswordField, FileInput; FormField + Zod (`src/validation/`) | ☑ |

---

## Phase 1 — Design polish & uniformity

| Day | Focus | Deliverables | ✓ |
|-----|--------|--------------|---|
| **Day_06** | Visual audit | All `ui/*` use tokens + `ui-*` classes; Storybook states (default, error, disabled, narrow) | ☑ |
| **Day_07** | Responsiveness pass | `w-full`, `min-w-0`, no fixed primitive widths; layout patterns in docs/templates | ☑ |
| **Day_08** | Code layout uniformity | `code-file-layout.mdc` applied across `src/components/ui` (imports + JSX comments) | ☑ |

---

## Phase 2 — Flexibility & consumption

| Day | Focus | Deliverables | ✓ |
|-----|--------|--------------|---|
| **Day_09** | Package exports | `package.json` exports documented; peer deps clear; clone + `file:` smoke test | ☑ |
| **Day_10** | Consumer CSS story | Document Tailwind host vs vanilla `tokens.css` + `fields/*.css` import order | ☑ |
| **Day_11** | Theming | `/theme` or token overrides; dark mode verified on primitives | ☑ |

---

## Phase 3 — New primitives (roadmap features)

| Day | Focus | Deliverables | ✓ |
|-----|--------|--------------|---|
| **Day_12** | **Alert / confirm** (Sweet Alert–like) | Headless dialog + `alert-dialog.css`, Storybook, a11y (focus trap, `alertdialog`) | ☑ |
| **Day_13** | **Toast** stack | Toast container + API + `toast.css`, `aria-live` | ☑ |
| **Day_14** | **Stepper / progress** | Multi-step indicator + `stepper.css`, keyboard + optional click | ☑ |

---

## Phase 4 — Finish product

| Day | Focus | Deliverables | ✓ |
|-----|--------|--------------|---|
| **Day_15** | Docs & playground | `/docs` + `/playground` cover all public components + validation patterns | ☑ |
| **Day_16** | Templates | Registration / settings / wizard examples use new overlays if shipped | ☑ |
| **Day_17** | Quality gate | ESLint clean, a11y addon pass on Storybook, changelog entry | ☑ |
| **Day_18** | **Release candidate** | Version bump strategy, publish README (npm), or “clone install” guide finalized | ☑ |

---

## Quick reference — rules & skills

| Need | Rule / skill |
|------|----------------|
| New component | `component-creation` skill + `component-ui-uniform` + `tokens-css-typescript` |
| Forms / Zod | `form-validation-zod` + `form-validation` skill |
| npm / CSS for hosts | `library-distribution` + `library-distribution-skill` |
| Modal / toast / steps | `planned-overlays` skill |
| All guardrails | `library-guardrails.mdc` |

---

## CHANGE LOG (roadmap itself)

| Date | Change |
|------|--------|
| 2026-05-20 | Marked Day_01–Day_18 complete after shipping alert-dialog, toast, stepper, docs/playground/templates coverage, quality checks, and release docs updates. |
