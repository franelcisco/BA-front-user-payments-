import { BCVTasaStore } from '@/store/bcv';
import type { PaymentValidateProps } from '@/types/PaymentValidate';

export const OrderDetails = ({ order }: PaymentValidateProps) => {
    const TasaBCV = BCVTasaStore.getState().tasa.amount;

    return (
        <>
            <h2 className="text-xl font-bold mb-1">Detalles de tu Orden</h2>
            <div className="w-full sm:flex md:grid md:grid-cols-2 gap-2 md:text-sm">
                <p>N° de orden:</p>
                <p>{order.name}</p>
                <p>Total a pagar:</p>
                <p>
                    Bs. {String(Number(TasaBCV * order.totalAmount).toFixed(2))}
                </p>
            </div>
            <div className="mt-1 text-sm text-gray-500">
                <h3 className="font-semibold mb-2">Productos:</h3>
                <ul className="list-disc list-inside">
                    {order.items?.map((product, i) => (
                        <li key={i}>
                            {product.name} &times; {product.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
