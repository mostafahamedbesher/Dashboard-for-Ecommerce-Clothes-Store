import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";

import Color from "../../ui/Color";
import Menus from "../../ui/Menus";
import Size from "../../ui/Size";
import Table from "../../ui/Table";
import SpinnerMini from "../../ui/SpinnerMini";
import { useGetProductVariants } from "./useGetProductVariants";
import { getUniqueItems, sortByReferenceArray } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDeleteWindow from "../../ui/ConfirmDeleteWindow";
import { useDeleteProduct } from "./useDeleteProduct";
import BadgeDeleted from "./BadgeDeleted";
import Button from "../../ui/Button";
import { productType } from "../../types/ProductsTypes";
import { sizesSchema } from "../../utils/constants";

interface ProductProps {
  product: productType;
}

function ProductCard({ product }: ProductProps) {
  // get all product variants data
  const {
    data: variantsData,
    isPending,
    error: productVariantsError,
  } = useGetProductVariants(product.id);

  // const cardImage = variantsData?.at(0)?.images?.at(0);

  // calc total quantity
  const totalQuantity = variantsData
    ?.map((variant) => variant.stokeQuantity)
    .reduce((acc, cur) => acc + cur, 0);

  // unique colors
  const colors = variantsData?.map((variant) => variant.color) || [];
  const uniqueColors = getUniqueItems(colors);

  // unique sizes
  const sizes = variantsData?.map((variant) => variant.size) || [];
  const uniqueSizes = getUniqueItems(sizes);
  const displayedSizes = sortByReferenceArray(uniqueSizes, sizesSchema);

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  function handleDeleteProduct() {
    deleteProduct({ productId: product.id, available: false });
  }

  function handleRestoreProduct() {
    deleteProduct({ productId: product.id, available: true });
  }

  return (
    <li
      className={`relative ${product.available ? "" : "bg-zinc-400 grayscale"}`}
    >
      <Table.TableRow>
        <img
          src={product?.images?.at(0) || "/images/unknown-image.png"}
          // src={cardImage || "/images/unknown-image.png"}
          alt="product image"
          className="w-24 h-28"
        />
        <p className="text-sm">{product.title}</p>
        <p className="font-bold">{`${product.price.toFixed(2)}$`}</p>
        <div>
          {product.discount ? (
            <p>{`${product.discount.toFixed(2)}$`}</p>
          ) : (
            <p className="text-xl">_</p>
          )}
        </div>
        {/* sizes */}
        <ul className="flex flex-wrap gap-1 items-start">
          {displayedSizes.map((size) => (
            <li key={size}>
              <Size size={size} />
            </li>
          ))}
        </ul>
        {/* colors */}
        <ul className="flex flex-wrap gap-1">
          {uniqueColors.map((color) => (
            <li key={color}>
              <Color color={color} />
            </li>
          ))}
        </ul>

        {/* Quantity(Total) */}
        <div>
          {productVariantsError?.message && (
            <p className="text-xs text-red-500">failed to fetch data</p>
          )}
          {isPending ? (
            <SpinnerMini spinnerColor="border-primary_2" />
          ) : (
            totalQuantity
          )}
        </div>

        {/* Ratings */}
        <div>
          <span className="font-semibold text-secondary">
            {product.ratingVal}
          </span>{" "}
          <span>/ 5</span>
        </div>

        {/* Actions Column */}
        {product.available ? (
          <Modal>
            <div className="ml-auto">
              <Menus.ToggleButton id={product.id} />

              <Menus.MenuList id={product.id}>
                <Menus.MenuButton type="link" to={`product/edit/${product.id}`}>
                  <div className="flex gap-1 items-center">
                    <HiOutlinePencilSquare className="w-4 h-4" />
                    <span className=" whitespace-nowrap">Edit</span>
                  </div>
                </Menus.MenuButton>

                <Modal.Open id="deleteProduct">
                  <Menus.MenuButton type="button">
                    <div className="flex gap-1 items-center">
                      <HiOutlineTrash className="w-4 h-4" />
                      <span className=" whitespace-nowrap">Delete</span>
                    </div>
                  </Menus.MenuButton>
                </Modal.Open>
              </Menus.MenuList>

              <Modal.Window id="deleteProduct">
                <ConfirmDeleteWindow
                  deleteHandler={handleDeleteProduct}
                  name="Product"
                  isLoading={isDeleting}
                />
              </Modal.Window>
            </div>
          </Modal>
        ) : (
          <>
            <div className="absolute top-4 left-0 -rotate-[30deg]">
              <BadgeDeleted />
            </div>
            <div className="absolute top-4 right-4">
              <Button
                style="flex items-center gap-2 py-2 px-3"
                color="bg-primary hover:opacity-85"
                textColor="text-primary_2"
                onClick={handleRestoreProduct}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="text-sm">Restoring...</span>
                ) : (
                  <>
                    <HiOutlineArrowUturnRight className="w-5 h-5" />
                    <span className="text-sm mr-1">Restore</span>
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </Table.TableRow>
    </li>
  );
}

export default ProductCard;
