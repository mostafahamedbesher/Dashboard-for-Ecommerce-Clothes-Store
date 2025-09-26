import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { updateUserPasswordFormType } from "../../types/AuthTypes";
import ErrorForm from "../../ui/ErrorForm";
import Button from "../../ui/Button";
import { verifyOldPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useGetCurrentUser } from "./useGetCurrentUser";
import Loader from "../../ui/Loader";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";

function FormUpdateUserPassword() {
  const formMethods = useForm<updateUserPasswordFormType>();

  const { handleSubmit, formState, getValues, reset } = formMethods;
  const { errors } = formState;

  const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
  const { mutate: updateUserData, isPending: isUpdatingUser } = useUpdateUser();
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleFormSubmit(submitData: updateUserPasswordFormType) {
    // disable any mutations except for admin
    if (user?.email !== "mostafahamed241@gmail.com") return;

    if (!submitData.password || !user?.email) return;

    // Verify old password before updating
    setIsVerifying(true);
    const isCorrectPassword = await verifyOldPassword({
      email: user.email,
      password: submitData.passwordOld,
    });
    setIsVerifying(false);

    if (!isCorrectPassword) {
      toast.error("OLD password is incorrect");
      return;
    }

    // if old password is correct -- update password
    updateUserData({ password: submitData.password });

    // reset Form Inputs
    reset();
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
              labelText="Old Password"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="password"
              name="passwordOld"
              id="old-password"
              labelWidth="w-60"
              disabled={isUpdatingUser || isVerifying}
              validation={{
                required: "old password is required",
              }}
            />
          </div>

          <div className="max-lg:self-end">
            {errors.passwordOld && (
              <ErrorForm>{errors.passwordOld.message}</ErrorForm>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="New Password"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="password"
              name="password"
              id="password"
              labelWidth="w-60"
              disabled={isUpdatingUser || isVerifying}
              validation={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "New password must be at least 6 characters",
                },
              }}
            />
          </div>
          <div className="max-lg:self-end">
            {errors.password && (
              <ErrorForm>{errors.password.message}</ErrorForm>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Confirm New Password"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="password"
              name="confirmPassword"
              id="confirm-password"
              labelWidth="w-60"
              disabled={isUpdatingUser || isVerifying}
              validation={{
                required: "confirmed password is required",
                validate: (value) =>
                  value === getValues("password") || "Password not matched",
              }}
            />
          </div>
          <div className="max-lg:self-end">
            {errors.confirmPassword && (
              <ErrorForm>{errors.confirmPassword.message}</ErrorForm>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto w-fit mt-10">
          <Button
            onClick={() => reset()}
            color="bg-primary border border-primary_2 hover:bg-ternary"
            textColor="text-primary_2"
            disabled={isUpdatingUser || isVerifying}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isUpdatingUser || isVerifying}>
            {isUpdatingUser || isVerifying ? (
              <SpinnerMini spinnerColor="border-primary" marginY="my-0" />
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormUpdateUserPassword;
