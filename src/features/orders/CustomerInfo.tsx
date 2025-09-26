import { OrderType } from "../../types/OrdersTypes";
import Box from "../../ui/Box";
import Heading from "../../ui/Heading";
import TextLabel from "../../ui/TextLabel";

interface CustomerInfoProps {
  order: OrderType;
}

function CustomerInfo({ order }: CustomerInfoProps) {
  return (
    <Box>
      <Heading name="Customer Information" size="tiny" marginBottom="mb-2" />

      <div>
        <TextLabel labelText="Name" textColor="text-zinc-500" />
        <TextLabel labelText={`${order.firstName} ${order.lastName}`} />
      </div>

      <div>
        <TextLabel labelText="Phone" textColor="text-zinc-500" />
        <TextLabel labelText={String(order.phoneNumber)} />
      </div>

      <div>
        <TextLabel labelText="Shipping Address" textColor="text-zinc-500" />
        <TextLabel
          labelText={`${order.country},${order.city},${order.address}`}
        />
      </div>

      <div>
        <TextLabel labelText="Postal Code" textColor="text-zinc-500" />
        <TextLabel labelText={String(order.postalCode)} />
      </div>
    </Box>
  );
}

export default CustomerInfo;
