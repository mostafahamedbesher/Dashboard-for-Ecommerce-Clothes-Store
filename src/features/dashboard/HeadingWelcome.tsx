import Spinner from "../../ui/Spinner";
import { useGetCurrentUser } from "../authentication/useGetCurrentUser";

function HeadingWelcome() {
  const { data: user, isPending: isLoadingUser } = useGetCurrentUser();
  if (isLoadingUser)
    return <Spinner spinnerColor="border-2 border-primary_2" />;

  return (
    <h2 className="text-primary_2 text-2xl mb-6">{`Welcome Back, ${user?.user_metadata.fullName} 👋`}</h2>
  );
}

export default HeadingWelcome;
