import Button from "../../ui/Button";
import { useUpdateQuantity } from "./useUpdateQuantity";
import toast from "react-hot-toast";
import { useDeleteSize } from "./useDeleteSize";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import Modal from "../../ui/Modal";
import ConfirmDeleteWindow from "../../ui/ConfirmDeleteWindow";
import Input from "../../ui/Input";
import { VariantsProductFormValues } from "../../types/ProductsTypes";

interface VariantSizeEditProps {
  size: string;
  stokeQuantity: number;
  id: number;
  AvailableSizesLength: number;
}

type ProductParams = {
  productId: string;
};

function VariantSizeEdit({
  size,
  id,
  stokeQuantity,
  AvailableSizesLength,
}: VariantSizeEditProps) {
  const { getValues, resetField } = useFormContext<VariantsProductFormValues>();

  // get main product Id from url to use for deleting size(to reinvalidate cache)
  const { productId } = useParams<ProductParams>();

  const { mutate: updateQuantity, isPending: isUpdating } =
    useUpdateQuantity(id);

  const { mutate: deleteSize, isPending: isDeleting } = useDeleteSize(
    Number(productId)
  );

  function handleUpdateQuantity() {
    // get value from input and convert it to number
    const quantityVal = Number(getValues().sizesQuantity[id]);

    if (quantityVal >= 0) {
      updateQuantity({ id, quantity: quantityVal });
    } else {
      // if quantity input is negative number
      toast.error("Quantity must be a Positive Number");
      // reset to default quantity
      resetField(`sizesQuantity.${id}`, { defaultValue: stokeQuantity });
    }
  }

  function handleDeleteSize() {
    // check there is only one size variant available
    if (AvailableSizesLength <= 1) {
      toast.error("You must have at least 1 size Variant");
      return;
    }

    deleteSize(id);
  }

  return (
    <div className="flex items-center justify-between w-3/4 p-2 bg-ternary rounded-md max-lg:w-full max-sm:flex-col  max-sm:gap-6 max-xs:gap-4">
      <p className="uppercase font-semibold max-sm:text-lg">{size}</p>
      <div className="flex items-center gap-6 w-80 max-sm:w-full max-xs:flex-col max-xs:gap-4">
        {/* stoke Quantity Input */}
        <div className="flex items-center gap-6 max-xs:gap-4">
          <Input
            type="number"
            id={size}
            style="border border-primary_2 rounded-sm p-2 text-primary_2 w-full bg-primary w-20"
            labelText="Stock Quantity"
            name={`sizesQuantity.${id}`}
            defaultValue={stokeQuantity}
            onBlur={handleUpdateQuantity}
            disabled={isUpdating}
          />
        </div>

        {/* Button Delete Size */}
        {/* max-sm:absolute max-sm:top-2 max-sm:right-2 */}
        <Modal.Open id={`deleteSize-${id}`}>
          <div className="max-xs:w-full">
            <Button
              style="px-3 py-1 max-xs:w-full"
              color="text-red-500 border border-red-500 hover:text-primary hover:bg-red-500"
            >
              Delete
            </Button>
          </div>
        </Modal.Open>

        <Modal.Window id={`deleteSize-${id}`}>
          <ConfirmDeleteWindow
            deleteHandler={handleDeleteSize}
            name="Size"
            isLoading={isDeleting}
            deleteItemName={size}
          />
        </Modal.Window>
      </div>
    </div>
  );
}

export default VariantSizeEdit;
