interface HeaderErrorProps {
  orderNo: string;
}

export const HeaderError = ({ orderNo }: HeaderErrorProps) => {
  return (
    <h2 className={`text-2xl font-medium mb-4`}>
      {" "}
      {orderNo} - Error en el pago 😔
    </h2>
  );
};
