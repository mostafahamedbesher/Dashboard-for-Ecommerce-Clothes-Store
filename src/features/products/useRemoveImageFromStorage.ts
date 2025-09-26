import { useMutation } from "@tanstack/react-query";
import { removeImageFromStorage } from "../../services/apiProducts";

export function useRemoveImageFromStorage() {
  const { mutate, isPending } = useMutation({
    mutationFn: removeImageFromStorage,
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate, isPending };
}
