import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/apiOrders";

export function useGetAllOrders() {
  const { data, isPending, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { data, isPending, error };
}
