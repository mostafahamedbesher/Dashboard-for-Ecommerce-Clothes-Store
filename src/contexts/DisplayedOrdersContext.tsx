import { createContext, ReactNode, useContext, useState } from "react";
import { OrderType } from "../types/OrdersTypes";

interface DisplayedOrdersProviderProps {
  children: ReactNode;
}

interface DisplayedOrdersContextType {
  displayedOrders: OrderType[] | null;
  setDisplayedOrders: (ordersData: OrderType[]) => void;
}

// Context
const DisplayedOrdersContext = createContext<DisplayedOrdersContextType | null>(
  null
);

// Provider
function DisplayedOrdersProvider({ children }: DisplayedOrdersProviderProps) {
  const [displayedOrders, setDisplayedOrders] = useState<OrderType[]>([]);

  return (
    <DisplayedOrdersContext.Provider
      value={{ displayedOrders, setDisplayedOrders }}
    >
      {children}
    </DisplayedOrdersContext.Provider>
  );
}

// Custom Hook to use the context
function useDisplayedOrders() {
  const context = useContext(DisplayedOrdersContext);
  if (context === undefined) {
    throw new Error(
      "Displayed Orders Context was used outside the DisplayedOrdersProvider"
    );
  }

  return context;
}

export { DisplayedOrdersProvider, useDisplayedOrders };
