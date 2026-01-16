import type { OrderDto } from './shopify';

export interface PaymentValidateProps {
    order: OrderDto;
    handleConfirm: () => void;
}
