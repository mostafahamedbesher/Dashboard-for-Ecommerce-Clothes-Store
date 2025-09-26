import { useFormContext, useWatch } from "react-hook-form";
import { AddColorFormValues } from "../types/ProductsTypes";

function InputColor() {
  const { control, setValue } = useFormContext<AddColorFormValues>();
  const color = useWatch({ control, name: "color" });

  const isValidHex = (val: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val);

  // Only render the input when value is defined
  if (typeof color === "undefined") return null;

  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-4 max-xs:grid-cols-1 max-xs:gap-1">
      <label
        htmlFor="colorInput"
        className="text-primary_2 text-lg block w-28 whitespace-nowrap max-xs:text-base"
      >
        Select Color
      </label>
      <input
        type="color"
        id="colorInput"
        className="w-14 h-10 border border-primary_2 rounded-sm p-[2px]"
        value={isValidHex(color) ? color : ""}
        onChange={(e) =>
          setValue("color", e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      />
    </div>
  );
}

export default InputColor;
