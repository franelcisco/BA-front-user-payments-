import { HeaderError } from "@/components/HeaderError";
import { SelectedOtherMethodPaymentButton } from "@/components/SelectedOtherMethodPaymentButton";
import { SuccessValidated } from "@/components/SuccessValidated";
import { useStoreStore } from "@/store/store";
import type { ValidateMobilePaymentResponse } from "@/types/dtos/payments.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { useEffect } from "react";

interface Props {
  result: ValidateMobilePaymentResponse;
  statusPageUrl: string;
  onBack: (method: PaymentMethodsType) => void;
  orderNo: string;
}

export function DirectDebitResult({
  result,
  onBack,
  statusPageUrl,
  orderNo,
}: Props) {
  const { reset } = useStoreStore();

  useEffect(() => {
    if (result.success) {
      reset();
    }
  }, [result.success]);
  return (
    <div className="max-w-md w-full text-center">
      {result.success ? (
        <SuccessValidated
          orderNo={orderNo}
          inProcess={false}
          statusPageUrl={statusPageUrl}
        />
      ) : (
        <>
          <HeaderError orderNo={orderNo} />
          <p className="font-normal">{result.message}</p>
          <SelectedOtherMethodPaymentButton onBack={() => onBack(undefined)} />
        </>
      )}
    </div>
  );
}
