import { Card } from 'flowbite-react';
import { HiCreditCard, HiRefresh } from 'react-icons/hi';
import type { PaymentMethod } from '@/types/PaymentValidate';

interface PaymentMethodSelectorProps {
    onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector = ({
    onSelect,
}: PaymentMethodSelectorProps) => {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <Card>
                <h2 className="text-xl font-bold mb-2 text-center">
                    ¿Cómo deseas pagar?
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Selecciona tu método de pago preferido
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Pago Móvil */}
                    <button
                        onClick={() => onSelect('pago-movil')}
                        className="flex-1 group cursor-pointer rounded-xl border-2 border-gray-200 p-6 text-left transition-all hover:border-blue-400 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                <HiCreditCard className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">
                                Pago Móvil
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Realiza un pago único desde tu banco y reporta la
                            transferencia.
                        </p>
                        <span className="mt-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                            Pago único
                        </span>
                    </button>

                    {/* Domiciliación */}
                    <button
                        onClick={() => onSelect('domiciliacion')}
                        className="flex-1 group cursor-pointer rounded-xl border-2 border-gray-200 p-6 text-left transition-all hover:border-amber-400 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                                <HiRefresh className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">
                                Domiciliación
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Afilia tu cuenta bancaria y paga automáticamente
                            cada mes.
                        </p>
                        <span className="mt-4 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                            Pago automático
                        </span>
                    </button>
                </div>
            </Card>
        </div>
    );
};
