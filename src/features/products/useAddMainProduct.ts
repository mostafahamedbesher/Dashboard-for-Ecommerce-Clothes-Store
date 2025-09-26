import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createMainProduct } from "../../services/apiProducts";

export function useAddMainProduct() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createMainProduct,
    onSuccess: (data) => {
      // show notification
      toast.success("Main Product Created Successfully");
      // redirect to product edit page to edit variants
      navigate(`/products/product/edit/${data[0]?.id}`);
    },
    onError: () => {
      toast.error("Main Product Couldnot be Created!");
    },
  });

  return { mutate, isPending };
}
