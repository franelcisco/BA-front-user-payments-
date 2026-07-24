import { Button } from "flowbite-react";

interface FirstStepProps {
  onYes: () => void;
  onNo: () => void;
}

export const FirstStep = ({ onYes, onNo }: FirstStepProps) => {
  return (
    <div>
      <p className="text-center text-lg font-normal mb-4">
        ¿Realizaste el pago a los siguientes datos?
      </p>
      <div className="bg-white p-4 rounded-lg mb-4">
        {/* Display payment data here */}
        <p>Banco: 0169 - R4 Banco Microfinanciero (Antes MiBanco)</p>
        <p>Cedula: J-506009684</p>
        <p>Telefono: 0424-1687612</p>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={onYes}
          color={"green"}
        >
          Sí
        </Button>
        <Button
          onClick={onNo}
          color={"red"}
        >
          No
        </Button>
      </div>
    </div>
  );
};
