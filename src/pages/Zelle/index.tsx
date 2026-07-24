import type { OrderResponse } from "@/types/dtos/store.dto";
import type { PaymentMethodsType } from "@/types/PaymentValidate";
import {
  Alert,
  Button,
  Card,
  createTheme,
  FileInput,
  Label,
  Spinner,
  ThemeProvider,
} from "flowbite-react";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputErrorMessage } from "@/components/InputErrorMessage";
import { paymentsService } from "@/services/payments.service";
import { ZelleResult } from "./components/ZelleResult";
import { ZellePaymentDetails } from "./components/ZellePaymentDetails";
import { BackButton } from "@/components/BackButton";
import { PaymentAmounts } from "@/components/PaymentAmounts";
import { HiInformationCircle } from "react-icons/hi";

interface ZelleProps {
  order: OrderResponse;
  selectedMethod: (method: PaymentMethodsType) => void;
}

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-2",
  },
});

interface ZellePaymentRequest {
  billImageFile: File;
  orderName: string;
  orderId: number;
}

const ZellePaymentSchema = yup.object().shape({
  billImageFile: yup.mixed<File>().required(),
  orderName: yup.string().required(),
  orderId: yup.number().required(),
});

export function Zelle({ order, selectedMethod }: ZelleProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [paidStatus, setPaidStatus] = useState<boolean | undefined>(undefined);

  const handleCancelPayment = useCallback(() => {
    selectedMethod(undefined);
  }, [selectedMethod]);

  const handleChangePaidStatus = useCallback((status: boolean) => {
    setPaidStatus(status);
  }, []);

  const onSubmit: SubmitHandler<ZellePaymentRequest> = useCallback(
    async (data) => {
      const fd = new FormData();
      fd.append("billImageFile", data.billImageFile);
      fd.append("orderName", data.orderName);
      fd.append("orderId", data.orderId.toString());
      setLoading(true);
      const response = await paymentsService.ValidateZelle(fd);
      if (response) {
        handleChangePaidStatus(true);
      } else {
        handleChangePaidStatus(false);
      }
      setLoading(false);
    },
    [handleChangePaidStatus],
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ZellePaymentRequest>({
    defaultValues: {
      orderName: order.name,
      orderId: Number(order.id),
    },
    resolver: yupResolver(ZellePaymentSchema),
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("billImageFile", e.target.files[0]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {paidStatus === undefined ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="max-w-md w-full">
              <BackButton onClick={handleCancelPayment} order={order} />
              <PaymentAmounts
                totalPriceVESAmount={order.totalPriceSetVES.amount}
                totalPriceUSD={order.totalPriceSetUSD.amount}
              />
              <h2 className="text-2xl font-bold text-center">Zelle</h2>

              <div className="flex flex-col gap-4 mb-4">
                <ZellePaymentDetails />
                <Alert
                  className="bg-bone-beige text-bone-primary text-xxs px-4 py-2"
                  icon={HiInformationCircle}
                >
                  🚩 Para verificar automaticamente tu zelle, es muy importante
                  incluir la referencia. De no hacerlo tu zelle puede tomar
                  hasta una semana en verificarse. 🚩
                </Alert>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="phone">
                      Cargue el comprobante de Zelle
                    </Label>
                  </div>
                  <FileInput
                    className="file:bg-[#3C2525]"
                    required
                    id="file-upload"
                    onChange={onFileChange}
                    accept=".jpg,.jpeg,.png"
                  />
                  <InputErrorMessage message={errors.billImageFile?.message} />
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
        <ZelleResult
          success={paidStatus}
          onBack={handleCancelPayment}
          statusPageUrl={order.statusPageUrl}
          orderNo={order.name}
        />
      )}
    </ThemeProvider>
  );
}
