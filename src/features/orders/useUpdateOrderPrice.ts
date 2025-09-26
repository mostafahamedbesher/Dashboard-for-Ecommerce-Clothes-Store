import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderTotalPrice } from "../../services/apiOrders";

export function useUpdateOrderPrice(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderTotalPrice,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["orderData", id],
      });
      // show notification
      toast.success("Order Total Price Updated Successfully");
    },
    onError: () => {
      toast.error("Order Total Price Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
