"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isLoading, isPending, isError } = useQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isComplted = data.status === "completed";
  const isProcessing = data.status === "processing";
  return (
    <div>
      {isCancelled && <div>Cancelled </div>}
      {isUpcoming && (
        <div>
          <div className="p-4 mt-10 w-full items-center justify-between gap-x-4">
            <Button variant={"outline"}>Cancel</Button>
            <Button>
              <Link href={`/call/${meetingId}`}>Start Meeting</Link>
            </Button>
          </div>
        </div>
      )}
      {isProcessing && <div>isProcessing </div>}
      {isComplted && <div>completed </div>}
      {isActive && <div>Active </div>}
    </div>
  );
};
