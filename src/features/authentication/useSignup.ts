import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../../services/apiAuth";

export function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("New User Created Successfully");
    },
    onError: () => {
      toast.error("New User Cannot Be Created!");
    },
  });

  return { mutate, isPending };
}
