import { useDisplayedOrders } from "../../contexts/DisplayedOrdersContext";
import { usePagination } from "../../hooks/usePagination";
import { ordersNumItemsPerPage } from "../../utils/constants";
import OrderItemRow from "./OrderItemRow";

function OrdersList() {
  const context = useDisplayedOrders();
  const { startIndex, endIndex } = usePagination("page", ordersNumItemsPerPage);

  return (
    <ul>
      {context?.displayedOrders?.length ? (
        context?.displayedOrders
          ?.slice(startIndex, endIndex)
          ?.map((order) => <OrderItemRow key={order.id} order={order} />)
      ) : (
        <div className="text-center text-xl text-primary_2 my-10 font-semibold">
          Orders Not Found
        </div>
      )}
    </ul>
  );
}

export default OrdersList;
