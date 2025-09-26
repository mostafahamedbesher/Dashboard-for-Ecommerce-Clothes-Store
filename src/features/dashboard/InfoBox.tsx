import { ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  headingText: string;
}

function InfoBox({ children, headingText }: InfoBoxProps) {
  return (
    <div className="p-4 border border-primary_2 rounded-md space-y-4">
      <h2 className="text-xl text-primary_2 font-semibold">{headingText}</h2>

      <div>{children}</div>
    </div>
  );
}

export default InfoBox;
