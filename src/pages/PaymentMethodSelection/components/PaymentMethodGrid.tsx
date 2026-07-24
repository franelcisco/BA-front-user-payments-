import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";

interface PaymentMethodGridProps {
  onSelect: (method: PaymentMethodsType) => void;
  order: OrderResponse;
  isCasheaOrder: boolean;
}

interface MethodItem {
  id: PaymentMethodsType;
  icon: string;
  label: string;
}

export function PaymentMethodGrid({
  onSelect,
  order,
  isCasheaOrder,
}: PaymentMethodGridProps) {
  const methods: MethodItem[] = [];

  if (Number(order.totalPriceSetVES.amount) > 0) {
    methods.push(
      { id: "directDebit", icon: "💳", label: "Débito inmediato" },
      { id: "mobilePayment", icon: "📱", label: "Pago Móvil" },
    );
  }

  if (!isCasheaOrder) {
    if (
      parseFloat(order.totalPriceSetUSD.amount) >= 25 &&
      !order.isPartiallyPaid &&
      Number(order.totalPriceSetVES.amount) > 0
    ) {
      methods.push({ id: "cashea", icon: "🌙", label: "Cashea" });
    }
    methods.push({ id: "cash", icon: "💵", label: "Efectivo" });
    methods.push({ id: "zelle", icon: "💵", label: "Zelle" });
  }

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {methods.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelect(m.id)}
          className="flex items-center gap-2.5 px-3.5 py-3.5 rounded-xl border-[1.5px] border-bone-yellow/30 bg-white cursor-pointer transition-all text-sm font-semibold text-bone-primary hover:bg-bone-beige-light hover:border-bone-yellow"
        >
          <span className="text-lg">{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
}
