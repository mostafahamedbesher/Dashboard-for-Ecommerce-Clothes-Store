import RadioColor from "../../ui/RadioColor";

interface RadioColorsGroupProps {
  colors: string[];
}

function RadioColorsGroup({ colors }: RadioColorsGroupProps) {
  return (
    <fieldset className="bg-primary py-4 px-6 rounded-md w-fit max-md:w-full">
      <legend className="text-primary_2 mb-2">Available Colors</legend>
      <div className="flex items-end gap-4 max-sm:flex-col max-sm:items-start">
        <p>Select Color to Edit: </p>
        <div className="flex items-center gap-4 flex-wrap">
          {colors.map((color) => (
            <RadioColor
              name="colors"
              // selectedColor={selectedColor}
              key={color}
              value={color}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default RadioColorsGroup;
