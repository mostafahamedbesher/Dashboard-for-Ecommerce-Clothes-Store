import { useQuery } from "@tanstack/react-query";
import { getAllSettings } from "../../services/apiSettings";

export function useGetAllSettings() {
  const { data, isPending, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getAllSettings,
  });

  return { data, isPending, error };
}
