import { HiOutlineTrash } from "react-icons/hi2";
import Color from "./Color";

interface ColorFormProps {
  color: string;
}

function ColorForm({ color }: ColorFormProps) {
  return (
    <div className="flex items-center gap-2 border border-primary_2 py-1 px-2 rounded-sm">
      <Color color={color} />
      <button type="button" className="block">
        <HiOutlineTrash className="w-5 h-5 hover:text-red-600 transition-colors duration-200" />
      </button>
    </div>
  );
}

export default ColorForm;
