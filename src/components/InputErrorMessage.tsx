export interface InputErrorMessageProps {
    message?: string;
}

export const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
    return <p className="text-red-500 text-sm">{message}</p>;
};
