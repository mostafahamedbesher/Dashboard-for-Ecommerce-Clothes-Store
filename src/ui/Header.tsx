import UserAvatar from "../features/authentication/UserAvatar";
import ButtonMenuMobile from "./ButtonMenuMobile";
import Nav from "./Nav";

function Header() {
  return (
    <header className="border border-b-2 border-ternary p-8 flex justify-end items-center h-[64px] max-xl:justify-between max-sm:p-6">
      {/* mobile menu button */}
      <ButtonMenuMobile />

      <div className="flex items-center gap-8">
        <UserAvatar />
        <Nav />
      </div>
    </header>
  );
}

export default Header;
