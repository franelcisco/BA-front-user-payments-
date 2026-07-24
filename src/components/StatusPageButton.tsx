import { Button } from "flowbite-react";

interface Props {
  statusPageUrl: string;
}

export const StatusPageButton = ({ statusPageUrl }: Props) => {
  return (
    <a
      href={statusPageUrl}
      target="_blank"
      className="flex justify-center gap-3 mt-4"
    >
      <Button className="bg-bone-yellow hover:bg-bone-orange text-bone-primary">
        Ver estatus de la orden
      </Button>
    </a>
  );
};
