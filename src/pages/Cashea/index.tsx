import { BackButton } from "@/components/BackButton";
import { PaymentAmounts } from "@/components/PaymentAmounts";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { Card, createTheme, ThemeProvider } from "flowbite-react";
import { useCallback } from "react";
import CasheaCheckoutButton from "./components/CasheaCheckoutButton";

interface CasheaProps {
  order: OrderResponse;
  handleMethodSelection: (method: PaymentMethodsType) => void;
}

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

export const Cashea = ({ order, handleMethodSelection }: CasheaProps) => {
  const handleCancelPayment = useCallback(() => {
    handleMethodSelection(undefined);
  }, [handleMethodSelection]);
  return (
    <ThemeProvider theme={theme}>
      <Card className="max-w-md w-full">
        <BackButton onClick={handleCancelPayment} order={order} />
        <PaymentAmounts
          totalPriceVESAmount={order.totalPriceSetVES.amount}
          totalPriceUSD={order.totalPriceSetUSD.amount}
        />
        <h2 className="text-2xl font-bold text-center">Cashea</h2>
        <div className="flex justify-center">
          <CasheaCheckoutButton orderData={order} />
        </div>
      </Card>
    </ThemeProvider>
  );
};
