import { ReactNode } from "react";
import { filterValueType } from "../../types/DashboardHomeTypes";
import { useFilterRevenueChart } from "../../contexts/FilterRevenueChartContext";
import { useFilterOrdersChart } from "../../contexts/FilterOrdersChartContext";

interface ButtonFilterProps {
  children: ReactNode;
  value: filterValueType;
  filterType: "revenue" | "orders";
}

function ButtonFilter({ children, value, filterType }: ButtonFilterProps) {
  const RevenueContext = useFilterRevenueChart();
  const OrdersContext = useFilterOrdersChart();
  let isActive: boolean = false;

  if (filterType === "revenue") {
    isActive = RevenueContext.filterValue === value;
  }

  if (filterType === "orders") {
    isActive = OrdersContext.filterValue === value;
  }

  function handleClick() {
    if (filterType === "revenue") {
      RevenueContext.setFilterValue(value);
    }

    if (filterType === "orders") {
      OrdersContext.setFilterValue(value);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${
        isActive ? "text-primary bg-primary_2" : "text-primary_2 bg-primary"
      } py-0.5 px-3 text-sm max-sm:text-xs rounded-md hover:text-primary hover:bg-primary_2 transition-all duration-200`}
    >
      {children}
    </button>
  );
}

export default ButtonFilter;
