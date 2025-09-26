import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateOrderInfo } from "./useUpdateOrderInfo";
import { OrderStatusType } from "../../types/OrdersTypes";

interface FormShippingEditProps {
  shippingPrice: number;
  totalPrice: number;
  orderId: number;
  orderStatus: OrderStatusType;
}

function FormShippingEdit({
  shippingPrice,
  totalPrice,
  orderId,
  orderStatus,
}: FormShippingEditProps) {
  const formMethods = useForm({
    defaultValues: { shippingPrice: shippingPrice },
  });
  const { getValues, formState } = formMethods;
  const { errors } = formState;

  const { mutate: updateOrder, isPending: isUpdatingOrder } =
    useUpdateOrderInfo(orderId);

  async function handleShippingEdit() {
    const fieldName = "shippingPrice";
    const isValid = await formMethods.trigger(fieldName);

    if (!isValid) return;

    // get new shipping price
    const newShippingPrice = Number(getValues("shippingPrice"));
    const newTotalPrice = totalPrice - shippingPrice + newShippingPrice;

    // update shippingPrice,TotalPrice
    updateOrder({
      orderId,
      orderInfo: {
        shippingPrice: newShippingPrice,
        totalPrice: newTotalPrice,
      },
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form className="w-24">
        <Input
          type="number"
          labelText=""
          id=""
          name="shippingPrice"
          onBlur={handleShippingEdit}
          disabled={isUpdatingOrder || orderStatus === "canceled"}
          validation={{
            min: {
              value: 0,
              message: "Shipping Price must be at least 0",
            },
          }}
        />

        {errors.shippingPrice && (
          <ErrorForm>{errors.shippingPrice.message}</ErrorForm>
        )}
      </form>
    </FormProvider>
  );
}

export default FormShippingEdit;
