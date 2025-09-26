import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi2";
import { variantType } from "../../types/ProductsTypes";
import Color from "../../ui/Color";
import { Link } from "react-router-dom";

interface LowStockItemProps {
  variant: variantType;
  title: string;
  mainProductId: number;
}

function LowStockItem({ variant, title, mainProductId }: LowStockItemProps) {
  return (
    <li className="bg-ternary rounded-md grid grid-cols-[1fr_5fr_0.5fr] gap-1 p-3 relative max-lg:grid-cols-[1fr_6fr_1fr]">
      {!variant.stokeQuantity && (
        <span className=" absolute top-5 left-0 -rotate-45 bg-red-500 text-primary text-xs px-1 rounded-sm overflow-hidden">
          Sold Out
        </span>
      )}

      <HiOutlineExclamationTriangle className="w-7 h-7 text-red-500 self-center" />

      <div className="space-y-2">
        <div>
          <p className="text-primary_2 text-sm">
            {title.split(" ").slice(0, 4).join(" ")}...
          </p>
          <p className="text-gray-500 text-xs">
            only{" "}
            <span className="text-primary_2 font-semibold">
              {variant.stokeQuantity}
            </span>{" "}
            units left
          </p>
        </div>
        <div className="flex gap-4">
          <span className="text-gray-500 text-sm">
            size: {variant.size.toUpperCase()}
          </span>
          <div className="text-gray-500 text-sm flex items-center gap-1">
            <span className="text-sm text-gray-500">color:</span>
            <Color color={variant.color} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Link to={`/products/product/edit/${mainProductId}`}>
          <HiArrowRight className="w-6 h-6 text-primary_2 hover:text-secondary transition-colors duration-200" />
        </Link>
      </div>
    </li>
  );
}

export default LowStockItem;
