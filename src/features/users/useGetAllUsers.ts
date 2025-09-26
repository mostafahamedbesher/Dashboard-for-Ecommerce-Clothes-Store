// Customer users (not staff users)
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUsers";

export function useGetAllUsers() {
  const { data, isPending, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllUsers,
  });

  return { data, isPending, error };
}
