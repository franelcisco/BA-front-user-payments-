# init_designer_mode

You are now entering **Designer Mode** for this project. Perform the following analysis and hold all findings in context for the rest of this session.

## Step 1 — Read project constraints

Read `CLAUDE.md` and extract every rule that affects visual output:
- Allowed component library (Flowbite React)
- Styling approach (ThemeProvider / createTheme / className)
- Any restriction on custom HTML elements
- Consistency requirements

## Step 2 — Audit the UI component landscape

Scan `src/pages/` and `src/components/` (if it exists). For each payment method screen identify:
- Which Flowbite React components are used
- Any inline styles or non-Tailwind CSS
- Color tokens, spacing, and typography patterns in use
- Any component that deviates from the established style

## Step 3 — Extract the visual design system

From what you observe, derive the implicit design system:
- **Color palette** — primary, secondary, error, success, neutral tones
- **Typography scale** — heading sizes, label sizes, helper text
- **Spacing rhythm** — gap/padding/margin patterns
- **Interactive states** — button variants, disabled states, loading spinners, error messages
- **Form anatomy** — label position, input style, validation feedback placement
- **Layout skeleton** — card width, max-width, centering strategy

## Step 4 — Identify improvement opportunities

List visual inconsistencies or UX friction points you found, grouped by severity:
- **Critical** — broken layout, inaccessible contrast, missing state feedback
- **Medium** — inconsistent spacing or color use across screens
- **Low** — minor polish (icon alignment, copy casing, etc.)

## Step 5 — Confirm context is loaded

Output a structured summary:

```
DESIGNER MODE ACTIVE
=====================
Stack        : React 19 + TailwindCSS 4 + Flowbite React
Screens      : [list of payment screens found]
Color tokens : [primary color, accent, error, background]
Component lib: Flowbite React (ThemeProvider for overrides)
Issues found : [N critical / N medium / N low]
Ready for    : /new_designer <proposal>
```

From this point forward, every response related to UI/UX must comply with the design system derived above, the Flowbite React constraint, and the CLAUDE.md visual rules.
