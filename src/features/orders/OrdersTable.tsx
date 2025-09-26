import { useDisplayedOrders } from "../../contexts/DisplayedOrdersContext";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import { ordersNumItemsPerPage } from "../../utils/constants";
import OrdersList from "./OrdersList";

function OrdersTable() {
  const context = useDisplayedOrders();

  if (!context || !context.displayedOrders) return null;

  return (
    <div className="overflow-x-auto">
      <Table columns="0.75fr 1.5fr 1.5fr 1fr 1fr 1fr 0.75fr">
        <Table.TableHeader>
          <div>Order Id</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Total Price</div>
          <div>Shipping</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.TableHeader>

        <Menus>
          <OrdersList />
        </Menus>

        {context.displayedOrders.length > 0 &&
          context.displayedOrders.length > ordersNumItemsPerPage && (
            <Table.TableFooter>
              <Pagination
                dataLength={context.displayedOrders.length}
                numItemsPerPage={ordersNumItemsPerPage}
              />
            </Table.TableFooter>
          )}
      </Table>
    </div>
  );
}

export default OrdersTable;
