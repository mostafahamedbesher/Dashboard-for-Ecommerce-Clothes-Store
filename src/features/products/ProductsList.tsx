import { useDisplayedProducts } from "../../contexts/DisplayedProductsContext";
import ProductCard from "./ProductCard";
import { usePagination } from "../../hooks/usePagination";
import { productsNumItemsPerPage } from "../../utils/constants";

function ProductsList() {
  const context = useDisplayedProducts();

  const { startIndex, endIndex } = usePagination(
    "page",
    productsNumItemsPerPage
  );

  return (
    <ul>
      {context?.displayedProducts?.length ? (
        context?.displayedProducts
          ?.slice(startIndex, endIndex)
          ?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))
      ) : (
        <div className="text-center text-xl text-primary_2 my-10 font-semibold">
          Products Not Found
        </div>
      )}
    </ul>
  );
}

export default ProductsList;
