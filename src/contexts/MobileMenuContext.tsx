import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface MobileMenuContextType {
  isOpenMenu: boolean;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

// Create the context with undefined initial value
const MobileMenuContext = createContext<MobileMenuContextType | undefined>(
  undefined
);

// Define props type for provider
interface MobileMenuProviderProps {
  children: ReactNode;
}

function MobileMenuProvider({ children }: MobileMenuProviderProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function openMobileMenu() {
    setIsOpenMenu(true);
  }

  function closeMobileMenu() {
    setIsOpenMenu(false);
  }

  return (
    <MobileMenuContext.Provider
      value={{ isOpenMenu, closeMobileMenu, openMobileMenu }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
}

function useMobileMenu() {
  const context = useContext(MobileMenuContext);

  if (context === undefined) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }

  return context;
}

export { MobileMenuProvider, useMobileMenu };
