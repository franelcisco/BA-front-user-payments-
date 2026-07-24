import { HeaderError } from "@/components/HeaderError";
import { SuccessValidated } from "@/components/SuccessValidated";
import { useStoreStore } from "@/store/store";
import { useEffect } from "react";

interface Props {
  success: boolean;
  statusPageUrl: string;
  orderNo: string;
}

export function MobilePaymentManualResult({
  success,
  statusPageUrl,
  orderNo,
}: Props) {
  const { reset } = useStoreStore();

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  return (
    <div className="max-w-md w-full text-center">
      {!success ? (
        <>
          <HeaderError orderNo={orderNo} />
          <p className="font-normal">
            Hubo un problema procesando tu comprobante. Por favor, Contacta con
            atención al cliente a nuestro whatsapp +1 (210) 942-8184 
          </p>
        </>
      ) : (
        <SuccessValidated
          orderNo={orderNo}
          inProcess={true}
          statusPageUrl={statusPageUrl}
        />
      )}
    </div>
  );
}
