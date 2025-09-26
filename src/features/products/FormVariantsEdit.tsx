import { FormProvider, useForm } from "react-hook-form";
import { useGetProductVariants } from "./useGetProductVariants";
import BoxForm from "../../ui/BoxForm";
import Heading from "../../ui/Heading";
import VariantEditItem from "./VariantEditItem";
import Loader from "../../ui/Loader";
import FormSizeAdd from "./FormSizeAdd";
import { useUpdateImages } from "./useUpdateImages";
import { useGetProductImages } from "./useGetProductImages";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { updateVarinatsImages } from "../../services/apiProducts";
import FormColorAdd from "./FormColorAdd";
import RadioColorsGroup from "./RadioColorsGroup";
import ErrorMessage from "../../ui/ErrorMessage";
import { VariantsProductFormValues } from "../../types/ProductsTypes";

interface FormEditProps {
  productData: {
    title: string;
    price: number;
    discount: number;
    category: string;
    material: string;
    description: string;
    // quantity: number;
    colors: string[];
    id: number;
  };
  colors: string[];
}

function FormVariantsEdit({ productData, colors }: FormEditProps) {
  const { id } = productData;
  // get all variants related to this product
  const {
    data: productvariants,
    isPending,
    error: productVariantsError,
  } = useGetProductVariants(id);
  // format variants data as group of colors object with its variants
  type Variant = NonNullable<typeof productvariants>[number];
  const variantsGroupedByColor: Record<string, Variant[]> = {};

  colors.forEach((color) => {
    variantsGroupedByColor[color] =
      productvariants?.filter((variant) => variant.color === color) || [];
  });

  // handle form inputs with (React-hook-form) lib
  const formMethods = useForm<VariantsProductFormValues>({
    defaultValues: { colors: colors[0], sizesQuantity: {} },
  });
  const { handleSubmit, watch, setValue } = formMethods;

  function resetFormDefaultColor(color: string) {
    setValue("colors", color);
  }

  // get selected color from radio buttons inputs
  const selectedColor = watch("colors");

  // get all available sizes from variants table
  const sizes =
    variantsGroupedByColor[selectedColor]?.map((variant) => variant.size) ?? [];

  /////// handle updating Images Process //////
  // handle images update(id here is the main product id we use here to reinvaliadte cache after uploading new images)
  const { mutate, isPending: isUpdatingImages } = useUpdateImages(
    id,
    updateVarinatsImages
  );

  // get Existing images of the selected color
  const {
    data: colorImages,
    isPending: isLoadingImages,
    error: productImagesError,
  } = useGetProductImages(id);
  const item = colorImages?.find((item) => item?.color === selectedColor);
  const selectedColorimagesId = item?.id;
  const selectedColorimages = item?.images || [];

  function handleImagesSubmit(data: VariantsProductFormValues) {
    // update Color Images
    mutate({
      id: selectedColorimagesId,
      newimages: data.images,
      oldImages: selectedColorimages,
    });
  }

  if (isPending || isLoadingImages) {
    return <Loader />;
  }

  if (productVariantsError?.message || productImagesError?.message) {
    return (
      <ErrorMessage
        errorMsg={
          productVariantsError?.message || productImagesError?.message || ""
        }
      />
    );
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleImagesSubmit)}
        className="flex flex-col gap-4 text-primary_2"
      >
        <BoxForm>
          <Heading name="Variants Mangement" size="tiny" />

          <div className="flex justify-between border border-gray-200 p-4 rounded-sm shadow-sm max-md:flex-col max-md:gap-2 max-sm:gap-6">
            {/* colors radio group */}
            {colors.length ? <RadioColorsGroup colors={colors} /> : null}

            <Modal.Open id="formColorAdd">
              <Button style="px-4 py-1 self-start max-md:order-first max-md:self-end">
                +Add New Color
              </Button>
            </Modal.Open>
          </div>

          {/* selected variant Color to Edit */}
          {colors.length ? (
            <VariantEditItem
              selectedColor={selectedColor}
              variantsGroupedByColor={variantsGroupedByColor}
              productId={id}
              isUpdatingImages={isUpdatingImages}
              colors={colors}
            />
          ) : null}
        </BoxForm>
      </form>

      {/* form add new size */}
      <Modal.Window id="formSizeAdd">
        <FormSizeAdd
          productId={id}
          price={productData.price}
          sizes={sizes}
          selectedColor={selectedColor}
        />
      </Modal.Window>

      {/* form add new color */}
      <Modal.Window id="formColorAdd">
        <FormColorAdd
          productId={id}
          colors={colors}
          price={productData.price}
          resetFormDefaultColor={resetFormDefaultColor}
        />
      </Modal.Window>
    </FormProvider>
  );
}

export default FormVariantsEdit;
