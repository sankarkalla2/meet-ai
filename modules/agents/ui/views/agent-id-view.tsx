"use client";
import { useTRPC } from "@/trpc/client";
import { dataTagErrorSymbol, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "./agent-id-view-header";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}
export const AgentViewId = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <h2>{data.name}</h2>
      <Badge>
        <VideoIcon /> 5
      </Badge>
      <div>{data.instructions}</div>
    </div>
  );
};
