import {
    Button,
    Card,
    HelperText,
    Label,
    Spinner,
    TextInput,
} from 'flowbite-react';
import { HiHashtag, HiSearch } from 'react-icons/hi';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { handleFindOrder, OrderDto } from '@/types/shopify';
import { useCallback, useState } from 'react';
import { FindOrderByName } from '@/services/shopify';
import { ToastComponent } from '@/components/ToastComponent';

const schema = yup.object().shape({
    orderName: yup
        .string()
        .min(6)
        .required('debe ingresar un numero de confirmación valido'),
});

interface FindOrderProps {
    handleFindOrder: (data: OrderDto) => void;
}

export const FindOrder = ({ handleFindOrder }: FindOrderProps) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [landing, setLanding] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<handleFindOrder>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<handleFindOrder> = useCallback(
        async (data) => {
            setLanding(true);
            const response = await FindOrderByName(data);
            if (response?.data) {
                handleFindOrder(response.data);
            } else {
                setMessage(
                    `N° ${getValues('orderName')} $de orden no encontrado'`
                );
            }
            setLanding(false);
        },
        [getValues, handleFindOrder]
    );

    const handleCloseToast = () => setShowToast(false);

    return (
        <div className="flex w-full h-full justify-center items-center">
            <ToastComponent
                showToast={showToast}
                message={message}
                handleCloseToast={handleCloseToast}
            />
            <Card>
                <h2 className="text-xl font-bold mb-4 text-center">
                    Ubica tu pedido
                </h2>
                <form
                    className="flex flex-col md:flex-row gap-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex w-80 flex-col gap-4 md:w-96">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">N° de Orden</Label>
                            </div>
                            <TextInput
                                id="confirmationNumber"
                                type="text"
                                required
                                icon={HiHashtag}
                                {...register('orderName')}
                            />
                            <HelperText>
                                Ingresa el numero generado al finalizar tu
                                proceso de compra.
                            </HelperText>
                            <p className="text-red-500 text-sm">
                                {errors.orderName?.message}
                            </p>
                        </div>
                        <Button type="submit" disabled={landing}>
                            {landing ? (
                                <Spinner
                                    aria-label="Small spinner example"
                                    size="sm"
                                />
                            ) : (
                                <>
                                    <HiSearch className="mr-2 h-5 w-5" /> Buscar
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
