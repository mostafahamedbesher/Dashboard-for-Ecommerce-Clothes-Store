import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export function useGetProductData(id: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["productData", id],
    queryFn: () => getProduct(id),
  });

  return { data, isPending, error };
}
