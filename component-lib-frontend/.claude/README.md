# Cursor AI workflows for this repo

This folder wires **persistent guidance** (rules), **on-demand playbooks** (skills), and optional **repo-wide agent hints** so Cursor agents behave consistently.

## Start here (orchestration)

**[ORCHESTRATION.md](ORCHESTRATION.md)** — read **before** coding: how rules + skills load after each prompt, tables of all files, pre/post checklists. Root **[`../AGENTS.md`](../AGENTS.md)** points here for Cursor agents.

## What each mechanism does

| Mechanism | Where it lives | When the agent sees it | Best for |
|-----------|----------------|------------------------|----------|
| **Project rules** | `.cursor/rules/*.mdc` | Auto: always, or when open files match `globs` | Standards, guardrails, “always do X in TS/React” |
| **Project skills** | `.cursor/skills/.../SKILL.md` | When the skill matches the task or you **invoke it by name** | Multi-step workflows, checklists, domain procedures |
| **Personal skills** | `~/.cursor/skills/<name>/` (your machine) | Same as skills, but **every repo** | Your private playbooks (deploy, internal APIs) |
| **Built-in Cursor skills** | `~/.cursor/skills-cursor/` | Do **not** edit | `create-rule`, `create-skill`, `babysit`, `split-to-prs`, SDK, etc. |

Rules = *always-on or file-scoped policy*. Skills = *procedures the model loads when relevant*.

## How to leverage this as a human

1. **Tune rules** — Edit `.cursor/rules/*.mdc`. Prefer `globs` over `alwaysApply: true` except `agent-workflow.mdc`.
2. **Add skills** — Copy `squid-component-library/*/SKILL.md` as templates; rich **WHAT + WHEN** in YAML `description`.
3. **Roadmap** — `component-lib-frontend/PROJECT_ROADMAP.md` (Day_01 … Day_18).
4. **Prompts** — “Follow **library-guardrails**”, “**planned-overlays** for stepper”, “**library-distribution** for npm exports”.

## How agents should use this repo

1. Read **this README** when touching `component-lib-frontend/`.
2. **`library-guardrails.mdc`** — pick applicable sub-rules.
3. **`PROJECT_ROADMAP.md`** — align work to the next unchecked day when doing phased delivery.

## Orchestration

```
User prompt → library-guardrails → scoped rules → skills → code
```

## Files in `.cursor`

### Rules (`rules/`)

| File | Role |
|------|------|
| `agent-workflow.mdc` | `alwaysApply` — rule stack + `tsc`/`build` + roadmap pointer |
| `library-guardrails.mdc` | Master index of all guardrails + ship gate |
| `library-distribution.mdc` | npm / clone, `exports`, vanilla vs Tailwind CSS |
| `tokens-css-typescript.mdc` | Tokens, `styles/fields/*.css`, strict TS |
| `component-ui-uniform.mdc` | Uniform primitives, responsive, props |
| `code-file-layout.mdc` | Imports, sections, JSX comments |
| `ai-doc-standard.mdc` | Markdown module docs |
| `form-validation-zod.mdc` | Zod + FormField wiring |

### Skills (`skills/squid-component-library/`)

| Skill folder | Role |
|--------------|------|
| `component-creation-skill/` | New UI primitive (tokens, FormField, Storybook) |
| `form-validation-skill/` | Zod schemas + forms |
| `library-distribution-skill/` | Consumer install + CSS paths |
| `planned-overlays-skill/` | Alert, toast, stepper (before/during implementation) |
| `frontend-design-skill/` | Marketing / site pages **outside** `src/components/ui` |

## Optional

- Root **`AGENTS.md`** — short pointer to this README + `PROJECT_ROADMAP.md`.
