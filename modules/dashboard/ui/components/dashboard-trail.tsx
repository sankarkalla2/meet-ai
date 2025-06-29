"use client";
import { premiumRouter } from "@/modules/premium/server/premium-procedure";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { RocketIcon } from "lucide-react";

export const DashboardTrail = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

  if (!data) return null;

  return (
    <div className="border border-border/10 rounded-lg w-full bg-white/10 flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-4 p-3">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-4" />
          <div>Free trail</div>
          <p>{data.agentsCount}</p>
          <p>{data.meetingCount}</p>
        </div>
      </div>
    </div>
  );
};
