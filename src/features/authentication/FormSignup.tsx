import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import ErrorForm from "../../ui/ErrorForm";
import { emailPattern } from "../../utils/constants";
import { userSignUpFormType } from "../../types/AuthTypes";
import Button from "../../ui/Button";
import SelectInput from "../../ui/SelectInput";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

const roleOptions = [
  { label: "Staff", value: "staff" },
  { label: "Admin", value: "admin" },
];

function FormSignup() {
  const formMethods = useForm<userSignUpFormType>();
  const { handleSubmit, formState, getValues } = formMethods;
  const { errors } = formState;

  const { mutate: signupUser, isPending: isSigningUp } = useSignup();

  function handleFormSubmit(submitData: userSignUpFormType) {
    const { fullName, email, password, role } = submitData;
    // admins only can register new staff users
    if (role === "admin") {
      signupUser({ fullName, email, password, role });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-ternary px-14 py-12 rounded-md flex flex-col gap-6 max-sm:p-8 max-xs:p-4"
      >
        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Full Name"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="text"
              name="fullName"
              id="fullName"
              labelWidth="w-60 max-lg:w-48"
              disabled={isSigningUp}
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

        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Email"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary "
              type="text"
              name="email"
              id="email"
              labelWidth="w-60 max-lg:w-48"
              disabled={isSigningUp}
              validation={{
                required: "email is required",
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

        <div className="flex items-start gap-2 max-lg:flex-col max-lg:gap-0">
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Password"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary"
              type="password"
              name="password"
              id="password"
              labelWidth="w-60 max-lg:w-48"
              disabled={isSigningUp}
              validation={{
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be at least 6 characters",
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
          <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-1">
            <Input
              labelText="Confirm Password"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary "
              type="password"
              name="confirmPassword"
              id="confirm-password"
              labelWidth="w-60 max-lg:w-48"
              disabled={isSigningUp}
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

        <div className="grid grid-cols-[1fr_1.5fr] gap-4 w-2/3 max-lg:w-full max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-1">
          <SelectInput
            labelText="User Role"
            id="role"
            name="role"
            labelWidth="w-60 max-lg:w-48"
            options={roleOptions}
            disabled={isSigningUp}
          />
        </div>

        <div className="flex items-center gap-4 ml-auto w-fit mt-8">
          <Button
            type="reset"
            color="bg-primary border border-primary_2 hover:bg-ternary"
            textColor="text-primary_2"
            disabled={isSigningUp}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSigningUp}>
            {isSigningUp ? (
              <SpinnerMini
                spinnerColor="border border-primary"
                marginY="my-0"
              />
            ) : (
              "Create New User"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormSignup;
