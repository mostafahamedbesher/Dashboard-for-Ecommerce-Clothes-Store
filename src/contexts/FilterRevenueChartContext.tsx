import { createContext, useContext, useState, ReactNode } from "react";

type filterValueType = "all" | "today" | "week" | "month";

interface FilterChartContextType {
  filterValue: filterValueType;
  setFilterValue: (val: filterValueType) => void;
}

const FilterRevenueChartContext = createContext<
  FilterChartContextType | undefined
>(undefined);

function FilterChartRevenueProvider({ children }: { children: ReactNode }) {
  const [filterValue, setFilterValue] = useState<filterValueType>("all");

  return (
    <FilterRevenueChartContext.Provider value={{ filterValue, setFilterValue }}>
      {children}
    </FilterRevenueChartContext.Provider>
  );
}

function useFilterRevenueChart() {
  const context = useContext(FilterRevenueChartContext);
  if (!context) {
    throw new Error("useFilterChart must be used inside FilterChartProvider");
  }
  return context;
}

export { FilterChartRevenueProvider, useFilterRevenueChart };
