import type {
  OTPRequest,
  ValidateMobilePaymentResponse,
} from "@/types/dtos/payments.dto";
import { useCallback, useState } from "react";
import { DirectDebitOTP } from "./components/DirectDebitOTP";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { DirectDebitResult } from "./components/DirectDebitResult";
import { DirectDebitForm } from "./components/DirectDebitForm";
import { DirectDebitInProcess } from "./components/DirectDebitInProcess";

interface DirectDebitProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
}

export const DirectDebit = ({ order, selectedMethod }: DirectDebitProps) => {
  const [aproveOTPRequestData, setAproveOTPRequestData] =
    useState<OTPRequest | null>(null);
  const [paidStatus, setPaidStatus] = useState<
    ValidateMobilePaymentResponse | undefined
  >(undefined);
  const [inProcess, setInProcess] = useState<boolean>(false);

  const handleCancelPayment = useCallback(
    (method: PaymentMethodsType) => {
      selectedMethod(method);
    },
    [selectedMethod]
  );

  const handleCloseModal = useCallback(() => {
    setAproveOTPRequestData(null);
  }, []);

  const handleChangePaidStatus = useCallback(
    (result: ValidateMobilePaymentResponse) => {
      setAproveOTPRequestData(null);
      if (result.message.includes("EN_PROCESO")) {
        setInProcess(true);
      }
      setPaidStatus(result);
    },
    []
  );

  return (
    <>
      {aproveOTPRequestData && (
        <DirectDebitOTP
          openModal={!!aproveOTPRequestData}
          order={order}
          onCancelOTP={handleCloseModal}
          aproveOTPRequestData={aproveOTPRequestData}
          onResult={handleChangePaidStatus}
        />
      )}
      {paidStatus === undefined ? (
        <DirectDebitForm
          order={order}
          selectedMethod={selectedMethod}
          setAproveOTPRequestData={setAproveOTPRequestData}
        />
      ) : inProcess ? (
        <DirectDebitInProcess statusPageUrl={order.statusPageUrl} />
      ) : (
        <DirectDebitResult
          result={paidStatus}
          onBack={handleCancelPayment}
          statusPageUrl={order.statusPageUrl}
          orderNo={order.name}
        />
      )}
    </>
  );
};
