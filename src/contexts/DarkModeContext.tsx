import { createContext, ReactNode, useContext, useState } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Context
const DarkModeContext = createContext<DarkModeContextType | null>(null);

// Provider
function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// Custom Hook to use the context
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("DarkMode Context was used outside of the Provider");
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
