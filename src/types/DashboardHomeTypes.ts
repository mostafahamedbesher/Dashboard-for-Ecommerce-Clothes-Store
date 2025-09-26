export type filterValueType = "all" | "today" | "week" | "month";

export type ChartFilterType = {
  label: string;
  value: filterValueType;
};
