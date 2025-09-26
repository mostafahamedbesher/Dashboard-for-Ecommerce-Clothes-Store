import { useFormContext } from "react-hook-form";
import { VariantsProductFormValues } from "../types/ProductsTypes";
import Color from "./Color";

interface RadioColorProps {
  value: string;
  name: keyof VariantsProductFormValues;
}

function RadioColor({ value, name }: RadioColorProps) {
  const { register } = useFormContext<VariantsProductFormValues>();

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        {...register(name)}
        className="appearance-none w-3 h-3 rounded-full
          ring-2 ring-offset-2 ring-primary_2 bg-primary_4 checked:bg-secondary checked:ring-secondary hover:ring-secondary
          transition-all duration-150 ease-in-out cursor-pointer"
      />
      <Color color={value} size="medium" />
    </label>
  );
}

export default RadioColor;
