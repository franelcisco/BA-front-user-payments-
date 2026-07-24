import { paymentsService } from "@/services/payments.service";
import type {
  DirectDebitAccountCodes,
  DirectDebitAccountRequest,
  DirectDebitAccountResponse,
  DirectDebitAccountWithOTPRequest,
} from "@/types/dtos/payments.dto";
import type { DirectDebitAccount, OrderResponse } from "@/types/dtos/store.dto";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

interface UIState {
  showWithoutDNI: boolean;
  showRequestOTP: boolean;
  showAccount: boolean;
  showSuccess: boolean;
  showError: boolean;
}

type UIAction =
  | {
      type: "SHOW_WITHOUT_DNI";
    }
  | {
      type: "SHOW_REQUEST_OTP";
    }
  | {
      type: "SHOW_ACCOUNT";
    }
  | {
      type: "SHOW_SUCCESS";
    }
  | {
      type: "SHOW_ERROR";
    };

const uiInitState: UIState = {
  showWithoutDNI: false,
  showRequestOTP: false,
  showAccount: false,
  showSuccess: false,
  showError: false,
};

const uiReducer = (state: UIState, action: UIAction) => {
  switch (action.type) {
    case "SHOW_WITHOUT_DNI":
      return {
        showWithoutDNI: true,
        showRequestOTP: false,
        showAccount: false,
        showSuccess: false,
        showError: false,
      };
    case "SHOW_REQUEST_OTP":
      return {
        showRequestOTP: true,
        showWithoutDNI: false,
        showAccount: false,
        showSuccess: false,
        showError: false,
      };
    case "SHOW_ACCOUNT":
      return {
        showRequestOTP: false,
        showWithoutDNI: false,
        showAccount: true,
        showSuccess: false,
        showError: false,
      };
    case "SHOW_SUCCESS":
      return {
        showRequestOTP: false,
        showWithoutDNI: false,
        showAccount: false,
        showSuccess: true,
        showError: false,
      };
    case "SHOW_ERROR":
      return {
        showRequestOTP: false,
        showWithoutDNI: false,
        showAccount: false,
        showSuccess: false,
        showError: true,
      };
    default:
      return state;
  }
};

interface DirectDebitAccountState {
  loading: boolean;
  directDebitAccount: DirectDebitAccount | null;
  isRecurrent: boolean;
  dni: string;
  code: DirectDebitAccountCodes | string;
  lastAccountRequest: DirectDebitAccountRequest | null;
}

const directDebitAccountInitState: DirectDebitAccountState = {
  loading: false,
  directDebitAccount: null,
  isRecurrent: false,
  dni: "",
  code: "",
  lastAccountRequest: null,
};

type DirectDebitAccountAction =
  | {
      type: "SET_DIRECT_DEBIT_ACCOUNT";
      payload: DirectDebitAccount | null;
    }
  | {
      type: "SET_IS_RECURRENT";
      payload: boolean;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_DNI";
      payload: string;
    }
  | {
      type: "SET_CODE";
      payload: string;
    }
  | {
      type: "SET_LAST_ACCOUNT_REQUEST";
      payload: DirectDebitAccountRequest | null;
    };

