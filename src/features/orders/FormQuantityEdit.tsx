import { FormProvider, useForm } from "react-hook-form";
import { OrderItemType } from "../../types/OrdersTypes";
import Input from "../../ui/Input";
import { useUpdateOrderPrice } from "./useUpdateOrderPrice";
import { useUpdateOrderItemQuantity } from "./useUpdateOrderItemQuantity";
import { useGetVariantData } from "./useGetVariantData";
import SpinnerMini from "../../ui/SpinnerMini";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateQuantity } from "../products/useUpdateQuantity";

interface FormQuantityEditProps {
  orderItem: OrderItemType;
  orderPrice: number;
  orderId: number;
}

function FormQuantityEdit({
  orderItem,
  orderPrice,
  orderId,
}: FormQuantityEditProps) {
  const formMethods = useForm({
    defaultValues: {
      [`quantityOrderItem-${orderItem.id}`]: orderItem.quantity,
    },
    mode: "onBlur",
  });

  const { getValues, formState } = formMethods;
  const { errors } = formState;

  const { mutate: updateOrderPrice, isPending: isUpdatingOrderPrice } =
    useUpdateOrderPrice(orderId);

  const { mutate: updateOrderItemQuantity, isPending: isUpdatingQuantity } =
    useUpdateOrderItemQuantity(orderId);

  const { data: variantData, isPending: isLoadingVariant } = useGetVariantData(
    orderItem.productId
  );

  const { mutate: updateStockQuantity, isPending: isUpdatingStockQuantity } =
    useUpdateQuantity(variantData?.id ?? -1);

  // onBlur Handler
  async function handleEditQuantity() {
    const fieldName = `quantityOrderItem-${orderItem.id}`;
    const isValid = await formMethods.trigger(fieldName);

    if (!isValid) return;

    const oldItemPrice = orderItem.price;
    // get quantity value
    const newQuantity = Number(getValues(fieldName));
    // calculate new item price
    const newItemPrice = newQuantity * (oldItemPrice / orderItem.quantity);
    // update quantity,totalPrice (in orderItems table)
    updateOrderItemQuantity({
      orderItemId: orderItem.id,
      quantity: newQuantity,
      newPrice: newItemPrice,
    });
    // update variant stock quantity
    const quantityDifference = orderItem.quantity - newQuantity;
    if (variantData) {
      updateStockQuantity({
        id: variantData.id,
        quantity: variantData.stokeQuantity + quantityDifference,
      });
    }
    // update order price (in orders Table)
    // ---- orderprice - (old item price) + (new item price) ----
    const newOrderPrice = orderPrice - oldItemPrice + newItemPrice;
    updateOrderPrice({ orderId, orderPrice: newOrderPrice });
  }

  if (isLoadingVariant || !variantData)
    return <SpinnerMini spinnerColor="border-black" />;

  return (
    <FormProvider {...formMethods}>
      <form
        className={`${
          errors[`quantityOrderItem-${orderItem.id}`] ? "w-full" : "w-1/2"
        }`}
      >
        <div
          className={`${
            errors[`quantityOrderItem-${orderItem.id}`] ? "w-1/2" : "w-full"
          }`}
        >
          <Input
            type="number"
            labelText=""
            id=""
            name={`quantityOrderItem-${orderItem.id}`}
            onBlur={handleEditQuantity}
            disabled={
              isUpdatingOrderPrice ||
              isUpdatingQuantity ||
              isUpdatingStockQuantity
            }
            validation={{
              min: {
                value: 1,
                message: "Item Quantity must be at least 1",
              },
              max: {
                value: orderItem.quantity + variantData.stokeQuantity,
                message: `Item Quantity must be less than or equal available stock quantity(${
                  variantData.stokeQuantity + orderItem.quantity
                })`,
              },
            }}
          />
        </div>

        {errors[`quantityOrderItem-${orderItem.id}`] && (
          <ErrorForm>
            {errors[`quantityOrderItem-${orderItem.id}`]?.message}
          </ErrorForm>
        )}
      </form>
    </FormProvider>
  );
}

export default FormQuantityEdit;
