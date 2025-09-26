import { useQuery } from "@tanstack/react-query";
import { getVariantData } from "../../services/apiProducts";
import { variantType } from "../../types/ProductsTypes";

export function useGetVariantData(id: number) {
  const { data, isPending, error } = useQuery<variantType>({
    queryKey: ["VariantData", id],
    queryFn: () => getVariantData(id),
  });

  return { data, isPending, error };
}
