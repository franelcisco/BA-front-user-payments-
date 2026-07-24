import { HeaderError } from "@/components/HeaderError";
import { SelectedOtherMethodPaymentButton } from "@/components/SelectedOtherMethodPaymentButton";
import { SuccessValidated } from "@/components/SuccessValidated";
import { useStoreStore } from "@/store/store";
import type { ValidateMobilePaymentResponse } from "@/types/dtos/payments.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { Alert } from "flowbite-react";
import { useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi";

interface Props {
  result: ValidateMobilePaymentResponse;
  statusPageUrl: string;
  orderNo: string;
  onBack: (method: PaymentMethodsType) => void;
}

export function MobilePaymentResult({
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
      {!result.success ? (
        <>
          <HeaderError orderNo={orderNo} />
          <SelectedOtherMethodPaymentButton onBack={() => onBack(undefined)} />
          {result.message !== "" && (
            <Alert
              className="bg-bone-beige-light text-bone-primary text-xxs px-4 py-2 mt-2"
              icon={HiInformationCircle}
            >
              {result.message}
            </Alert>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-5">
          <SuccessValidated
            orderNo={orderNo}
            inProcess={false}
            statusPageUrl={statusPageUrl}
          />
          {result.message !== "" && (
            <Alert
              className="bg-bone-beige-light text-bone-primary text-xxs px-4 py-2 mt-2"
              icon={HiInformationCircle}
            >
              {result.message}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
