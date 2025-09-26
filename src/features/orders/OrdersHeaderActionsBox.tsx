import { useDisplayedOrders } from "../../contexts/DisplayedOrdersContext";
import { FormOrdersFilterInputs, OrderType } from "../../types/OrdersTypes";
import FilterMenu from "../../ui/FilterMenu";
import InputSearch from "../../ui/InputSearch";
import SpinnerMini from "../../ui/SpinnerMini";
import { getUniqueItems } from "../../utils/helpers";
import FormOrdersSort from "./FormOrdersSort";

interface OrdersHeaderActionsBoxProps {
  allOrders: OrderType[];
}

function OrdersHeaderActionsBox({ allOrders }: OrdersHeaderActionsBoxProps) {
  const context = useDisplayedOrders();

  // calculate max price of all orders
  let maxPrice = 0;
  if (allOrders?.length) {
    maxPrice = allOrders
      ?.map((order) => order.totalPrice)
      ?.reduce((acc, price) => Math.max(acc, price));
  }

  // get all unique categories
  const availableStatus = getUniqueItems(
    allOrders?.map((order) => order.status ?? "")
  );

  function onApplyFilters(inputValues: FormOrdersFilterInputs) {
    const data = allOrders.filter((order) => {
      // status filter
      if (inputValues.orderStatus && order.status !== inputValues.orderStatus) {
        return false;
      }

      // orderPrice filter
      if (
        Number(inputValues.orderPrice) &&
        order.totalPrice > Number(inputValues.orderPrice)
      ) {
        return false;
      }

      return true; // include order if all active filters match
    });

    context?.setDisplayedOrders(data);
  }

  function onResetFilters() {
    context?.setDisplayedOrders(allOrders);
  }

  if (!context) return <SpinnerMini spinnerColor="border-primary_2" />;

  return (
    <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="max-md:order-last max-md:self-stretch">
        <InputSearch
          name="ordersSearch"
          searchField="id"
          data={allOrders}
          // contextData={context.displayedOrders}
          setter={context.setDisplayedOrders}
          placeHolder="search by Order ID..."
        />
      </div>

      {/* sort by */}
      <div className="flex items-center gap-4 max-md:self-end">
        <FormOrdersSort />

        {/* Filter */}
        <FilterMenu onApply={onApplyFilters}>
          <FilterMenu.CloseButton />

          <FilterMenu.Section title="Status" marginTop="mt-4">
            <FilterMenu.RadioGroup
              name="orderStatus"
              options={availableStatus}
            />
          </FilterMenu.Section>

          <FilterMenu.Section title="Price">
            <FilterMenu.PriceRange name="orderPrice" max={maxPrice} />
          </FilterMenu.Section>

          <FilterMenu.ApplyButton />
          <FilterMenu.ResetButton onReset={onResetFilters} />
        </FilterMenu>
      </div>
    </div>
  );
}

export default OrdersHeaderActionsBox;
