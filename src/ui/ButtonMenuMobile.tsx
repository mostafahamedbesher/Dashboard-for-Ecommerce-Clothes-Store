import { HiBars3 } from "react-icons/hi2";
import { useMobileMenu } from "../contexts/MobileMenuContext";

function ButtonMenuMobile() {
  const mobileMenuContext = useMobileMenu();

  if (!mobileMenuContext) return null;

  return (
    <button onClick={mobileMenuContext.openMobileMenu}>
      <HiBars3 className="w-10 h-10 hidden max-xl:block text-primary_2" />
    </button>
  );
}

export default ButtonMenuMobile;
