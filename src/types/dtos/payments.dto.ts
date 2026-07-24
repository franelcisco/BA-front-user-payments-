export interface BCVTasaUSDResponse {
  date: string;
  rate: number;
}

export type OTPRequest = {
  bank: string;
  amount: string;
  phone: string;
  dni: string;
  dniType: "V" | "E" | "P" | "J" | "G";
  orderId: string;
  orderName: string;
  casheaId: string;
};

export type ValidateOTPRequest = {
  bank: string;
  amount: string;
  phone: string;
  dni: string;
  dniType: "V" | "E" | "P" | "J" | "G";
  name: string;
  otp: string;
  concept: string;
  orderId: string;
  orderName: string;
  casheaId: string;
  customerId: string;
};

export type ValidateOTPResponse = {
  success: boolean;
  message: string;
};

export type ValidateMobilePaymentRequest = {
  bank: string;
  phone: string;
  reference: string;
  date: string;
  automatic: boolean;
  orderId: string;
  orderName: string;
  dni: string;
  dniType: string;
  casheaId: string;
  customerId: string;
};

export type ValidateMobilePaymentResponse = {
  success: boolean;
  message: string;
};

export type MobilePaymentReturnRequest = {
  bank: string;
  phone: string;
  dni: string;
  dniType: "V" | "E" | "P" | "J" | "G";
};

export type DirectDebitAccountRequest = {
  orderId: string;
  account: string;
  dni: string;
};

export type DirectDebitAccountWithOTPRequest = {
  orderId: string;
  otp: string;
};

// "OK" => Solicitud exitosa.
// "AAF01" => ya se encuentra afiliado
// "AAF02" => sin afiliacion
// "OTP01" => OTP incorrecto
// "ERR01" => Saldo insuficiente
// "ERR02" => Afiliacion solicitada.
// "ERR03" => Afiliacion solicitada pero no aceptada.
// "ERR04" => Numero de cuenta no válido.
export type DirectDebitAccountCodes =
  | "OK"
  | "AAF01"
  | "AAF02"
  | "OTP01"
  | "ERR01"
  | "ERR02"
  | "ERR03"
  | "ERR04";

export type DirectDebitAccountResponse = {
  success: boolean;
  code: DirectDebitAccountCodes | string;
};

export type DirectDebitAccountOTPRequest = {
  orderId: string;
};
