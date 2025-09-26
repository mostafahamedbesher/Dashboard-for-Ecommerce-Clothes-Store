import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetAllOrders } from "../orders/useGetAllOrders";
import Spinner from "../../ui/Spinner";
import { DayOrders, groupOrdersByDay } from "../../utils/helpers";
import { useFilterOrdersChart } from "../../contexts/FilterOrdersChartContext";
import { format, isThisMonth, isThisWeek, isToday } from "date-fns";

function OrdersChart() {
  const { data: allOrders, isPending: isLoadingOrders } = useGetAllOrders();
  const orders = allOrders?.data || [];

  const OrdersContext = useFilterOrdersChart();

  const chartOrdersData = groupOrdersByDay(orders)
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  // console.log(chartOrdersData);

  let displayedOrdersData: DayOrders[] = [];

  if (OrdersContext.filterValue === "all") {
    displayedOrdersData = chartOrdersData;
  } else if (OrdersContext.filterValue === "today") {
    displayedOrdersData = chartOrdersData.filter((order) =>
      isToday(new Date(order.date))
    );
  } else if (OrdersContext.filterValue === "week") {
    displayedOrdersData = chartOrdersData.filter((order) =>
      isThisWeek(new Date(order.date))
    );
  } else if (OrdersContext.filterValue === "month") {
    displayedOrdersData = chartOrdersData.filter((order) =>
      isThisMonth(new Date(order.date))
    );
  }

  if (isLoadingOrders || !orders.length) {
    return <Spinner spinnerColor="border border-primary_2" />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      {displayedOrdersData.length ? (
        <BarChart
          data={displayedOrdersData.map((item) => ({
            ...item,
            date: format(item.date, "dd-MM-yyyy"), // format for X axis only
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: window.innerWidth < 640 ? 12 : 16 }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: window.innerWidth < 640 ? 12 : 16 }}
          />
          <Tooltip cursor={false} />
          <Bar
            dataKey="orders"
            fill="var(--color-secondary)"
            barSize={window.innerWidth < 640 ? 18 : 25}
            radius={[15, 15, 0, 0]}
            activeBar={{ fill: "var(--color-secondary_2)" }}
          />
        </BarChart>
      ) : (
        <div className="text-primary_2 text-xl font-semibold flex items-center justify-center">
          No Orders Data
        </div>
      )}
    </ResponsiveContainer>
  );
}

export default OrdersChart;
