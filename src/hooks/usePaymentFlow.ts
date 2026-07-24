import { useEffect, useCallback, useReducer } from "react";
import { storeService } from "@/services/store.service";
import type {
  LineItem,
  OrderResponse,
  UpdateCustomerParentIDRequest,
} from "@/types/dtos/store.dto";
import { useStoreStore } from "@/store/store";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { useQuery as useUrlParams } from "@/utils/helpers.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

interface UIState {
  showPaymentSelection: boolean;
  showParentId: boolean;
  showOrderPaid: boolean;
  showFindOrder: boolean;
}

type UIAction =
  | { type: "SHOW_PAYMENT_SELECTION" }
  | { type: "SHOW_PARENT_ID" }
  | { type: "SHOW_ORDER_PAID" }
  | { type: "SHOW_FIND_ORDER" }
  | { type: "RESET" };

const uiInitState = {
  showPaymentSelection: false,
  showParentId: false,
  showOrderPaid: false,
  showFindOrder: false,
};

const uiReducer = (state: UIState, action: UIAction) => {
  switch (action.type) {
    case "SHOW_PAYMENT_SELECTION":
      return {
        showPaymentSelection: true,
        showParentId: false,
        showOrderPaid: false,
        showFindOrder: false,
      };
    case "SHOW_PARENT_ID":
      return {
        showPaymentSelection: false,
        showParentId: true,
        showOrderPaid: false,
        showFindOrder: false,
      };
    case "SHOW_ORDER_PAID":
      return {
        showPaymentSelection: false,
        showParentId: false,
        showOrderPaid: true,
        showFindOrder: false,
      };
    case "SHOW_FIND_ORDER":
      return {
        showPaymentSelection: false,
        showParentId: false,
        showOrderPaid: false,
        showFindOrder: true,
      };
    case "RESET":
      return uiInitState;
    default:
      return state;
  }
};

interface OrderState {
  loading: boolean;
  isCasheaOrder: boolean;
  order: OrderResponse | null;
  casheaId: string | undefined;
  selectedMethod: PaymentMethodsType | undefined;
  inProcessPaid: boolean;
  hasDiscount: boolean;
}

const orderInitState = {
  loading: false,
  isCasheaOrder: false,
  order: null,
  casheaId: undefined,
  selectedMethod: undefined,
  inProcessPaid: false,
  hasDiscount: false,
};

type OrderAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_IS_CASHEA_ORDER"; payload: boolean }
  | { type: "SET_ORDER"; payload: OrderResponse | null }
  | { type: "SET_CASHEA_ID"; payload: string | undefined }
  | { type: "SET_SELECTED_METHOD"; payload: PaymentMethodsType | undefined }
  | { type: "SET_IN_PROCESS_PAID"; payload: boolean }
  | { type: "SET_HAS_DISCOUNT"; payload: boolean }
  | { type: "RESET" };

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CASHEA_ID":
      if (action.payload !== "" && !state.casheaId) {
        return { ...state, casheaId: action.payload, isCasheaOrder: true };
      }
      return { ...state, casheaId: action.payload, isCasheaOrder: false };
    case "SET_ORDER":
      if (action.payload?.displayFinancialStatus === "PENDING") {
        return { ...state, order: action.payload, inProcessPaid: true };
      }
      return { ...state, order: action.payload, inProcessPaid: false };
    case "SET_SELECTED_METHOD":
      return { ...state, selectedMethod: action.payload };
    case "SET_IN_PROCESS_PAID":
      return { ...state, inProcessPaid: action.payload };
    case "RESET":
      return orderInitState;
    case "SET_HAS_DISCOUNT":
      return { ...state, hasDiscount: action.payload };
    default:
      return state;
  }
};

