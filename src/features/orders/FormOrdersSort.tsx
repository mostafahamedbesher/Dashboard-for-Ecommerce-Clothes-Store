import { FormProvider, useForm } from "react-hook-form";
import SelectInput from "../../ui/SelectInput";
import { OrderSortFormValues, OrderType } from "../../types/OrdersTypes";
import { useDisplayedOrders } from "../../contexts/DisplayedOrdersContext";
import { useEffect } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { differenceInMinutes } from "date-fns";

const sortOptions = [
  { label: "Sort by Date (recent first)", value: "sort-by-date-recent" },
  { label: "Sort by Date (earlier first)", value: "sort-by-date-earlier" },
  { label: "Sort by id (ascending)", value: "sort-by-id-asc" },
  { label: "Sort by id (descending)", value: "sort-by-id-desc" },
  { label: "Sort by price (low first)", value: "sort-by-price-low" },
  { label: "Sort by price (high first)", value: "sort-by-price-high" },
];

function FormOrdersSort() {
  const formMethods = useForm<OrderSortFormValues>({
    defaultValues: {
      sortOrders: sortOptions[0].value,
    },
  });

  const { getValues } = formMethods;

  const context = useDisplayedOrders();

  // const displayedOrders = context?.displayedOrders || [];
  let sortedOrders: OrderType[] = [];

  // set the intial sortBy value to be the default select value to run onMount only
  useEffect(
    function () {
      // if (!sortedOrders.length) {
      //   handleOrdersSort();
      // }
      handleOrdersSort();
    },
    [context?.displayedOrders?.length]
  );

  function handleOrdersSort() {
    // get selected sortBy value
    const sortByValue = getValues("sortOrders");
    // sort
    if (context && context?.displayedOrders) {
      if (sortByValue === "sort-by-id-asc") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => a.id - b.id);
      } else if (sortByValue === "sort-by-id-desc") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => b.id - a.id);
      } else if (sortByValue === "sort-by-price-low") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => a.totalPrice - b.totalPrice);
      } else if (sortByValue === "sort-by-price-high") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => b.totalPrice - a.totalPrice);
      } else if (sortByValue === "sort-by-date-recent") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => differenceInMinutes(b.created_at, a.created_at));
      } else if (sortByValue === "sort-by-date-earlier") {
        sortedOrders = context.displayedOrders
          .slice()
          .sort((a, b) => differenceInMinutes(a.created_at, b.created_at));
      }

      context.setDisplayedOrders(sortedOrders);
    }
  }

  if (!context) return <SpinnerMini spinnerColor="border-primary_2" />;

  return (
    <FormProvider {...formMethods}>
      <form>
        <SelectInput
          labelText=""
          id=""
          name="sortOrders"
          options={sortOptions}
          onChange={handleOrdersSort}
        />
      </form>
    </FormProvider>
  );
}

export default FormOrdersSort;
