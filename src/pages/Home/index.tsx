import { OrderPaid } from "../../components/OrderPaid.tsx";
import { PaymentMethodSelection } from "../PaymentMethodSelection/index.tsx";
import { FindOrder } from "../FindOrder/index.tsx";
import { Spinner } from "flowbite-react";
import { ParentID } from "../ParentID/index.tsx";
import { PaymentMethodRenderer } from "./components/PaymentMethodRenderer.tsx";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import type { UpdateCustomerParentIDRequest } from "@/types/dtos/store.dto.ts";

const PaymentValidatePage = () => {
  const {
    uiState,
    orderState,
    findOrder,
    updateCustomerParentId,
    handleChangePaymentMethod,
    handleReset,
  } = usePaymentFlow();

  const handleFindOrder = async (orderName: string) => {
    await findOrder.mutateAsync(orderName);
  };

  const handleUpdateCustomerID = async (
    data: UpdateCustomerParentIDRequest,
  ) => {
    await updateCustomerParentId.mutateAsync(data);
  };

  if (orderState.loading) {
    return (
      <div className="flex w-full h-full justify-center items-center px-4">
        <div className="max-w-md mx-auto mt-10 p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando...</h2>
          <Spinner aria-label="Small spinner example" size="sm" />
        </div>
      </div>
    );
  }

  if (uiState.showOrderPaid) {
    return (
      <div className="flex w-full h-full justify-center items-center px-4">
        <OrderPaid
          inProcess={orderState.inProcessPaid}
          handleReset={handleReset}
        />
      </div>
    );
  }

  if (uiState.showFindOrder) {
    return (
      <div className="flex w-full h-full justify-center items-center px-4">
        <FindOrder onSubmit={handleFindOrder} />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full justify-center items-center px-4">
      {uiState.showParentId && orderState.order !== null && (
        <ParentID
          onSubmit={handleUpdateCustomerID}
          customerId={orderState.order.customer.id}
        />
      )}

      {uiState.showPaymentSelection &&
        orderState.order !== null &&
        (orderState.selectedMethod ? (
          <PaymentMethodRenderer
            method={orderState.selectedMethod}
            order={orderState.order}
            onSelect={handleChangePaymentMethod}
          />
        ) : (
          <PaymentMethodSelection
            onSelect={handleChangePaymentMethod}
            order={orderState.order}
            onCancel={handleReset}
            isCasheaOrder={orderState.isCasheaOrder}
            hasDiscount={orderState.hasDiscount}
          />
        ))}
    </div>
  );
};

export default PaymentValidatePage;
