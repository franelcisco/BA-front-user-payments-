import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Alert,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const theme = createTheme({
  accordion: {
    root: {
      base: "divide-y divide-gray-200 border-gray-200",
    },
    content: {
      base: "p-5 first:rounded-t-lg last:rounded-b-lg",
    },
    title: {
      base: "flex w-full items-center justify-between p-0 text-left font-medium text-bone-primary first:rounded-t-lg last:rounded-b-lg px-5 py-1",
    },
  },
});

export const MobilePaymentDetails = () => {
  return (
    <div className="mb-2">
      <ThemeProvider theme={theme}>
        <Accordion>
          <AccordionPanel>
            <AccordionTitle>Datos para el pago</AccordionTitle>
            <AccordionContent className="text-bone-primary bg-bone-beige text-xs">
              <p>Banco: 0169 - R4 Banco Microfinanciero (Antes MiBanco)</p>
              <p>Cedula: J-506009684</p>
              <p>Telefono: 0424-1687612</p>
              <hr className="my-1 text-gray-400" />
              <Alert
                className="bg-bone-yellow text-bone-primary px-2 py-1 text-xs"
                icon={HiInformationCircle}
              >
                Desde el 20 de octubre nuestros datos bancarios han cambiado.
                Por favor asegúrate de utilizar los nuevos datos antes de
                realizar el pago.
              </Alert>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </ThemeProvider>
    </div>
  );
};
