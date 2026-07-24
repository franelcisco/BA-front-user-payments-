import { HeaderSuccess } from "./HeaderSuccess";
import { StatusPageButton } from "./StatusPageButton";

interface SuccessValidatedProps {
  inProcess: boolean;
  statusPageUrl: string;
  orderNo: string;
}

export const SuccessValidated = ({
  inProcess,
  statusPageUrl,
  orderNo,
}: SuccessValidatedProps) => {
  return (
    <div>
      <HeaderSuccess inProcess={inProcess} orderNo={orderNo} />
      <p className="font-semibold">
        {inProcess
          ? "Verificaremos su pago y prepararemos su pedido con cariño para entregarte a tiempo"
          : "Prepararemos su pedido con cariño para entregarte a tiempo 🧡"}
      </p>
      <StatusPageButton statusPageUrl={statusPageUrl} />
    </div>
  );
};
