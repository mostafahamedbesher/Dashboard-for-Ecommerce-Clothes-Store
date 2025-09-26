import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      toast.success("Account Updated Successfully");
    },
    onError: () => {
      toast.error("Account Cannot Be Updated!");
    },
  });

  return { mutate, isPending };
}
