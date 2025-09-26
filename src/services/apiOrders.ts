import { OrderInfoType, OrderStatusType } from "../types/OrdersTypes";
import supabase from "./supabase";

/////////////
// GET
export async function getAllOrders() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    throw new Error(
      "Orders couldnot be loaded!! Please Check your internet connection"
    );
  }

  return { data, error };
}

export async function getOrder(id: number) {
  if (!id) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(
      "Order details couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getOrderItems(orderId: number) {
  if (!orderId) return null;

  const { data, error } = await supabase
    .from("orderItems")
    .select("*")
    .eq("orderId", orderId);

  if (error) {
    throw new Error(
      "Order Items couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getOrderItemVariant(productId: number) {
  if (!productId) return null;

  const { data, error } = await supabase
    .from("productVariants")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    throw new Error(
      "Order Item Variant couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getAllOrderItems() {
  const { data, error } = await supabase.from("orderItems").select("*");

  if (error) {
    throw new Error(
      "All Order Items couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

/////////////
// UPDATE
export async function updateOrderInfo({
  orderId,
  orderInfo,
}: {
  orderId: number;
  orderInfo: OrderInfoType;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      ...orderInfo,
    })
    .eq("id", orderId)
    .select();

  if (error || !data || data.length === 0) {
    throw new Error(
      "Order Info couldnot be Updated!! Please Check your internet connection"
    );
  }

  return data;
}

export async function updateOrderStatus({
  orderId,
  orderStatus,
  isPaid,
}: {
  orderId: number;
  orderStatus: OrderStatusType;
  isPaid: boolean;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      status: orderStatus,
      isPaid: isPaid,
    })
    .eq("id", orderId)
    .select();

  if (error || !data || data.length === 0) {
    throw new Error(
      "Order Status could not be updated! You may not have permission."
    );
  }

  return data;
}



export async function updateOrderTotalPrice({
  orderId,
  orderPrice,
}: {
  orderId: number;
  orderPrice: number;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update({
      totalPrice: orderPrice,
    })
    .eq("id", orderId)
    .select();

  if (error || !data || data.length === 0) {
    throw new Error(
      "Order Total Price couldnot be Updated!! Please Check your internet connection"
    );
  }

  return data;
}

export async function updateOrderItemQuantity({
  orderItemId,
  quantity,
  newPrice,
}: {
  orderItemId: number;
  quantity: number;
  newPrice: number;
}) {
  const { data, error } = await supabase
    .from("orderItems")
    .update({
      quantity: quantity,
      price: newPrice,
    })
    .eq("id", orderItemId)
    .select();

  if (error || !data || data.length === 0) {
    throw new Error(
      "Order Total Price couldnot be Updated!! Please Check your internet connection"
    );
  }

  return data;
}
