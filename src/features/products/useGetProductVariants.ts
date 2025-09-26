import { useQuery } from "@tanstack/react-query";
import { getAllProductVariants } from "../../services/apiProducts";

export function useGetProductVariants(id: number) {
  const { data, isPending, error } = useQuery({
    queryKey: ["allProductVariants", id],
    queryFn: () => getAllProductVariants(id),
  });

  return { data, isPending, error };
}
