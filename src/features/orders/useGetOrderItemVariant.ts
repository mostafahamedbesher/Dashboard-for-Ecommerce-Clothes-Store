import { useQuery } from "@tanstack/react-query";
import { getOrderItemVariant } from "../../services/apiOrders";

export function useGetOrderItemsVariant(productId: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["orderItemVariant", productId],
    queryFn: () => getOrderItemVariant(productId),
  });

  return { data, isPending, error };
}
