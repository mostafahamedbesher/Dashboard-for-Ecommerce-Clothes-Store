import FormSignup from "../features/authentication/FormSignup";
import { useGetCurrentUser } from "../features/authentication/useGetCurrentUser";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

function Users() {
  const { data: currentUser, isPending: isLoadingUser } = useGetCurrentUser();

  if (isLoadingUser) return <Loader />;

  return (
    <div>
      <Heading name="Users" size="medium" />

      {currentUser?.user_metadata.role === "admin" ? (
        <div>
          <h3 className="text-primary_2 text-xl font-medium mb-4">
            Create New User
          </h3>
          <FormSignup />
        </div>
      ) : (
        <div className="bg-ternary p-12 rounded-md flex items-center justify-center gap-2">
          <HiOutlineExclamationTriangle className="w-10 h-10 text-red-500" />
          <p className=" text-red-500 text-xl">
            This Page is Available only to Admins.
          </p>
        </div>
      )}
    </div>
  );
}

export default Users;
