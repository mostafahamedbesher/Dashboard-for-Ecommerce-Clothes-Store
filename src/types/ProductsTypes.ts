export type productType = {
  images: string[];
  title: string;
  discount: number;
  price: number;
  sizes: string[];
  colors: string[];
  id: number;
  ratingVal: number;
  available: boolean;
  material?: string;
  category?: string;
  description?: string;
};

export type variantType = {
  id: number;
  productId: number;
  stokeQuantity: number;
  price: number;
  size: string;
  color: string;
};

// -------------------
// FORM TYPES
// -------------------
export type MainProductFormValues = {
  title: string;
  price: number;
  discount: number;
  material: string;
  category: string;
  description: string;
  images: File[] | string[];
};

export type AddSizeFormValues = {
  size: string;
  quantity: number;
};

export type AddColorFormValues = {
  color: string;
};

export type VariantsProductFormValues = {
  colors: string;
  sizesQuantity: {
    [variantId: string]: number;
  };
  images: File[];
};

export interface FormProductsFilterInputs {
  category: string;
  price: number;
  discount: boolean;
  size: string;
  color: string;
  stock: string;
  material: string;
}
