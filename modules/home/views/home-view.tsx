"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!session?.session) {
      authClient.oneTap({
        fetchOptions: {
          onSuccess: () => router.push("/dashboard"),
          onError: (error) => console.error("One Tap failed:", error),
        },
        onPromptNotification: (notification) => {
          console.warn("One Tap prompt dismissed:", notification);
          setShowFallback(true); // Show fallback UI
        },
      });
    }
  }, [session, router]);

  if (session?.session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div>
      {showFallback ? (
        <button onClick={() => authClient.oneTap()} className="bg-red-500">Sign in with Google</button>
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default HomeView;
