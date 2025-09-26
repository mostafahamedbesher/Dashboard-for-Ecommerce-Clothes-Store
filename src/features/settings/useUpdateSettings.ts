import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      // show notification
      toast.success("Settings Updated Successfully");
    },
    onError: () => {
      toast.error("Settings Couldnot be Updated!");
    },
  });

  return { mutate, isPending };
}
