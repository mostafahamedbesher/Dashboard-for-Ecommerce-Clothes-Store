import { createContext, ReactNode, useContext } from "react";
import { SettingsType } from "../types/SettingsTypes";
import { useGetAllSettings } from "../features/settings/useGetAllSettings";
import Loader from "../ui/Loader";

interface SettingsDataProviderProps {
  children: ReactNode;
}

interface SettingsDataContextType {
  settingsData: SettingsType | null;
  isLoadingSettings: boolean;
}

// Context
const SettingsDataContext = createContext<SettingsDataContextType | null>(null);

// Provider
function SettingsDataProvider({ children }: SettingsDataProviderProps) {
  const { data, isPending: isLoadingSettings } = useGetAllSettings();

  if (isLoadingSettings || !data) return <Loader />;

  return (
    <SettingsDataContext.Provider
      value={{ settingsData: data.data, isLoadingSettings }}
    >
      {children}
    </SettingsDataContext.Provider>
  );
}

// Custom Hook to use the context
function useSettingsData() {
  const context = useContext(SettingsDataContext);
  if (context === undefined) {
    throw new Error(
      "Settings Data Context was used outside the DisplayedProductsProvider"
    );
  }

  return context;
}

export { SettingsDataProvider, useSettingsData };
