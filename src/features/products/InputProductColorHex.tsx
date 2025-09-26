import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AddColorFormValues } from "../../types/ProductsTypes";

function InputProductColorHex() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<AddColorFormValues>();

  const color = useWatch({ control, name: "color" });

  // Validate hex color pattern
  const isValidHex = (value: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

  useEffect(() => {
    if (isValidHex(color)) {
      setValue("color", color, { shouldValidate: true, shouldDirty: true });
    }
  }, [color, setValue]);

  return (
    <div className="grid grid-cols-[7rem_1fr] items-start gap-4 max-xs:grid-cols-1 max-xs:gap-1">
      <label
        htmlFor="colorText"
        className="text-primary_2 text-lg w-28 max-xs:text-base"
      >
        Color hex
      </label>
      <div className="w-full">
        <input
          id="colorText"
          type="text"
          className="w-full h-10 p-2 border border-primary_2 rounded-sm text-primary_2 bg-primary"
          {...register("color", {
            required: "Color is required",
            pattern: {
              value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              message: "Invalid hex color (e.g., #fff or #ffffff)",
            },
          })}
        />
        {errors.color && (
          <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
        )}
      </div>
    </div>
  );
}

export default InputProductColorHex;
