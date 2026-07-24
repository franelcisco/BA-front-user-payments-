import { useLocation } from "react-router-dom";

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const currencyFormat = new Intl.NumberFormat("es-VE", {
  style: "currency",
  currency: "VES",
});
const opcionesISO: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

// yyyy-MM-dd
export const getLocalDateString = (date: Date): string => {
  return new Intl.DateTimeFormat("en-CA", opcionesISO).format(date);
};

// Helper para obtener el query param
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
