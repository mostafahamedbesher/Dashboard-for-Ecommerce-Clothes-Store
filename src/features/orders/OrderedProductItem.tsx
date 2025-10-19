import {
  OrderItemType,
  OrderStatusType,
  QuantityMode,
} from "../../types/OrdersTypes";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import TextLabel from "../../ui/TextLabel";
import { useGetProductImages } from "../products/useGetProductImages";
import FormQuantityEdit from "./FormQuantityEdit";
import { useGetOrderItemsVariant } from "./useGetOrderItemVariant";

interface OrderedProductItemProps {
  orderItem: OrderItemType;
  mode: QuantityMode;
  status: OrderStatusType;
  orderPrice: number;
  orderId: number;
}

function OrderedProductItem({
  orderItem,
  mode,
  status,
  orderPrice,
  orderId,
}: OrderedProductItemProps) {
  ///// get ordered product variant image /////
  const { data: orderItemVariant, isPending: isLoadingOrderVariant } =
    useGetOrderItemsVariant(orderItem?.productId);

  const { data: productImages, isPending: isLoadingImages } =
    useGetProductImages(orderItemVariant?.productId);

  const image = productImages
    ?.filter((imgData) => imgData.color === orderItem.color)
    ?.at(0)
    .images?.at(0);

  if (isLoadingOrderVariant || isLoadingImages || !orderItem || !productImages)
    return <SpinnerMini spinnerColor="border-primary_2" />;

  return (
    <li className="text-primary_2">
      <Table.TableRow>
        {/* product image */}
        <div className="grid grid-cols-[1fr_3fr] items-center justify-start">
          <img
            src={image}
            alt="orderItem Img"
            className="w-16 h-16 rounded-sm"
          />
          <p className="text-primary_2 text-sm">{orderItem.title}</p>
        </div>

        {/* variant */}
        <div>
          <div className="flex items-center gap-1">
            <TextLabel labelText="Size" />
            <span className="text-sm">{`: ${orderItem.size.toUpperCase()}`}</span>
          </div>

          <div className="flex items-center gap-1">
            <TextLabel labelText="Color" textColor="text-zinc-500" />
            <span className="text-zinc-500 text-sm">{`: ${orderItem.color}`}</span>
          </div>
        </div>

        {/* price of 1 unit */}
        <TextLabel
          labelText={`$${String(
            (orderItem.price / orderItem.quantity).toFixed(2)
          )}`}
        />

        {/* quantity */}
        {mode === "edit" && status === "pending" ? (
          <FormQuantityEdit
            orderItem={orderItem}
            orderPrice={orderPrice}
            orderId={orderId}
          />
        ) : (
          <TextLabel labelText={String(orderItem.quantity)} />
        )}

        {/* total price */}
        <TextLabel labelText={`$${String(orderItem.price.toFixed(2))}`} />
      </Table.TableRow>
    </li>
  );
}

export default OrderedProductItem;
