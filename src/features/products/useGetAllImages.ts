import { useQuery } from "@tanstack/react-query";
import { getAllImages } from "../../services/apiProducts";

export function useGetAllImages() {
  const { data, isPending, error } = useQuery({
    queryKey: ["allImages"],
    queryFn: getAllImages,
  });

  return { data, isPending, error };
}
