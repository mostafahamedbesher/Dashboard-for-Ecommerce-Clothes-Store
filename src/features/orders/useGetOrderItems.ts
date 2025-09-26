import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "../../services/apiOrders";

export function useGetOrderItems(id: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["orderItems", id],
    queryFn: () => getOrderItems(id),
  });

  return { data, isPending, error };
}
