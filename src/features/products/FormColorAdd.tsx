import { FormProvider, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import InputColor from "../../ui/InputColor";

import { useAddColor } from "./useAddColor";
import { useAddSize } from "./useAddSize";
import toast from "react-hot-toast";
import InputProductColorHex from "./InputProductColorHex";
import { AddColorFormValues } from "../../types/ProductsTypes";

interface FormColorAddProps {
  productId: number;
  colors: string[];
  price: number;
  resetFormDefaultColor: (color: string) => void;
}

function FormColorAdd({
  productId,
  colors,
  price,
  resetFormDefaultColor,
}: FormColorAddProps) {
  // handle Form using React-hook-form
  const formMethods = useForm<AddColorFormValues>({
    defaultValues: {
      color: "#523698",
    },
  });
  const { handleSubmit } = formMethods;
  // get mutation functions
  const { mutate: addColor, isPending: isAddingColor } = useAddColor(
    productId,
    resetFormDefaultColor
  );
  const { mutate: addSize, isPending: isAddingSize } = useAddSize(productId);
  const isAdding = isAddingColor || isAddingSize;

  //  handle submit Form
  function handleColorSubmit(data: AddColorFormValues) {
    const isColorExist = colors.includes(data.color);
    // add color only if it is not exist before
    if (!isColorExist) {
      // add color in variants table(create new size variant)
      addSize({
        productId,
        color: data.color,
        size: "sm",
        price,
        stokeQuantity: 0,
      });

      // add color in variant images table (where each color have specific images)
      addColor({ productId, color: data.color });
    } else {
      toast.error("Color Already Exists!. Select Another Color");
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleColorSubmit)}
        className="flex flex-col gap-4"
      >
        <InputColor />

        <InputProductColorHex />

        <Button type="submit" disabled={isAdding}>
          {isAdding ? "Adding Color..." : "Add Color"}
        </Button>
      </form>
    </FormProvider>
  );
}

export default FormColorAdd;
