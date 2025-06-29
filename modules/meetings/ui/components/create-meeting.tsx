import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Dispatch, SetStateAction } from "react";
import MeetingForm from "./agent-from";

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
