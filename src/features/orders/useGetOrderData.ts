import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { OrderType } from "../../types/OrdersTypes";

export function useGetOrderData(id: number) {
  const { data, isPending, error } = useQuery<OrderType>({
    queryKey: ["orderData", id],
    queryFn: () => getOrder(id),
  });

  return { data, isPending, error };
}
