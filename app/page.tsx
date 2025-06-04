"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, isPending, error, refetch } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authClient.signIn.email(
      {
        email: email,
        password,
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          alert(ctx.error.message);
        },
      }
    );
  };

  if (session) {
    return (
      <div>
        <h1>Welcome {session.user?.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input placeholder="name" onChange={(e) => setEmail(e.target.value)} />
      <Input
        placeholder="email.."
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        placeholder="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
      </Button>
    </form>
  );
}
