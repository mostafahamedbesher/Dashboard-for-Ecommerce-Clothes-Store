import { OrderItemType } from "../../types/OrdersTypes";

interface TopSellingItemProps {
  item: OrderItemType;
  count: number;
  revenue: number;
  image: string;
}

function TopSellingItem({ item, count, revenue, image }: TopSellingItemProps) {
  return (
    <li className="grid grid-cols-[1fr_4fr] gap-2 max-lg:grid-cols-[1fr_6fr]">
      <div>
        <img
          // src="https://lphbzyzalwcxbdijqkhc.supabase.co/storage/v1/object/public/products-images/image-2.jpg"
          src={image}
          alt="product image"
          className="w-16 h-16 max-lg:w-14 max-lg:h-14 rounded-sm"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-primary_2 text-sm">
          {item.title.split(" ").slice(0, 4).join(" ")}...
        </p>

        <div className="text-gray-400 text-xs space-x-1">
          <span>{count} sold</span>
          <span className="text-lg font-semibold">.</span>
          <span>${revenue.toFixed(2)} revenue</span>
        </div>
      </div>
    </li>
  );
}

export default TopSellingItem;
