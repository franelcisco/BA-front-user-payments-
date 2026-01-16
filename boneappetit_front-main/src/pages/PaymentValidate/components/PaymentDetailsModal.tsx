'use client';

import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

export interface PaymentDetailsModalProps {
    openModal: boolean;
    handleCloseModal: () => void;
}

export function PaymentDetailsModal({
    handleCloseModal,
    openModal,
}: PaymentDetailsModalProps) {
    return (
        <>
            <Modal dismissible show={openModal} onClose={handleCloseModal}>
                <ModalHeader>Datos de pago</ModalHeader>
                <ModalBody>
                    <div className="space-y-6 text-base leading-relaxed text-gray-500">
                        <p>
                            Banco: 0169 - R4 Banco Microfinanciero (Antes
                            MiBanco)
                        </p>
                        <p>Cedula: V20802411</p>
                        <p>Telefono: 0414-2521789</p>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
