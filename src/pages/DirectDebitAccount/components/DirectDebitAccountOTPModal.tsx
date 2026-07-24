import { InputErrorMessage } from "@/components/InputErrorMessage";
import type { DirectDebitAccountWithOTPRequest } from "@/types/dtos/payments.dto";
import { directDebitAccountWithOTPSchema } from "@/types/shemas";
import { ModalTheme } from "@/utils/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  createTheme,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";

const theme = createTheme({
  modal: ModalTheme,
});

interface DirectDebitAccountOTPModalProps {
  open: boolean;
  loading: boolean;

  onCancel: () => void;
  onSubmit: (data: DirectDebitAccountWithOTPRequest) => Promise<void>;
}

const TIMER_SECONDS = 120;

type requestOTPFormData = yup.InferType<typeof directDebitAccountWithOTPSchema>;

export const DirectDebitAccountOTPModal = ({
  open,
  loading,
  onCancel,
  onSubmit,
}: DirectDebitAccountOTPModalProps) => {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<requestOTPFormData>({
    resolver: yupResolver(directDebitAccountWithOTPSchema),
    values: {
      otp: "",
    },
  });

  const handleValidateOTP: SubmitHandler<requestOTPFormData> = (data) => {
    onSubmit({
      orderId: "",
      otp: data.otp,
    });
  };

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    if (!open) {
      setSecondsLeft(TIMER_SECONDS);
      return;
    }
    if (secondsLeft === 0) onCancel();
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open, secondsLeft, onCancel]);

  return (
    <ThemeProvider theme={theme}>
      <Modal show={open} onClose={onCancel} size="sm">
        <ModalHeader>Validar domiciliación</ModalHeader>
        <form onSubmit={handleSubmit(handleValidateOTP)}>
          <ModalBody>
            <div>
              <div className="block mb-2">
                <Label htmlFor="serial">Código</Label>
              </div>
              <TextInput
                id="otp"
                inputMode="numeric"
                maxLength={6}
                minLength={6}
                color={errors.otp && "failure"}
                {...register("otp")}
              />
              <InputErrorMessage message={errors.otp?.message} />
              <p className="text-xs mt-2">
                {`Debe ingresar el código enviado a su correo, dentro de`}{" "}
                <span className="text-red-400">{formatTime(secondsLeft)}</span>
              </p>
            </div>
            {loading && (
              <div className="text-gray-500  font-bold mt-4 animate-pulse text-center text-sm">
                Enviando solicitud a tu banco...
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
};
