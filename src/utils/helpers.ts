import { parseISO } from "date-fns";
import { OrderType } from "../types/OrdersTypes";

export function getUniqueItems<T>(arr: T[]): T[] {
  const set = new Set(arr);
  return [...set];
}

/////
export type DayOrders = {
  date: Date;
  orders: number;
};

export type RevenueData = {
  date: Date;
  revenue: number;
};

export const groupOrdersByDay = (orders: OrderType[]): DayOrders[] => {
  const counts: Record<string, number> = {};

  orders.forEach((order) => {
    const dateObj = new Date(order.created_at);
    const isoDay = dateObj.toISOString().split("T")[0]; // "yyyy-MM-dd" for grouping
    counts[isoDay] = (counts[isoDay] || 0) + 1;
  });

  return Object.entries(counts).map(([isoDate, orders]) => ({
    date: parseISO(isoDate),
    orders,
  }));
};

export const groupOrdersRevenueByDay = (orders: OrderType[]): RevenueData[] => {
  const revenueByDay: Record<string, number> = {};

  orders.forEach((order) => {
    const dateObj = new Date(order.created_at);
    const isoDay = dateObj.toISOString().split("T")[0]; // for grouping
    revenueByDay[isoDay] = (revenueByDay[isoDay] || 0) + order.totalPrice;
  });

  return Object.entries(revenueByDay).map(([isoDate, revenue]) => ({
    date: parseISO(isoDate), // store as Date object
    revenue,
  }));
};

////
export function sortByReferenceArray<T>(unSortedArr: T[], refArr: T[]) {
  // create a map from refArr for Faster access O(1)
  const refArrMap = new Map<T, number>();
  refArr.forEach((val, idx) => refArrMap.set(val, idx));

  // sort
  const sortedArr = unSortedArr
    .slice()
    .sort(
      (a, b) =>
        (refArrMap.get(a) ?? Number.MAX_SAFE_INTEGER) -
        (refArrMap.get(b) ?? Number.MAX_SAFE_INTEGER)
    );

  return sortedArr;
}
