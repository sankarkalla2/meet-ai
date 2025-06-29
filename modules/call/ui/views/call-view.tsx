"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CallProvider } from "../../components/call-provider";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isPending, isError } = useQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (isPending) return <div>isLoading</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <CallProvider meetingId={meetingId} meetingName={data.name} />
    </div>
  );
};
