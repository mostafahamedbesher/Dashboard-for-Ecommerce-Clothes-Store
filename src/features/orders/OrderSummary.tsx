import { useParams } from "react-router-dom";
import { OrderParams } from "../../types/OrdersTypes";
import FormShippingEdit from "./FormShippingEdit";
import { useGetOrderData } from "./useGetOrderData";
import Loader from "../../ui/Loader";

function OrderSummary() {
  const { orderId } = useParams<OrderParams>();
  const { data: orderData, isPending: isLoadingOrder } = useGetOrderData(
    Number(orderId)
  );

  if (isLoadingOrder || !orderData) return <Loader />;

  return (
    <div className="space-y-5 text-primary_2">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p className="font-semibold">{`$${(
          orderData.totalPrice - orderData.shippingPrice
        ).toFixed(2)}`}</p>
      </div>

      <div className="flex items-center justify-between">
        <p>Shipping</p>
        <FormShippingEdit
          shippingPrice={orderData.shippingPrice}
          orderId={orderData.id}
          totalPrice={orderData.totalPrice}
          orderStatus={orderData.status}
        />
      </div>

      <div className="h-[1px] bg-gray-300"></div>

      <div className="flex items-center justify-between">
        <p>Total</p>
        <p className="font-semibold">${orderData.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default OrderSummary;
