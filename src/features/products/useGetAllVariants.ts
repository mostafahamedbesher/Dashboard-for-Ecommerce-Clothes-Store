import { useQuery } from "@tanstack/react-query";
import { getAllVariants } from "../../services/apiProducts";

export function useGetAllVariants() {
  const { data, isPending, error } = useQuery({
    queryKey: ["allVariants"],
    queryFn: () => getAllVariants(),
  });

  return { data, isPending, error };
}
