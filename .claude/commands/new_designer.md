# new_designer

**Usage:** `/new_designer <visual change proposal>`

## Pre-flight check

Before processing the proposal, verify that Designer Mode is active in this session (i.e., `/init_designer_mode` was already run). If it was not, **run `init_designer_mode` now** before continuing — do not skip it.

## Processing the proposal

The user has submitted a visual change proposal: **$ARGUMENTS**

Work through the following steps in order.

### 1. Understand the scope

- Which screen(s) or component(s) are affected?
- Is this a new component, a modification, or a global style change?

### 2. Validate against design system

Check the proposal against the design system loaded in context:
- Does it use colors consistent with the established palette?
- Does it use the correct Flowbite React components?
- Does spacing follow the established rhythm?
- Are interactive states (hover, disabled, loading, error) covered?

Flag any deviation and propose a compliant alternative if needed.

### 3. Assess CLAUDE.md constraints

- If the proposal requires a custom/plain HTML element not available in Flowbite React, **warn the user** and ask for confirmation before proceeding.
- If the proposal requires new URL parameters, **warn the user** instead of implementing them.

### 4. Produce the implementation plan

Present a concise plan before writing any code:
- Files to create or modify
- Flowbite React components to use
- ThemeProvider overrides needed (if any)
- TailwindCSS 4 classes to apply

Ask the user to confirm the plan if it affects more than one file or introduces a new component.

### 5. Implement

Once confirmed (or if the change is self-contained to a single component):
- Write or edit only the files in scope.
- Do not refactor surrounding code outside the proposal.
- Do not add comments unless the logic is non-obvious.
- Keep CLAUDE.md updated if the change introduces a new pattern or component convention.

### 6. Post-implementation check

After implementing:
- Re-read the modified files and confirm no Tailwind class conflicts or Flowbite theme override issues.
- Note any remaining items from the issue list captured in Designer Mode that this change resolves.
