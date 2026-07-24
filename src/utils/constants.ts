import type { casheaMetaDataDto } from "@/types/dtos/cashea.dto";

export const casheaMetaData = {
  publicKey: import.meta.env.VITE_CASHEA_PUBLIC_KEY || "",
  externalClientId: import.meta.env.VITE_CASHEA_EXTERNAL_CLIENT_ID || "",
  storeId: Number(import.meta.env.VITE_CASHEA_STORE_ID) || 0,
  storeName: import.meta.env.VITE_CASHEA_STORE_NAME || "",
} as casheaMetaDataDto;

export const directDebitAccountDiscountPorcent = Number(
  import.meta.env.VITE_DIRECT_DEBIT_ACCOUNT_DISCOUNT_PORCENT || 0
);

export const bankList = [
  { code: "0102", name: "Banco de Venezuela" },
  { code: "0104", name: "Banco Venezolano de Crédito" },
  { code: "0105", name: "Banco Mercantil" },
  { code: "0108", name: "Banco Provincial" },
  { code: "0114", name: "Banco del Caribe" },
  { code: "0115", name: "Banco Exterior" },
  { code: "0128", name: "Banco Caroní" },
  { code: "0134", name: "Banesco" },
  { code: "0137", name: "Banco Sofitasa" },
  { code: "0138", name: "Banco Plaza" },
  { code: "0146", name: "Banco de la Gente Emprendedora" },
  { code: "0151", name: "Banco Fondo Común" },
  { code: "0156", name: "100% Banco" },
  { code: "0157", name: "Delsur" },
  { code: "0163", name: "Banco del Tesoro" },
  { code: "0166", name: "Banco Agrícola de Venezuela" },
  { code: "0168", name: "Bancrecer" },
  { code: "0169", name: "R4, Banco Microfinanciero" },
  { code: "0171", name: "Banco Activo" },
  { code: "0172", name: "Bancamiga" },
  { code: "0173", name: "Banco Internacional de Desarrollo" },
  { code: "0174", name: "Banplus" },
  { code: "0175", name: "Banco Digital de los Trabajadores" },
  {
    code: "0177",
    name: "Banco de la Fuerza Armada Nacional Bolivariana (BANFANB)",
  },
  { code: "0178", name: "N58 Banco Digital" },
  { code: "0191", name: "Banco Nacional de Crédito (BNC)" },
];

export const documentTypes = [
  "V", // Venezolano
  "E", // Extranjero
  "J", // Jurídico
  "P", // Pasaporte
  "G", // Gobierno
];
