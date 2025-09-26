import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { SettingsFormValues } from "../../types/SettingsTypes";
import SelectInput from "../../ui/SelectInput";
import { useSettingsData } from "../../contexts/SettingsDataContext";
import Button from "../../ui/Button";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateSettings } from "./useUpdateSettings";

const orderCancelOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const codOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

function FormOrdersSettings() {
  const context = useSettingsData();

  const settingsData = context?.settingsData;

  const formMethods = useForm<SettingsFormValues>({
    defaultValues: {
      minOrderPrice: settingsData?.minOrderPrice,
      maxOrderPrice: settingsData?.maxOrderPrice,
      orderCancel: settingsData?.orderCancel,
      cashonDelivery: settingsData?.cashonDelivery,
    },
  });

  const { formState, handleSubmit, getValues } = formMethods;
  const { errors } = formState;

  const { mutate: updateSettings, isPending: isUpdatingSettings } =
    useUpdateSettings();

  function handleFormSubmit(submitData: SettingsFormValues) {
    updateSettings(submitData);
  }

  if (!context || !settingsData) return null;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-primary_2 flex flex-col gap-4"
      >
        {/* MinOrderPrice */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Min order Price"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-24 max-lg:w-full"
              type="number"
              name="minOrderPrice"
              id="min-order-price"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "min order price is required",
                min: {
                  value: 0,
                  message: "min order price must be at least 0 $",
                },
                validate: (value) =>
                  Number(value) <= Number(getValues().maxOrderPrice) ||
                  `min order price must be less than or equal ${
                    getValues().maxOrderPrice
                  } $`,
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.minOrderPrice && (
              <ErrorForm>{errors.minOrderPrice.message}</ErrorForm>
            )}
          </div>
        </div>

        {/* MaxOrderPrice */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Max order Price"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-24 max-lg:w-full"
              type="number"
              name="maxOrderPrice"
              id="max-order-price"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "max order price is required",
                min: {
                  value: 0,
                  message: "max order price must be at least 0 $",
                },
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.maxOrderPrice && (
              <ErrorForm>{errors.maxOrderPrice.message}</ErrorForm>
            )}
          </div>
        </div>

        {/* Order Cancellation */}
        <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
          <SelectInput
            labelText="Allow Order Cancel"
            id="order-cancel"
            name="orderCancel"
            labelWidth="w-60"
            options={orderCancelOptions}
            disabled={isUpdatingSettings}
          />
        </div>

        {/* Allow Cash on Delivery */}
        <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
          <SelectInput
            labelText="Allow Cash on Delivery"
            id="cod"
            name="cashonDelivery"
            labelWidth="w-60"
            options={codOptions}
            disabled={isUpdatingSettings}
          />
        </div>

        <div className="w-fit mt-2 ml-auto">
          <Button type="submit" disabled={isUpdatingSettings}>
            {isUpdatingSettings ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormOrdersSettings;
