import {
  createTheme,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { useState } from "react";
import { FirstStep } from "./steps/FirstStep";
import { SecondStep } from "./steps/SecondStep";
import { UploadVoucher } from "./steps/UploadVoucher";
import type { ValidateMobilePaymentRequest } from "@/types/dtos/payments.dto";
import { ModalTheme } from "@/utils/ui";
import type { OrderResponse } from "@/types/dtos/store.dto";

interface ModalMobilePaymentNotFoundProps {
  openModal: boolean;
  onClose: () => void;
  onResult: (result: boolean) => void;
  paymentData?: ValidateMobilePaymentRequest;
  order: OrderResponse;
}

type Step = "first" | "second" | "upload";

const theme = createTheme({
  modal: ModalTheme,
});

export const ModalMobilePaymentNotFound = ({
  openModal,
  onClose,
  onResult,
  paymentData,
  order,
}: ModalMobilePaymentNotFoundProps) => {
  const [step, setStep] = useState<Step>("first");
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handleNext = (nextStep: Step) => {
    setDirection("left");
    setStep(nextStep);
  };

  const handleBack = (prevStep: Step) => {
    setDirection("right");
    setStep(prevStep);
  };

  const renderStep = () => {
    const slideIn =
      direction === "left" ? "animate-slide-in-left" : "animate-slide-in-right";

    switch (step) {
      case "first":
        return (
          <div className={slideIn}>
            <FirstStep
              onYes={() => handleNext("second")}
              onNo={() => handleNext("upload")}
            />
          </div>
        );
      case "second":
        return (
          paymentData && (
            <div className={slideIn}>
              <SecondStep
                onYes={() => handleNext("upload")}
                onNo={onClose}
                paymentData={paymentData}
                onBack={() => handleBack("first")}
              />
            </div>
          )
        );
      case "upload":
        return (
          <div className={slideIn}>
            <UploadVoucher
              order={order}
              onBack={() => handleBack("first")}
              onResult={onResult}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal show={openModal} onClose={onClose} size="md">
        <ModalHeader>Pago no encontrado 😔</ModalHeader>
        <ModalBody>
          <div className="overflow-hidden">{renderStep()}</div>
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
