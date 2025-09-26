import { useMobileMenu } from "../contexts/MobileMenuContext";
import Overlay from "./Overlay";
import Sidebar from "./Sidebar";

function MobileMenu() {
  const context = useMobileMenu();

  if (!context) return null;

  return (
    <Overlay isOpen={context.isOpenMenu} onClose={context.closeMobileMenu}>
      <Sidebar />
    </Overlay>
  );
}

export default MobileMenu;
