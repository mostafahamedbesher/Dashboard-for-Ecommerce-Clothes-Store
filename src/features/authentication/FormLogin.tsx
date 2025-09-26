import { FormProvider, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { LoginType } from "../../types/AuthTypes";
import ErrorForm from "../../ui/ErrorForm";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function FormLogin() {
  const formMethods = useForm<LoginType>({
    defaultValues: {
      email: "cifase7491@im5z.com",
      password: "pass123",
    },
  });

  const { handleSubmit, formState } = formMethods;
  const { errors } = formState;

  const { mutate: loginUser, isPending: isLoggingIn } = useLogin();

  function handleLoginSubmit(submitData: LoginType) {
    if (!submitData.email || !submitData.password) return;

    loginUser(submitData);
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="bg-ternary rounded-md p-10 space-y-6 shadow-md max-sm:p-6"
      >
        <div>
          <Input
            labelText="Email"
            type="text"
            name="email"
            id="email"
            labelWidth="w-60"
            disabled={isLoggingIn}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email",
              },
            }}
          />

          {errors.email && <ErrorForm>{errors.email.message}</ErrorForm>}
        </div>

        <div>
          <Input
            labelText="Password"
            type="password"
            name="password"
            id="password"
            labelWidth="w-60"
            disabled={isLoggingIn}
            validation={{
              required: "password is required",
              // pattern: {
              //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              //   message: "Invalid Email",
              // },
            }}
          />

          {errors.password && <ErrorForm>{errors.password.message}</ErrorForm>}
        </div>

        <div>
          <Button type="submit" disabled={isLoggingIn} style="py-2 px-3 w-full">
            {isLoggingIn ? (
              <SpinnerMini
                spinnerColor="border-2 border-primary"
                marginY="my-0"
              />
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormLogin;
