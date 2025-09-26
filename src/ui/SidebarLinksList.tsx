import SidebarLink from "./SidebarLink";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineCube } from "react-icons/hi2";

function SidebarLinksList() {
  return (
    <ul>
      <SidebarLink path="dashboard" name="Home" Icon={HiOutlineHome} />
      <SidebarLink path="products" name="Products" Icon={HiOutlineCube} />
      <SidebarLink path="orders" name="Orders" Icon={HiOutlineReceiptPercent} />
      <SidebarLink path="users" name="Users" Icon={HiOutlineUsers} />
      <SidebarLink path="settings" name="Settings" Icon={HiOutlineCog6Tooth} />
    </ul>
  );
}

export default SidebarLinksList;
