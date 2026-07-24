import { Card, Button } from 'flowbite-react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

interface Props {
    orderAmount: number;
    onSubmit: (amount: number) => void;
    onBack: () => void;
}

export function CashForm({ orderAmount, onSubmit, onBack }: Props) {
    // Aquí va la lógica del formulario con yup y validación >= orderAmount
    return (
        <Card className="max-w-md mx-auto mt-10 p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Efectivo</h2>
            {/* Formulario: monto a pagar, validación >= orderAmount */}
            <form>{/* ...campo monto... */}</form>
            <div className="flex justify-between mt-6">
                <Button color="gray" onClick={onBack}>
                    Elegir otro método
                </Button>
                <Button color="primary" onClick={() => onSubmit(orderAmount)}>
                    Confirmar
                </Button>
            </div>
        </Card>
    );
}
