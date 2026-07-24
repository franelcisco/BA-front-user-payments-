import { paymentsService } from "@/services/payments.service";
import type {
  ValidateMobilePaymentRequest,
  ValidateMobilePaymentResponse,
} from "@/types/dtos/payments.dto";
import type { OrderResponse } from "@/types/dtos/store.dto";
import {
  Alert,
  Button,
  createTheme,
  Spinner,
  ThemeProvider,
} from "flowbite-react";
import { useCallback, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

interface MobilePaymentAutomaticFormProps {
  order: OrderResponse;
  onResult: (
    result: ValidateMobilePaymentResponse,
    req: ValidateMobilePaymentRequest
  ) => void;
  isValidPhone: boolean;
}

export const MobilePaymentAutomaticForm = ({
  order,
  onResult,
  isValidPhone,
}: MobilePaymentAutomaticFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const HandleValidatePaid = useCallback(async () => {
    if (!isValidPhone) return;
    const req: ValidateMobilePaymentRequest = {
      bank: "",
      phone: order.debitDirect?.phone.replace("+58", "0") || "",
      automatic: true,
      date: "",
      reference: "",
      orderId: order.id.toString(),
      orderName: order.name,
      dni: order.customer.dni,
      dniType: order.customer.dniType,
      casheaId: order.casheaId || "",
      customerId: order.customer.id,
    };
    setLoading(true);
    try {
      const response = await paymentsService.ValidateMobilePayment(req);
      onResult(response, req);
    } finally {
      setLoading(false);
    }
  }, [isValidPhone, onResult, order]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col justify-center items-center gap-2 mt-3">
        {isValidPhone ? (
          <>
            <div className="text-center my-2 text-xs">
              Los pagos realizados desde tu numero registrado son validados
              automaticamente. Para otro número, ingresa los datos manualmente.
            </div>
            <div className="bg-bone-beige-light p-2 rounded-lg text-center">
              <div className="font-medium mb-1">Telefono registrado</div>
              <p>{order.debitDirect?.phone.replace("+58", "0") || ""}</p>
            </div>
            <Alert
              className="bg-bone-beige text-bone-primary px-4 py-2 text-xs"
              icon={HiInformationCircle}
            >
              Presiona Validar una vez hayas realizado el pago.
            </Alert>
            <Button
              disabled={loading}
              className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
              type="button"
              onClick={() => HandleValidatePaid()}
            >
              {loading ? <Spinner size="sm" /> : "Validar"}
            </Button>
          </>
        ) : (
          <div className="bg-bone-beige-light p-2 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold mb-1">
              Utilizamos el ultimo numero que hayas usado con nosotros en tus
              pagos.
            </h2>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};
