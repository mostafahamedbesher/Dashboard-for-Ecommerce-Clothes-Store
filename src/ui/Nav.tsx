import { HiOutlineUser } from "react-icons/hi2";
import LogoutButton from "../features/authentication/LogoutButton";
import { NavLink } from "react-router-dom";
import DarkModeButton from "./DarkModeButton";

function Nav() {
  return (
    <nav className="mr-2">
      <ul className="flex items-center gap-4">
        <li>
          <NavLink to="/account" className="inline-flex items-center">
            {({ isActive }) => (
              <HiOutlineUser
                className={`icon-nav ${
                  isActive ? "text-primary_4 border-secondary bg-secondary" : ""
                }`}
              />
            )}
          </NavLink>
        </li>

        <li>
          <DarkModeButton />
        </li>

        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
