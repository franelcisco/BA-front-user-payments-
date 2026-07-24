export interface CasheaProductDto {
  id: string;
  name: string;
  sku: string;
  description: string;
  imageUrl: string;
  quantity: number;
  price: number;
  tax: number;
  discount: number;
}

export interface CasheaStoreDto {
  id: number;
  name: string;
  enabled: boolean;
}

export interface CasheaOrderDto {
  store: CasheaStoreDto;
  products: CasheaProductDto[];
}

export interface CasheaDto {
  identificationNumber: string; // DNI OR RIF CUSTOMER
  externalClientId: string; // ID STORE
  deliveryMethod: string; //
  merchantName: string; // NOMBRE DEL COMERCIO
  redirectUrl: string; // URL DE RETORNO
  invoiceId: string; // INTERNAL ID
  deliveryPrice: number;
  orders: CasheaOrderDto[];
}

export interface casheaMetaDataDto {
  publicKey: string;
  externalClientId: string;
  storeId: number;
  storeName: string;
  storeType: string;
}
