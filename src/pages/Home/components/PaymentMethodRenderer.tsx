import { Cash } from "@/pages/Cash";
import { Cashea } from "@/pages/Cashea";
import { DirectDebit } from "@/pages/DirectDebit";
import { DirectDebitAccount } from "@/pages/DirectDebitAccount";
import { MobilePayment } from "@/pages/MobilePayment";
import { Zelle } from "@/pages/Zelle";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";

export const PaymentMethodRenderer = ({
  method,
  order,
  onSelect,
}: {
  method: PaymentMethodsType;
  order: OrderResponse;
  onSelect: (method: PaymentMethodsType) => void;
}) => {
  switch (method) {
    case "domiciliacion":
      return <DirectDebitAccount order={order} selectedMethod={onSelect} />;
    case "directDebit":
      return <DirectDebit order={order} selectedMethod={onSelect} />;
    case "cash":
      return <Cash order={order} selectedMethod={onSelect} />;
    case "mobilePayment":
      return <MobilePayment order={order} selectedMethod={onSelect} />;
    case "zelle":
      return <Zelle order={order} selectedMethod={onSelect} />;
    case "cashea":
      return <Cashea order={order} handleMethodSelection={onSelect} />;
    default:
      return null;
  }
};
