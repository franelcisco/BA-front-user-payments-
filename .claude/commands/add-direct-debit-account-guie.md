# add-direct-debit-account-guie

**Usage:** `/add-direct-debit-account-guie <4-digit bank code>`

The user wants to add or update the step-by-step tutorial for a bank in the Direct Debit Account flow.

## Step 1 — Parse and validate the argument

Read the argument: **$ARGUMENTS**

- It must be exactly 4 digits (e.g., `0102`, `0134`). If it is not, stop and tell the user:
  > "El código de banco debe ser exactamente 4 dígitos. Ejemplo: `/add-direct-debit-account-guie 0102`"

## Step 2 — Check if the bank already exists

Read `src/pages/DirectDebitAccount/utils/constants.ts`.

- Check if the bank code appears as a key in `BANK_STEPS`.
- Check if the bank code appears in `directDebitAccountBankList`.

If the bank already exists in either structure, **ask the user before proceeding**:
> "El banco `<code>` ya tiene pasos registrados en `BANK_STEPS`. ¿Deseas actualizar los pasos existentes? (sí / no)"

Wait for the user's response. If they say no, stop here.

## Step 3 — Instruct the user where to place the PDF

Tell the user exactly where to put the guide file:

> **Coloca el PDF de la guía del banco `<code>` en la siguiente ruta:**
>
> `src/assets/guides/<code>.pdf`
>
> El nombre del archivo debe ser exactamente `<code>.pdf` (por ejemplo: `0134.pdf`).
> Cuando lo hayas guardado, confirma escribiendo "listo" o "ok".

Wait for the user's confirmation before continuing.

## Step 4 — Read the PDF and extract the steps

Once the user confirms:

1. Read the PDF at `src/assets/guides/<code>.pdf` using the Read tool.
2. Analyze its content and extract between 3 and 5 clear steps that describe how the user must activate the direct debit authorization in their bank's online portal.
3. For each step, produce:
   - `n` — step number (starting at 1)
   - `title` — short action label (2–4 words max, imperative form, in Spanish)
   - `description` — one or two sentences explaining exactly what to click or enter, in Spanish, as if guiding a non-technical user

If the PDF cannot be read or its content is not useful, tell the user:
> "No pude extraer pasos útiles del PDF. Por favor verifica que el archivo sea la guía correcta del banco y vuelve a intentarlo."
Then stop.

## Step 5 — Ask the user for the bank name

Ask the user:
> "¿Cuál es el nombre del banco tal como debe aparecer en la interfaz? (Ejemplo: `Banesco`, `Banco de Venezuela`)"

Wait for the response before continuing.

## Step 6 — Update `constants.ts`

With the steps and bank name confirmed, update `src/pages/DirectDebitAccount/utils/constants.ts`:

### 6a — Add the import at the top (if the bank is new or replacing)

Add a new import line alongside the existing PDF imports, using the same pattern:

```ts
import <camelCaseName> from "@/assets/guides/<code>.pdf?url";
```

Choose a camelCase variable name derived from the bank name (e.g., `bancoExterior` for "Banco Exterior"). If the import already exists (bank update case), keep it as-is.

### 6b — Add or replace the entry in `BANK_STEPS`

Insert or replace the `"<code>"` key in `BANK_STEPS` with the extracted steps:

```ts
"<code>": {
  name: "<Bank Name>",
  guiedeUrl: <camelCaseName>,
  steps: [
    { n: 1, title: "...", description: "..." },
    { n: 2, title: "...", description: "..." },
    // ...
  ],
},
```

Use the Edit tool. Do not reformat surrounding code.

### 6c — Add to `directDebitAccountBankList` (only if the bank is new)

If the bank code is not already in `directDebitAccountBankList`, append the entry:

```ts
{ code: "<code>", name: "<Bank Name>" },
```

## Step 7 — Confirm to the user

After all edits are saved, report:

> **Listo.** Se agregaron los pasos para `<Bank Name>` (`<code>`) en `constants.ts`.
> - Import: `<camelCaseName>`
> - Entradas actualizadas: `BANK_STEPS["<code>"]`
> - Lista de bancos: `directDebitAccountBankList` ✓ (o "ya existía, sin cambios")
>
> Puedes revisar el resultado en `src/pages/DirectDebitAccount/utils/constants.ts`.
