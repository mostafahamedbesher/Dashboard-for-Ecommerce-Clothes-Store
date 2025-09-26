import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../services/apiOrders";

export function useUpdateOrderStatus(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["orderData", id],
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      // show notification
      toast.success("Order Status Updated Successfully");
    },
    onError: () => {
      toast.error("Order Status Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
