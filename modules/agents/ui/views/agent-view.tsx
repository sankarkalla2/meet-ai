"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const trpc = useTRPC();
  const [filters] = useAgentFilters();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));
  const router = useRouter();



  return (
    <div className="p-4">
      <DataTable data={data.items} columns={columns} />
    </div>
  );
};

export default AgentsView;
