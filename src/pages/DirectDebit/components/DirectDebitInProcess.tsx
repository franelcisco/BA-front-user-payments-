import { StatusPageButton } from "@/components/StatusPageButton";
import { useStoreStore } from "@/store/store";
import { useEffect } from "react";

interface Props {
  statusPageUrl: string;
}

export function DirectDebitInProcess({ statusPageUrl }: Props) {
  const { setOrder } = useStoreStore();

  useEffect(() => {
    setOrder(undefined);
  }, [setOrder]);
  return (
    <div className="max-w-md w-full text-center">
      <h2 className={`text-2xl font-medium mb-4`}>
        No se obtuvo respuesta del banco dentro del tiempo de conexión 🥹
      </h2>
      <p>
        Aún el banco puede realizar el cobro en los próximos 2 minutos y se
        actualizará el estatus automáticamente, si el banco no realiza el cobro
        en 2 minutos prueba de nuevo con otro método de pago.
      </p>
      <StatusPageButton statusPageUrl={statusPageUrl} />
    </div>
  );
}
