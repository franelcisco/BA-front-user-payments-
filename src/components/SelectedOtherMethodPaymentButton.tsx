import { Button } from "flowbite-react";

interface SelectedOtherMethodPaymentButtonProps {
  onBack: () => void;
}

export const SelectedOtherMethodPaymentButton = ({
  onBack,
}: SelectedOtherMethodPaymentButtonProps) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      <Button
        className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
        onClick={onBack}
      >
        Elegir otro método
      </Button>
    </div>
  );
};
