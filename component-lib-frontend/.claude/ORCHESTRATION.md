# Orchestration — rules & skills (read before work)

Single reference for **humans and AI agents**: what loads after a prompt, in what order, and where to read full detail.

**Path:** `.cursor/ORCHESTRATION.md`

---

## When to read this

1. **Start of a new chat or task** in this repo (especially `component-lib-frontend/`).
2. **Before** writing code, rules, or new skills — confirm you are not contradicting an existing rule.
3. When the user says *“follow project standards”* — this file is the map.

---

## Execution flow (after the user prompts)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User prompt + optional @ files / open editors                │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Cursor injects rules                                         │
│    • alwaysApply: true → loaded every time                       │
│    • globs match open / relevant files → those rules attach      │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Agent reads this ORCHESTRATION + library-guardrails         │
│    Resolves which extra rules apply to the task                  │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Agent selects skill(s) by description match OR user name      │
│    (e.g. “use component-creation”)                               │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Implement → verify (tsc, build, roadmap tick if milestone) │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer A — Always on (every prompt)

| Rule | Path | Role |
|------|------|------|
| **Agent workflow** | `rules/agent-workflow.mdc` | Stack order, `tsc`/`build`, `PROJECT_ROADMAP.md` pointer |

---

## Layer B — Master index (load when touching the library)

| Rule | Path | Role |
|------|------|------|
| **Library guardrails** | `rules/library-guardrails.mdc` | Maps all topics to sub-rules; ship gate checklist |

---

## Layer C — Scoped rules (Cursor attaches by glob / context)

| Rule | Path | Typical trigger |
|------|------|-----------------|
| Tokens + CSS + TS enums | `rules/tokens-css-typescript.mdc` | Files under `component-lib-frontend/**` |
| UI uniformity | `rules/component-ui-uniform.mdc` | `component-lib-frontend/src/components/ui/**` |
| File layout + comments | `rules/code-file-layout.mdc` | `component-lib-frontend/**/*.{ts,tsx}` |
| Markdown docs | `rules/ai-doc-standard.mdc` | `component-lib-frontend/**/*.{md,mdx}` |
| Zod / forms | `rules/form-validation-zod.mdc` | `component-lib-frontend/**/*.{ts,tsx}` |
| npm / clone / CSS consumers | `rules/library-distribution.mdc` | `component-lib-frontend/**` |

*If a rule does not auto-attach, the agent should still apply it when the task matches the “typical trigger” column.*

---

## Layer D — Skills (procedures; load when task matches or user names them)

| Skill name (invoke in chat) | Folder | Use when |
|------------------------------|--------|----------|
| **component-creation** | `skills/squid-component-library/component-creation-skill/` | New or refactored UI primitive, Storybook, `src/components/ui` |
| **form-validation** | `skills/squid-component-library/form-validation-skill/` | Zod schemas, FormField errors, form submit parsing |
| **library-distribution** | `skills/squid-component-library/library-distribution-skill/` | `package.json` exports, host install, vanilla CSS path |
| **planned-overlays** | `skills/squid-component-library/planned-overlays-skill/` | Alert/confirm, toast, stepper — before or during build |
| **frontend-design** | `skills/squid-component-library/frontend-design-skill/` | Marketing pages, **not** `src/components/ui` primitives |

Built-in Cursor skills (`create-rule`, `create-skill`, etc.) live in `~/.cursor/skills-cursor/` — use when the user asks to *create* rules/skills/hooks.

---

## Recommended order for common tasks

| Task | Rules (implicit + explicit) | Skills |
|------|------------------------------|--------|
| New Input-like field | guardrails → tokens-css → component-ui-uniform → code-file-layout | **component-creation** |
| Form + validation | + form-validation-zod | **form-validation** |
| Publish / consumer README | + library-distribution | **library-distribution** |
| Modal / wizard UI spec | guardrails | **planned-overlays** + then **component-creation** when coding |
| Landing page (not primitives) | ai-doc if `.md` | **frontend-design** |
| Only documentation | **ai-doc-standard** | — |

---

## Pre-flight checklist (agent)

```
[ ] User goal and scope clear (which package / path)?
[ ] Read ORCHESTRATION (this file) + library-guardrails for the rule map
[ ] List which scoped rules apply to files being edited
[ ] Name 1–2 skills to follow (or rely on description match)
[ ] Confirm PROJECT_ROADMAP.md day if doing a milestone
```

---

## Post-flight checklist (agent)

```
[ ] component-lib-frontend: npx tsc --noEmit && npm run build (if TS/React touched)
[ ] No new hex colors outside tokens; new styles in styles/fields or styles/components
[ ] Exports / validation paths updated if public API changed
[ ] Roadmap or changelog updated if user asked for ship milestone
```

---

## Related files

| File | Purpose |
|------|---------|
| `.cursor/README.md` | Short intro to rules vs skills |
| `component-lib-frontend/PROJECT_ROADMAP.md` | Day_01 … phased delivery |
| `component-lib-frontend/styles/README.md` | Vanilla CSS import order |

---

## User one-liners (paste in chat)

- *“Orchestrate: follow `.cursor/ORCHESTRATION.md` and **library-guardrails** before coding.”*
- *“Use **component-creation** + **code-file-layout** for this PR.”*
- *“Validation task: **form-validation** + **form-validation-zod** rule.”*
