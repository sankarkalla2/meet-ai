import {
  CommandDialog,
  CommandInput,
  CommandResponsiveDialog,
} from "@/components/ui/command";

import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find Meeting or agent" />
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
