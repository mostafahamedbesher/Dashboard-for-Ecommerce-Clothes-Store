import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderInfo } from "../../services/apiOrders";

export function useUpdateOrderInfo(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderInfo,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["orderData", id],
      });
      // show notification
      toast.success("Order Info Updated Successfully");
    },
    onError: () => {
      toast.error("Order Info Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
