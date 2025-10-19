import { useFormContext } from "react-hook-form";
import Button from "../../ui/Button";
import Color from "../../ui/Color";
import ConfirmDeleteWindow from "../../ui/ConfirmDeleteWindow";
import Loader from "../../ui/Loader";
import Modal from "../../ui/Modal";
import InputImage from "./InputImage";
import { useDeleteColor } from "./useDeleteColor";
import { useGetProductImages } from "./useGetProductImages";
import VariantImageCard from "./VariantImageCard";
import VariantSizeEdit from "./VariantSizeEdit";
import toast from "react-hot-toast";
import ErrorMessage from "../../ui/ErrorMessage";
import { VariantsProductFormValues } from "../../types/ProductsTypes";
import { sizesSchema } from "../../utils/constants";

interface ProductVariantType {
  color: string;
  size: string;
  stokeQuantity: number;
  price: number;
  id: number;
  productId: number;
  created_at: string;
  updated_at: string;
  images: string[];
}

type GroupedByColorType = Record<string, ProductVariantType[] | undefined>;

interface VariantEditItemProps {
  selectedColor: string;
  variantsGroupedByColor: GroupedByColorType;
  productId: number;
  isUpdatingImages: boolean;
  colors: string[];
  resetTrigger?: number; // only need this to be passed as prop to InputImageComponent
}

function VariantEditItem({
  selectedColor,
  variantsGroupedByColor,
  productId,
  isUpdatingImages,
  colors,
  resetTrigger,
}: VariantEditItemProps) {
  // we use it to check if the added size is already exists
  const AvailableSizesLength =
    variantsGroupedByColor[selectedColor]?.map((variant) => variant.size)
      .length ?? [].length;

  // read images of all product colors
  const {
    data,
    isPending: isLoadingImages,
    error: productImagesError,
  } = useGetProductImages(productId);

  const selectedColorImages =
    data?.filter((item) => item.color === selectedColor)?.at(0)?.images || [];

  const selectedColorId = data?.find(
    (item) => item.color === selectedColor
  )?.id;

  //// handle color deletion
  const { setValue } = useFormContext<VariantsProductFormValues>();
  const { mutate: deleteColor, isPending: isDeletingColor } =
    useDeleteColor(productId);

  //get all size variants Ids to delete when delete color
  const sizeVariantsIds =
    variantsGroupedByColor[selectedColor]?.map((variant) => variant.id) || [];

  //get image names from imagesUrls to remove them from storage
  let selectedColorImagesNames: string[] = [];
  if (selectedColorImages.length) {
    selectedColorImagesNames = selectedColorImages?.map((imgSrc: string) =>
      imgSrc.split("/").at(-1)
    );
  }

  // delete color handler
  function handleDeleteColor() {
    // delete color only when there is multiple colors exist
    if (Object.keys(variantsGroupedByColor).length > 1) {
      deleteColor({
        colorId: selectedColorId,
        colorImages: selectedColorImagesNames,
        sizeVariantsIds,
      });

      // Compute new colors array (excluding the deleted one)
      const updatedColors = colors.filter((color) => color !== selectedColor);
      // reset color radio input to new first color exists
      setValue("colors", updatedColors[0]);
    } else {
      toast.error("you must have at least one color exists.");
    }
  }

  //// sort variants by size according to sizes schema
  // solution 1: worse Time Complexity O(nlog(n) * m)
  // const SelectedVariantSortedBySizes =
  //   variantsGroupedByColor[selectedColor]
  //     ?.slice()
  //     ?.sort(
  //       (a, b) => sizesSchema.indexOf(a.size) - sizesSchema.indexOf(b.size)
  //     ) || [];

  //solution 2: better Time Complexity O(nlog(n))
  const sizesSchemaMap = new Map<string, number>();
  sizesSchema.forEach((val, idx) => sizesSchemaMap.set(val, idx));

  const SelectedVariantSortedBySizes =
    variantsGroupedByColor[selectedColor]
      ?.slice()
      ?.sort(
        (a, b) =>
          (sizesSchemaMap.get(a.size) ?? Number.MAX_SAFE_INTEGER) -
          (sizesSchemaMap.get(b.size) ?? Number.MAX_SAFE_INTEGER)
      ) || [];

  if (isLoadingImages) {
    return <Loader />;
  }

  if (productImagesError?.message) {
    return <ErrorMessage errorMsg={productImagesError.message} />;
  }

  return (
    <div className="bg-primary rounded-sm space-y-8 p-4 text-primary_2 shadow-sm border border-gray-200 max-xs:relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 bg-ternary rounded-md p-4 max-sm:p-2">
          <p className="text-primary_2">Selected Color :</p>
          <Color color={selectedColor} size="medium" />
        </div>

        <div>
          <Modal.Open id="deleteColor">
            <Button
              style="px-3 py-1 max-xs:hidden"
              color="text-red-500 border border-red-500 hover:text-primary hover:bg-red-500"
            >
              <span>Delete Color</span>
            </Button>
          </Modal.Open>

          <Modal.Window id="deleteColor">
            <ConfirmDeleteWindow
              name="Color"
              deleteHandler={handleDeleteColor}
              isLoading={isDeletingColor}
              optionalAlertMsg="this will delete all size variants and images related to this color."
            />
          </Modal.Window>
        </div>
      </div>

      {/* images FileInput */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="images">Add More Images to This Color:</label>
          <InputImage
            name="images"
            label="Select Images"
            requiredMessage="You must upload at least one image"
            isUpdatingImages={isUpdatingImages}
            resetTrigger={resetTrigger}
          />
        </div>

        {/* image Cards List */}
        <ul className="flex flex-wrap items-center gap-6 border border-gray-300 rounded-md p-2">
          {selectedColorImages?.length ? (
            selectedColorImages?.map((image: string) => (
              <VariantImageCard
                key={image}
                src={image}
                selectedColorImages={selectedColorImages}
                selectedColorId={selectedColorId}
                productId={productId}
              />
            ))
          ) : (
            // default when no images
            <div className="flex items-center justify-center w-full p-12 text-lg text-primary_2">
              No Images. Add more
            </div>
          )}
        </ul>

        <div className="w-fit">
          <Button type="submit" disabled={isUpdatingImages}>
            {isUpdatingImages ? "Uploading Images..." : "Upload Images"}
          </Button>
        </div>
      </div>

      {/* sizes */}
      <div className="flex flex-col gap-2">
        <p className="">Sizes : </p>
        {SelectedVariantSortedBySizes.map((variant) => (
          <VariantSizeEdit
            key={variant.id}
            size={variant.size}
            id={variant.id}
            stokeQuantity={variant.stokeQuantity}
            AvailableSizesLength={AvailableSizesLength}
          />
        ))}

        <Modal.Open id="formSizeAdd">
          <Button style="px-3 py-1 mr-auto">Add New Size</Button>
        </Modal.Open>

        {/* we show the form to add size and place it outside of the variants form(FormVariantEdit Component) to show in a modal Window */}
      </div>

      {/* reposition on mobile devices */}
      <Modal.Open id="deleteColor">
        <Button
          style="px-3 py-1 hidden max-xs:block max-xs:w-full max-xs:py-2"
          color="text-red-500 border border-red-500 hover:text-primary hover:bg-red-500"
        >
          <span>Delete Color</span>
        </Button>
      </Modal.Open>
    </div>
  );
}

export default VariantEditItem;
