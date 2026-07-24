import { HeaderError } from "./HeaderError";

interface ErrorValidatedProps {
  orderNo: string;
}

export const ErrorValidated = ({ orderNo }: ErrorValidatedProps) => {
  return (
    <>
      <HeaderError orderNo={orderNo} />
      <p className="font-semibold">
        Hubo un problema procesando tu pago. Intenta nuevamente.
      </p>
    </>
  );
};
