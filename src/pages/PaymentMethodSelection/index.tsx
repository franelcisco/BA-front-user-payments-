import { Card } from "flowbite-react";
import { OrderDetailsModal } from "../../components/OrderDetails";
import { useState } from "react";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { PaymentAmounts } from "@/components/PaymentAmounts";
import { BackButton } from "@/components/BackButton";
import { DomiciliacionHeroCard } from "./components/DomiciliacionHeroCard";
import { DomiciliacionActiveCard } from "./components/DomiciliacionActiveCard";
import { PaymentMethodGrid } from "./components/PaymentMethodGrid";

interface PaymentMethodSelectionProps {
  onSelect: (method: PaymentMethodsType) => void;
  onCancel: () => void;
  order: OrderResponse;
  isCasheaOrder: boolean;
  hasDiscount: boolean;
}

export function PaymentMethodSelection({
  onSelect,
  order,
  onCancel,
  isCasheaOrder,
  hasDiscount,
}: PaymentMethodSelectionProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <OrderDetailsModal
        order={order}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <Card className="max-w-md w-full">
        <BackButton onClick={onCancel} order={order} />
        <PaymentAmounts
          totalPriceVESAmount={order.totalPriceSetVES.amount}
          totalPriceUSD={order.totalPriceSetUSD.amount}
        />
        <div>
          <div className="mb-3 text-left">
            <span className="text-xl font-semibold">Selecciona como pagar</span>
            {isCasheaOrder && (
              <div className="text-xs mt-1">
                Para culminar tu orden de cashea debes cancelar tu inicial
                usando nuestros siguientes medios de pago:
              </div>
            )}
          </div>

          {/* Domiciliación card */}
          {!isCasheaOrder && !order.directDebitAccount && (
            <>
              <DomiciliacionHeroCard
                onSelect={() => onSelect("domiciliacion")}
                pendingUsd={order.totalPriceSetUSD.amount}
                hasDiscount={hasDiscount}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-500 font-medium">
                  o paga manualmente
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {!isCasheaOrder && order.directDebitAccount && (
            <>
              <DomiciliacionActiveCard
                onSelect={() => onSelect("domiciliacion")}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-500 font-medium">
                  o paga manualmente
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {/* Other payment methods grid */}
          <PaymentMethodGrid
            onSelect={onSelect}
            order={order}
            isCasheaOrder={isCasheaOrder}
          />
        </div>
      </Card>
    </>
  );
}
