import HomeView from "@/modules/home/views/home-view";
import { getQueryClient, HydrateClient, prefetch, trpc } from "@/trpc/server";

const Home = async () => {
  return (
    <HydrateClient>
      <HomeView />;
    </HydrateClient>
  );
};

export default Home;
