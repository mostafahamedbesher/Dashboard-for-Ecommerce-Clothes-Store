import { createContext, ReactNode, useContext, useState } from "react";
import { productType } from "../types/ProductsTypes";

interface DisplayedProductsProviderProps {
  children: ReactNode;
}

interface DisplayedProductsContextType {
  displayedProducts: productType[] | null;
  setDisplayedProducts: (productsData: productType[]) => void;
}

// Context
const DisplayedProductsContext =
  createContext<DisplayedProductsContextType | null>(null);

// Provider
function DisplayedProductsProvider({
  children,
}: DisplayedProductsProviderProps) {
  const [displayedProducts, setDisplayedProducts] = useState<productType[]>([]);

  return (
    <DisplayedProductsContext.Provider
      value={{ displayedProducts, setDisplayedProducts }}
    >
      {children}
    </DisplayedProductsContext.Provider>
  );
}

// Custom Hook to use the context
function useDisplayedProducts() {
  const context = useContext(DisplayedProductsContext);
  if (context === undefined) {
    throw new Error(
      "Displayed Products Context was used outside the DisplayedProductsProvider"
    );
  }

  return context;
}

export { DisplayedProductsProvider, useDisplayedProducts };
