import { ReactNode } from "react";

interface BoxFormProps {
  children: ReactNode;
}

function BoxForm({ children }: BoxFormProps) {
  return (
    <div className="bg-ternary rounded-md mt-4 py-8 px-4 space-y-6">
      {children}
    </div>
  );
}

export default BoxForm;
