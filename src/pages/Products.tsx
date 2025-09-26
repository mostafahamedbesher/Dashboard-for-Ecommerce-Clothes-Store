import Heading from "../ui/Heading";

import ProductsHeaderActionsBox from "../features/products/ProductsHeaderActionsBox";

import { DisplayedProductsProvider } from "../contexts/DisplayedProductsContext";
import { useGetAllProducts } from "../features/products/useGetAllProducts";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";

import ProductsTable from "../features/products/ProductsTable";

function Products() {
  const { data, isPending: isLoadingProducts, error } = useGetAllProducts();
  const allProducts = data?.data ?? [];

  if (isLoadingProducts) return <Loader />;

  if (error?.message) return <ErrorMessage errorMsg={error.message} />;

  return (
    <DisplayedProductsProvider>
      <div>
        <Heading name="Products" size="medium" />

        <ProductsHeaderActionsBox
          btnName="+Add New Product"
          allProducts={allProducts}
        />

        <ProductsTable />
      </div>
    </DisplayedProductsProvider>
  );
}

export default Products;

// import ProductsList from "../features/products/ProductsList";
// import Heading from "../ui/Heading";
// import Menus from "../ui/Menus";
// import ProductsHeaderActionsBox from "../features/products/ProductsHeaderActionsBox";
// import Table from "../ui/Table";
// import { DisplayedProductsProvider } from "../contexts/DisplayedProductsContext";
// import { useGetAllProducts } from "../features/products/useGetAllProducts";
// import Loader from "../ui/Loader";
// import ErrorMessage from "../ui/ErrorMessage";
// import Pagination from "../ui/Pagination";
// import { productsNumItemsPerPage } from "../utils/constants";

// function Products() {
//   const { data, isPending: isLoadingProducts, error } = useGetAllProducts();
//   const allProducts = data?.data ?? [];

//   if (isLoadingProducts) return <Loader />;

//   if (error?.message) return <ErrorMessage errorMsg={error.message} />;

//   return (
//     <DisplayedProductsProvider>
//       <div>
//         <Heading name="Products" size="medium" />

//         <ProductsHeaderActionsBox
//           btnName="+Add New Product"
//           allProducts={allProducts}
//         />

//         <Table columns="0.8fr 1.3fr 0.6fr 0.6fr 1.5fr 1fr 0.75fr 0.75fr 0.5fr">
//           <Table.TableHeader>
//             <div>Image</div>
//             <div>Title</div>
//             <div>Price</div>
//             <div>Discount</div>
//             <div>Sizes</div>
//             <div>Colors</div>
//             <div>Quantity</div>
//             <div>Ratings</div>
//             <div>Actions</div>
//           </Table.TableHeader>

//           <Menus>
//             <ProductsList />
//           </Menus>

//           <Table.TableFooter>
//             <Pagination
//               dataLength={allProducts.length}
//               numItemsPerPage={productsNumItemsPerPage}
//             />
//           </Table.TableFooter>
//         </Table>
//       </div>
//     </DisplayedProductsProvider>
//   );
// }

// export default Products;
