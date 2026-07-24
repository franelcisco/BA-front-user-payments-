import { InputErrorMessage } from "@/components/InputErrorMessage";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { DomiciliacionStepper } from "./DomiciliacionStepper";
import { FaCheck } from "react-icons/fa6";
import autorizacionPdf from "@/assets/autorizacion_domiciliacion.pdf?url";
import { DirectDebitAccountBankDropdown } from "./DirectDebitAccountBankDropdown";
import type {
  DirectDebitAccountCodes,
  DirectDebitAccountRequest,
} from "@/types/dtos/payments.dto";
import { useCallback, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { directDebitAccountSchema } from "@/types/shemas";
import * as yup from "yup";
import type { documentTypes } from "@/types/dtos/store.dto";
import { documentTypes as documentList } from "@/utils/constants";

interface DirectDebitAccountFormProps {
  dniType: documentTypes;
  dni: string;
  orderId: string;
  code: DirectDebitAccountCodes | string;
  onSubmit: (data: DirectDebitAccountRequest) => Promise<void>;
}

type DirectDebitAccountFormData = yup.InferType<
  typeof directDebitAccountSchema
>;

const getCurrentStep = (code: DirectDebitAccountCodes | string): number => {
  if (code === "ERR02" || code === "ERR03") {
    return 1; // Afiliación solicitada
  }

  if (code === "OK") {
    return 2; // Activación exitosa
  }

  return 0; // Paso inicial o error
};

export const DirectDebitAccountForm = ({
  dni,
  dniType,
  code,
  onSubmit,
}: DirectDebitAccountFormProps) => {
  const [bank, setBank] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DirectDebitAccountFormData>({
    values: {
      account: "",
      termsAndConditions: false,
      dniType: dniType,
      dni: dni,
    },
    resolver: yupResolver(directDebitAccountSchema),
    mode: "onSubmit",
  });

  const handleChangeBank = useCallback(
    (value: string) => {
      setBank(value);
      setValue("account", value.slice(0, 4));
    },
    [setValue],
  );

  const handleDirectDebitAccount: SubmitHandler<DirectDebitAccountFormData> =
    useCallback(
      async (data) => {
        await onSubmit({
          account: data.account,
          orderId: "",
          dni: `${data.dniType}${data.dni}`,
        });
      },
      [onSubmit],
    );

  return (
    <form onSubmit={handleSubmit(handleDirectDebitAccount)}>
      <DomiciliacionStepper
        currentStep={getCurrentStep(code)}
        labels={["Conecta tu banco", "Aprueba en banco", "Activación"]}
      />
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <div className="block">
            <Label htmlFor="id">Documento de identidad</Label>
          </div>
          <div className="flex gap-1">
            <Select
              id="dniType"
              className="min-w-14"
              {...register("dniType")}
              color={errors.dniType && "failure"}
            >
              {documentList.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <TextInput
              id="id"
              inputMode="numeric"
              className="w-full"
              placeholder="Ingresa cédula o rif"
              color={errors.dni && "failure"}
              {...register("dni")}
            />
          </div>
          <InputErrorMessage message={errors.dni?.message} />
          <InputErrorMessage message={errors.dniType?.message} />
        </div>
        <div>
          <DirectDebitAccountBankDropdown
            currentValue={bank}
            onChange={handleChangeBank}
          />
        </div>

        <div>
          <div className="block">
            <Label htmlFor="account">2 - Número de cuenta</Label>
          </div>
          <TextInput
            id="account"
            type="text"
            placeholder="Ingrese los 20 digitos de su cuenta"
            {...register("account")}
            maxLength={20}
            minLength={20}
            color={errors.account ? "failure" : "gray"}
            disabled={!bank}
          />
          {errors.account && (
            <InputErrorMessage message={errors.account.message} />
          )}
        </div>
        {/* Trust block */}
        <div className="bg-bone-beige-light rounded-lg px-2.5 py-2 border border-bone-yellow/20">
          <div className="text-[11px] font-bold text-bone-primary mb-1.5">
            🔒 Tu cuenta está protegida
          </div>
          {[
            "Solo cobramos el monto exacto de tu plan",
            "Puedes cancelar la domiciliación cuando quieras",
            "Información protegida con encriptación",
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5 mb-0.5">
              <FaCheck className="w-2.5 h-2.5 text-bone-yellow shrink-0" />
              <span className="text-xxs text-gray-600">{t}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="accept"
            className="accent-bone-primary"
            {...register("termsAndConditions")}
          />
          <Label htmlFor="accept" className="flex">
            <a
              href={autorizacionPdf}
              download="autorizacion_domiciliacion.pdf"
              className="text-bone-yellow font-semibold underline underline-offset-2"
            >
              Aceptar términos y condiciones
            </a>
          </Label>
          {errors.termsAndConditions && (
            <InputErrorMessage message={errors.termsAndConditions.message} />
          )}
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
            type="submit"
          >
            Solicitar
          </Button>
        </div>
      </div>
    </form>
  );
};
