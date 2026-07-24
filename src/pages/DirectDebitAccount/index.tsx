import { BackButton } from "@/components/BackButton";
import type {
  DirectDebitAccountRequest,
  DirectDebitAccountWithOTPRequest,
} from "@/types/dtos/payments.dto";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { Card, createTheme, ThemeProvider } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import useDirectDebitAccount from "./hook/useDirectDebitAccount";
import { PaymentAmounts } from "@/components/PaymentAmounts";
import { useCallback } from "react";
import {
  DirectDebitAccountBreakModal,
  DirectDebitAccountError,
  DirectDebitAccountForm,
  DirectDebitAccountModal,
  DirectDebitAccountOTPForm,
  DirectDebitAccountOTPModal,
  DirectDebitAccountSuccess,
  DirectDebitAccountWithoutDNI,
} from "./components";

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

interface DirectDebitAccountProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
}

export const DirectDebitAccount = ({
  order,
  selectedMethod,
}: DirectDebitAccountProps) => {
  const {
    directDebitAccountState,
    uiState,
    directDebitAccount,
    directDebitAccountWithOTP,
    handleRequestOTPOrPayment,
    handleCancelOTP,
    showOTP,
    showAccountBreak,
    showBankHelp,
    isRetryAttempt,
    onRetryAccount,
    handleRetryFromError,
    handleCancelDirectDebitAccount,
  } = useDirectDebitAccount(order);

  const handleDirectDebitAccount = useCallback(
    async (data: DirectDebitAccountRequest) => {
      await directDebitAccount.mutateAsync(data);
    },
    [directDebitAccount],
  );

  const handleDirectDebitAccountOTPRequest = useCallback(async () => {
    await handleRequestOTPOrPayment();
  }, [handleRequestOTPOrPayment]);

  const handleDirectDebitAccountOTP = useCallback(
    async (data: DirectDebitAccountWithOTPRequest) => {
      await directDebitAccountWithOTP.mutateAsync(data);
    },
    [directDebitAccountWithOTP],
  );

  const handleCancelPayment = useCallback(() => {
    selectedMethod(undefined);
  }, [selectedMethod]);

  if (uiState.showSuccess) {
    return (
      <DirectDebitAccountSuccess
        orderNo={order.name}
        statusPageUrl={order.statusPageUrl}
        isRecurrent={directDebitAccountState.isRecurrent}
      />
    );
  }

  if (uiState.showError) {
    return (
      <DirectDebitAccountError
        orderNo={order.name}
        onRetryForm={handleRetryFromError}
        onBack={handleCancelPayment}
        isRecurrent={directDebitAccountState.isRecurrent}
      />
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Card className="max-w-md w-full">
          <BackButton onClick={handleCancelPayment} order={order} />
          <PaymentAmounts
            totalPriceVESAmount={order.totalPriceSetVES.amount}
            totalPriceUSD={order.totalPriceSetUSD.amount}
          />
          <h2 className="text-2xl font-bold text-left">
            Domiciliación bancaria
          </h2>
          {uiState.showWithoutDNI && <DirectDebitAccountWithoutDNI />}
          {uiState.showAccount && (
            <DirectDebitAccountForm
              dni={order.customer.dni}
              dniType={order.customer.dniType}
              orderId={order.id}
              onSubmit={handleDirectDebitAccount}
              code={directDebitAccountState.code}
            />
          )}
          {uiState.showRequestOTP && (
            <DirectDebitAccountOTPForm
              loading={directDebitAccountState.loading}
              isRecurrent={directDebitAccountState.isRecurrent}
              directDebitAccount={directDebitAccountState.directDebitAccount}
              onSubmit={handleDirectDebitAccountOTPRequest}
            />
          )}
        </Card>
      </ThemeProvider>
      <DirectDebitAccountModal
        open={showAccountBreak}
        showBankHelp={showBankHelp}
        loading={directDebitAccountState.loading}
        onRetry={onRetryAccount}
        account={directDebitAccountState.directDebitAccount?.account}
        onCancel={handleCancelDirectDebitAccount}
        code={directDebitAccountState.code}
        isRetry={isRetryAttempt}
      />
      <DirectDebitAccountOTPModal
        loading={directDebitAccountState.loading}
        onCancel={handleCancelOTP}
        onSubmit={handleDirectDebitAccountOTP}
        open={showOTP}
      />
      <DirectDebitAccountBreakModal
        open={
          directDebitAccountState.loading && directDebitAccountState.isRecurrent
        }
      />
    </>
  );
};
