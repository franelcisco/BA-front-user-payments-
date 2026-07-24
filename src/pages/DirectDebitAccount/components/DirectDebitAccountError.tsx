import { Button } from "flowbite-react";

interface DirectDebitAccountErrorProps {
  orderNo: string;
  onRetryForm: () => void;
  onBack: () => void;
  isRecurrent: boolean;
}

export const DirectDebitAccountError = ({
  orderNo,
  onRetryForm,
  onBack,
  isRecurrent,
}: DirectDebitAccountErrorProps) => {
  return (
    <div className="max-w-md w-full text-center">
      <h2 className={`text-2xl font-medium mb-4`}>
        {orderNo} - Hubo un error en la operación 😔
      </h2>
      <p className="font-normal mb-4">
        Intenta con otros datos o elige otro método de pago.
      </p>
      <div className="flex flex-col gap-3 items-center">
        {!isRecurrent && (
          <Button
            className="bg-bone-yellow hover:bg-bone-orange text-bone-primary w-full max-w-xs"
            onClick={onRetryForm}
          >
            Intentar con otros datos
          </Button>
        )}

        <Button
          color="light"
          className="w-full max-w-xs bg-transparent border border-bone-primary text-bone-primary hover:bg-bone-primary hover:text-white"
          onClick={onBack}
        >
          Pagar con otro método
        </Button>
      </div>
    </div>
  );
};
