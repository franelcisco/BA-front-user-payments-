import { Alert, Button, Checkbox, Label } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import autorizacionPdf from "@/assets/autorizacion_domiciliacion.pdf?url";
import type { DirectDebitAccount } from "@/types/dtos/store.dto";

interface DirectDebitAccountOTPFormProps {
  directDebitAccount: DirectDebitAccount | null;
  isRecurrent: boolean;
  loading: boolean;
  onSubmit: () => Promise<void>;
}

export const DirectDebitAccountOTPForm = ({
  directDebitAccount,
  isRecurrent,
  loading,
  onSubmit,
}: DirectDebitAccountOTPFormProps) => {
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  return (
    <div className="flex flex-col gap-2 mb-4">
      <Label htmlFor="id">
        <Alert
          icon={HiInformationCircle}
          className="bg-bone-beige !text-bone-primary px-4 text-xxs py-2 [&>svg]:!text-bone-primary"
        >
          {isRecurrent ? (
            <span>
              Recuerda que debes tener fondos suficientes para que el reintento
              de pago sea exitoso
            </span>
          ) : (
            <span>
              Recuerda que debes tener fondos suficientes para que la
              domiciliación sea exitosa
            </span>
          )}
        </Alert>
      </Label>

      <div className="flex flex-col gap-2">
        <div className="bg-bone-beige-light rounded-lg px-4 py-3 text-bone-primary text-sm">
          <span className="text-xs">Cuenta bancaria asociada a</span>
          <p className="font-bold mt-0.5">{directDebitAccount?.dni}</p>
        </div>
        <div className="bg-bone-beige-light rounded-lg px-4 py-3 text-bone-primary text-sm">
          <span className="text-xs">Cuenta terminada en</span>
          <p className="font-bold mt-0.5">{directDebitAccount?.account}</p>
        </div>
        {!isRecurrent && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="accept"
              checked={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.checked)}
            />
            <Label htmlFor="accept" className="flex">
              <a
                href={autorizacionPdf}
                download="autorizacion_domiciliacion.pdf"
                className="text-bone-yellow font-semibold"
              >
                Aceptar y Domiciliar Cuenta
              </a>
            </Label>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
          type="submit"
          onClick={onSubmit}
          disabled={!termsAndConditions && !isRecurrent && !loading}
        >
          {isRecurrent ? "Reintentar pago" : "Solicitar Domiciliación"}
        </Button>
      </div>
    </div>
  );
};
