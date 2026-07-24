import { directDebitAccountDiscountPorcent } from "@/utils/constants";
import { FaCheck } from "react-icons/fa6";

interface DomiciliacionHeroCardProps {
  onSelect: () => void;
  pendingUsd: string;
  hasDiscount: boolean;
}

export function DomiciliacionHeroCard({
  onSelect,
  pendingUsd,
  hasDiscount,
}: DomiciliacionHeroCardProps) {
  const discountedUsd = (
    parseFloat(pendingUsd || "0") *
    (1 - directDebitAccountDiscountPorcent / 100)
  ).toFixed(2);

  return (
    <div
      onClick={onSelect}
      className="bg-bone-beige-light rounded-2xl px-4 py-4 mb-4 overflow-hidden cursor-pointer border-2 border-bone-yellow"
    >
      {/* Header row */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-xl border border-bone-yellow/30 shrink-0">
          🏦
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-bone-primary leading-tight">
            Domiciliación bancaria
          </div>
          <div className="text-[11px] font-semibold text-green-600">
            Recomendado · Pago automático en Bs
          </div>
        </div>
      </div>

      {/* Discount block */}
      {!hasDiscount && (
        <div className="bg-bone-yellow rounded-xl px-3 py-2.5 mt-6 mb-5 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-sm">🎉</span>
            <span className="text-[11px] font-semibold text-bone-primary whitespace-nowrap">
              {directDebitAccountDiscountPorcent}% de descuento con este método
            </span>
          </div>
          <div>
            <span className="text-xs text-bone-primary line-through opacity-60 mr-1.5">
              ${pendingUsd}
            </span>
            <span className="text-lg font-bold text-bone-primary">
              ${discountedUsd}
            </span>
            <span className="text-xxs text-bone-primary/70 font-semibold ml-1.5">
              al activar
            </span>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="flex flex-col gap-1.5 mb-5">
        {[
          "Pago automático — olvídate de pagar cada vez",
          "Sin esfuerzo: cobramos en tu fecha de corte",
          "Cancela cuando quieras",
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <FaCheck className="text-white w-2 h-2" />
            </div>
            <span className="text-[11px] text-bone-primary">{t}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="w-full py-3 px-4 rounded-xl bg-bone-primary text-white text-sm font-medium border-none cursor-pointer"
      >
        {hasDiscount
          ? "Activar"
          : `Activa y ahorra ${directDebitAccountDiscountPorcent}%`}
      </button>
    </div>
  );
}
