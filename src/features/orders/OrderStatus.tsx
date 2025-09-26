import { OrderStatusType } from "../../types/OrdersTypes";

const statusColor = {
  pending: "bg-yellow-200 text-yellow-600",
  shipped: "bg-blue-200 text-blue-600",
  canceled: "bg-red-200 text-red-600",
  delivered: "bg-green-200 text-green-600",
};

interface OrderStatusProps {
  status: OrderStatusType;
}

function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div
      className={`flex items-center justify-center px-4 py-0.5 rounded-md text-sm w-fit h-fit ${statusColor[status]}`}
    >{`${status.at(0)?.toUpperCase()}${status.slice(1)}`}</div>
  );
}

export default OrderStatus;
