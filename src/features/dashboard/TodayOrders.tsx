import { isToday, parseISO } from "date-fns";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OrderItemRow from "../orders/OrderItemRow";
import { useGetAllOrders } from "../orders/useGetAllOrders";

function TodayOrders() {
  const { data, isPending: isLoadingOrders } = useGetAllOrders();
  const orders = data?.data.filter((order) =>
    isToday(parseISO(order.created_at))
  );

  if (isLoadingOrders) {
    return <Spinner spinnerColor="border border-primary_2" />;
  }

  return (
    <div className="overflow-x-auto">
      <Table columns="1fr 1.25fr 1fr 1fr 1fr 1fr" style="border-none">
        <Table.TableHeader
          bgColor="bg-primary"
          textColor="text-primary_2 opacity-80"
        >
          <div>Order Id</div>
          <div>Customer</div>
          <div className="whitespace-nowrap">Total Price</div>
          <div>Shipping</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.TableHeader>

        <Menus>
          <ul>
            {orders?.length ? (
              orders?.map((order) => (
                <OrderItemRow
                  key={order.id}
                  order={order}
                  showCreatedAt={false}
                  showBtnStatus={true}
                />
              ))
            ) : (
              <div className="text-center text-xl text-primary_2 mt-10 font-semibold">
                No Orders Today
              </div>
            )}
          </ul>
        </Menus>
      </Table>
    </div>
  );
}

export default TodayOrders;
