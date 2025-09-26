import { ReactNode } from "react";

interface ChartBoxProps {
  heading: string;
  children: ReactNode;
  Filter: ReactNode;
}

function ChartBox({ heading, children, Filter }: ChartBoxProps) {
  return (
    <div className="px-4 py-6 border border-primary_2 rounded-md space-y-8 ">
      <div className="flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:items-start">
        <h3 className="text-primary_2 text-xl font-semibold max-md:text-lg">
          {heading}
        </h3>

        {Filter}
      </div>

      {children}
    </div>
  );
}

export default ChartBox;
