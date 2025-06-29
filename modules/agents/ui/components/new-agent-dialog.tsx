import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Dispatch, SetStateAction } from "react";
import AgentForm from "./agent-form";

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}
const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm onSuccess={() => onOpenChange(false)} />
    </ResponsiveDialog>
  );
};

export default NewAgentDialog;
