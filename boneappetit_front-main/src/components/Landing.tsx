import { Card, Spinner } from 'flowbite-react';

export const Landing = () => {
    return (
        <div className="w-full h-full flex justify-center items-center text-center">
            <Card>
                Consultando la tasa del día, por favor espere...
                <Spinner
                    size="xl"
                    aria-label="Center-aligned spinner example"
                />
            </Card>
        </div>
    );
};
