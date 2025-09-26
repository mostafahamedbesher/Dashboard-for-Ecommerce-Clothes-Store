import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  margin?: string;
}

function Box({ children, margin }: BoxProps) {
  return (
    <div
      className={`text-primary_2 bg-ternary p-4 rounded-md flex flex-col gap-3 ${margin}`}
    >
      {children}
    </div>
  );
}

export default Box;
