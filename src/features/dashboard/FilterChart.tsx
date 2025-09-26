import { ReactNode } from "react";

interface FilterChartProps {
  children: ReactNode;
}
function FilterChart({ children }: FilterChartProps) {
  return (
    <div className="border border-primary_2 p-2 rounded-md flex items-center gap-2 max-md:self-end max-xs:grid max-xs:grid-cols-2 max-xs:w-full">
      {children}
    </div>
  );
}

export default FilterChart;
