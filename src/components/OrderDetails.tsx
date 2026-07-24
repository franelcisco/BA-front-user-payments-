import type { OrderResponse } from "@/types/dtos/store.dto";
import { ModalTheme } from "@/utils/ui";
import {
  createTheme,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";

interface OrderDetailsProps {
  order: OrderResponse;
  openModal: boolean;
  handleCloseModal: () => void;
}
const theme = createTheme({
  modal: ModalTheme,
});

export const OrderDetailsModal = ({
  order,
  openModal,
  handleCloseModal,
}: OrderDetailsProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        dismissible
        show={openModal}
        onClose={handleCloseModal}
        size="md"
        position="center"
      >
        <ModalHeader>Detalles de tu Orden</ModalHeader>
        <ModalBody>
          <div className="text-sm mb-2">
            N° de orden: <strong>{order?.name}</strong>
          </div>
          <div className="mt-1 text-sm">
            <h3 className="font-semibold mb-2">Productos:</h3>
            <div className="flex flex-col gap-2">
            {order?.lineItems?.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-bone-beige-light rounded-lg px-4 py-3 text-xs"
              >
                <div className="truncate font-medium">{product.name}</div>
                <p className="inline-flex items-center font-semibold">
                  {`x ${product.quantity}`}
                </p>
              </div>
            ))}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
