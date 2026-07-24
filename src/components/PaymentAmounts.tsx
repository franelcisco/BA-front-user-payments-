import { currencyFormat } from "@/utils/helpers";

interface PaymentAmountsProps {
  totalPriceVESAmount: string;
  totalPriceUSD: string;
}

export const PaymentAmounts = ({
  totalPriceVESAmount,
  totalPriceUSD,
}: PaymentAmountsProps) => {
  return (
    <div className="flex justify-between items-center p-2 bg-bone-beige rounded-xl">
      <div>Pago pendiente:</div>
      <div className="flex flex-col gap-1 items-end">
        {Number(totalPriceVESAmount) > 0 && (
          <div className="font-medium text-xs">
            {`${currencyFormat.format(Number(totalPriceVESAmount))}`}
          </div>
        )}
        <div className="font-medium text-xs">{`$${Number(totalPriceUSD)}`}</div>
      </div>
    </div>
  );
};
