import { MainProductFormValues } from "../types/ProductsTypes";
import supabase, { supabaseUrl } from "./supabase";

//// Parameters types
interface productDataType {
  title: string;
  price: number;
  discount: number;
  description: string;
  material: string;
  available: boolean;
  ratingVal: number;
  ratingNo: number;
  images?: File[] | string[];
}

interface VariantsDataType {
  productId: number;
  color: string;
  price: number;
  size: string;
  stokeQuantity: number;
}

////// upload images to supabase storage
async function uploadImagesToStorage(images: File[], oldImages?: string[]) {
  const imagesUrls: string[] = oldImages?.length ? [...oldImages] : [];

  for (const image of images) {
    // remove any slashes "/" in images names (because they will create folders) and also here we make every name unique
    const imageName = `${Math.random()}-${image.name.replaceAll("/", "")}`;

    // upload image
    const { error: imagesError } = await supabase.storage
      .from("products-images")
      .upload(imageName, image);

    if (imagesError) {
      console.error(imagesError);
      throw new Error("Images could not be Uploaded to storage!!");
    }

    // create url for each image
    imagesUrls.push(
      `${supabaseUrl}/storage/v1/object/public/products-images//${imageName}`
    );
  }

  return imagesUrls;
}

/////////////
// GET
export async function getAllProducts() {
  const { data, error, count } = await supabase
    .from("products")
    .select("*", { count: "exact" });

  if (error) {
    throw new Error(
      "Products couldnot be loaded!! Please Check your internet connection"
    );
  }

  return { data, error, count };
}

