import { useEffect, useRef } from "react";
// @ts-expect-error for this script is not typed yet --- IGNORE ---
import WebCheckoutSDK from "cashea-web-checkout-sdk";
import type { CasheaDto, CasheaProductDto } from "@/types/dtos/cashea.dto";
import { casheaMetaData } from "@/utils/constants";
import type { LineItem, OrderResponse } from "@/types/dtos/store.dto";
import { useStoreStore } from "@/store/store";

const sdk = new WebCheckoutSDK({
  apiKey: casheaMetaData.publicKey,
});

interface CasheaCheckoutButtonProps {
  orderData: OrderResponse;
}

const getCasheaProductDtoByLineItem = (item: LineItem): CasheaProductDto => {
  const discount = parseFloat(item.totalDiscountSetUSD.amount) / item.quantity;
  const totalPrice = parseFloat(item.unitPriceSetUSD.amount) - discount;
  const tax = 0.16 * totalPrice;

  return {
    id: `${item.sku}-${item.name}`,
    name: item.name,
    price: parseFloat(item.unitPriceSetUSD.amount),
    quantity: item.quantity,
    sku: item.sku || item.name,
    description: item.name,
    imageUrl: item.imageUrl || `${window.location.origin}/image_not_found.jpg`,
    tax: parseFloat(tax.toFixed(3)),
    discount: parseFloat(discount.toFixed(3)),
  };
};

const CasheaCheckoutButton = ({ orderData }: CasheaCheckoutButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setOrder } = useStoreStore();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const products: CasheaProductDto[] = [];
      for (const item of orderData.lineItems) {
        products.push(getCasheaProductDtoByLineItem(item));
      }

      const payload: CasheaDto = {
        deliveryMethod: "IN_STORE",
        redirectUrl: `${window.location.origin}/cashea/payment-validate`,
        merchantName: "Bone Appetit",
        orders: [
          {
            store: {
              id: casheaMetaData.storeId,
              name: casheaMetaData.storeName,
              enabled: true,
            },
            products: products,
          },
        ],
        identificationNumber: orderData.customer.dni,
        invoiceId: orderData.name.replace("#", ""),
        externalClientId: casheaMetaData.externalClientId,
        deliveryPrice: parseFloat(orderData.totalShippingPriceSetUSD.amount),
      };
      console.log("Cashea payload:", payload);
      sdk.createCheckoutButton({
        payload,
        container: containerRef.current,
      });
    }
  }, [orderData]);

  return (
    <div>
      <div
        ref={containerRef}
        onClick={() => {
          setOrder(undefined);
        }}
        id="checkout-container"
      ></div>
    </div>
  );
};

export default CasheaCheckoutButton;
