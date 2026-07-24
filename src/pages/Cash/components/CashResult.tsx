import { ErrorValidated } from "@/components/ErrorValidated";
import { SelectedOtherMethodPaymentButton } from "@/components/SelectedOtherMethodPaymentButton";
import { SuccessValidated } from "@/components/SuccessValidated";
import { useStoreStore } from "@/store/store";
import { useCallback, useEffect } from "react";

interface Props {
  success: boolean;
  statusPageUrl: string;
  onBack: () => void;
  orderNo: string;
}

export function CashResult({ success, statusPageUrl, onBack, orderNo }: Props) {
  const { reset } = useStoreStore();

  const handleReset = useCallback(() => {
    if (success) {
      reset();
    }
  }, [success]);

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="max-w-md w-full text-center">
      {!success ? (
        <>
          <ErrorValidated orderNo={orderNo} />
          <SelectedOtherMethodPaymentButton onBack={onBack} />
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
