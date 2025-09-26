import { DisplayedOrdersProvider } from "../contexts/DisplayedOrdersContext";
import OrdersHeaderActionsBox from "../features/orders/OrdersHeaderActionsBox";

import OrdersTable from "../features/orders/OrdersTable";
import { useGetAllOrders } from "../features/orders/useGetAllOrders";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";

function Orders() {
  const { data, isPending: isLoadingOrders } = useGetAllOrders();

  if (!data || isLoadingOrders) return <Loader />;

  return (
    <DisplayedOrdersProvider>
      <Heading name="Orders" size="medium" />

      <OrdersHeaderActionsBox allOrders={data.data} />

      <OrdersTable />
    </DisplayedOrdersProvider>
  );
}

export default Orders;

// import { DisplayedOrdersProvider } from "../contexts/DisplayedOrdersContext";
// import OrdersHeaderActionsBox from "../features/orders/OrdersHeaderActionsBox";
// import OrdersList from "../features/orders/OrdersList";
// import { useGetAllOrders } from "../features/orders/useGetAllOrders";
// import Heading from "../ui/Heading";
// import Loader from "../ui/Loader";
// import Menus from "../ui/Menus";
// import Pagination from "../ui/Pagination";
// import Table from "../ui/Table";
// import { ordersNumItemsPerPage } from "../utils/constants";

// function Orders() {
//   const { data, isPending: isLoadingOrders } = useGetAllOrders();

//   if (!data || isLoadingOrders) return <Loader />;

//   return (
//     <DisplayedOrdersProvider>
//       <Heading name="Orders" size="medium" />

//       <OrdersHeaderActionsBox allOrders={data.data} />

//       <Table columns="0.75fr 1.5fr 1.5fr 1fr 1fr 1fr 0.75fr">
//         <Table.TableHeader>
//           <div>Order Id</div>
//           <div>Customer</div>
//           <div>Date</div>
//           <div>Total Price</div>
//           <div>Shipping</div>
//           <div>Status</div>
//           <div>Actions</div>
//         </Table.TableHeader>

//         <Menus>
//           <OrdersList />
//         </Menus>

//         <Table.TableFooter>
//           <Pagination
//             dataLength={data.data.length}
//             numItemsPerPage={ordersNumItemsPerPage}
//           />
//         </Table.TableFooter>
//       </Table>
//     </DisplayedOrdersProvider>
//   );
// }

// export default Orders;