const directDebitAccountReducer = (
  state: DirectDebitAccountState,
  action: DirectDebitAccountAction,
) => {
  switch (action.type) {
    case "SET_DIRECT_DEBIT_ACCOUNT":
      return {
        ...state,
        directDebitAccount: action.payload,
      };
    case "SET_IS_RECURRENT":
      return {
        ...state,
        isRecurrent: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_DNI":
      return {
        ...state,
        dni: action.payload,
      };
    case "SET_CODE":
      return {
        ...state,
        code: action.payload,
      };
    case "SET_LAST_ACCOUNT_REQUEST":
      return {
        ...state,
        lastAccountRequest: action.payload,
      };
    default:
      return state;
  }
};

const useDirectDebitAccount = (order: OrderResponse) => {
  const [directDebitAccountState, dispatchDirectDebitAccountState] = useReducer(
    directDebitAccountReducer,
    directDebitAccountInitState,
  );
  const [uiState, dispatchUIState] = useReducer(uiReducer, uiInitState);
  const [showAccountBreak, setShowAccountBreak] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [showBankHelp, setShowBankHelp] = useState<boolean>(false);
  const [isRetryAttempt, setIsRetryAttempt] = useState<boolean>(false);
  // const [showBreak, setShowBreak] = useState<boolean>(false);

  const directDebitAccount = useMutation({
    mutationFn: async (req: DirectDebitAccountRequest) => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: true });
      dispatchDirectDebitAccountState({
        type: "SET_LAST_ACCOUNT_REQUEST",
        payload: req,
      });
      dispatchDirectDebitAccountState({
        type: "SET_DIRECT_DEBIT_ACCOUNT",
        payload: {
          dni: req.dni,
          account: req.account,
        },
      });
      setShowAccountBreak(true);
      setShowBankHelp(false);
      req.orderId = order.id;
      return await paymentsService.DirectDebitAccount(req);
    },
    onSuccess: (data) => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      dispatchDirectDebitAccountState({ type: "SET_CODE", payload: data.code });

      console.log("Direct Debit Account Response Code:", data.code);

      if (data.code === "OK") {
        setShowAccountBreak(false);
        dispatchUIState({ type: "SHOW_SUCCESS" });
        return;
      }

      if (data.code === "ERR01") {
        setShowAccountBreak(false);
        toast.error("No tiene saldo suficiente para efectuar la operación");
        return;
      }

      if (data.code === "ERR04") {
        setShowAccountBreak(false);
        toast.error(
          "El numero de cuenta es inválido, verifique e intente de nuevo",
        );
        return;
      }

      if (data.code === "ERR02" || data.code === "ERR03") {
        setShowBankHelp(true);
        // Keep modal open (do not call setShowAccountBreak(false))
        return;
      }

      // Any other code
      setShowAccountBreak(false);
      dispatchUIState({ type: "SHOW_ERROR" });
    },
    onError: () => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      setShowAccountBreak(false);
      toast.error(
        "Error al enviar solicitud de pago domiciliación, intente de nuevo o pruebe con otro metedo de pago",
      );
    },
  });

  const directDebitAccountWithOTP = useMutation({
    mutationFn: async (req: DirectDebitAccountWithOTPRequest) => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: true });
      req.orderId = order.id;
      return await paymentsService.DirectDebitAccountWithOTP(req);
    },
    onSuccess: (data: DirectDebitAccountResponse) => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      dispatchDirectDebitAccountState({ type: "SET_CODE", payload: data.code });
      setShowOTP(false);

      if (data.code === "OK") {
        dispatchUIState({ type: "SHOW_SUCCESS" });
        return;
      }

      if (data.code === "OTP01") {
        toast.error("El código introducido es incorrecto");
        return;
      }

      if (data.code === "ERR01") {
        toast.error("No tiene saldo suficiente para efectuar la operación");
        return;
      }

      // Any other code
      dispatchUIState({ type: "SHOW_ERROR" });
    },
    onError: () => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      setShowOTP(false);
      toast.error(
        "Error al enviar solicitud de pago domiciliación con OTP, intente de nuevo o pruebe con otro metedo de pago",
      );
    },
  });

  const requestDirectDebitAccountOTP = useMutation({
    mutationFn: async () => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: true });
      await paymentsService.DirectDebitAccountOTP(order.id);
    },
    onSuccess: () => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      setShowOTP(true);
      toast.success(
        "Se ha enviado un código de verificación a su correo electrónico.",
      );
    },
    onError: () => {
      dispatchDirectDebitAccountState({ type: "SET_LOADING", payload: false });
      toast.error(
        "Error al enviar el código de verificación, intente de nuevo.",
      );
    },
  });

  const onShowRequestOTP = () => {
    dispatchUIState({ type: "SHOW_REQUEST_OTP" });
  };

  const handleRequestOTPOrPayment = async () => {
    if (directDebitAccountState.isRecurrent) {
      await directDebitAccountWithOTP.mutateAsync({
        orderId: order.id,
        otp: "",
      });
    } else {
      await requestDirectDebitAccountOTP.mutateAsync();
    }
  };

  const handleCancelOTP = () => {
    setShowOTP(false);
  };

  const handleCancelDirectDebitAccount = () => {
    setShowAccountBreak(false);
    setShowBankHelp(false);
    dispatchDirectDebitAccountState({
      type: "SET_DIRECT_DEBIT_ACCOUNT",
      payload: null,
    });
    dispatchDirectDebitAccountState({ type: "SET_CODE", payload: "" });
    dispatchDirectDebitAccountState({
      type: "SET_LAST_ACCOUNT_REQUEST",
      payload: null,
    });
  };

  const onRetryAccount = () => {
    if (directDebitAccountState.lastAccountRequest) {
      setIsRetryAttempt(true);
      directDebitAccount.mutateAsync(
        directDebitAccountState.lastAccountRequest,
      );
    }
  };

  const handleRetryFromError = () => {
    dispatchUIState({ type: "SHOW_ACCOUNT" });
  };

  useEffect(() => {
    if (!order.customer.dni || !order.customer.dniType) {
      dispatchUIState({ type: "SHOW_WITHOUT_DNI" });
      return;
    }

    dispatchDirectDebitAccountState({
      type: "SET_DNI",
      payload: `${order.customer.dniType}${order.customer.dni}`,
    });

    if (!order.directDebitAccount) {
      dispatchUIState({ type: "SHOW_ACCOUNT" });
      return;
    }

    if (order.isRecurrentDirectDebitAccountOrder) {
      dispatchDirectDebitAccountState({
        type: "SET_IS_RECURRENT",
        payload: true,
      });
    }

    dispatchDirectDebitAccountState({
      type: "SET_DIRECT_DEBIT_ACCOUNT",
      payload: order.directDebitAccount,
    });
    dispatchUIState({ type: "SHOW_REQUEST_OTP" });
  }, [order]);

  return {
    directDebitAccountState,
    uiState,
    directDebitAccount,
    directDebitAccountWithOTP,
    requestDirectDebitAccountOTP,
    onShowRequestOTP,
    handleRequestOTPOrPayment,
    handleCancelOTP,
    showAccountBreak,
    showOTP,
    showBankHelp,
    isRetryAttempt,
    onRetryAccount,
    handleRetryFromError,
    handleCancelDirectDebitAccount,
  };
};

export default useDirectDebitAccount;
