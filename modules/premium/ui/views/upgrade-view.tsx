"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const UpgradeView = () => {
  const trpc = useTRPC();
  const {
    data: products,
    isPending,
    isError,
  } = useQuery(trpc.premium.getProducts.queryOptions());
  const { data: currentSubscription } = useQuery(
    trpc.premium.getCurrentSubscriptions.queryOptions()
  );

  if (isPending) return <div>Pending</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => {
        const isCurrentProduct = product.id === currentSubscription?.id;

        const isPremium = !!currentSubscription;
        let buttonText = "Upgrde";
        let onClick = () => authClient.checkout({ products: [product.id] });

        if (isCurrentProduct) {
          buttonText = "Manage";
          onClick = () => authClient.customer.portal();
        } else if (isPremium) {
          buttonText = "Change Plan";
          onClick: () => authClient.customer.portal();
        }
        return (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.prices[0].amountType === 'fixed' ? product.prices[0].priceAmount / 100 : 0 }</p>
            <Button onClick={onClick}>{buttonText}</Button>
          </div>
        );
      })}
    </div>
  );
};
