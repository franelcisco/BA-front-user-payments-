import {
  Button,
  Datepicker,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { validateMobilePaymentSchema } from "@/types/shemas";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BankDropdown } from "@/components/BankDropdown";
import { useCallback, useState } from "react";
import { InputErrorMessage } from "@/components/InputErrorMessage";
import type { OrderResponse } from "@/types/dtos/store.dto";
import { paymentsService } from "@/services/payments.service";
import type {
  ValidateMobilePaymentRequest,
  ValidateMobilePaymentResponse,
} from "@/types/dtos/payments.dto";
import { getLocalDateString } from "@/utils/helpers";
import { documentTypes } from "@/utils/constants";

interface MobilePaymentManualFormProps {
  order: OrderResponse;
  onResult: (
    result: ValidateMobilePaymentResponse,
    req: ValidateMobilePaymentRequest
  ) => void;
}

type ValidateMobilePaymentForm = {
  bank: string;
  phone: string;
  reference: string;
  date: Date;
  dni: string;
  dniType: string;
  orderId: number;
  orderName: string;
  casheaId: string;
  customerId: string;
};

export const MobilePaymentManualForm = ({
  order,
  onResult,
}: MobilePaymentManualFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ValidateMobilePaymentForm> = useCallback(
    async (data) => {
      const req: ValidateMobilePaymentRequest = {
        ...data,
        automatic: false,
        date: getLocalDateString(data.date),
        reference: data.reference,
        orderId: data.orderId.toString(),
      };
      setLoading(true);
      try {
        const response = await paymentsService.ValidateMobilePayment(req);
        onResult(response, req);
      } finally {
        setLoading(false);
      }
    },
    [onResult]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidateMobilePaymentForm>({
    defaultValues: {
      bank: order.debitDirect?.bank || "0102",
      phone: order.debitDirect?.phone.replace("+58", "0") || "",
      orderId: Number(order.id),
      orderName: order.name,
      dni: order.debitDirect?.dni || "",
      dniType: order.debitDirect?.dniType || "V",
      casheaId: order.casheaId || "",
      customerId: order.customer.id,
    },
    resolver: yupResolver(validateMobilePaymentSchema),
    mode: "onSubmit",
  });

  const handleOnChangeBank = (value: string) => {
    setValue("bank", value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center text-bone-primary font-medium text-sm">
          Ingresa los datos del Pago Móvil
        </div>
        <div className="flex flex-col gap-2">
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
              <Label htmlFor="dni">Documento de Identidad</Label>
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
                id="dni"
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
          <div className="grid grid-cols-2 gap-1">
            <div>
              <div className="block">
                <Label htmlFor="date">Fecha</Label>
              </div>
              <Datepicker
                language="es-ES"
                maxDate={new Date()}
                labelTodayButton="Hoy"
                labelClearButton="Limpiar"
                placeholder="Selecciona la fecha"
                value={watch("date")}
                onChange={(date) => date && setValue("date", date)}
              />
              <InputErrorMessage message={errors.date?.message} />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="reference">Referencia</Label>
              </div>
              <TextInput
                id="reference"
                inputMode="numeric"
                maxLength={4}
                placeholder="Ingresa los ultimos 4 digitos"
                color={errors.reference && "failure"}
                {...register("reference")}
              />
              <InputErrorMessage message={errors.reference?.message} />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
              type="submit"
            >
              {loading ? <Spinner size="sm" /> : "Validar"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
