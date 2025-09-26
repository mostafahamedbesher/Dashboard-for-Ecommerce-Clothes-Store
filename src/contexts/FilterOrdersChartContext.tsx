import { createContext, useContext, useState, ReactNode } from "react";

type filterValueType = "all" | "today" | "week" | "month";

interface FilterChartContextType {
  filterValue: filterValueType;
  setFilterValue: (val: filterValueType) => void;
}

const FilterOrdersChartContext = createContext<
  FilterChartContextType | undefined
>(undefined);

function FilterChartOrdersProvider({ children }: { children: ReactNode }) {
  const [filterValue, setFilterValue] = useState<filterValueType>("all");

  return (
    <FilterOrdersChartContext.Provider value={{ filterValue, setFilterValue }}>
      {children}
    </FilterOrdersChartContext.Provider>
  );
}

function useFilterOrdersChart() {
  const context = useContext(FilterOrdersChartContext);
  if (!context) {
    throw new Error("useFilterChart must be used inside FilterChartProvider");
  }
  return context;
}

export { FilterChartOrdersProvider, useFilterOrdersChart };
