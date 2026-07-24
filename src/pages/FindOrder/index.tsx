import {
  Button,
  Card,
  createTheme,
  Label,
  Spinner,
  TextInput,
  ThemeProvider,
} from "flowbite-react";
import { HiHashtag, HiSearch } from "react-icons/hi";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const schema = yup.object().shape({
  orderName: yup
    .string()
    .min(6, "El número de orden debe tener al menos 6 caracteres")
    .required("debe ingresar un numero de confirmación valido"),
});

interface FindOrderProps {
  onSubmit: (orderName: string) => Promise<void>;
}

interface handleFindOrderByName {
  orderName: string;
}

const theme = createTheme({
  button: {
    color: {
      bone: "bg-bone-primary text-white",
    },
  },
});

export const FindOrder = ({ onSubmit }: FindOrderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<handleFindOrderByName>({
    resolver: yupResolver(schema),
  });

  const handleFindOrder: SubmitHandler<handleFindOrderByName> = async (
    data,
  ) => {
    try {
      setLoading(true);
      await onSubmit(data.orderName);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Card className="max-w-md w-full rounded-3xl">
        <h2 className="text-2xl font-medium text-start">Ubica tu pedido</h2>
        <form
          className="flex flex-col md:flex-row gap-8"
          onSubmit={handleSubmit(handleFindOrder)}
        >
          <div className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label className="text-bone-primary" htmlFor="phone">
                  Numero de orden
                </Label>
              </div>
              <TextInput
                id="confirmationNumber"
                inputMode="numeric"
                required
                icon={HiHashtag}
                {...register("orderName")}
              />
              <div className="bg-bone-beige text-xs text-center p-2 rounded-2xl mt-3">
                Lo puedes conseguir en tu correo o en el mensaje de whatsapp de
                confirmación.
              </div>
              <p className="text-red-500 text-sm">
                {errors.orderName?.message}
              </p>
            </div>
            <Button color={"bone"} type="submit" disabled={loading}>
              {loading ? (
                <Spinner aria-label="Small spinner example" size="sm" />
              ) : (
                <>
                  <HiSearch className="mr-2 h-5 w-5" /> Buscar
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </ThemeProvider>
  );
};
