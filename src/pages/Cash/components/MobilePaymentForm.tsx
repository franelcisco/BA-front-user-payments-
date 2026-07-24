import {
  Alert,
  Button,
  createTheme,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { mobilePaymentReturnSchema } from "@/types/shemas";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { MobilePaymentReturnRequest } from "@/types/dtos/payments.dto";
import { documentTypes } from "@/utils/constants";
import { BankDropdown } from "@/components/BankDropdown";
import { useCallback } from "react";
import { InputErrorMessage } from "@/components/InputErrorMessage";
import { ModalTheme } from "@/utils/ui";
import { HiInformationCircle } from "react-icons/hi";
import type { DebitDirect } from "@/types/dtos/store.dto";

interface MobilePaymentReturnFormProps {
  debitDirect?: DebitDirect;
  openModal: boolean;
  onSuccess: (data: MobilePaymentReturnRequest) => void;
  onClose: () => void;
}

const theme = createTheme({
  alert: {
    base: "flex flex-col gap-2 p-1 text-xs mt-0",
  },
  modal: ModalTheme,
});

export const MobilePaymentReturnForm = ({
  openModal,
  debitDirect,
  onSuccess,
  onClose,
}: MobilePaymentReturnFormProps) => {
  const onSubmit: SubmitHandler<MobilePaymentReturnRequest> = useCallback(
    async (data) => {
      console.log("Request Data:", data);
      onSuccess(data);
    },
    [onSuccess]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MobilePaymentReturnRequest>({
    defaultValues: {
      bank: debitDirect?.bank || "0102",
      phone: debitDirect?.phone.replace("+58", "0") || "",
      dni: debitDirect?.dni || "",
      dniType: debitDirect?.dniType || "V",
    },
    resolver: yupResolver(mobilePaymentReturnSchema),
    mode: "onSubmit",
  });

  const handleOnChangeBank = (value: string) => {
    setValue("bank", value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal dismissible show={openModal} size="md" onClose={onClose}>
        <ModalHeader>Datos para el vuelto</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            {/* Formulario de devolución móvil */}
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
                  placeholder="Ingresa tu número de teléfono"
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
                    placeholder="Ingresa tu cédula"
                    color={errors.dni && "failure"}
                    {...register("dni")}
                  />
                </div>
                <InputErrorMessage message={errors.dni?.message} />
                <InputErrorMessage message={errors.dniType?.message} />
              </div>
              {/* Mensaje informativo */}
              <Alert
                className="bg-bone-beige px-4 text-bone-primary text-xxs py-2"
                icon={HiInformationCircle}
              >
                Una vez validado el efectivo recibido, recibirás tu vuelto por
                pago móvil. Máximo en 72h hábiles.
              </Alert>
              {/* Confirmar */}
              <div className="flex justify-center">
                <Button className="bg-bone-yellow hover:bg-bone-orange text-bone-primary" type="submit">
                  Confirmar
                </Button>
              </div>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
