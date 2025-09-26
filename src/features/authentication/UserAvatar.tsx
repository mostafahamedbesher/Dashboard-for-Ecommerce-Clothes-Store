import SpinnerMini from "../../ui/SpinnerMini";
import { useGetCurrentUser } from "./useGetCurrentUser";

function UserAvatar() {
  const { data: user, isPending: isLoadingUser } = useGetCurrentUser();

  const userRole =
    user?.user_metadata.role.slice(0, 1).toUpperCase() +
    user?.user_metadata.role.slice(1);

  if (isLoadingUser)
    return (
      <SpinnerMini spinnerColor="border-2 border-primary_2" marginY="my-0" />
    );

  return (
    <div className="flex items-center gap-2 max-xs:hidden">
      <img
        src={user?.user_metadata.avatar || "./images/default-user.jpg"}
        alt="user avatar"
        className="w-10 h-10 rounded-full border-2 border-ternary"
      />

      <div className="flex items-center gap-0.5">
        <span className="text-primary_2 max-sm:hidden">
          {user?.user_metadata.fullName}
        </span>
        <span className="text-primary_2 max-sm:text-sm">{`(${userRole} user)`}</span>
      </div>
    </div>
  );
}

export default UserAvatar;
