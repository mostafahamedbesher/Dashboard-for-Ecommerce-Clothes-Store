import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function LogoutButton() {
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        logoutUser();
      }}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? (
        <SpinnerMini spinnerColor="border-primary_2" />
      ) : (
        <HiOutlineArrowRightStartOnRectangle className="icon-nav" />
      )}
    </button>
  );
}

export default LogoutButton;