export const usePaymentFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = useUrlParams();
  const [uiState, dispatchUIState] = useReducer(uiReducer, uiInitState);
  const [orderState, dispatchOrderState] = useReducer(
    orderReducer,
    orderInitState,
  );

  const {
    setOrder,
    order: stateOrderId,
    setCasheaId,
    casheaId: stateCasheaId,
    reset,
  } = useStoreStore();

  const idNumberParam = urlParams.get("idNumber");
  const orderIdParam = urlParams.get("orderId");

  // TanStack Query to fetch order information
  const {
    data: orderData,
    isLoading,
    isError,
    refetch: refetchOrderData,
  } = useQuery({
    queryKey: ["order-fetch", idNumberParam, orderIdParam],
    queryFn: async () => {
      // Priority 1: URL idNumber (Cashea)
      if (idNumberParam) {
        return await storeService.findCasheaById(idNumberParam);
      }
      // Priority 2: URL orderId
      if (orderIdParam) {
        return await storeService.findOrderById(orderIdParam);
      }
      // Priority 3: State orderId and casheaId -> Fetch by Cashea
      if (stateOrderId && stateCasheaId) {
        return await storeService.findCasheaById(stateCasheaId);
      }
      // Priority 4: State orderId only -> Fetch by Order ID
      if (stateOrderId) {
        return await storeService.findOrderById(stateOrderId);
      }
      return null;
    },
    enabled: !!(idNumberParam || orderIdParam || stateOrderId),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const hasDiscount = (lineItems: LineItem[]) => {
    for (const lineItem of lineItems) {
      if (parseFloat(lineItem.totalDiscountSetUSD.amount) > 0) {
        return true;
      }
    }
    return false;
  };

  // Shared logic for processing order response
  const handleOrderResponse = useCallback(
    (orderData: OrderResponse, casheaIdFromParam?: string) => {
      console.log("handleOrderResponse");
      // Business logic for order status
      if (orderData.displayFulfillmentStatus === "MANUAL") {
        dispatchOrderState({ type: "SET_ORDER", payload: orderData });
        dispatchUIState({ type: "SHOW_ORDER_PAID" });
        return;
      }

      if (orderData.displayFinancialStatus === "PAID") {
        dispatchOrderState({ type: "SET_IN_PROCESS_PAID", payload: false });
        dispatchUIState({ type: "SHOW_ORDER_PAID" });
        return;
      }

      if (orderData.casheaId && orderData.casheaId !== "") {
        dispatchOrderState({
          type: "SET_CASHEA_ID",
          payload: orderData.casheaId,
        });
      }

      dispatchOrderState({ type: "SET_ORDER", payload: orderData });

      if (hasDiscount(orderData.lineItems)) {
        dispatchOrderState({ type: "SET_HAS_DISCOUNT", payload: true });
      }

      // Navigate based on customer info
      if (orderData.customer.dni !== "") {
        dispatchUIState({ type: "SHOW_PAYMENT_SELECTION" });
      } else {
        dispatchUIState({ type: "SHOW_PARENT_ID" });
      }

      if (casheaIdFromParam && !stateCasheaId) setCasheaId(casheaIdFromParam);
      if (!stateOrderId) setOrder(orderData.id);
      refetchOrderData();
    },
    [stateOrderId, stateCasheaId],
  );

  // Mutation for manual order search
  const findOrder = useMutation({
    mutationFn: async (orderName: string) =>
      await storeService.findOrderByName(orderName),
    onSuccess: (data) => {
      if (data) {
        handleOrderResponse(data);
      } else {
        toast.error("No se encontró la orden, verifique el número");
      }
    },
    onError: () => {
      toast.error("Error al buscar la orden");
    },
  });

  const updateCustomerParentId = useMutation({
    mutationFn: async (data: UpdateCustomerParentIDRequest) => {
      await storeService.updateCustomerParentID(data);
    },
    onSuccess: async () => {
      await refetchOrderData();
      toast.success("Cédula actualizada con éxito");
    },
    onError: () => {
      toast.error("Error al actualizar la cédula");
    },
  });

  // Handle Query result and UI transitions
  useEffect(() => {
    console.debug(
      "useEffect",
      orderData,
      isLoading,
      isError,
      idNumberParam,
      orderIdParam,
    );
    if (isLoading) {
      dispatchOrderState({ type: "SET_LOADING", payload: true });
      return;
    }
    dispatchOrderState({ type: "SET_LOADING", payload: false });

    // Handle Error or Missing Information
    const hasInitiator = !!(idNumberParam || orderIdParam) || !!stateOrderId;
    if (isError || (hasInitiator && orderData === undefined)) {
      toast.error("Error al consultar la información de su orden");
      dispatchUIState({ type: "SHOW_FIND_ORDER" });
      return;
    }

    if (!hasInitiator) {
      dispatchUIState({ type: "SHOW_FIND_ORDER" });
      return;
    }

    if (orderData) {
      handleOrderResponse(orderData, idNumberParam ?? undefined);
    }
  }, [orderData, isLoading, isError, idNumberParam, orderIdParam]);

  const handleChangePaymentMethod = useCallback(
    (method: PaymentMethodsType) => {
      dispatchOrderState({ type: "SET_SELECTED_METHOD", payload: method });
    },
    [],
  );

  const clearURL = useCallback(() => {
    // Navega a la ruta actual pero sin los parámetros
    navigate(location.pathname, { replace: true });
  }, [navigate, location.pathname]);

  const handleReset = useCallback(() => {
    clearURL();
    reset();
    dispatchOrderState({ type: "RESET" });
    dispatchUIState({ type: "SHOW_FIND_ORDER" });
  }, []);

  return {
    orderState,
    uiState,
    findOrder,
    updateCustomerParentId,
    handleChangePaymentMethod,
    handleReset,
  };
};
