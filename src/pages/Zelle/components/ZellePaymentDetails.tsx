import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  createTheme,
  ThemeProvider,
} from "flowbite-react";

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

export const ZellePaymentDetails = () => {
  return (
    <ThemeProvider theme={theme}>
      <Accordion>
        <AccordionPanel>
          <AccordionTitle>Datos para el pago</AccordionTitle>
          <AccordionContent className="text-bone-primary bg-bone-beige text-xs">
            <p>Beneficiario: GM Sports 21 LLC</p>
            <p>Correo: cb21gms@dulceh.com</p>
            <p>Referencia: *boneappetit</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </ThemeProvider>
  );
};
