// I implemented this Menus component using compound component pattern to be more flexible

import {
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useOutsideClickClose } from "../hooks/useOutsideClickClose";

// props Types
interface MenusContextType {
  openId: number | string;
  openMenuList: (value: number | string) => void;
  closeMenuList: () => void;
}

interface MenusProviderProps {
  children: ReactNode;
}

interface MenuListProps {
  children: ReactNode;
  id: number | string;
}

interface MenuButtonProps {
  type: "button" | "link";
  children: ReactNode;
  to?: string;
  onClick?: () => void;
}

interface ToggleButtonProps {
  id: number | string;
}

// create context
const menusContext = createContext<MenusContextType | null>(null);

// parent componenet
function Menus({ children }: MenusProviderProps) {
  const [openId, setOpenId] = useState<number | string>("");

  const openMenuList = setOpenId;

  const closeMenuList = useCallback(() => {
    setOpenId("");
  }, []);

  // function closeMenuList() {
  //   setOpenId("");
  // }

  return (
    <menusContext.Provider value={{ openId, openMenuList, closeMenuList }}>
      {children}
    </menusContext.Provider>
  );
}

// child components
function ToggleButton({ id }: ToggleButtonProps) {
  const context = useContext(menusContext);

  function handleOnClick(e: MouseEvent) {
    e.stopPropagation();
    if (context?.openId === id) {
      context?.closeMenuList();
    } else {
      context?.openMenuList(id);
    }
  }

  return (
    <button
      onClick={handleOnClick}
      className={`${
        context?.openId === id
          ? "bg-secondary text-primary border border-secondary"
          : "bg-ternary text-primary_2 border border-primary_2 hover:border-secondary hover:bg-secondary hover:text-primary"
      } rounded-sm p-1 transition-all duration-200`}
    >
      <HiOutlineEllipsisVertical className="w-5 h-5" />
    </button>
  );
}

function MenuList({ children, id }: MenuListProps) {
  const context = useContext(menusContext);
  // handle Menu Outside Click to close using this custom hook
  const refList = useOutsideClickClose<HTMLUListElement>(
    () => context?.closeMenuList(),
    false
  );

  if (context?.openId !== id) return null;

  return (
    <ul
      className={`${
        context?.openId === id ? "flex" : "hidden"
      } flex-col items-start gap-2 bg-ternary shadow-md absolute right-0 z-10`}
      ref={refList}
    >
      {children}
    </ul>
  );
}

function MenuButton({ type, children, to = "", onClick }: MenuButtonProps) {
  const context = useContext(menusContext);

  function handleClick() {
    onClick?.();
    context?.closeMenuList();
  }

  if (type === "link") {
    return (
      <Link
        className="text-sm py-2 pr-8 pl-4 block w-full hover:bg-secondary hover:text-primary transition-colors duration-200"
        to={to}
      >
        {children}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <button
        className="text-sm py-2 pr-8 pl-4 block w-full hover:bg-secondary hover:text-primary transition-colors duration-200"
        onClick={handleClick}
        // onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

// add child components as Properties of the parent component
Menus.ToggleButton = ToggleButton;
Menus.MenuList = MenuList;
Menus.MenuButton = MenuButton;

export default Menus;
