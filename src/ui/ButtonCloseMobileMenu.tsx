import { HiOutlineXMark } from "react-icons/hi2";
import { useMobileMenu } from "../contexts/MobileMenuContext";

function ButtonCloseMobileMenu() {
  const mobileMenuContext = useMobileMenu();

  if (!mobileMenuContext) return null;

  return (
    <button onClick={mobileMenuContext.closeMobileMenu}>
      <HiOutlineXMark className="max-xl:w-8 max-xl:h-8 hidden max-xl:block text-primary_2" />
    </button>
  );
}

export default ButtonCloseMobileMenu;
