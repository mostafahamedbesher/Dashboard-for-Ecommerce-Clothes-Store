import { productType } from "../../types/ProductsTypes";
import Spinner from "../../ui/Spinner";
import { useGetAllProducts } from "../products/useGetAllProducts";
import { useGetAllVariants } from "../products/useGetAllVariants";
import { useGetAllSettings } from "../settings/useGetAllSettings";
import LowStockItem from "./LowStockItem";

function LowStockList() {
  const { data: variants, isPending: isLoadingVariants } = useGetAllVariants();
  const { data: settings, isPending: isLoadingSettings } = useGetAllSettings();
  const { data: products, isPending: isLoadingProducts } = useGetAllProducts();

  const filteredVariants = variants?.filter(
    (variant) => variant.stokeQuantity <= settings?.data.lowStockQuantity
  );

  if (
    isLoadingVariants ||
    isLoadingSettings ||
    isLoadingProducts ||
    !products?.data.length
  )
    return <Spinner spinnerColor="border border-primary_2" />;

  return (
    <ul className="space-y-4 h-[350px] overflow-y-scroll custom-scrollbar">
      {filteredVariants?.map((variant) => {
        const mainProduct: productType[] = products?.data.filter(
          (product) => product.id === variant.productId
        );

        return (
          <LowStockItem
            key={variant.id}
            variant={variant}
            title={mainProduct[0].title}
            mainProductId={mainProduct[0].id}
          />
        );
      })}
    </ul>
  );
}

export default LowStockList;
