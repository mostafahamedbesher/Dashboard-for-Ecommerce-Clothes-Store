import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  style: string;
  children: ReactNode;
}

function LinkButton({ to, style, children }: LinkButtonProps) {
  return (
    <Link to={to} className={`${style} transition-colors duration-200`}>
      {children}
    </Link>
  );
}

export default LinkButton;
