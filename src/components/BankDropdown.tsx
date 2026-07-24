import { bankList } from "@/utils/constants";
import { Label, Select } from "flowbite-react";
import { InputErrorMessage } from "./InputErrorMessage";

interface BankDropdownProps {
  currentValue: string;
  onChange: (value: string) => void;
  error?: string;
}

export const BankDropdown = ({
  currentValue,
  onChange,
  error,
}: BankDropdownProps) => {
  return (
    <>
      <div className="block">
        <Label htmlFor="bank">Banco</Label>
      </div>
      <Select
        id="bank"
        value={currentValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        color={error && "failure"}
      >
        <option value="" disabled>
          Selecciona un banco
        </option>
        {bankList.map((bank) => (
          <option key={bank.code} value={bank.code}>
            {bank.name}
          </option>
        ))}
      </Select>
      <InputErrorMessage message={error} />
    </>
  );
};
