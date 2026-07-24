import { Alert, Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export const DirectDebitAccountWithoutDNI = () => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div>
        <div className="block">
          <Label htmlFor="id">
            <Alert
              icon={HiInformationCircle}
              className="bg-bone-beige !text-bone-primary px-4 text-xxs py-2 [&>svg]:!text-bone-primary"
            >
              No se puede domiciliar sin DNI
            </Alert>
          </Label>
        </div>
      </div>
    </div>
  );
};
