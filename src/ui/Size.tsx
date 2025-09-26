interface SizeProps {
  size: string;
}

function Size({ size }: SizeProps) {
  return (
    <span className="p-1 border border-primary_2 rounded-sm uppercase text-xs text-center bg-ternary text-primary_2">
      {size}
    </span>
  );
}

export default Size;
