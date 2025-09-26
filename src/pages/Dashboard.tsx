import { FilterChartOrdersProvider } from "../contexts/FilterOrdersChartContext";
import { FilterChartRevenueProvider } from "../contexts/FilterRevenueChartContext";
import ButtonFilter from "../features/dashboard/ButtonFilter";
import ChartBox from "../features/dashboard/ChartBox";
import DashboardDataList from "../features/dashboard/DashboardDataList";
import FilterChart from "../features/dashboard/FilterChart";
import HeadingWelcome from "../features/dashboard/HeadingWelcome";
import InfoBox from "../features/dashboard/InfoBox";
import LowStockList from "../features/dashboard/LowStockList";
import OrdersChart from "../features/dashboard/OrdersChart";
import RevenueChart from "../features/dashboard/RevenueChart";
import TodayOrders from "../features/dashboard/TodayOrders";
import TopSellingList from "../features/dashboard/TopSellingList";
import { ChartFilterType } from "../types/DashboardHomeTypes";
import Heading from "../ui/Heading";

const chartFilters: ChartFilterType[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

function Dashboard() {
  return (
    <div>
      <Heading name="Dashboard" size="medium" />

      <HeadingWelcome />

      <DashboardDataList />

      <FilterChartRevenueProvider>
        <FilterChartOrdersProvider>
          <div className="grid grid-cols-[2.5fr_1fr] gap-6 mb-8 max-lg:grid-cols-1">
            <ChartBox
              heading="Revenue Statistics"
              Filter={
                <FilterChart>
                  {chartFilters.map((filterBtn) => (
                    <ButtonFilter
                      key={filterBtn.value}
                      value={filterBtn.value}
                      filterType="revenue"
                    >
                      {filterBtn.label}
                    </ButtonFilter>
                  ))}
                </FilterChart>
              }
            >
              <RevenueChart />
            </ChartBox>

            <InfoBox headingText="Low Stock Alerts">
              <LowStockList />
            </InfoBox>
          </div>

          <div className="grid grid-cols-[2.5fr_1fr] gap-6 mb-8 max-lg:grid-cols-1">
            <ChartBox
              heading="Orders Statistics"
              Filter={
                <FilterChart>
                  {chartFilters.map((filterBtn) => (
                    <ButtonFilter
                      key={filterBtn.value}
                      value={filterBtn.value}
                      filterType="orders"
                    >
                      {filterBtn.label}
                    </ButtonFilter>
                  ))}
                </FilterChart>
              }
            >
              <OrdersChart />
            </ChartBox>

            <InfoBox headingText="Top Selling Products">
              <TopSellingList />
            </InfoBox>
          </div>
        </FilterChartOrdersProvider>
      </FilterChartRevenueProvider>

      <div className="mb-8">
        <InfoBox headingText="Today's Orders">
          <TodayOrders />
        </InfoBox>
      </div>
    </div>
  );
}

export default Dashboard;
