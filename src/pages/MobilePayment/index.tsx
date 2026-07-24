import { useCallback, useEffect, useRef, useState } from "react";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { MobilePaymentManualForm } from "./components/MobilePaymentManualForm";
import { MobilePaymentResult } from "./components/MobilePaymentResult";
import {
  Card,
  createTheme,
  TabItem,
  Tabs,
  ThemeProvider,
  type TabsRef,
} from "flowbite-react";
import { TfiWrite } from "react-icons/tfi";
import { MdPhonelinkRing } from "react-icons/md";
import { MobilePaymentDetails } from "./components/MobilePaymentDetails";
import { MobilePaymentAutomaticForm } from "./components/MobilePaymentAutomaticForm";
import { toast, ToastContainer } from "react-toastify";
import type {
  ValidateMobilePaymentRequest,
  ValidateMobilePaymentResponse,
} from "@/types/dtos/payments.dto";
import { BackButton } from "@/components/BackButton";
import { PaymentAmounts } from "@/components/PaymentAmounts";
import { ModalMobilePaymentNotFound } from "./components/ModalMobilePaymentNotFound";
import { MobilePaymentManualResult } from "./components/MobilePaymentManualResult";

interface MobilePaymentProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
}

const theme = createTheme({
  tabs: {
    tablist: {
      variant: {
        fullWidth: "shadow-none",
      },
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-0 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 py-2",
        variant: {
          fullWidth: {
            base: "ml-0 flex w-full rounded-md first:ml-0",
            active: {
              on: "rounded-xl bg-bone-yellow p-0 text-bone-primary py-2",
              off: "rounded-xl bg-white hover:bg-gray-50 hover:text-gray-700 border-1 border-[#3C2525]",
            },
          },
        },
      },
    },
  },
});

export const MobilePayment = ({
  order,
  selectedMethod,
}: MobilePaymentProps) => {
  const [paidStatus, setPaidStatus] = useState<
    ValidateMobilePaymentResponse | undefined
  >(undefined);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [paymentNotFound, setPaymentNotFound] = useState<boolean>(false);
  const [paymentRequest, setPaymentRequest] = useState<
    ValidateMobilePaymentRequest | undefined
  >(undefined);
  const [isInProcessResult, setIsInProcessResult] = useState<boolean>(false);
  const tabsRef = useRef<TabsRef>(null);

  const handleCancelPayment = useCallback(
    (method: PaymentMethodsType) => {
      selectedMethod(method);
    },
    [selectedMethod]
  );

  const handleChangePaidStatus = useCallback(
    (
      result: ValidateMobilePaymentResponse,
      req: ValidateMobilePaymentRequest
    ) => {
      if (result.success && !result.message.includes("excedente")) {
        result.message = "";
      }

      if (result.message.includes("no se encontro")) {
        // toast.error(
        //   "Pago no encontrado, por favor valide sus datos e intenta de nuevo."
        // );
        setPaymentRequest(req);
        setPaymentNotFound(true);
        return;
      }

      if (result.message.includes("registrar su pago")) {
        toast.error(result.message);
        return;
      }
      console.log("Payment Result:", result);
      setPaidStatus(result);
    },
    []
  );

  const handleClosePaymentNotFound = useCallback(() => {
    setPaymentNotFound(false);
  }, []);

  const handleManualPaymentResult = useCallback((result: boolean) => {
    setPaymentNotFound(false);
    setIsInProcessResult(true);
    setPaidStatus({ success: result, message: "" });
  }, []);

  useEffect(() => {
    if (!order.debitDirect) {
      setIsValidPhone(false);
      return;
    }

    const phone = order.debitDirect.phone.replace("+58", "0");
    const phoneRegex = /^(0414|0424|0416|0426|0412|0434|0212)\d{7}$/;

    if (phoneRegex.test(phone)) {
      setIsValidPhone(true);
      tabsRef.current?.setActiveTab(1);
    }
  }, [order]);

  return (
    <>
      <ModalMobilePaymentNotFound
        openModal={paymentNotFound}
        onClose={handleClosePaymentNotFound}
        onResult={handleManualPaymentResult}
        paymentData={paymentRequest}
        order={order}
      />
      {paidStatus === undefined ? (
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <Card className="max-w-md w-full">
            <BackButton
              onClick={() => handleCancelPayment(undefined)}
              order={order}
            />
            <PaymentAmounts
              totalPriceVESAmount={order.totalPriceSetVES.amount}
              totalPriceUSD={order.totalPriceSetUSD.amount}
            />
            <h2 className="text-2xl font-bold text-left">Pago Móvil</h2>
            <Tabs
              aria-label="Full width tabs"
              variant="fullWidth"
              ref={tabsRef}
            >
              <TabItem title="Manual" icon={TfiWrite}>
                <MobilePaymentDetails />
                <MobilePaymentManualForm
                  order={order}
                  onResult={handleChangePaidStatus}
                />
              </TabItem>
              <TabItem title="Automatico" icon={MdPhonelinkRing}>
                <MobilePaymentDetails />
                <MobilePaymentAutomaticForm
                  isValidPhone={isValidPhone}
                  order={order}
                  onResult={handleChangePaidStatus}
                />
              </TabItem>
            </Tabs>
          </Card>
        </ThemeProvider>
      ) : isInProcessResult ? (
        <MobilePaymentManualResult
          success={paidStatus.success}
          statusPageUrl={order.statusPageUrl}
          orderNo={order.name}
        />
      ) : (
        <MobilePaymentResult
          result={paidStatus}
          onBack={handleCancelPayment}
          statusPageUrl={order.statusPageUrl}
          orderNo={order.name}
        />
      )}
    </>
  );
};
