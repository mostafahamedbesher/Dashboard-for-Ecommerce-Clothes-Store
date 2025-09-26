import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderItemQuantity } from "../../services/apiOrders";

export function useUpdateOrderItemQuantity(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderItemQuantity,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["orderItems", id],
      });
      // show notification
      toast.success("Order Item Quantity Updated Successfully");
    },
    onError: () => {
      toast.error("Order Item Quantity Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
