import { useParams } from "react-router-dom";
import { OrderParams } from "../../types/OrdersTypes";
import Heading from "../../ui/Heading";
import OrderStatus from "./OrderStatus";
import Box from "../../ui/Box";
import { useGetOrderData } from "./useGetOrderData";
import Loader from "../../ui/Loader";
import OrderedProductsList from "./OrderedProductsList";
import LinkButton from "../../ui/LinkButton";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import CustomerInfo from "./CustomerInfo";
import OrderSummaryDetails from "./OrderSummaryDetails";

function OrderDetails() {
  const { orderId } = useParams<OrderParams>();
  const { data: order, isPending: isLoadingOrder } = useGetOrderData(
    Number(orderId)
  );

  if (isLoadingOrder || !order) return <Loader />;

  return (
    <div>
      <div className="flex items-start justify-between max-sm:flex-col">
        <Heading name="Order Details" size="small" />

        {/* page links */}
        <div className="flex items-center gap-4 max-sm:self-end mb-6 max-xs:flex-col">
          <LinkButton
            to="/orders"
            style="px-3 py-1 rounded-md border border-primary_2 hover:bg-ternary flex items-center gap-2 max-sm:text-sm"
          >
            <HiOutlineArrowLongLeft className="w-5 h-5 text-primary_2" />
            <span className="text-primary_2">Back to Orders</span>
          </LinkButton>

          <LinkButton
            to={`/orders/order/edit/${orderId}`}
            style="px-3 py-1 rounded-md border border-secondary bg-secondary text-primary hover:bg-secondary_2 flex items-center gap-2 max-sm:text-sm"
          >
            <HiOutlinePencilSquare className="w-5 h-5" />
            <span>Edit Order</span>
          </LinkButton>
        </div>
      </div>

      {/* orderId,staus,paid status */}
      <Box margin="mb-5">
        <p>
          Order No :{" "}
          <span className="bg-secondary text-primary px-2 py-1 rounded-sm">
            #{orderId}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <OrderStatus status={order.status} />
          <div
            className={`flex items-center justify-center px-4 py-0.5 text-primary_2 rounded-md text-sm w-fit h-fit ${
              order.isPaid ? "bg-green-400" : "bg-red-500"
            }`}
          >
            {order.isPaid ? "Paid" : "Not Paid"}
          </div>
        </div>
      </Box>

      {/* Order Info and Summary */}
      <div className="grid grid-cols-2 gap-5 mb-5 max-md:grid-cols-1">
        <CustomerInfo order={order} />
        <OrderSummaryDetails order={order} />
      </div>

      {/* Ordered Products */}
      <Box>
        <Heading name="Ordered Products" size="tiny" marginBottom="mb-2" />

        {/* ordered products list */}
        {order.status !== "canceled" ? (
          <OrderedProductsList mode="display" order={order} />
        ) : (
          <div className="py-4 mb-2">
            <p className="text-primary_2 text-lg font-semibold text-center text-red-500">
              Ordered Products have been Deleted as Order is Canceled ❗
            </p>
          </div>
        )}
      </Box>
    </div>
  );
}

export default OrderDetails;
