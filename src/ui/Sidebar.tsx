import ButtonCloseMobileMenu from "./ButtonCloseMobileMenu";
import Logo from "./Logo";
import SidebarLinksList from "./SidebarLinksList";

function Sidebar() {
  return (
    <aside className="bg-ternary p-6 h-screen max-xs:px-4">
      <div className="flex items-start justify-between">
        <Logo />
        <ButtonCloseMobileMenu />
      </div>

      <SidebarLinksList />
    </aside>
  );
}

export default Sidebar;
