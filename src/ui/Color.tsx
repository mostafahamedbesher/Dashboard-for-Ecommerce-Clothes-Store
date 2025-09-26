const sizes = {
  tiny: "w-4 h-4",
  small: "w-5 h-5",
  medium: "w-6 h-6",
  large: "w-7 h-7",
};

interface ColorProps {
  color: string;
  size?: keyof typeof sizes;
}

function Color({ color, size = "tiny" }: ColorProps) {
  return (
    <div
      className={`${sizes[size]} border border-primary_2 rounded-sm`}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default Color;
