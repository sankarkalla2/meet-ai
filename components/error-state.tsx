import { AlertCircleIcon, Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 h-full items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center  gap-y-3 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="size-6 text-red-500" />
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
