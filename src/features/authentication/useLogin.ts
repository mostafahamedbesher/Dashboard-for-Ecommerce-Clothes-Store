import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      // add the user to cache manually
      queryClient.setQueryData(["currentUser"], user.user);
      // redirect user to the app
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Invalid Email or Password!");
    },
  });

  return { mutate, isPending };
}
