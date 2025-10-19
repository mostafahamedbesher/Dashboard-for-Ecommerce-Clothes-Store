import { OrderItemType } from "../../types/OrdersTypes";
import Spinner from "../../ui/Spinner";
import { useGetAllOrderItems } from "../orders/useGetAllOrderItems";
import { useGetAllImages } from "../products/useGetAllImages";
import { useGetAllVariants } from "../products/useGetAllVariants";
import TopSellingItem from "./TopSellingItem";

type TopSellingType = {
  productId: number;
  item: OrderItemType;
  count: number;
  revenue: number;
  image: string;
};

function TopSellingList() {
  const { data: orderItems, isPending: isLoadingOrderItems } =
    useGetAllOrderItems();

  const { data: images, isPending: isLoadingImages } = useGetAllImages();
  const { data: variants, isPending: isLoadingVariants } = useGetAllVariants();

  /// solution to build TopSelling array///
  ///// solution 1 (my solution) --> bad complexity --> O(n^2)/////
  // // build topSelling array
  // const topSellingItems: TopSellingType[] = [];
  // orderItems?.forEach((item) => {
  //   const foundItem = topSellingItems.find(
  //     (topSellingItem) => topSellingItem.productId === item.productId
  //   );

  //   const orderItemProductId = variants?.find(
  //     (variant) => variant.id === item.productId
  //   )?.productId;

  //   const image = images
  //     ?.find((imgItem) => imgItem.productId === orderItemProductId)
  //     ?.images?.at(0);

  //   // get only unique items
  //   if (foundItem) {
  //     foundItem.count += item.quantity;
  //     foundItem.revenue += item.price;
  //   } else {
  //     topSellingItems.push({
  //       productId: item.productId,
  //       item,
  //       count: item.quantity,
  //       revenue: item.price,
  //       image,
  //     });
  //   }
  // });

  ///// solution 2 (chatgpt solution) --> better complexity --> O(n) /////
  // Build a map of variantId → productId
  const variantToProductIdMap = new Map<number, number>();
  variants?.forEach((variant) => {
    variantToProductIdMap.set(variant.id, variant.productId);
  });

  // Build a map of{ productId,color} → firstImage
  const productIdToImageMap = new Map<string, string>();
  images?.forEach((imgItem) => {
    if (imgItem.images?.length) {
      productIdToImageMap.set(
        JSON.stringify({ productId: imgItem.productId, color: imgItem.color }),
        imgItem.images[0]
      );
    }
  });

  const topSellingMap = new Map<string, TopSellingType>();

  orderItems?.forEach((item) => {
    const productId = variantToProductIdMap.get(item.productId)!;
    const image =
      productIdToImageMap.get(
        JSON.stringify({ productId, color: item.color })
      ) || "";

    const existing = topSellingMap.get(
      JSON.stringify({ productId, color: item.color })
    );

    if (existing) {
      existing.count += item.quantity;
      existing.revenue += item.price;
    } else {
      topSellingMap.set(JSON.stringify({ productId, color: item.color }), {
        productId: item.productId,
        item,
        count: item.quantity,
        revenue: item.price,
        image,
      });
    }
  });

  const topSellingItems = Array.from(topSellingMap.values());

  const sortedTopSellingItems = topSellingItems
    .slice()
    .sort((a, b) => b.count - a.count);

  if (isLoadingOrderItems || isLoadingImages || isLoadingVariants) {
    return <Spinner spinnerColor="border border-primary_2" />;
  }

  return (
    <ul className="space-y-4 max-xs:space-y-3 h-[350px]">
      {sortedTopSellingItems.slice(0, 5).map((item) => (
        <TopSellingItem
          key={item.item.id}
          item={item.item}
          count={item.count}
          revenue={item.revenue}
          image={item.image}
        />
      ))}
    </ul>
  );
}

export default TopSellingList;
