interface HeaderSuccessProps {
  inProcess: boolean;
  orderNo: string;
}

export const HeaderSuccess = ({
  inProcess = false,
  orderNo,
}: HeaderSuccessProps) => {
  return (
    <h2 className={`text-2xl font-medium mb-4`}>
      {inProcess
        ? `Recibido: ${orderNo} - Pendiente de verificación ✨`
        : `¡Pago confirmado para la orden ${orderNo}! 💛`}
    </h2>
  );
};
