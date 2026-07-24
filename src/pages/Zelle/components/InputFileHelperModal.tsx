import { ModalTheme } from "@/utils/ui";
import {
  createTheme,
  HelperText,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface InputFileHelperModalProps {
  openModal: boolean;
  onClose: () => void;
}
const theme = createTheme({
  modal: ModalTheme,
});

export const InputFileHelperModal = ({
  openModal,
  onClose,
}: InputFileHelperModalProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal show={openModal} size="md" onClose={onClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiInformationCircle className="mx-auto mb-4 h-14 w-14 text-blue-400" />
            <HelperText>
              Esto te protege ya que nos aseguramos de recibir los mismos
              billetes del despachador
            </HelperText>
            <HelperText>
              Si no puedes cargar los billetes porque no los tienes a la mano,
              puedes cargar cualquier imágen de tu perrito aqui para seguir
              adelante y confirmar tu pedido 💛
            </HelperText>
          </div>
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
