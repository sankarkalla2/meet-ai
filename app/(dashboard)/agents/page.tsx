import { loadSearchParams } from "@/modules/agents/params";
import { AgentsListHeader } from "@/modules/agents/ui/components/agent-list-header";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import AgentViewError from "@/modules/agents/ui/views/agent-view-error";
import AgentViewLoading from "@/modules/agents/ui/views/agent-view-loading";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
}
const Agents = async ({ searchParams }: Props) => {
  const params = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...params,
    })
  );

  return (
    <>
      <AgentsListHeader />
      <HydrateClient>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrateClient>
    </>
  );
};

export default Agents;
