import type { OrderDto } from '@/types/shopify';
import { useCallback, useState } from 'react';
import { FindOrder } from './components/FindOrder';
import { PaymentValidate } from './components/PaymentValidate';
import { Confirmation } from './components/Confirmation';

export const PaymentValidateView = () => {
    const [order, setOrder] = useState<OrderDto | undefined>();
    const [confirm, setConfirm] = useState<boolean>(false);

    const handleFindOrder = useCallback((data: OrderDto) => {
        if (!data.canMarkAsPaid) {
            setConfirm(true);
        }

        setOrder(data);
    }, []);

    const handleConfirm = () => setConfirm(true);

    return (
        <>
            {!order ? (
                <FindOrder handleFindOrder={handleFindOrder} />
            ) : !confirm ? (
                <PaymentValidate order={order} handleConfirm={handleConfirm} />
            ) : (
                <Confirmation orderName={order.name} />
            )}
        </>
    );
};
