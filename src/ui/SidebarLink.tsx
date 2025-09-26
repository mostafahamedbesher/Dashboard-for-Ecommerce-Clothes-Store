import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  path: string;
  name: string;
  Icon: IconType;
}

function SidebarLink({ path, name, Icon }: SidebarLinkProps) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex gap-3 items-center p-3 mb-6 text-primary_2 rounded-md hover:bg-secondary hover:text-primary_4 transition-all duration-200 ${
            isActive ? "bg-secondary text-primary_4" : ""
          }`
        }
      >
        <Icon className="w-6 h-6" />
        <p>{name}</p>
      </NavLink>
    </li>
  );
}

export default SidebarLink;
