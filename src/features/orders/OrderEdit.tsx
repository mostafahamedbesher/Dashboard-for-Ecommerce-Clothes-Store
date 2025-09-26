import { useParams } from "react-router-dom";
import { OrderParams } from "../../types/OrdersTypes";
import Heading from "../../ui/Heading";
import Box from "../../ui/Box";
import { useGetOrderData } from "./useGetOrderData";
import Loader from "../../ui/Loader";
import FormOrderInfoEdit from "./FormOrderInfoEdit";
import FormOrderStatusEdit from "./FormOrderStatusEdit";
import OrderedProductsList from "./OrderedProductsList";
import OrderSummary from "./OrderSummary";
import LinkButton from "../../ui/LinkButton";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

function OrderEdit() {
  const { orderId } = useParams<OrderParams>();

  const { data: order, isPending: isLoadingOrder } = useGetOrderData(
    Number(orderId)
  );

  if (isLoadingOrder || !order) return <Loader />;

  return (
    <div>
      <div className="flex items-start justify-between max-xs:flex-col max-xs:mb-8">
        <div className="flex items-center gap-2 mb-8">
          <Heading name="Edit Order" size="small" marginBottom="mb-0" />
          <span className="bg-secondary text-lg px-1 py-[1px] text-primary rounded-sm">{`#${orderId}`}</span>
        </div>

        <LinkButton
          to="/orders"
          style="px-3 py-1 rounded-md border border-primary_2 hover:bg-ternary flex items-center gap-2 max-xs:self-end"
        >
          <HiOutlineArrowLongLeft className="w-5 h-5 text-primary_2" />
          <span className="text-primary_2">Back to Orders</span>
        </LinkButton>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6 max-md:grid-cols-1">
        <Box>
          <Heading
            name="Customer Information"
            size="tiny"
            marginBottom="mb-2"
          />

          <FormOrderInfoEdit order={order} />
        </Box>

        <Box>
          <Heading name="Order Status" size="tiny" marginBottom="mb-2" />

          <FormOrderStatusEdit
            status={order.status}
            isPaid={order.isPaid}
            orderId={order.id}
          />
        </Box>
      </div>

      <Box margin="mb-6">
        <Heading name="Ordered Products" size="tiny" marginBottom="mb-2" />

        {order.status !== "canceled" ? (
          <OrderedProductsList mode="edit" order={order} />
        ) : (
          <div className="py-4 mb-2">
            <p className="text-primary_2 text-lg font-semibold text-center text-red-500">
              Ordered Products have been Deleted as Order is Canceled ❗
            </p>
          </div>
        )}
      </Box>

      <Box>
        <Heading name="Order Summary" size="tiny" marginBottom="mb-2" />
        <OrderSummary />
      </Box>
    </div>
  );
}

export default OrderEdit;
