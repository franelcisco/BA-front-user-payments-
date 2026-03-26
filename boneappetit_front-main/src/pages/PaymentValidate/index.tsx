import type { OrderDto } from '@/types/shopify';
import type { PaymentMethod } from '@/types/PaymentValidate';
import { useCallback, useState } from 'react';
import { FindOrder } from './components/FindOrder';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { PaymentValidate } from './components/PaymentValidate';
import { Domiciliacion } from './components/Domiciliacion';
import { Confirmation } from './components/Confirmation';

export const PaymentValidateView = () => {
    const [order, setOrder] = useState<OrderDto | undefined>();
    const [confirm, setConfirm] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<
        PaymentMethod | undefined
    >();

    const handleFindOrder = useCallback((data: OrderDto) => {
        if (!data.canMarkAsPaid) {
            setConfirm(true);
        }

        setOrder(data);
    }, []);

    const handleConfirm = () => setConfirm(true);

    const handleBackToMethodSelector = () => setPaymentMethod(undefined);

    return (
        <>
            {!order ? (
                <FindOrder handleFindOrder={handleFindOrder} />
            ) : confirm ? (
                <Confirmation orderName={order.name} />
            ) : !paymentMethod ? (
                <PaymentMethodSelector onSelect={setPaymentMethod} />
            ) : paymentMethod === 'pago-movil' ? (
                <PaymentValidate
                    order={order}
                    handleConfirm={handleConfirm}
                />
            ) : (
                <Domiciliacion
                    order={order}
                    onBack={handleBackToMethodSelector}
                    onComplete={handleConfirm}
                />
            )}
        </>
    );
};
