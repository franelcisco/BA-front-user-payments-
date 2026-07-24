import type {
  // ButtonTheme as ButtonThemeFlowbite,
  ModalTheme as ModalThemeFlowbite,
} from "flowbite-react";

export const ModalTheme = {
  content: {
    base: "relative h-auto w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow",
  },
  header: {
    base: "flex items-start justify-between rounded-t p-5",
    title: "text-xl font-semibold text-bone-primary",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900",
      icon: "h-5 w-5",
    },
  },
} as ModalThemeFlowbite;

export const ButtonTheme = {
  color: {
    bone: "bg-bone-yellow hover:bg-bone-orange text-bone-primary",
  },
};

// internal colors
export const InternalColors = {
  primary: "rgb(68, 46, 46)",
  secondary: "rgb(255, 195, 150)",
  orange: "rgb(243, 128, 99)",
  yellow: "rgb(255, 188, 80)",
  purple: "rgb(216, 179, 221)",
  beige: "rgb(243, 224, 190)",
};
