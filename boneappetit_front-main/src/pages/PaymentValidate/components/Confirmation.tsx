import { Card } from 'flowbite-react';

export interface ConfirmationProps {
    orderName: string;
}

export const Confirmation = ({ orderName }: ConfirmationProps) => {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <Card>
                <h2 className="text-xl font-bold mb-4  text-center">
                    Su solicitud de confirmación ha sido enviada
                </h2>
                {orderName && (
                    <p className="text-center mt-2">N° de orden: {orderName}</p>
                )}
            </Card>
        </div>
    );
};
