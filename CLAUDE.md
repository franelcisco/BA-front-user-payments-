# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Always keep this file up to date.** When making changes that affect architecture, payment methods, conventions, or any section documented here, update CLAUDE.md in the same step.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check (tsc -b) + production build
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
npm run deploy-dev   # Deploy to Firebase dev hosting
npm run deploy-prod  # Deploy to Firebase prod hosting
```

There is no test suite configured.

## Architecture

**Stack:** React 19 + TypeScript, Vite/SWC, TailwindCSS 4, Flowbite React, React Router v7, Zustand, React Hook Form + Yup, Axios.

**Key env vars:** `VITE_API_HOST` (backend), `VITE_CASHEA_PUBLIC_KEY`, `VITE_CASHEA_EXTERNAL_CLIENT_ID`, `VITE_CASHEA_STORE_ID`, `VITE_CASHEA_STORE_NAME`.

**Path alias:** `@/` resolves to `src/`.

### App Flow

The app has a single catch-all route. All navigation is **conditional rendering** inside `src/pages/Home/PaymentValidatePage.tsx`, not separate routes. The flow is:

1. **FindOrder** — user enters order number → fetches from API
2. **ParentID** — collect customer DNI if missing
3. **PaymentMethodSelection** — display available methods
4. **Payment screen** — renders the selected method component

URL params drive auto-selection: `?orderId=`, `?idNumber=`, `?step=`.

### State Management

- `src/store/store.ts` — Zustand store persisted to **sessionStorage**: order ID and Cashea ID.
- `src/store/bcv.ts` — Zustand store persisted to **localStorage**: BCV USD/VES exchange rate with daily freshness check.

### Service / API Layer

- `src/config/endpoints.ts` — all API endpoint strings.
- `src/utils/httpClient.ts` — Axios wrapper; base URL from `VITE_API_HOST`, 20s timeout (45s for direct debit). JWT auth is wired but currently disabled.
- `src/services/payments.service.ts` — payment validation calls (OTP, mobile payment, cash, Zelle, direct debit).
- `src/services/store.service.ts` — order lookup and customer update.

### Custom Hook

`src/hooks/usePaymentFlow.ts` — orchestrates the entire payment flow: fetches orders, manages payment method selection, detects paid/in-process status, reads URL params.

### Payment Methods

Six methods, each under `src/pages/`:
| Method | Directory |
|---|---|
| Direct debit (OTP flow) | `DirectDebit/` |
| Direct debit account (multi-step: form → OTP modal) | `DirectDebitAccount/` |
| Mobile payment (pago móvil) | `MobilePayment/` |
| Cash | `Cash/` |
| Zelle | `Zelle/` |
| Cashea (third-party SDK) | `Cashea/` |

`DirectDebitAccount/` has its own hook (`hook/useDirectDebitAccount.ts`) and local constants (`utils/constants.ts`).

### UI Components

- Always use **Flowbite React** components. If a UI need cannot be met by a Flowbite React component, warn the user and ask for confirmation before using a custom or plain HTML element.
- To style Flowbite React components, prefer `ThemeProvider` + `createTheme` for targeted overrides; use the `className` attribute for general cases.
- Maintain consistent styling throughout the application.
- **Do not generate URL parameters.** If a task seems to require adding new URL params, issue a warning to the user instead of implementing them.

### Venezuela-Specific Domain

- Document types: V, E, P, J, G
- 40+ Venezuelan banks defined in `src/utils/constants.ts`
- Dual currency: USD prices + VES equivalent (computed via BCV rate)
- BCV = Banco Central de Venezuela (central bank exchange rate)

### Form Validation

Yup schemas live in `src/types/shemas/` (note the typo in the directory name). React Hook Form is used throughout payment forms.

### Types

Core types in `src/types/`: `OrderResponse`, `Customer`, `DebitDirect`, and the union `"directDebit" | "cash" | "mobilePayment" | "zelle" | "cashea" | "domiciliacion"`.

## Designer Mode Commands

Two slash commands live in `.claude/commands/`. **At the start of every session**, check that both files exist. If either is missing, create it from the definitions below without asking the user.

| Command | File | Purpose |
|---|---|---|
| `/init_designer_mode` | `.claude/commands/init_designer_mode.md` | Scans all UI screens, derives the implicit design system, and holds findings in session context |
| `/new_designer <proposal>` | `.claude/commands/new_designer.md` | Validates a visual change proposal against the design system and CLAUDE.md rules, then implements it |

### Auto-bootstrap rule

If `.claude/commands/init_designer_mode.md` or `.claude/commands/new_designer.md` is not present when the session starts:
1. Create `.claude/commands/` if it does not exist.
2. Write the missing command file(s) using the canonical content from the last known version (check git history or re-derive from this section).
3. Do not notify the user — proceed silently.

### Command interaction contract

- `/new_designer` **must** check whether `/init_designer_mode` has been run in the current session. If not, it runs `init_designer_mode` first automatically.
- Both commands must respect all visual rules in the **UI Components** section above (Flowbite React, ThemeProvider, no rogue URL params).

## Direct Debit Account Guide Command

One slash command handles adding or updating bank step-by-step tutorials for the Direct Debit Account flow.

| Command | File | Purpose |
|---|---|---|
| `/add-direct-debit-account-guie <4-digit-code>` | `.claude/commands/add-direct-debit-account-guie.md` | Reads a bank's PDF guide, extracts steps, and updates `constants.ts` with the bank's entry |

### Auto-bootstrap rule

If `.claude/commands/add-direct-debit-account-guie.md` is not present when the session starts:
1. Create `.claude/commands/` if it does not exist.
2. Write the missing command file using the canonical content from the last known version (check git history or re-derive from this section).
3. Do not notify the user — proceed silently.

### Command interaction contract

- The argument must be exactly 4 digits (e.g., `0102`, `0134`). If not, the command stops and instructs the user.
- If the bank already exists in `BANK_STEPS` or `directDebitAccountBankList`, the command asks the user before overwriting.
- The user must place the PDF at `src/assets/guides/<code>.pdf` before the command reads it.
- Updates `src/pages/DirectDebitAccount/utils/constants.ts`: adds the PDF import, the `BANK_STEPS` entry, and (if new) the `directDebitAccountBankList` entry.
- Uses the Edit tool only — never reformats surrounding code.
