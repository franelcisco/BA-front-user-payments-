import { ModalTheme } from "@/utils/ui";
import {
  Button,
  createTheme,
  Modal,
  ModalBody,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import { useRef, useState } from "react";
import { BANK_STEPS, DEFAULT_BANK_STEPS, DOMICILIATION_PHASES, DOMICILIATION_TIMINGS, RETRY_DOMICILIATION_PHASES } from "../utils/constants";
import { LoadingAnimation } from "./LoadingAnimation";

const theme = createTheme({
  modal: ModalTheme,
});

interface DirectDebitAccountModalProps {
  open: boolean;
  showBankHelp: boolean;
  loading: boolean;
  account?: string;
  code?: string;
  isRetry?: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

export const DirectDebitAccountModal = ({
  open,
  showBankHelp,
  loading,
  account,
  code,
  isRetry = false,
  onRetry,
  onCancel,
}: DirectDebitAccountModalProps) => {
  const bankCode = account?.substring(0, 4) ?? "";
  const tutorial = BANK_STEPS[bankCode] ?? DEFAULT_BANK_STEPS;
  const listRef = useRef<HTMLOListElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal
        show={open}
        size="md"
        popup
        onClose={loading ? undefined : onCancel}
      >
        <ModalHeader />
        <ModalBody>
          {loading ? (
            <LoadingAnimation
              key={loading ? "loading" : "idle"}
              phases={isRetry ? RETRY_DOMICILIATION_PHASES : DOMICILIATION_PHASES}
              timings={DOMICILIATION_TIMINGS}
              footnote={isRetry ? undefined : "Este proceso puede tardar hasta 1 minuto. (Tranqui, esto es solo la primera vez 😅)"}
            />
          ) : showBankHelp ? (
            <div>
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {code === "ERR02"
                  ? `Aprueba la domiciliación en `
                  : `Tu domiciliacion sigue pendiente en `}
                {tutorial.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Sigue estos pasos en tu banca en línea y luego presiona
                "Listo".
              </p>
              <div className="relative mb-5">
                <ol ref={listRef} onScroll={handleScroll} className="space-y-3 max-h-52 overflow-y-auto pr-1">
                  {tutorial.steps.map((step) => (
                    <li key={step.n} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                {!atBottom && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent" />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                {tutorial.guiedeUrl && (
                  <a
                    href={tutorial.guiedeUrl}
                    download="guia_domiciliacion.pdf"
                    className="text-sm text-gray-500 underline underline-offset-2"
                  >
                    Descargar guía visual
                  </a>
                )}
                <Button
                  className="bg-bone-yellow hover:bg-bone-orange text-bone-primary"
                  onClick={onRetry}
                >
                  Ya aprobé en mi banco
                </Button>
              </div>
            </div>
          ) : null}
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
};
