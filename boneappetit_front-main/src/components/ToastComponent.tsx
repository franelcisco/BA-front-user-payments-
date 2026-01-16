import { Toast, ToastToggle } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

interface ToastComponentProps {
    message: string;
    showToast: boolean;
    handleCloseToast: () => void;
}

export const ToastComponent = ({
    message,
    showToast,
    handleCloseToast,
}: ToastComponentProps) => {
    return (
        <div>
            {showToast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">
                            {message}
                        </div>
                        <ToastToggle onClick={handleCloseToast} />
                    </Toast>
                </div>
            )}
        </div>
    );
};
