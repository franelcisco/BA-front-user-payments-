# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Stacks
- React 19
- TypeScript
- Vite
- Zustand
- Flowbite React
- React Hook Form
- Yup
- Axios
- React Router DOM
- TailwindCSS

## Integrations and endpoints
- The endpoints are defined in `src/config/endpoints.ts` and are consumed using Axios.
- Example endpoint: `/payments/validate-mobile-payment` for validating mobile payments.

- The system uses local storage to persist the BCV rate.
- Forms are validated with Yup and React Hook Form.
- The services (`payments.service.ts`, `store.service.ts`) centralize the logic for communication with the API.

## Main Flow
1. The user enters the order number on the main page (`Home`).
2. The system queries the order via `storeService` and displays the status.
3. The user selects the payment method and completes the corresponding form.
4. The system validates the payment using `paymentsService` and shows the result.

## Designer Mode Commands

These two slash commands allow you to make visual changes to the UI safely, ensuring all modifications stay consistent with the existing design system and project rules. They are used directly in a Claude Code session.

### `/init_designer_mode`

Run this command **at the beginning of any session where you plan to make UI changes**. It does not modify any file — it only analyzes the project.

What it does:
1. Reads `CLAUDE.md` to understand which UI rules apply (allowed components, styling approach, etc.).
2. Scans all payment screens in `src/pages/` to detect which Flowbite React components are in use, color patterns, spacing, and typography.
3. Derives the implicit design system from what it observes (color palette, button variants, form layout, etc.).
4. Reports any visual inconsistencies it found, grouped by severity (critical, medium, low).
5. Outputs a summary confirming that Designer Mode is active and ready.

After running it, Claude holds the full design system in context for the rest of the session.

**When to use it:** Before any visual proposal. You only need to run it once per session.

---

### `/new_designer <proposal>`

Use this command to propose and implement a visual change. Replace `<proposal>` with a plain description of what you want to change.

Example:
```
/new_designer Change the OTP modal button to use the primary color and add a loading state
```

What it does:
1. Checks that `/init_designer_mode` was already run. If not, runs it automatically first.
2. Identifies which screens and components are affected by the proposal.
3. Validates the proposal against the design system: correct colors, Flowbite React components, spacing, and interactive states.
4. Warns you if the proposal requires a plain HTML element not available in Flowbite React, or if it would need new URL parameters (both are restricted by project rules).
5. Presents an implementation plan (files to touch, components to use, theme overrides needed) and asks for confirmation if more than one file is affected.
6. Implements the change after confirmation, without touching unrelated code.
7. Re-reads the modified files to confirm there are no conflicts.

**When to use it:** Any time you want Claude to make a UI change that respects the existing design system.

---

## Direct Debit Account Guide Command

This slash command adds or updates the step-by-step tutorial for a bank in the Direct Debit Account payment flow. It reads a PDF guide you provide, extracts the steps, and updates the code automatically.

### `/add-direct-debit-account-guie <4-digit-bank-code>`

Replace `<4-digit-bank-code>` with the bank's 4-digit code (e.g., `0102`, `0134`).

Example:
```
/add-direct-debit-account-guie 0134
```

What it does:
1. Validates that the argument is exactly 4 digits.
2. Checks `constants.ts` — if the bank already exists in `BANK_STEPS` or `directDebitAccountBankList`, it asks before overwriting.
3. Instructs you where to place the PDF: `src/assets/guides/<code>.pdf`. Waits for your confirmation.
4. Reads the PDF and extracts 3–5 steps (number, title, description) in Spanish.
5. Asks you for the bank display name (e.g., `Banco Exterior`).
6. Updates `src/pages/DirectDebitAccount/utils/constants.ts`:
   - Adds the PDF import (`import <camelCaseName> from "@/assets/guides/<code>.pdf?url"`)
   - Adds or replaces the entry in `BANK_STEPS`
   - Appends to `directDebitAccountBankList` only if the bank is new
7. Confirms what was changed.

**When to use it:** Any time you need to add a new bank or update an existing bank's tutorial in the Direct Debit Account flow.
