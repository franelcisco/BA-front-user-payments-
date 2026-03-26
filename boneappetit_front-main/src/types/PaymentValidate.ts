import type { OrderDto } from './shopify';

export type PaymentMethod = 'pago-movil' | 'domiciliacion';

export interface PaymentValidateProps {
    order: OrderDto;
    handleConfirm: () => void;
}
