import { Label, Select } from "flowbite-react";
import { directDebitAccountBankList } from "../utils/constants";

interface DirectDebitAccountBankDropdownProps {
  currentValue: string;
  onChange: (value: string) => void;
}

export const DirectDebitAccountBankDropdown = ({
  currentValue,
  onChange,
}: DirectDebitAccountBankDropdownProps) => {
  return (
    <>
      <div className="block">
        <Label htmlFor="bank">1 - Banco</Label>
      </div>
      <Select
        id="bank"
        value={currentValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <option value="" disabled>
          Selecciona un banco
        </option>
        {directDebitAccountBankList.map((bank) => (
          <option key={bank.code} value={bank.code} disabled={bank.code === "0105"}>
            {bank.code === "0105" ? `$${bank.name} - Próximamente` : bank.name}
          </option>
        ))}
      </Select>
    </>
  );
};
