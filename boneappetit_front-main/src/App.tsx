import { createTheme, ThemeConfig, ThemeProvider } from 'flowbite-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootNavigation } from '@/routes/RootNavigation';
import { NavBar, Footer } from '@/components';
import '@/App.css';
import { useEffect, useState } from 'react';
import { BCVTasaStore } from './store/bcv';
import { Landing } from './components/Landing';

export default function App() {
    const [landing, setLanding] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const sectionTheme = createTheme({
        footer: {
            root: {
                base: 'md:justify-center',
            },
        },
    });

    useEffect(() => {
        const checkTasa = async () => {
            console.log(BCVTasaStore.getState().checkBCVData());
            if (
                !BCVTasaStore.getState().checkBCVData() &&
                !landing &&
                error === ''
            ) {
                setLanding(true);
                const result = await BCVTasaStore.getState().refetch();
                if (!result) {
                    setError('No es posible realizar su pago por el momento');
                }
                setLanding(false);
            }
        };
        checkTasa();
    }, [error, landing]);

    return (
        <>
            <ThemeConfig dark={false} />
            <ThemeProvider theme={sectionTheme}>
                <div
                    style={{
                        display: 'grid',
                        minHeight: '100dvh',
                        gridTemplateRows: 'auto 1fr auto',
                    }}
                >
                    <header className="bg-yellow-400">
                        <NavBar />
                    </header>
                    <main className="bg-[rgba(243,224,190,1)] py-4">
                        {landing ? (
                            <Landing />
                        ) : error !== '' ? (
                            <p>{error}</p>
                        ) : (
                            <Router>
                                <RootNavigation />
                            </Router>
                        )}
                    </main>
                    <footer className="bg-green-50">
                        <Footer />
                    </footer>
                </div>
            </ThemeProvider>
        </>
    );
}
