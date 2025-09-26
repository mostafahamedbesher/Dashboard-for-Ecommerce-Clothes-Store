import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantity } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateQuantity(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateQuantity,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["productData", id],
      });
      // show notification
      toast.success("Quantity Updated Successfully");
    },
    onError: () => {
      toast.error("Quantity Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
