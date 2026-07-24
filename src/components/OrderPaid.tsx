import { useStoreStore } from "@/store/store";
import { Button } from "flowbite-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface OrderPaidProps {
  inProcess: boolean;
  handleReset: () => void;
}

export function OrderPaid({ inProcess, handleReset }: OrderPaidProps) {
  const { setOrder, setCasheaId } = useStoreStore();
  const navigate = useNavigate();

  useEffect(() => {
    setOrder(undefined);
    setCasheaId(undefined);
  }, [setOrder, setCasheaId]);

  const handlePayOtherOrder = useCallback(async () => {
    handleReset();
    navigate("/", { replace: true });
  }, [handleReset, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 text-center">
      <h2 className="text-2xl font-medium mb-4">
        {inProcess
          ? "Esta orden se encuentra en verificación"
          : "Esta orden ya ha sido pagada exitosamente 💛"}
      </h2>
      <div className="flex justify-center gap-3 mt-4">
        <Button
          className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
          onClick={handlePayOtherOrder}
        >
          Pagar otra orden
        </Button>
      </div>
    </div>
  );
}
