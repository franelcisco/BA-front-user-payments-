import { ErrorValidated } from "@/components/ErrorValidated";
import { SelectedOtherMethodPaymentButton } from "@/components/SelectedOtherMethodPaymentButton";
import { SuccessValidated } from "@/components/SuccessValidated";
import { useStoreStore } from "@/store/store";
import { useEffect } from "react";

interface Props {
  success: boolean;
  statusPageUrl: string;
  onBack: () => void;
  orderNo: string;
}

export function ZelleResult({ success, onBack, statusPageUrl, orderNo }: Props) {
  const { setOrder } = useStoreStore();

  useEffect(() => {
    if (success) {
      setOrder(undefined);
    }
  }, [success, setOrder]);

  return (
    <div className="max-w-md w-full text-center">
      {!success ? (
        <>
          <ErrorValidated orderNo={orderNo} />
          <SelectedOtherMethodPaymentButton onBack={onBack} />
        </>
      ) : (
        <SuccessValidated orderNo={orderNo} inProcess={true} statusPageUrl={statusPageUrl} />
      )}
    </div>
  );
}
