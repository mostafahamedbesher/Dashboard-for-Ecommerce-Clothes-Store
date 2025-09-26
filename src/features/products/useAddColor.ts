import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addColorVariant } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useAddColor(
  id: number,
  resetFormDefaultColor: (color: string) => void
) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addColorVariant,
    onSuccess: (data) => {
      // reinvalidte cache to get the ui updated
      queryClient.invalidateQueries({
        queryKey: ["productImages", id],
      });
      // show notification
      toast.success("Color Added Successfully");
      // reset default selected color
      resetFormDefaultColor(data[0]?.color);
    },
    onError: () => {
      toast.error("Color Couldnot be Added!");
    },
  });

  return { mutate, isPending };
}

// export function useAddColor(id: number) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationFn: addColorVariant,
//     onSuccess: () => {
//       // reinvalidte cache to get the ui updated
//       queryClient.invalidateQueries({
//         queryKey: ["productImages", id],
//       });
//       // show notification
//       toast.success("Color Added Successfully");

//     },
//     onError: () => {
//       toast.error("Color Couldnot be Added!");
//     },
//   });

//   return { mutate, isPending };
// }
