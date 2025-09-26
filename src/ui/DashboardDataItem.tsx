import { ReactNode } from "react";

interface DashboardDataItemProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

function DashboardDataItem({ icon, label, children }: DashboardDataItemProps) {
  return (
    <li className="flex items-center justify-between border border-primary_2 rounded-md px-4 py-6 shadow-md">
      <div className="flex flex-col gap-2">
        <span className="text-primary_2 text-sm">{label}</span>
        <span className="text-primary_2 font-bold text-2xl">{children}</span>
      </div>

      <div>{icon}</div>
    </li>
  );
}

export default DashboardDataItem;
