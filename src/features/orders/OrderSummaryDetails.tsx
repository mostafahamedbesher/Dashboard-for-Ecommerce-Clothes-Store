import { OrderType } from "../../types/OrdersTypes";
import Box from "../../ui/Box";
import Heading from "../../ui/Heading";
import TextLabel from "../../ui/TextLabel";

interface OrderSummaryDetailsProps {
  order: OrderType;
}

function OrderSummaryDetails({ order }: OrderSummaryDetailsProps) {
  return (
    <Box>
      <Heading name="Order Summary" size="tiny" marginBottom="mb-2" />

      <div className="flex items-center justify-between">
        <TextLabel labelText="Sub Total" textColor="text-zinc-500" />
        <TextLabel labelText={`$${order.totalPrice.toFixed(2)}`} />
      </div>

      <div className="flex items-center justify-between">
        <TextLabel labelText="Shipping" textColor="text-zinc-500" />
        <TextLabel labelText={`$${order.shippingPrice.toFixed(2)}`} />
      </div>

      <div className="h-[1px] bg-gray-300"></div>

      <div className="flex items-center justify-between">
        <TextLabel labelText="Total" />
        <TextLabel
          labelText={`$${(order.shippingPrice + order.totalPrice).toFixed(2)}`}
        />
      </div>
    </Box>
  );
}

export default OrderSummaryDetails;
