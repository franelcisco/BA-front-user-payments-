import { PaymentValidateView } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export const RootNavigation = () => {
    return (
        <Routes>
            <Route
                path="*"
                caseSensitive={true}
                element={<PaymentValidateView />}
            />
        </Routes>
    );
};
