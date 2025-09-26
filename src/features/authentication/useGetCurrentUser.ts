import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useGetCurrentUser() {
  const { data, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  return { data, isPending };
}
