export type SettingsType = {
  id: number;
  maxOrderPrice: number;
  minOrderPrice: number;
  orderCancel: boolean;
  cashonDelivery: boolean;
  lowStockQuantity: number;
  enableProductsTags: boolean;
  showOutofStockProducts: boolean;
  email: string;
  phoneNumber: string;
  itemsPerPage: number;
};

// -------------------
// FORM TYPES
// -------------------
export type SettingsFormValues = Partial<SettingsType>;

// export type SettingsFormValues = {
//   minOrderPrice: number;
//   maxOrderPrice: number;
//   orderCancel: boolean;
//   cod: boolean;
//   lowStockQuantity: number;
//   productsTags: boolean;
//   outofstockProducts: boolean;
//   contactEmail: string;
//   phoneNumber: string;
//   numItemsPerPage: number;
// };
