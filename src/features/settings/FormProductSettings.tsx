import { FormProvider, useForm } from "react-hook-form";
import { SettingsFormValues } from "../../types/SettingsTypes";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import { useSettingsData } from "../../contexts/SettingsDataContext";
import Button from "../../ui/Button";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateSettings } from "./useUpdateSettings";

const outofstockProductsOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const productsTagsOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

function FormProductSettings() {
  const context = useSettingsData();

  const settingsData = context?.settingsData;

  const formMethods = useForm<SettingsFormValues>({
    defaultValues: {
      lowStockQuantity: settingsData?.lowStockQuantity,
      enableProductsTags: settingsData?.enableProductsTags,
      showOutofStockProducts: settingsData?.showOutofStockProducts,
    },
  });

  const { formState, handleSubmit } = formMethods;
  const { errors } = formState;

  const { mutate: updateSettings, isPending: isUpdatingSettings } =
    useUpdateSettings();

  function handleFormSubmit(submitData: SettingsFormValues) {
    updateSettings(submitData);
  }

  if (!context) return null;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-primary_2 space-y-4"
      >
        {/* lowStockQuantity */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Low Stock Quantity"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-24 max-lg:w-full"
              type="number"
              name="lowStockQuantity"
              id="lowStock-quantity"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "Low Stock Quantity is required",
                min: {
                  value: 0,
                  message: "Low Stock Quantity must be at least 0",
                },
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.lowStockQuantity && (
              <ErrorForm>{errors.lowStockQuantity.message}</ErrorForm>
            )}
          </div>
        </div>

        {/* products tags */}
        <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
          <SelectInput
            labelText="Enable Products Tags"
            id="products-tags"
            name="enableProductsTags"
            labelWidth="w-60"
            options={productsTagsOptions}
            disabled={isUpdatingSettings}
          />
        </div>

        {/* Order Cancellation */}
        <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
          <SelectInput
            labelText="Show Out-of-Stock Products"
            id="outOfStock-products"
            name="showOutofStockProducts"
            labelWidth="w-60"
            options={outofstockProductsOptions}
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

export default FormProductSettings;
