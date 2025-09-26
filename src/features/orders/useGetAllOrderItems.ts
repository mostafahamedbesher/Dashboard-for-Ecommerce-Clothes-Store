import { useQuery } from "@tanstack/react-query";
import { getAllOrderItems } from "../../services/apiOrders";

export function useGetAllOrderItems() {
  const { data, isPending, error } = useQuery({
    queryKey: ["allOrderItems"],
    queryFn: getAllOrderItems,
  });

  return { data, isPending, error };
}
