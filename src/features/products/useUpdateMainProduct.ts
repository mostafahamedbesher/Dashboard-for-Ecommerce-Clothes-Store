import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMainProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateMainProduct(id: number | undefined) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateMainProduct,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["productData", id],
      });
      // show notification
      toast.success("Main Product Data Updated Successfully");
    },
    onError: () => {
      toast.error("Main Product Data Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
