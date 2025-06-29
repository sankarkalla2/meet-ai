import { AgentViewId } from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentId: string }>;
}
const Agent = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <AgentViewId agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default Agent;
