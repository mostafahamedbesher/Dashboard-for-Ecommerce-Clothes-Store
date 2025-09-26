import { HiUserGroup } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import { HiArchiveBox } from "react-icons/hi2";
import { HiBanknotes } from "react-icons/hi2";

import DashboardDataItem from "../../ui/DashboardDataItem";
import { useGetAllOrders } from "../orders/useGetAllOrders";
import { useGetAllUsers } from "../users/useGetAllUsers";
import { useGetAllProducts } from "../products/useGetAllProducts";
import Spinner from "../../ui/Spinner";

function DashboardDataList() {
  // calculate total orders
  const { data: orders, isPending: isLoadingOrders } = useGetAllOrders();
  const totalOrders = orders?.data.length;

  // calculate total revenue
  const totalRevenue = orders?.data.reduce((acc, order) => {
    if (order.status !== "canceled") {
      return acc + order.totalPrice;
    }
    return acc;
  }, 0);

  // calculate total users
  const { data: users, isPending: isLoadingUsers } = useGetAllUsers();
  const totalUsers = users?.data.length;

  // calculate total Products
  const { data: products, isPending: isLoadingProducts } = useGetAllProducts();
  const totalProducts = products?.data.length;

  if (isLoadingOrders || isLoadingUsers || isLoadingProducts)
    return <Spinner spinnerColor="border-2 border-primary_2" />;

  return (
    <ul className="grid grid-cols-4 gap-6 mb-8 max-xl:grid-cols-2 max-sm:grid-cols-1">
      <DashboardDataItem
        icon={<HiBanknotes className="icon-dashboard-item text-green-500" />}
        label="Total Revenue"
      >
        ${Number(totalRevenue).toFixed(2)}
      </DashboardDataItem>

      <DashboardDataItem
        icon={<HiShoppingCart className="icon-dashboard-item text-secondary" />}
        label="Total Orders"
      >
        {totalOrders}
      </DashboardDataItem>

      <DashboardDataItem
        icon={<HiUserGroup className="icon-dashboard-item text-blue-500" />}
        label="Total Customers"
      >
        {totalUsers}
      </DashboardDataItem>

      <DashboardDataItem
        icon={<HiArchiveBox className="icon-dashboard-item text-indigo-500" />}
        label="Total Products"
      >
        {totalProducts}
      </DashboardDataItem>
    </ul>
  );
}

export default DashboardDataList;
