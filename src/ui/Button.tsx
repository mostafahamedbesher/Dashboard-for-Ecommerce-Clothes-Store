import { ReactNode } from "react";

const buttonTypes = {
  submit: "submit",
  button: "button",
  reset: "reset",
};

interface ButtonProps {
  children: ReactNode;
  style?: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: keyof typeof buttonTypes;
}

function Button({
  children,
  style,
  color,
  onClick,
  textColor,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${style ? style : "py-2 px-3"}  ${
        disabled ? " opacity-80" : ""
      } ${color ? color : "bg-secondary hover:bg-secondary_2"} ${
        textColor ? textColor : "text-primary_4"
      } rounded-sm transition-all duration-200 max-xs:text-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
