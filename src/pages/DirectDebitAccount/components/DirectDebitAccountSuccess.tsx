import { StatusPageButton } from "@/components/StatusPageButton";
import { useStoreStore } from "@/store/store";
import { useEffect } from "react";

interface DirectDebitAccountSuccessProps {
  statusPageUrl: string;
  orderNo: string;
  isRecurrent: boolean;
}

export const DirectDebitAccountSuccess = ({
  statusPageUrl,
  orderNo,
  isRecurrent,
}: DirectDebitAccountSuccessProps) => {
  const { reset } = useStoreStore();

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  return (
    <div className="max-w-md w-full text-center">
      <div>
        <h2 className={`text-2xl font-medium mb-4`}>
          {isRecurrent
            ? `¡Pago confirmado para la orden ${orderNo}! 💛`
            : `¡Pago y domiciliación confirmados para la orden ${orderNo}! 💛`}
        </h2>
        <p className="font-normal">
          Prepararemos tu pedido con cariño para entregarte a tiempo 🧡
        </p>
      </div>
      <StatusPageButton statusPageUrl={statusPageUrl} />
    </div>
  );
};
