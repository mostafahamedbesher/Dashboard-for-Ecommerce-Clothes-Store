import FormLogin from "../features/authentication/FormLogin";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Logo size="text-5xl max-xs:text-4xl" />
        <p className="text-primary_2 text-xl mb-6 max-xs:text-lg">
          Log In To Your Account
        </p>

        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
