import { InputErrorMessage } from "@/components/InputErrorMessage";
import type {
  OTPRequest,
  ValidateMobilePaymentResponse,
  ValidateOTPRequest,
} from "@/types/dtos/payments.dto";
import { validateDirectDebitSchema } from "@/types/shemas";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ModalHeader,
  ModalBody,
  Label,
  TextInput,
  Modal,
  Button,
  createTheme,
  ThemeProvider,
  Spinner,
} from "flowbite-react";
import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { ModalTheme } from "@/utils/ui";
import { paymentsService } from "@/services/payments.service";
import type { OrderResponse } from "@/types/dtos/store.dto";

interface Props {
  openModal: boolean;
  order: OrderResponse;
  aproveOTPRequestData: OTPRequest;
  onCancelOTP: () => void;
  onResult: (result: ValidateMobilePaymentResponse) => void;
}

const theme = createTheme({
  modal: ModalTheme,
});

export function DirectDebitOTP({
  openModal,
  order,
  aproveOTPRequestData,
  onCancelOTP,
  onResult,
}: Props) {
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<ValidateOTPRequest> = useCallback(
    async (data) => {
      console.log("Validate OTP Data:", data);
      setLoading(true);
      try {
        const response = await paymentsService.validateDirectDebit(data);
        onResult(response);
      } finally {
        setLoading(false);
      }
    },
    [onResult]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateOTPRequest>({
    resolver: yupResolver(validateDirectDebitSchema),
    values: {
      bank: aproveOTPRequestData.bank,
      amount: aproveOTPRequestData.amount,
      phone: aproveOTPRequestData.phone,
      dni: aproveOTPRequestData.dni,
      dniType: aproveOTPRequestData.dniType,
      name: order?.customer.displayName || "",
      otp: "",
      concept: `Pago orden #${order?.name || ""}`,
      orderId: order.id,
      orderName: order.name,
      casheaId: order.casheaId || "",
      customerId: order.customer.id,
    },
  });

  const TIMER_SECONDS = 120;
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);

  useEffect(() => {
    if (!openModal) {
      setSecondsLeft(TIMER_SECONDS);
      return;
    }
    if (secondsLeft === 0) onCancelOTP();
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [openModal, secondsLeft, onCancelOTP]);

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal show={openModal} onClose={onCancelOTP} size="sm">
        <ModalHeader>Validar pago</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div>
              <div className="block mb-2">
                <Label htmlFor="serial">Codigo</Label>
              </div>
              <TextInput
                id="otp"
                inputMode="numeric"
                color={errors.otp && "failure"}
                {...register("otp")}
              />
              <InputErrorMessage message={errors.otp?.message} />
              <p className="text-xs mt-2">
                {`Debe ingresar el código enviado a su teléfono, dentro de`}{" "}
                <span className="text-red-400">{formatTime(secondsLeft)}</span>
              </p>
            </div>
            {loading && (
              <div className="text-gray-500  font-bold mt-4 animate-pulse text-center text-sm">
                Validando pago, por favor espere...
              </div>
            )}
            <div className="flex justify-center mt-2">
              <Button
                disabled={loading}
                className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                type="submit"
              >
                {loading ? <Spinner size="sm" /> : "Validar"}
              </Button>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </ThemeProvider>
  );
}