export async function getProduct(id: number) {
  if (!id) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(
      "Product details couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getAllProductVariants(productId: number) {
  if (!productId) return null;

  const { data, error } = await supabase
    .from("productVariants")
    .select("*")
    .eq("productId", productId);

  if (error) {
    throw new Error(
      "All Product Variants couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getAllVariants() {
  const { data, error } = await supabase.from("productVariants").select("*");

  if (error) {
    throw new Error(
      "all variants couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getVariantData(variantId: number) {
  const { data, error } = await supabase
    .from("productVariants")
    .select("*")
    .eq("id", variantId)
    .single();

  if (error) {
    throw new Error(
      "Variant Stock Quantity couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getAllProductImages(productId: number) {
  if (!productId) return null;

  const { data, error } = await supabase
    .from("variantsImages")
    .select("*")
    .eq("productId", productId);

  if (error) {
    throw new Error(
      "Product Images couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

export async function getAllImages() {
  const { data, error } = await supabase.from("variantsImages").select("*");

  if (error) {
    throw new Error(
      "Images couldnot be loaded!! Please Check your internet connection"
    );
  }

  return data;
}

////////////////////////
// UPDATE
export async function updateMainProduct({
  id,
  editedData,
}: {
  id: number | undefined;
  editedData: MainProductFormValues;
}) {
  if (!id) {
    throw new Error("Product id doesnot exist");
  }

  let imagesUrls: string[] = [];
  // check if new image uploaded
  if (typeof editedData.images[0] !== "string") {
    //1- Remove old existing image from supabase storage
    const product = await getProduct(id);
    const imgName = product?.images?.at(0).split("/").at(-1) || "";
    await removeImageFromStorage(imgName);

    //2- upload new image to supabase storage
    imagesUrls = await uploadImagesToStorage(editedData.images as File[]);
  } else {
    imagesUrls = editedData.images as string[];
  }
  const { data, error } = await supabase
    .from("products")
    .update({ ...editedData, images: imagesUrls })
    .eq("id", id)
    .select()
    .single();

  if (error || !data || data.length === 0) {
    throw new Error("Product could not be Updated!!");
  }

  return data;
}

export async function updateQuantity({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  if (!id || id < 0) return null;

  const { data, error } = await supabase
    .from("productVariants")
    .update({ stokeQuantity: quantity })
    .eq("id", id)
    .select()
    .single();

  if (error || !data || data.length === 0) {
    throw new Error("Stock Quantity could not be Updated!!");
  }

  return data;
}

export async function updateVarinatsImages({
  id,
  newimages,
  oldImages,
}: {
  id: number;
  newimages: File[];
  oldImages: string[];
}) {
  // const imagesUrls: string[] = [...oldImages];

  // 1- Upload Images to supabase storage
  // for (const image of newimages) {
  //   // remove any slashes "/" in images names (because they will create folders) and also here we make every name unique
  //   const imageName = `${Math.random()}-${image.name.replaceAll("/", "")}`;
  //   // upload image
  //   const { error: imagesError } = await supabase.storage
  //     .from("products-images")
  //     .upload(imageName, image);

  //   if (imagesError) {
  //     console.error(imagesError);
  //     throw new Error("Images could not be Uploaded!!");
  //   }

  //   // create url for each image
  //   imagesUrls.push(
  //     `${supabaseUrl}/storage/v1/object/public/products-images//${imageName}`
  //   );
  // }

  const imagesUrls = await uploadImagesToStorage(newimages, oldImages);

  // 2- update images in database table
  const { data, error } = await supabase
    .from("variantsImages")
    .update({ images: imagesUrls })
    .eq("id", id)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Images could not be Updated!!");
  }

  return data;
}

export async function updateImages({
  id,
  imagesUrls,
}: {
  id: number;
  imagesUrls: string[];
}) {
  const { data, error } = await supabase
    .from("variantsImages")
    .update({ images: imagesUrls })
    .eq("id", id)
    .select();

  if (error || !data || data.length === 0) {
    throw new Error("Images could not be Updated!!");
  }

  return data;
}

export async function updateProductAvailable({
  productId,
  available,
}: {
  productId: number;
  available: boolean;
}) {
  const { data, error } = await supabase
    .from("products")
    .update({ available: available })
    .eq("id", productId)
    .select()
    .single();

  if (error || !data || data.length === 0) {
    throw new Error("Product could not be Deleted!!");
  }

  return data;
}

////////////////////////
// Delete
export async function deleteSizeVariant(id: number) {
  const { error, data } = await supabase
    .from("productVariants")
    .delete()
    .eq("id", id)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Size cannot be deleted!");
  }
}

export async function removeImageFromStorage(urls: string | string[]) {
  const { error, data } = await supabase.storage
    .from("products-images")
    .remove(Array.isArray(urls) ? urls : [urls]);

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Image cannot be deleted From Storage!");
  }
}

export async function deleteGroupSizeVariants(ids: number[]) {
  const { error, data } = await supabase
    .from("productVariants")
    .delete()
    .in("id", ids)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Size variants cannot be deleted!");
  }
}

export async function deleteImageVariantItem(id: number) {
  const { error, data } = await supabase
    .from("variantsImages")
    .delete()
    .eq("id", id)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    throw new Error("Image variant item cannot be deleted!");
  }
}

export async function deleteColorVariant({
  colorId,
  colorImages,
  sizeVariantsIds,
}: {
  colorId: number;
  colorImages: string[];
  sizeVariantsIds: number[];
}) {
  //1- delete images related to this color
  //----remove image from storage
  if (colorImages.length) {
    await removeImageFromStorage(colorImages);
  }
  //----delete image variant item
  await deleteImageVariantItem(colorId);

  //2- delete size variants related to this color
  await deleteGroupSizeVariants(sizeVariantsIds);
}

////////////////////////
// Create
export async function createProductVariant(variantData: VariantsDataType) {
  const { data, error } = await supabase
    .from("productVariants")
    .insert([{ ...variantData }])
    .select();

  if (error) {
    throw new Error("Size Variant could not be Added!!");
  }

  return data;
}

export async function addColorVariant(variantData: {
  productId: number;
  color: string;
}) {
  const { data, error } = await supabase
    .from("variantsImages")
    .insert([{ ...variantData }])
    .select();

  if (error) {
    throw new Error("Color could not be Added!!");
  }

  return data;
}

export async function createMainProduct(productData: productDataType) {
  //1- upload main image to supabase storage
  const imagesUrls = await uploadImagesToStorage(productData.images as File[]);

  // 2- create New Product
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...productData, images: imagesUrls }])
    .select();

  if (error) {
    throw new Error("Product could not be created!!");
  }

  return data;
}
