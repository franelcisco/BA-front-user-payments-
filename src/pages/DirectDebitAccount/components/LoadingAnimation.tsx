import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import type { LoadingPhase } from "../utils/constants";
import { FaCheck } from "react-icons/fa6";

interface LoadingAnimationProps {
  phases: LoadingPhase[];
  timings: number[];
  onComplete?: () => void;
  pendingUsd?: string;
  discountedUsd?: string;
  footnote?: string;
}

export function LoadingAnimation({
  phases,
  timings,
  onComplete,
  pendingUsd,
  discountedUsd,
  footnote,
}: LoadingAnimationProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    setPhaseIndex(0);
    setDisplayIndex(0);
    setVisible(true);

    const timeouts = timings.map((ms, i) => {
      if (i < phases.length - 1) {
        return setTimeout(() => setPhaseIndex(i + 1), ms);
      }
      return setTimeout(() => onComplete?.(), ms);
    });
    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phaseIndex === displayIndex) return;
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayIndex(phaseIndex);
      setVisible(true);
    }, 400);
    return () => clearTimeout(t);
  }, [phaseIndex, displayIndex]);

  const cur = phases[displayIndex];

  return (
    <div className="text-center py-6">
      {cur.showCheck ? (
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <FaCheck className="text-green-600 w-6 h-6" />
        </div>
      ) : (
        <div className="flex justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      )}

      <div
        className={`mt-4 transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <h3
          className={`text-base font-bold ${cur.showCheck ? "text-green-600" : "text-bone-primary"}`}
        >
          {cur.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{cur.sub}</p>

        {cur.showPrice && pendingUsd && discountedUsd && (
          <div className="inline-block bg-bone-yellow rounded-lg px-3 py-2 mt-3">
            <span className="text-xs text-bone-primary line-through opacity-60 mr-1.5">
              ${pendingUsd}
            </span>
            <span className="text-lg font-black text-bone-primary">
              ${discountedUsd}
            </span>
          </div>
        )}

        <div className="bg-bone-beige-light rounded-lg px-3 py-2 mt-3 mx-auto border border-bone-yellow/10">
          <p className="text-[11px] text-gray-600 leading-relaxed italic">
            💡 {cur.tip}
          </p>
        </div>
      </div>

      <p className="text-bone-orange text-[11px] font-semibold mt-3">
        No cierres esta ventana
      </p>

      <div className="flex justify-center gap-1.5 mt-3">
        {phases.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-700 ${
              i <= phaseIndex ? "bg-bone-yellow" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {footnote && (
        <p className="text-[10px] text-gray-400 mt-4 px-2">{footnote}</p>
      )}
    </div>
  );
}
