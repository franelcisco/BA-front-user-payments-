export interface OrderResponse {
  id: string;
  name: string;
  statusPageUrl: string;
  createdAt: string;
  displayFinancialStatus: "PAID" | "PENDING" | "PARTIALLY_PAID" | "UNPAID";
  displayFulfillmentStatus: "UNFULFILLED" | "FULFILLED" | "MANUAL";
  totalPriceSetUSD: OrderPrice;
  totalPriceSetVES: OrderPrice;
  totalShippingPriceSetUSD: OrderPrice;
  lineItems: LineItem[];
  customer: Customer;
  debitDirect?: DebitDirect;
  casheaId?: string;
  isPartiallyPaid: boolean;
  directDebitAccount?: DirectDebitAccount;
  isRecurrentDirectDebitAccountOrder: boolean;
}

export interface DebitDirect {
  dni: string;
  dniType: documentTypes;
  phone: string;
  bank: string;
}

export interface DirectDebitAccount {
  dni: string;
  account: string;
}

export interface OrderPrice {
  amount: string;
  currencyCode: string;
}

export interface LineItem {
  name: string;
  quantity: number;
  sku: string;
  unitPriceSetUSD: OrderPrice;
  totalDiscountSetUSD: OrderPrice;
  imageUrl: string;
}

export interface Customer {
  id: string;
  displayName: string;
  phone: string;
  dni: string;
  dniType: documentTypes;
}

export type UpdateCustomerParentIDRequest = {
  dni: string;
  dniType: documentTypes;
  customerId: string;
};

export type documentTypes = "V" | "E" | "P" | "J" | "G";
