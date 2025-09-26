import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // remove all queries from react-query cache
      queryClient.removeQueries();
      // redirect to login page
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Cannot Logout!");
    },
  });

  return { mutate, isPending };
}
