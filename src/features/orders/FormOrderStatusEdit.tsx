import { FormProvider, useForm } from "react-hook-form";
import {
  OrderStatusFormValues,
  OrderStatusType,
} from "../../types/OrdersTypes";
import SelectInput from "../../ui/SelectInput";
import Button from "../../ui/Button";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";

interface FormOrderStatusEditProps {
  status: OrderStatusType;
  isPaid: boolean;
  orderId: number;
}

const statusOptions = [
  { label: "pending", value: "pending" },
  { label: "shipped", value: "shipped" },
  { label: "canceled", value: "canceled" },
  { label: "delivered", value: "delivered" },
];

const paymentStatusOptions = [
  { label: "Paid", value: "paid" },
  { label: "Not Paid", value: "notPaid" },
];

function FormOrderStatusEdit({
  status,
  isPaid,
  orderId,
}: FormOrderStatusEditProps) {
  const formMethods = useForm<OrderStatusFormValues>({
    defaultValues: {
      status: status,
      paymentStatus: isPaid ? "paid" : "notPaid",
    },
  });

  const { handleSubmit } = formMethods;

  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateOrderStatus(orderId);

  function handleFormSubmit(data: OrderStatusFormValues) {
    const isPaid = data.paymentStatus === "paid" ? true : false;
    updateStatus({ orderId, orderStatus: data.status, isPaid });

    // when canceling order --> i should add ordered items variants quantities back
    // if(data.status === "canceled"){

    // }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-between gap-8 flex-grow"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <SelectInput
              labelText="Status"
              id="order-status"
              name="status"
              options={statusOptions}
              disabled={isUpdatingStatus}
            />
          </div>

          <div className="flex flex-col gap-1">
            <SelectInput
              labelText="Payment Status"
              id="payment-status"
              name="paymentStatus"
              options={paymentStatusOptions}
              disabled={isUpdatingStatus}
            />
          </div>
        </div>

        <div className="ml-auto">
          <Button type="submit" disabled={isUpdatingStatus}>
            {isUpdatingStatus ? "updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormOrderStatusEdit;
