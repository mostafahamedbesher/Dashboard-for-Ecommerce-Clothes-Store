import { useDisplayedProducts } from "../../contexts/DisplayedProductsContext";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import { productsNumItemsPerPage } from "../../utils/constants";
import ProductsList from "./ProductsList";

function ProductsTable() {
  const context = useDisplayedProducts();

  if (!context || !context.displayedProducts) return null;

  return (
    <div className="overflow-x-auto">
      <Table columns="0.8fr 1.3fr 0.6fr 0.6fr 1.5fr 1fr 0.75fr 0.75fr 0.5fr">
        <Table.TableHeader>
          <div>Image</div>
          <div>Title</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Sizes</div>
          <div>Colors</div>
          <div>Quantity</div>
          <div>Ratings</div>
          <div>Actions</div>
        </Table.TableHeader>

        <Menus>
          <ProductsList />
        </Menus>

        {context.displayedProducts.length > 0 &&
          context.displayedProducts.length > productsNumItemsPerPage && (
            <Table.TableFooter>
              <Pagination
                dataLength={context.displayedProducts.length}
                numItemsPerPage={productsNumItemsPerPage}
              />
            </Table.TableFooter>
          )}
      </Table>
    </div>
  );
}

export default ProductsTable;
