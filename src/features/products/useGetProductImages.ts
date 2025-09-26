import { useQuery } from "@tanstack/react-query";
import { getAllProductImages } from "../../services/apiProducts";

export function useGetProductImages(productId: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["productImages", productId],
    queryFn: () => getAllProductImages(productId),
  });

  return { data, isPending, error };
}
