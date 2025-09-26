import { ReactNode } from "react";

interface SettingsCategoryBoxProps {
  children: ReactNode;
}

function SettingsCategoryBox({ children }: SettingsCategoryBoxProps) {
  return <div className="p-8 rounded-sm bg-ternary max-xs:p-4">{children}</div>;
}

export default SettingsCategoryBox;
