import { InputErrorMessage } from "@/components/InputErrorMessage";
import type { UpdateCustomerParentIDRequest } from "@/types/dtos/store.dto";
import { updateCustomerParentIDSchema } from "@/types/shemas";
import { documentTypes } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Select, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

interface ParentIDProps {
  onSubmit: (data: UpdateCustomerParentIDRequest) => Promise<void>;
  customerId: string;
}

export const ParentID = ({ onSubmit, customerId }: ParentIDProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateCustomerID = async (
    data: UpdateCustomerParentIDRequest,
  ) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCustomerParentIDRequest>({
    defaultValues: {
      dni: "",
      dniType: "V",
      customerId: customerId,
    },
    resolver: yupResolver(updateCustomerParentIDSchema),
    mode: "onSubmit",
  });
  return (
    <div>
      <ToastContainer />
      <Card className="max-w-md w-full">
        <h2 className="text-xl font-bold text-center">
          Introduzca su documento de identidad
        </h2>
        <form
          className="flex justify-center items-center gap-8"
          onSubmit={handleSubmit(handleUpdateCustomerID)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2">
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
            <Button
              className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner aria-label="Small spinner example" size="sm" />
              ) : (
                <>Continuar</>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
