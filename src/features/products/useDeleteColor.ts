import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteColorVariant } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteColor(productId: number) {
  const queryClient = useQueryClient();
  const queryKeys = ["allProductVariants", "productImages"];

  const { mutate, isPending } = useMutation({
    mutationFn: deleteColorVariant,
    onSuccess: () => {
      // show notification
      toast.success("Color Deleted Successfully");
      // re invalidate cache to get ui updated after deletion
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey, Number(productId)],
        });
      });
    },
    onError: () => {
      toast.error("Color Couldnot be Deleted!");
    },
  });

  return { mutate, isPending };
}
