import {
  Alert,
  Button,
  Card,
  createTheme,
  Label,
  Select,
  Spinner,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { otpSchema } from "@/types/shemas";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { OTPRequest } from "@/types/dtos/payments.dto";
import { documentTypes } from "@/utils/constants";
import { BankDropdown } from "@/components/BankDropdown";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { InputErrorMessage } from "@/components/InputErrorMessage";
import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import { HiInformationCircle } from "react-icons/hi";
import { paymentsService } from "@/services/payments.service";
import { BackButton } from "@/components/BackButton";
import { PaymentAmounts } from "@/components/PaymentAmounts";

interface DirectDebitFormProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
  setAproveOTPRequestData: (data: OTPRequest | null) => void;
}

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

export const DirectDebitForm = ({
  order,
  selectedMethod,
  setAproveOTPRequestData,
}: DirectDebitFormProps) => {
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<OTPRequest> = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const response = await paymentsService.generateOTP(data);
        if (!response) {
          toast.error(
            "Error al generar el OTP, Verifique sus datos y vuelva a intentarlo"
          );
          return;
        }
      } finally {
        setLoading(false);
      }
      setAproveOTPRequestData(data);
    },
    [setAproveOTPRequestData]
  );
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OTPRequest>({
    values: {
      bank: order.debitDirect?.bank || "0102",
      phone: order.debitDirect?.phone.replace("+58", "0") || "",
      dni: order.debitDirect?.dni || "",
      dniType: order.debitDirect?.dniType || "V",
      amount: order?.totalPriceSetVES.amount,
      orderId: order.id,
      orderName: order.name,
      casheaId: order.casheaId || "",
    },
    resolver: yupResolver(otpSchema),
    mode: "onSubmit",
  });

  const handleOnChangeBank = (value: string) => {
    setValue("bank", value);
  };

  const handleCancelPayment = useCallback(() => {
    selectedMethod(undefined);
  }, [selectedMethod]);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Card className="max-w-md w-full">
          <BackButton onClick={handleCancelPayment} order={order} />
          <PaymentAmounts
            totalPriceVESAmount={order.totalPriceSetVES.amount}
            totalPriceUSD={order.totalPriceSetUSD.amount}
          />
          <h2 className="text-2xl font-bold text-left">Débito inmediato</h2>

          <div className="flex flex-col gap-4 mb-4">
            <div>
              <BankDropdown
                currentValue={watch("bank")}
                onChange={handleOnChangeBank}
                error={errors.bank?.message}
              />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="phone">Número de teléfono</Label>
              </div>
              <TextInput
                id="phone"
                inputMode="numeric"
                placeholder="Ingresa un número de teléfono"
                color={errors.phone && "failure"}
                {...register("phone")}
              />
              <InputErrorMessage message={errors.phone?.message} />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="id">Documento de identidad</Label>
              </div>
              <div className="flex gap-1">
                <Select
                  id="dniType"
                  className="min-w-14"
                  {...register("dniType")}
                  color={errors.dniType && "failure"}
                >
                  {documentTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                <TextInput
                  id="id"
                  inputMode="numeric"
                  className="w-full"
                  placeholder="Ingresa cédula o rif"
                  color={errors.dni && "failure"}
                  {...register("dni")}
                />
              </div>
              <InputErrorMessage message={errors.dni?.message} />
              <InputErrorMessage message={errors.dniType?.message} />
            </div>
            <div>
              <Alert
                icon={HiInformationCircle}
                className="bg-bone-beige text-bone-primery px-4 text-xxs py-2"
              >
                Introduce los datos asociados a tu cuenta bancaria y valida con
                el codigo que te enviara tu banco.
              </Alert>
            </div>
            <div className="flex justify-center">
              <Button
                disabled={loading}
                className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                type="submit"
              >
                {loading ? <Spinner /> : "Solicitar"}
              </Button>
            </div>
          </div>
          {/* Aquí van los campos para Débito Directo */}
        </Card>
      </form>
    </ThemeProvider>
  );
};
