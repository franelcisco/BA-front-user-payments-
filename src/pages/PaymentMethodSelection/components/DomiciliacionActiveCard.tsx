import { FaCheck } from "react-icons/fa6";

interface DomiciliacionActiveCardProps {
  onSelect: () => void;
}

export function DomiciliacionActiveCard({
  onSelect,
}: DomiciliacionActiveCardProps) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-4 rounded-xl mb-3 border-2 border-bone-yellow bg-bone-beige-light cursor-pointer transition-all"
    >
      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-2xl border border-bone-yellow/30 shrink-0">
        🏦
      </div>
      <div className="flex-1">
        <div className="text-base font-bold text-bone-primary">
          Domiciliación bancaria
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <FaCheck className="text-white w-2 h-2" />
          </div>
          <span className="text-xs font-semibold text-green-600">
            Ya está activa
          </span>
        </div>
      </div>
      <span className="text-lg text-bone-yellow">›</span>
    </div>
  );
}
