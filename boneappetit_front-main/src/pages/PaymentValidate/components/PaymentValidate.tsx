import {
    Button,
    Card,
    Datepicker,
    Label,
    Select,
    Spinner,
    TextInput,
} from 'flowbite-react';
import { Receipt } from './Receipt';
import { bankList, documentTypes } from '@/utils/constants';
import * as yup from 'yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { PaymentValidateProps } from '@/types/PaymentValidate';
import { OrderDetails } from './OrderDetails';
import { useCallback, useEffect, useState } from 'react';
import { uploaderValidatePayFormData } from '@/services/api';
import { BCVTasaStore } from '@/store/bcv';
import { ToastComponent } from '@/components/ToastComponent';
import { PaymentDetailsModal } from './PaymentDetailsModal';

export interface HandlePaymentValidateForm {
    id: string;
    idType: string;
    phone: string;
    reference: string;
    bank: string;
    receipt: File;
}

export interface HandlePaymentValidateRequest {
    id: string;
    idType: string;
    phone: string;
    reference: string;
    bank: string;
    file: File;
    order: {
        idOrder: string;
        confirmationNumber: string;
    };
}

const schema = yup.object().shape({
    id: yup
        .string()
        .required('La cédula es requerida')
        .matches(/^\d{5,10}$/, 'La cédula debe tener entre 5 y 10 dígitos'),
    idType: yup.string().required('El tipo de cédula es requerido'),
    phone: yup
        .string()
        .required('El número de teléfono es requerido')
        .matches(
            /^(0412|0414|0416|0424|0426)\d{7}$/,
            'Debe ser un número de teléfono valido (ej: 04121234567)'
        ),
    reference: yup
        .string()
        .required('La referencia es requerida')
        .matches(/^\d{6,12}$/, 'La referencia debe tener entre 6 y 12 dígitos'),
    bank: yup.string().required('El banco es requerido'),
    receipt: yup
        .mixed<File>()
        .required('El comprobante es requerido')
        .test(
            'fileType',
            'El comprobante debe ser un archivo',
            (value) => value instanceof File
        ),
});

export const PaymentValidate = ({
    order,
    handleConfirm,
}: PaymentValidateProps) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const BCVTasaAmount = BCVTasaStore.getState().tasa.amount;
    const [landing, setLanding] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(true);

    const onSubmit: SubmitHandler<HandlePaymentValidateForm> = useCallback(
        async (data) => {
            setLanding(true);
            const fd = new FormData();

            const totalAmountBs = order.totalAmount * BCVTasaAmount;

            fd.append('id', data.id);
            fd.append('idType', data.idType);
            fd.append('phone', data.phone);
            fd.append('reference', data.reference);
            fd.append('bank', data.bank);
            fd.append('receipt', data.receipt);
            fd.append('idOrder', order.id);
            fd.append('confirmationNumber', order.confirmationNumber);
            fd.append('name', order.name);
            fd.append('totalAmount', order.totalAmount.toString());
            fd.append('tasa', BCVTasaAmount.toString());
            fd.append('totalAmountBs', totalAmountBs.toString());

            const response = await uploaderValidatePayFormData(fd);
            if (response) {
                handleConfirm();
            } else {
                setMessage('hubo un error al enviar su solicitud de pago');
                setShowToast(true);
            }
            setLanding(false);
        },
        [BCVTasaAmount, handleConfirm, order]
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<HandlePaymentValidateForm>({
        resolver: yupResolver(schema),
    });

    const handleCloseToast = () => setShowToast(false);

    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        setShowToast(false);
        setMessage('');
        setLanding(false);
        setOpenModal(false);
    }, [setShowToast, setMessage, setLanding, setOpenModal]);

    return (
        <form
            className="flex w-full h-full justify-center items-start gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <PaymentDetailsModal
                handleCloseModal={handleCloseModal}
                openModal={openModal}
            />
            <ToastComponent
                showToast={showToast}
                message={message}
                handleCloseToast={handleCloseToast}
            />
            <Card>
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-2">
                        Confirma tu Pago Movil
                    </h2>
                    <Button color={'yellow'} onClick={() => setOpenModal(true)}>
                        Ver datos de pago
                    </Button>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex w-md flex-col gap-2 md:w-96">
                        <div>
                            <div className="block">
                                <Label htmlFor="phone">
                                    Número de teléfono
                                </Label>
                            </div>
                            <TextInput
                                id="phone"
                                type="text"
                                placeholder="Ingresa tu número de teléfono"
                                color={errors.phone && 'failure'}
                                {...register('phone')}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.phone?.message}
                            </p>
                        </div>
                        <div>
                            <div className="block">
                                <Label htmlFor="phone">Fecha del pago</Label>
                            </div>
                            <Datepicker language="es" />
                        </div>
                        <div>
                            <div className="block">
                                <Label htmlFor="id">Cédula</Label>
                            </div>
                            <div className="flex">
                                <Select
                                    id="idType"
                                    className="min-w-14"
                                    {...register('idType')}
                                    color={errors.idType && 'failure'}
                                >
                                    {documentTypes.map((type, i) => (
                                        <option key={i} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Select>
                                <TextInput
                                    id="id"
                                    type="text"
                                    className="w-full"
                                    placeholder="Ingresa tu cédula"
                                    color={errors.id && 'failure'}
                                    {...register('id')}
                                />
                            </div>

                            <p className="text-red-500 text-sm">
                                {errors.id?.message}
                            </p>
                        </div>
                        <div>
                            <div className="block">
                                <Label htmlFor="reference">Referencia</Label>
                            </div>
                            <TextInput
                                id="reference"
                                type="text"
                                placeholder="Ingresa el número de referencia"
                                color={errors.reference && 'failure'}
                                {...register('reference')}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.reference?.message}
                            </p>
                        </div>
                        <div>
                            <div className="block">
                                <Label htmlFor="bank">Banco</Label>
                            </div>
                            <Select
                                id="bank"
                                {...register('bank')}
                                color={errors.bank && 'failure'}
                            >
                                <option value="" disabled>
                                    Selecciona un banco
                                </option>
                                {bankList.map((bank) => (
                                    <option key={bank} value={bank}>
                                        {bank}
                                    </option>
                                ))}
                            </Select>
                            <p className="text-red-500 text-sm">
                                {errors.bank?.message}
                            </p>
                        </div>
                    </div>
                    {/* Comprobante y preview */}
                    <div className="flex flex-col items-center justify-start gap-4 md:w-80">
                        <Receipt setValue={setValue} errors={errors.receipt} />
                    </div>
                </div>
            </Card>
            <Card>
                <OrderDetails order={order} handleConfirm={handleConfirm} />
                <Button color={'green'} disabled={landing} type="submit">
                    {landing ? (
                        <Spinner aria-label="Small spinner example" size="sm" />
                    ) : (
                        'Validar'
                    )}
                </Button>
            </Card>
        </form>
    );
};
