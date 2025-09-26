import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useGetAllProducts() {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { data, isPending, error };
}
