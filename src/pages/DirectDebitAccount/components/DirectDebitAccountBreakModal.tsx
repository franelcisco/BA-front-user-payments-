import { ModalTheme } from "@/utils/ui";
import {
  createTheme,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { LoadingAnimation } from "./LoadingAnimation";
import { RETRY_PHASES, RETRY_TIMINGS } from "../utils/constants";

const theme = createTheme({
  modal: ModalTheme,
});

interface DirectDebitAccountBreakModalProps {
  open: boolean;
}

export const DirectDebitAccountBreakModal = ({
  open,
}: DirectDebitAccountBreakModalProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal show={open} size="md" popup>
        <ModalHeader />
        <ModalBody>
          <LoadingAnimation
            key={open ? "open" : "closed"}
            phases={RETRY_PHASES}
            timings={RETRY_TIMINGS}
          />
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
