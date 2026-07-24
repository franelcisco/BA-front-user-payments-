import { endpoints } from "@/config/endpoints";
import type {
  BCVTasaUSDResponse,
  // DirectDebitAccountCodes,
  DirectDebitAccountOTPRequest,
  DirectDebitAccountRequest,
  DirectDebitAccountResponse,
  OTPRequest,
  ValidateMobilePaymentRequest,
  ValidateMobilePaymentResponse,
  ValidateOTPRequest,
} from "@/types/dtos/payments.dto";
import {
  restApiHttpRequest,
  type isResponseVoidType,
} from "@/utils/httpClient";

const getBCVTasa = async (): Promise<BCVTasaUSDResponse | undefined> => {
  try {
    const response = await restApiHttpRequest<BCVTasaUSDResponse>({
      method: "get",
      endpoint: endpoints.payments.getBCVTasa.endpoint,
    });
    return response || undefined;
  } catch (error) {
    console.error("Error fetching BCV Tasa:", error);
  }
};

const generateOTP = async (data: OTPRequest): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "post",
      endpoint: endpoints.payments.generateOTP.endpoint,
      body: data,
      isResponseVoid: true,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error("Error generating OTP:", error);
    return false;
  }
};

const validateDirectDebit = async (
  data: ValidateOTPRequest,
): Promise<ValidateMobilePaymentResponse> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "post",
      endpoint: endpoints.payments.ValidateDirectDebit.endpoint,
      body: data,
      isResponseVoid: true,
    });
    console.log("Validate Direct Debit Response:", response);
    if (response && response.status === 200)
      return { success: true, message: "Pago validado exitosamente" };
    return {
      success: false,
      message: response?.message || "ocurrió un error al procesar la solicitud",
    };
  } catch (error) {
    console.error("Error validating direct debit:", error);
    return {
      success: false,
      message: "ocurrió un error al procesar la solicitud",
    };
  }
};

const validateCash = async (data: FormData): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "post",
      endpoint: endpoints.payments.validateCash.endpoint,
      body: data,
      isResponseVoid: true,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error("Error validating cash payment:", error);
    return false;
  }
};

const ValidateMobilePayment = async (
  data: ValidateMobilePaymentRequest,
): Promise<ValidateMobilePaymentResponse> => {
  try {
    const response = await restApiHttpRequest<ValidateMobilePaymentResponse>({
      method: "post",
      endpoint: endpoints.payments.validateMobilePayment.endpoint,
      body: data,
    });
    if (response) return response;
    return {
      success: false,
      message: "Error interno al validar su pago, contacte con soporte",
    };
  } catch (error) {
    console.error("Error validating mobile payment:", error);
    return {
      success: false,
      message: "Error interno al validar su pago, contacte con soporte",
    };
  }
};

const ValidateZelle = async (data: FormData): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "post",
      endpoint: endpoints.payments.validateZelle.endpoint,
      body: data,
      isResponseVoid: true,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error("Error validating Zelle payment:", error);
    return false;
  }
};

const ValidateMobilePaymentManual = async (
  data: FormData,
): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "post",
      endpoint: endpoints.payments.validateMobilePaymentManual.endpoint,
      body: data,
      isResponseVoid: true,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error("Error validating Mobile Payment Manual:", error);
    return false;
  }
};

// const mockCode: DirectDebitAccountCodes = "ERR02";

// const mockDirectDebitAccount = async (
//   data: unknown,
// ): Promise<DirectDebitAccountResponse> => {
//   console.log("Mock Direct Debit Account Request:", data);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         success: false,
//         code: mockCode,
//       });
//     }, 6000);
//   });
// };

const DirectDebitAccount = async (
  data: DirectDebitAccountRequest,
): Promise<DirectDebitAccountResponse> => {
  try {
    const response = await restApiHttpRequest<DirectDebitAccountResponse>({
      method: "post",
      endpoint: endpoints.payments.directDebitAccount.endpoint,
      body: data,
    });

    // const response = await mockDirectDebitAccount(data);
    if (response) return response;
    return {
      success: false,
      code: "",
    };
  } catch (error) {
    console.error("Error validating Direct Debit Account:", error);
    return {
      success: false,
      code: "",
    };
  }
};

const DirectDebitAccountWithOTP = async (
  data: DirectDebitAccountOTPRequest,
): Promise<DirectDebitAccountResponse> => {
  try {
    const response = await restApiHttpRequest<DirectDebitAccountResponse>({
      method: "post",
      endpoint: endpoints.payments.directDebitAccountWithOTP.endpoint,
      body: data,
    });
    // const response = await mockDirectDebitAccount({
    //   orderId: data.orderId,
    // });
    if (response) return response;
    return {
      success: false,
      code: "",
    };
  } catch (error) {
    console.error("Error validating Direct Debit Account With OTP:", error);
    return {
      success: false,
      code: "",
    };
  }
};

const DirectDebitAccountOTP = async (orderId: string): Promise<boolean> => {
  try {
    const response = await restApiHttpRequest<isResponseVoidType>({
      method: "get",
      endpoint: `${endpoints.payments.directDebitAccountWithOTP.endpoint}/${orderId}`,
    });
    if (response && response.status === 200) return true;
    return false;
  } catch (error) {
    console.error("Error validating Direct Debit Account OTP:", error);
    return false;
  }
};

export const paymentsService = {
  getBCVTasa,
  generateOTP,
  validateDirectDebit,
  validateCash,
  ValidateMobilePayment,
  ValidateZelle,
  ValidateMobilePaymentManual,
  DirectDebitAccount,
  DirectDebitAccountWithOTP,
  DirectDebitAccountOTP,
};
