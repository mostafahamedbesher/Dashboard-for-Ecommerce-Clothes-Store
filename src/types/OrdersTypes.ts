export type OrderStatusType = "pending" | "shipped" | "canceled" | "delivered";

export type OrderType = {
  id: number;
  created_at: string;
  userId: number;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  postalCode: number;
  phoneNumber: number;
  status: OrderStatusType;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
};

export type OrderInfoType = Partial<
  Pick<
    OrderType,
    | "firstName"
    | "lastName"
    | "address"
    | "phoneNumber"
    | "shippingPrice"
    | "totalPrice"
  >
>;

export type OrderParams = {
  orderId: string;
};

export type OrderItemType = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  title: string;
  color: string;
  size: string;
};

export type QuantityMode = "edit" | "display";

// -------------------
// FORM TYPES
// -------------------
export type OrderInfoFormValues = {
  customerFirstName: string;
  customerLastName: string;
  phone: number;
  address: string;
  orderDate: string;
};

export type OrderStatusFormValues = {
  status: OrderStatusType;
  paymentStatus: string;
};

export interface FormOrdersFilterInputs {
  orderStatus: OrderStatusType;
  orderPrice: number;
}

export type OrderSortFormValues = {
  sortOrders: string;
};
