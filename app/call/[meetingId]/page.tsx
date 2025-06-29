import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/call-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ meetingId: string }>;
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/auth/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrateClient>
      <CallView meetingId={meetingId} />
    </HydrateClient>
  );
};

export default Page;
