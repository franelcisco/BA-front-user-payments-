import type { ValidateMobilePaymentRequest } from "@/types/dtos/payments.dto";
import { Button } from "flowbite-react";

interface SecondStepProps {
  onYes: () => void;
  onNo: () => void;
  onBack: () => void;
  paymentData: ValidateMobilePaymentRequest;
}

export const SecondStep = ({
  onYes,
  onNo,
  //   onBack,
  paymentData,
}: SecondStepProps) => {
  return (
    <div>
      <p className="text-center text-lg font-normal mb-4">
        ¿Estos son los datos con los que realizaste el pago?
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        {/* Display payment data here */}
        <p>Telefono: {paymentData.phone}</p>
        {!paymentData.automatic && (
          <>
            <p>Banco: {paymentData.bank}</p>
            <p>Cedula: {`${paymentData.dniType}-${paymentData.dni}`}</p>
            <p>Referencia: {paymentData.reference}</p>
          </>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={onYes} color={"green"}>
          Sí
        </Button>
        {/* <Button
          onClick={onBack}
          className="bg-bone-primary hover:bg-bone-primary"
        >
          Volver
        </Button> */}
        <Button onClick={onNo} color={"red"}>
          No
        </Button>
      </div>
    </div>
  );
};
