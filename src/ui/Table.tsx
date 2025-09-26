// I implemented this Table component using compound component pattern to be more flexible

import { createContext, ReactNode, useContext } from "react";

interface TableProps {
  children?: ReactNode;
  columns: string;
  style?: string;
}

interface RowProps {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
}

interface FooterProps {
  children: ReactNode;
}

interface TableContextType {
  columns: string;
}

// create context
const tableContext = createContext<TableContextType>({ columns: "" });

// Parent component
function Table({ children, columns, style }: TableProps) {
  return (
    <div
      className={`${
        style ? style : "border border-gray-300"
      } rounded-md min-w-[900px]`}
    >
      <tableContext.Provider value={{ columns }}>
        <div role="table" className="">
          {children}
        </div>
      </tableContext.Provider>
    </div>
  );
}

// child components
function TableRow({ children }: RowProps) {
  const { columns } = useContext(tableContext);

  return (
    <div
      role="row"
      className="grid gap-6 border-b-2 py-4 px-3 text-primary_2"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function TableHeader({
  children,
  bgColor = "bg-ternary",
  textColor = "text-primary_2",
}: RowProps) {
  const { columns } = useContext(tableContext);
  return (
    <header
      // role="row"
      className={`grid gap-6 border-b-2 p-3 text-primary_2 ${bgColor} ${textColor}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </header>
  );
}

function TableFooter({ children }: FooterProps) {
  return <div className="py-4 px-3 text-primary_2 bg-ternary">{children}</div>;
}

// Add child components as Properties to the Parent component
Table.TableRow = TableRow;
Table.TableHeader = TableHeader;
Table.TableFooter = TableFooter;

export default Table;
