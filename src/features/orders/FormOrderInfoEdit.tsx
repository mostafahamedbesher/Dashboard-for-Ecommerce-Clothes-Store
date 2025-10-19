import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { OrderInfoFormValues, OrderType } from "../../types/OrdersTypes";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateOrderInfo } from "./useUpdateOrderInfo";

interface FormOrderInfoEditProps {
  order: OrderType;
}

function FormOrderInfoEdit({ order }: FormOrderInfoEditProps) {
  const formMethods = useForm<OrderInfoFormValues>({
    defaultValues: {
      customerFirstName: order.firstName,
      customerLastName: order.lastName,
      phone: order.phoneNumber,
      orderDate: new Date(order.created_at).toLocaleDateString(),
      address: order.address,
    },
    shouldUnregister: true,
  });

  const { handleSubmit, formState } = formMethods;
  const { errors } = formState;

  const { mutate: updateOrderInfo, isPending: isUpdatingOrderInfo } =
    useUpdateOrderInfo(order.id);

  function handleFormSubmit(data: OrderInfoFormValues) {
    console.log(data);
    updateOrderInfo({
      orderId: order.id,
      orderInfo: {
        firstName: data.customerFirstName,
        lastName: data.customerLastName,
        phoneNumber: data.phone,
        address: data.address,
      },
    });
  }

  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1">
            <Input
              labelText="First Name"
              type="text"
              name="customerFirstName"
              id="customer-first-name"
              disabled={isUpdatingOrderInfo}
              validation={{
                required: "Customer First Name is required",
                minLength: {
                  value: 2,
                  message: "Customer First Name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message:
                    "Customer First Name must be less than 100 characters",
                },
                pattern: {
                  value: /^[A-Za-z].*$/,
                  message: "First Name must start with a letter",
                },
              }}
            />

            {errors.customerFirstName && (
              <ErrorForm>{errors.customerFirstName.message}</ErrorForm>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              labelText="Last Name"
              type="text"
              name="customerLastName"
              id="customer-last-name"
              disabled={isUpdatingOrderInfo}
              validation={{
                required: "Customer Last Name is required",
                minLength: {
                  value: 2,
                  message: "Customer Last Name must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message:
                    "Customer Last Name must be less than 100 characters",
                },
                pattern: {
                  value: /^[A-Za-z].*$/,
                  message: "Last Name must start with a letter",
                },
              }}
            />

            {errors.customerLastName && (
              <ErrorForm>{errors.customerLastName.message}</ErrorForm>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              labelText="Phone"
              type="text"
              name="phone"
              id="phone"
              disabled={isUpdatingOrderInfo}
              validation={{
                required: "Phone Number is required",
                pattern: {
                  value: phoneRegex,
                  message: "Invalid phone number format",
                },
              }}
            />

            {errors.phone && <ErrorForm>{errors.phone.message}</ErrorForm>}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              labelText="Order Date"
              type="text"
              name="orderDate"
              id="order-date"
              disabled={true}
              readonly={true}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Textarea
            labelText="Address"
            name="address"
            id="address"
            height="h-20"
            disabled={isUpdatingOrderInfo}
            validation={{
              required: "Customer Address is required",
              minLength: {
                value: 3,
                message: "Customer Address must be at least 3 characters",
              },
              maxLength: {
                value: 200,
                message: "Customer Address must be less than 200 characters",
              },
            }}
          />

          {errors.address && <ErrorForm>{errors.address.message}</ErrorForm>}
        </div>

        <div className="ml-auto">
          <Button type="submit" disabled={isUpdatingOrderInfo}>
            {isUpdatingOrderInfo ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormOrderInfoEdit;
