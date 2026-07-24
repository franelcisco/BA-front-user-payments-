import { createTheme, ThemeConfig, ThemeProvider } from "flowbite-react";
import { BrowserRouter as Router } from "react-router-dom";
import { RootNavigation } from "@/routes/RootNavigation";
import { NavBar } from "@/components";
import "@/App.css";
import { useCallback, useEffect } from "react";
import { useBCVTasaStore } from "./store/bcv";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const { checkBCVData, refetch } = useBCVTasaStore();

  const sectionTheme = createTheme({
    footer: {
      root: {
        base: "md:justify-center",
      },
    },
  });

  const handleCheckBCVTasa = useCallback(async () => {
    if (!checkBCVData()) {
      refetch();
    }
  }, [checkBCVData, refetch]);

  useEffect(() => {
    handleCheckBCVTasa();
  }, [handleCheckBCVTasa]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeConfig dark={false} />
      <ThemeProvider theme={sectionTheme}>
        <div
          style={{
            display: "grid",
            minHeight: "100dvh",
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <header>
            <NavBar />
          </header>
          <main className="bg-bone-beige py-4 overflow-x-hidden">
            <Router>
              <RootNavigation />
            </Router>
          </main>
          {/* <footer
            style={{ backgroundColor: InternalColors.beige }}
            className="shadow-md"
          >
            <Footer />
          </footer> */}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
