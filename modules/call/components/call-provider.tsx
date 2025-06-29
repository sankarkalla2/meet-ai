"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { CallConnect } from "./call-connect";

interface Props {
  meetingId: string;
  meetingName: string;
}
export const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();
  if (!data || isPending) {
    return <Loader2 className="size-6 animate-spin text-white" />;
  }

  return (
    <div className="text-white">
      <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userImage={data.user.image ?? "https://github.com/shadcn.png"}
        userName={data.user.name}
      />
    </div>
  );
};
