import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductVariant } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useAddSize(id: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createProductVariant,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["allProductVariants", id],
      });
      // show notification
      toast.success("Size Added Successfully");
    },
    onError: () => {
      toast.error("Size Couldnot be Added!");
    },
  });

  return { mutate, isPending };
}
