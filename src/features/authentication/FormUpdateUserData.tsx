import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { updateUserDataFormType } from "../../types/AuthTypes";
import InputImage from "../products/InputImage";
import { useGetCurrentUser } from "./useGetCurrentUser";
import Loader from "../../ui/Loader";
import ErrorForm from "../../ui/ErrorForm";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function FormUpdateUserData() {
  const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
  const formMethods = useForm<updateUserDataFormType>({
    defaultValues: {
      email: user?.user_metadata.email,
      fullName: user?.user_metadata.fullName,
    },
  });

  const { handleSubmit, formState, reset, resetField } = formMethods;
  const { errors } = formState;

  const { mutate: updateUserData, isPending: isUpdatingUser } = useUpdateUser();

  function handleFormSubmit(submitData: updateUserDataFormType) {
    // disable any mutations except for admin
    if (user?.email !== "mostafahamed241@gmail.com") return;

    // protect email change
    if (submitData.email !== user?.user_metadata.email) return;

    console.log(submitData);
    updateUserData({
      fullName: submitData.fullName,
      avatar: submitData.avatar?.[0],
    });

    // reset form inputs
    resetField("avatar");
  }

  if (isLoadingUser) return <Loader />;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-ternary px-14 py-12 rounded-md flex flex-col gap-6 max-lg:px-10 max-sm:p-8 max-xs:p-4"
      >
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Email"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 "
              type="text"
              name="email"
              id="email"
              labelWidth="w-60"
              disabled={true}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Full Name"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="text"
              name="fullName"
              id="fullName"
              labelWidth="w-60"
              disabled={isUpdatingUser}
              validation={{
                required: "user full name is required",
                minLength: {
                  value: 2,
                  message: "full name must be at least 2 characters",
                },
              }}
            />
          </div>
          <div className="max-lg:self-end">
            {errors.fullName && (
              <ErrorForm>{errors.fullName.message}</ErrorForm>
            )}
          </div>
        </div>

        {/* avatar image */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1 ">
          <label htmlFor="images" className="text-primary_2 max-lg:w-60">
            Avatar Image
          </label>
          <InputImage
            name="avatar"
            label="Upload Avatar"
            // requiredMessage="avatar image is required"
            multiple={false}
            isUpdatingImages={isUpdatingUser}
          />
        </div>

        <div className="flex items-center gap-4 ml-auto w-fit mt-10">
          <Button
            onClick={() => reset()}
            color="bg-primary border border-primary_2 hover:bg-ternary"
            textColor="text-primary_2"
            disabled={isUpdatingUser}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isUpdatingUser}>
            {isUpdatingUser ? (
              <SpinnerMini spinnerColor="border-primary" marginY="my-0" />
            ) : (
              "Update User Data"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormUpdateUserData;
