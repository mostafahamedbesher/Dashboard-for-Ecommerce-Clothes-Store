import { ReactNode } from "react";

interface ErrorFormProps {
  children: ReactNode;
  margin?: string;
}

function ErrorForm({ children, margin = "" }: ErrorFormProps) {
  return (
    <div className={`text-red-500 text-xs ${margin ? margin : "mt-1"}`}>
      {children}
    </div>
  );
}

export default ErrorForm;
