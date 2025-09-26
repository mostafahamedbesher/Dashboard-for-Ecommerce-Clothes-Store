import { FormProvider, useForm } from "react-hook-form";
import { SettingsFormValues } from "../../types/SettingsTypes";
import Input from "../../ui/Input";
import { useSettingsData } from "../../contexts/SettingsDataContext";
import Button from "../../ui/Button";
import ErrorForm from "../../ui/ErrorForm";
import { useGetAllProducts } from "../products/useGetAllProducts";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateSettings } from "./useUpdateSettings";
import { emailPattern } from "../../utils/constants";

function FormStoreSettings() {
  const context = useSettingsData();

  const settingsData = context?.settingsData;
  const formMethods = useForm<SettingsFormValues>({
    defaultValues: {
      email: settingsData?.email,
      phoneNumber: settingsData?.phoneNumber,
      itemsPerPage: settingsData?.itemsPerPage,
    },
  });

  // calculate max products count to validate max number of items displayed per page
  const { data, isPending: isLoadingProducts } = useGetAllProducts();
  const productsCount = data?.data.length;

  const { formState, handleSubmit } = formMethods;
  const { errors } = formState;

  const { mutate: updateSettings, isPending: isUpdatingSettings } =
    useUpdateSettings();

  function handleFormSubmit(submitData: SettingsFormValues) {
    updateSettings(submitData);
  }

  if (!context || isLoadingProducts || !data)
    return <SpinnerMini spinnerColor="border border-black" />;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-primary_2 space-y-4"
      >
        {/* Contact Email */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-md:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Contact Email"
              type="text"
              name="email"
              id="contact-email"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "Contact Email is required",
                pattern: {
                  value: emailPattern,
                  message: "Invalid Email",
                },
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.email && <ErrorForm>{errors.email.message}</ErrorForm>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-md:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Phone Number"
              type="text"
              name="phoneNumber"
              id="phone-number"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "Phone Number is required",
                pattern: {
                  value: /^\+?[0-9\s\-().]{7,}$/,
                  message: "Invalid Phone Number",
                },
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.phoneNumber && (
              <ErrorForm>{errors.phoneNumber.message}</ErrorForm>
            )}
          </div>
        </div>

        {/* Number of Items per page */}
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-2 gap-4 w-1/2 max-lg:w-full max-md:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Number Items per Page"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-24 max-lg:w-full"
              type="number"
              name="itemsPerPage"
              id="num-items-per-page"
              labelWidth="w-60"
              disabled={isUpdatingSettings}
              validation={{
                required: "Number of Items per Page is required",
                min: {
                  value: 1,
                  message: "Number of Items per Page must be at least 1",
                },
                max: {
                  value: 20,
                  message:
                    "Number of Items per Page must be less than or equal 20",
                },
                validate: (value) =>
                  Number(productsCount) >= value ||
                  "items per page must be less than or equal total products count",
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.itemsPerPage && (
              <ErrorForm>{errors.itemsPerPage.message}</ErrorForm>
            )}
          </div>
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

export default FormStoreSettings;
