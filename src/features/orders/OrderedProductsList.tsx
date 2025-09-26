import { useParams } from "react-router-dom";
import { OrderParams, OrderType, QuantityMode } from "../../types/OrdersTypes";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import OrderedProductItem from "./OrderedProductItem";
import { useGetOrderItems } from "./useGetOrderItems";

interface OrderedProductsListProps {
  mode: QuantityMode;
  order: OrderType;
}

function OrderedProductsList({ mode, order }: OrderedProductsListProps) {
  const { orderId } = useParams<OrderParams>();
  const { data: orderItems, isPending: isLoadingOrderItems } = useGetOrderItems(
    Number(orderId)
  );

  if (isLoadingOrderItems || !orderItems) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <Table columns="2fr 1fr 1fr 1fr 0.5fr">
        <Table.TableHeader bgColor="bg-primary">
          <div>Product</div>
          <div>Variant</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
        </Table.TableHeader>

        <ul>
          {orderItems.map((orderItem) => (
            <OrderedProductItem
              orderItem={orderItem}
              key={orderItem.id}
              mode={mode}
              status={order.status}
              orderPrice={order.totalPrice}
              orderId={order.id}
            />
          ))}
        </ul>
      </Table>
    </div>
  );
}

export default OrderedProductsList;
