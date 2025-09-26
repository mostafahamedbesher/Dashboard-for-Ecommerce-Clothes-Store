import Button from "./Button";

interface ButtonResetCurrentFilterProps {
  onClick: () => void;
}

function ButtonResetCurrentFilter({ onClick }: ButtonResetCurrentFilterProps) {
  return (
    <Button
      style="px-2 border border-primary_2 text-sm absolute top-4 right-2"
      color="bg-primary"
      textColor="text-primary_2"
      onClick={onClick}
    >
      Clear
    </Button>
  );
}

export default ButtonResetCurrentFilter;
