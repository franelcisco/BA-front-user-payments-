import { FaCheck } from "react-icons/fa6";

interface DomiciliacionStepperProps {
  currentStep: number;
  labels: string[];
}

export function DomiciliacionStepper({
  currentStep,
  labels,
}: DomiciliacionStepperProps) {
  return (
    <div className="flex items-start w-full mb-4">
      {labels.map((label, i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <div
              className={`flex-1 h-0.5 mt-3 transition-colors duration-400 ${
                i <= currentStep ? "bg-bone-yellow" : "bg-gray-200"
              }`}
            />
          )}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xxs font-bold transition-all duration-400 ${
                i < currentStep
                  ? "bg-bone-yellow text-white"
                  : i === currentStep
                    ? "bg-bone-primary text-white shadow-[0_0_0_3px_rgba(255,188,80,0.2)]"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < currentStep ? <FaCheck className="w-3 h-3" /> : i + 1}
            </div>
            <span
              className={`text-xxs leading-tight text-center mt-1 w-14 ${
                i <= currentStep
                  ? "text-bone-primary font-bold"
                  : "text-gray-500 font-medium"
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
