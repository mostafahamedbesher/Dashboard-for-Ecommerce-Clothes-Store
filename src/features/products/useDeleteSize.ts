import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSizeVariant } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteSize(id: number, showToast = true) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSizeVariant,
    onSuccess: () => {
      // show notification
      if (showToast) {
        toast.success("Size Deleted Successfully");
      }
      // re invalidate cache to get ui updated after deletion
      queryClient.invalidateQueries({
        queryKey: ["allProductVariants", Number(id)],
      });
      // close Modal
    },
    onError: () => {
      toast.error("Size Couldnot be Deleted!");
    },
  });

  return { mutate, isPending };
}
