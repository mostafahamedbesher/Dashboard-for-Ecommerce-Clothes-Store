import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { updateVarinatsImages } from "../../services/apiProducts";

export function useUpdateImages<TVariables>(
  id: number,
  callbackFn: (variables: TVariables) => Promise<unknown>
) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: callbackFn,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["productImages", id],
      });
      // show notification
      toast.success("Images Updated Successfully");
    },
    onError: () => {
      toast.error("Images Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
