import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAvailable } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductAvailable,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      // show notification
      if (data.available) {
        toast.success("Product Restored Successfully");
      } else {
        toast.success("Product Deleted Successfully");
      }
    },
    onError: () => {
      toast.error("Product Couldnot be Deleted or Restored!");
    },
  });

  return { mutate, isPending };
}
