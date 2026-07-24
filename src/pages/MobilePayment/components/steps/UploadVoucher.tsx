import { InputErrorMessage } from "@/components/InputErrorMessage";
import { paymentsService } from "@/services/payments.service";
import type { OrderResponse } from "@/types/dtos/store.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FileInput, Spinner } from "flowbite-react";
import { useCallback, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";

interface UploadVoucherProps {
  order: OrderResponse;
  onResult: (result: boolean) => void;
  onBack: () => void;
}

interface MobilePaymentManualRequest {
  billImageFile: File;
  orderName: string;
  orderId: number;
}

const ZellePaymentSchema = yup.object().shape({
  billImageFile: yup.mixed<File>().required(),
  orderName: yup.string().required(),
  orderId: yup.number().required(),
});

export const UploadVoucher = ({ onResult, order }: UploadVoucherProps) => {
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("billImageFile", e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<MobilePaymentManualRequest> = useCallback(
    async (data) => {
      const fd = new FormData();
      fd.append("billImageFile", data.billImageFile);
      fd.append("orderName", data.orderName);
      fd.append("orderId", data.orderId.toString());
      fd.append("casheaId", order.casheaId || "");
      fd.append("customerId", order.customer.id);
      setLoading(true);
      try {
        const response = await paymentsService.ValidateMobilePaymentManual(fd);
        onResult(response);
      } finally {
        setLoading(false);
      }
    },
    [onResult, order]
  );

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MobilePaymentManualRequest>({
    defaultValues: {
      orderName: order.name,
      orderId: Number(order.id),
    },
    resolver: yupResolver(ZellePaymentSchema),
  });

  return (
    <div>
      <p className="text-center text-lg font-normal mb-4">
        Cargue el comprobante de pago movil
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-4">
          <FileInput
            className="file:bg-[#3C2525]"
            required
            id="file-upload"
            onChange={onFileChange}
            accept=".jpg,.jpeg,.png"
          />
          <InputErrorMessage message={errors.billImageFile?.message} />
          <Button
            disabled={loading}
            className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
            type="submit"
          >
            {loading ? <Spinner size="sm" /> : "Validar"}
          </Button>
        </div>
      </form>
      {/* <div className="mt-4 text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          Volver
        </button>
      </div> */}
    </div>
  );
};
