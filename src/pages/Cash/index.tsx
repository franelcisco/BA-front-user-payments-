import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import {
  Alert,
  Button,
  Card,
  createTheme,
  FileInput,
  Label,
  Radio,
  Spinner,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { InputFileHelperModal } from "./components/InputFileHelperModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputErrorMessage } from "@/components/InputErrorMessage";
import { CashResult } from "./components/CashResult";
import type { MobilePaymentReturnRequest } from "@/types/dtos/payments.dto";
import { MobilePaymentReturnForm } from "./components/MobilePaymentForm";
import { paymentsService } from "@/services/payments.service";
import { BackButton } from "@/components/BackButton";
import { PaymentAmounts } from "@/components/PaymentAmounts";

interface CashProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
}

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

interface CashPaymentRequest {
  amount: number;
  requiresChange: boolean | null;
  orderName: string;
  orderId: number;
}

export function Cash({ order, selectedMethod }: CashProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [openHelperModal, setOpenHelperModal] = useState<boolean>(false);
  const [paidStatus, setPaidStatus] = useState<boolean | undefined>(undefined);
  const [billImageFile, setBillImageFile] = useState<File | undefined>(
    undefined,
  );
  const [openReturnDataModal, setOpenReturnDataModal] =
    useState<boolean>(false);
  const [returnData, setReturnData] =
    useState<MobilePaymentReturnRequest | null>(null);

  const handleCancelPayment = useCallback(() => {
    selectedMethod(undefined);
  }, [selectedMethod]);

  const handleChangePaidStatus = useCallback((status: boolean) => {
    setPaidStatus(status);
  }, []);

  const onSubmit: SubmitHandler<CashPaymentRequest> = useCallback(
    async (data) => {
      console.log({ data, returnData, billImageFile });
      const fd = new FormData();
      fd.append("amount", data.amount.toString());
      fd.append("orderTotalAmount", order.totalPriceSetUSD.amount);
      fd.append("requiresChange", data.requiresChange ? "true" : "false");
      fd.append("orderName", data.orderName);
      fd.append("orderId", `${data.orderId}`);

      if (billImageFile !== undefined) {
        fd.append("billImageFile", billImageFile);
      }

      if (returnData && data.requiresChange) {
        fd.append("returnData", JSON.stringify(returnData));
      }
      setLoading(true);
      const response = await paymentsService.validateCash(fd);
      if (response) {
        handleChangePaidStatus(true);
      } else {
        handleChangePaidStatus(false);
      }
      setLoading(false);
    },
    [billImageFile, handleChangePaidStatus, order, returnData],
  );

  const cashPaymentSchema = yup.object().shape({
    amount: yup
      .number()
      .min(
        Number(order.totalPriceSetUSD.amount),
        "El monto debe ser mayor o igual al total a pagar",
      )
      .required("El monto es requerido"),
    requiresChange: yup.boolean().required().nullable(),
    // billImageFile: yup.mixed<File>().required().nullable(),
    orderName: yup.string().required(),
    orderId: yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CashPaymentRequest>({
    defaultValues: {
      amount: 0.0,
      requiresChange: false,
      // billImageFile: null,
      orderName: order.name,
      orderId: Number(order.id),
    },
    resolver: yupResolver(cashPaymentSchema),
  });

  const { requiresChange, amount } = watch();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBillImageFile(e.target.files[0]);
    } else {
      setBillImageFile(undefined);
    }
  };

  const handleCloseReturnDataModal = useCallback(() => {
    setValue("requiresChange", false);
    setReturnData(null);
  }, [setValue]);

  const handleSuccessReturnData = useCallback(
    (data: MobilePaymentReturnRequest) => {
      setReturnData(data);
      setOpenReturnDataModal(false);
    },
    [],
  );

  useEffect(() => {
    if (requiresChange && amount > Number(order.totalPriceSetUSD.amount)) {
      setOpenReturnDataModal(true);
    } else {
      setOpenReturnDataModal(false);
      setValue("requiresChange", false);
      setReturnData(null);
    }
  }, [amount, order, requiresChange, setValue]);

  return (
    <ThemeProvider theme={theme}>
      {paidStatus === undefined ? (
        <>
          <InputFileHelperModal
            openModal={openHelperModal}
            onClose={() => setOpenHelperModal(false)}
          />
          <MobilePaymentReturnForm
            debitDirect={order.debitDirect}
            openModal={openReturnDataModal}
            onSuccess={handleSuccessReturnData}
            onClose={handleCloseReturnDataModal}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="max-w-md w-full">
              <BackButton onClick={handleCancelPayment} order={order} />
              <PaymentAmounts
                totalPriceVESAmount={order.totalPriceSetVES.amount}
                totalPriceUSD={order.totalPriceSetUSD.amount}
              />
              <h2 className="text-2xl font-bold text-left">Efectivo</h2>

              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <div className="block mb-1">
                    <Label htmlFor="phone">Monto en efectivo que entrega</Label>
                  </div>
                  <TextInput
                    id="phone"
                    inputMode="decimal"
                    type="number"
                    step={0.01}
                    placeholder="Ingrese el monto con el que pagará"
                    {...register("amount")}
                    color={errors.amount && "failure"}
                  />
                  <InputErrorMessage message={errors.amount?.message} />
                </div>
                {watch("amount") > Number(order.totalPriceSetUSD.amount) && (
                  <div className="mt-2">
                    <div className="block mb-1">
                      <Label htmlFor="phone">¿Quires dejar Propina?</Label>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Radio
                          className="checked:bg-[#F6B73B]"
                          checked={watch("requiresChange") === false}
                          onChange={() => setValue("requiresChange", false)}
                        />
                        <Label htmlFor="united-state">Si, son lo máximo</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio
                          className="checked:bg-[#F6B73B]"
                          checked={watch("requiresChange") === true}
                          onChange={() => setValue("requiresChange", true)}
                        />
                        <Label htmlFor="united-state">
                          No, quiero el vuelto
                        </Label>
                      </div>
                    </div>
                    {watch("requiresChange") && (
                      <Alert
                        className="bg-bone-beige px-4 text-bone-primary text-xxs py-2"
                        icon={HiInformationCircle}
                      >
                        El vuelto sera realizado en pago movil, una vez
                        verificado el pago.
                      </Alert>
                    )}
                    {!watch("requiresChange") && (
                      <Alert
                        className="bg-bone-beige px-4 text-bone-primary text-xxs py-2"
                        icon={HiInformationCircle}
                      >
                        Las propinas se reparten entre el equipo de experiencia
                        de usuario y logistica a fin de mes para incentivar una
                        mejor experiencia para ti
                      </Alert>
                    )}
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="phone">
                      Carga de Billetes para Verificación (Opcional)
                    </Label>
                    <Button
                      size="xs"
                      color="light"
                      onClick={() => setOpenHelperModal(true)}
                    >
                      <HiInformationCircle className="h-4 w-4 text-blue-500" />
                    </Button>
                  </div>
                  <FileInput
                    className="file:bg-[#3C2525]"
                    id="file-upload"
                    onChange={onFileChange}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  disabled={loading}
                  className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                  type="submit"
                >
                  {loading ? <Spinner size="sm" /> : "Confirmar"}
                </Button>
              </div>
            </Card>
          </form>
        </>
      ) : (
        <CashResult
          success={paidStatus}
          onBack={handleCancelPayment}
          statusPageUrl={order.statusPageUrl}
          orderNo={order.name}
        />
      )}
    </ThemeProvider>
  );
}
