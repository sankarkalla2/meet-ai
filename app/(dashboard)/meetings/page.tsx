"use client";
import { Button } from "@/components/ui/button";
import NewMeetingDialog from "@/modules/meetings/ui/components/create-meeting";
import { useState } from "react";

const Meetings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <NewMeetingDialog
        open={open}
        onOpenChange={setOpen}
      />
      <Button onClick={() => setOpen(!open)}>create new meeting</Button>;
    </div>
  );
};

export default Meetings;
