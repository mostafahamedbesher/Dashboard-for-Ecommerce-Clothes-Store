import { useParams } from "react-router-dom";
import FormProductEdit from "./FormProductEdit";
import Loader from "../../ui/Loader";
import Heading from "../../ui/Heading";
import Tabs from "../../ui/Tabs";
import FormVariantsEdit from "./FormVariantsEdit";
import Modal from "../../ui/Modal";
import { useGetProductData } from "./useGetProductData";
import { useGetProductVariants } from "./useGetProductVariants";
import { getUniqueItems } from "../../utils/helpers";
import ErrorMessage from "../../ui/ErrorMessage";

type ProductParams = {
  productId: string;
};

function ProductEdit() {
  // get productId param from url to use it to query product data(in editing)
  const { productId } = useParams<ProductParams>();

  const isEditSession = Boolean(productId);

  // get product data
  const {
    data: productData,
    isPending: isLoadingProduct,
    error: productError,
  } = useGetProductData(Number(productId));

  // get all colors from (productvariants table)
  const {
    data: variants,
    isPending: isLoadingVariants,
    error: productVariantsError,
  } = useGetProductVariants(Number(productId));
  // unique colors(removing duplicates)
  const colors = variants?.map((v) => v.color) || [];
  const uniqueColors = getUniqueItems(colors);

  if (productError?.message || productVariantsError?.message) {
    return (
      <ErrorMessage
        errorMsg={productError?.message || productVariantsError?.message || ""}
      />
    );
  }

  return (
    <div>
      <Heading
        name={`${isEditSession ? "Edit" : "Create"} Page`}
        size="small"
      />
      {isLoadingProduct || isLoadingVariants ? (
        <Loader />
      ) : (
        <Tabs defaultTab="mainProduct">
          <Tabs.TabsList>
            <Tabs.Tab
              id="mainProduct"
              textColor="text-primary_2"
              activeBgcolor="bg-secondary"
              activeTextColor="text-primary_4"
            >
              General Product Management
            </Tabs.Tab>
            <Tabs.Tab id="variants" textColor="text-primary_2">
              Variants Management
            </Tabs.Tab>
          </Tabs.TabsList>

          <Tabs.TabContent id="mainProduct">
            <FormProductEdit
              productData={productData}
              isEditSession={isEditSession}
            />
          </Tabs.TabContent>
          <Tabs.TabContent id="variants">
            <Modal>
              {isEditSession ? (
                <FormVariantsEdit
                  productData={productData}
                  colors={uniqueColors}
                />
              ) : (
                <div className="text-red-500 text-lg mt-20 text-center bg-ternary p-10 rounded-md">
                  Create Main Product First!
                </div>
              )}
            </Modal>
          </Tabs.TabContent>
        </Tabs>
      )}
    </div>
  );
}

export default ProductEdit;
