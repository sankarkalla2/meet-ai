import { auth } from "@/lib/auth";
import { UpgradeView } from "@/modules/premium/ui/views/upgrade-view";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Upgrade = async() => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) return redirect('auth/sign-up');

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.premium.getCurrentSubscriptions.queryOptions()
  );



  return <HydrateClient>
    <UpgradeView />
  </HydrateClient>;
};

export default Upgrade;
