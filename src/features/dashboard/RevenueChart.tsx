import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useGetAllOrders } from "../orders/useGetAllOrders";
import Spinner from "../../ui/Spinner";
import { groupOrdersRevenueByDay, RevenueData } from "../../utils/helpers";
import { useFilterRevenueChart } from "../../contexts/FilterRevenueChartContext";
import { format, isThisMonth, isThisWeek, isToday } from "date-fns";

function RevenueChart() {
  const { data: allOrders, isPending: isLoadingOrders } = useGetAllOrders();
  const orders = allOrders?.data || [];

  const RevenueContext = useFilterRevenueChart();

  // sorted chart data by date
  const chartRevenueData = groupOrdersRevenueByDay(orders)
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // apply chart filters
  let displayedRevenueData: RevenueData[] = [];
  if (RevenueContext.filterValue === "all") {
    displayedRevenueData = chartRevenueData;
  } else if (RevenueContext.filterValue === "today") {
    displayedRevenueData = chartRevenueData.filter((order) =>
      isToday(new Date(order.date))
    );
  } else if (RevenueContext.filterValue === "week") {
    displayedRevenueData = chartRevenueData.filter((order) =>
      isThisWeek(new Date(order.date))
    );
  } else if (RevenueContext.filterValue === "month") {
    displayedRevenueData = chartRevenueData.filter((order) =>
      isThisMonth(new Date(order.date))
    );
  }

  if (isLoadingOrders || !orders.length) {
    return <Spinner spinnerColor="border border-primary_2" />;
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      {displayedRevenueData.length ? (
        <AreaChart
          data={displayedRevenueData.map((item) => ({
            revenue: item.revenue.toFixed(2),
            date: format(item.date, "dd-MM-yyyy"),
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: window.innerWidth < 640 ? 12 : 16 }}
          />
          <YAxis
            unit="$"
            tick={{ fontSize: window.innerWidth < 640 ? 12 : 16 }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-secondary)"
            fill="var(--color-secondary)"
            unit="$"
            strokeWidth={2}
          />
        </AreaChart>
      ) : (
        <div className="text-primary_2 text-xl font-semibold flex items-center justify-center">
          No Revenue Data
        </div>
      )}
    </ResponsiveContainer>
  );
}

export default RevenueChart;
