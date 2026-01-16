import React, { useState } from 'react';
import { FileInput, HelperText, Label } from 'flowbite-react';
import type { FieldError, UseFormSetValue } from 'react-hook-form';
import type { HandlePaymentValidateForm } from './PaymentValidate';

interface ReceiptProps {
    setValue: UseFormSetValue<HandlePaymentValidateForm>;
    errors: FieldError | undefined;
}

export const Receipt = ({ setValue, errors }: ReceiptProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
            setValue('receipt', file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-sm">
            <div>
                <Label className="mb-2 block" htmlFor="receipt-upload">
                    Cargar comprobante de pago
                </Label>
                <FileInput
                    id="receipt-upload"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                <HelperText className="mt-1">
                    Solo puedes cargar archivos de imagen (jpg, png, etc.).
                </HelperText>
                <p className="text-red-500 text-sm">{errors?.message}</p>
            </div>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded px-4 py-2">
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain rounded"
                    />
                ) : (
                    <span className="text-gray-500">Vista previa</span>
                )}
            </div>
        </div>
    );
};
