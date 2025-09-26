import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import InputSearch from "../../ui/InputSearch";
import { useDisplayedProducts } from "../../contexts/DisplayedProductsContext";
import {
  FormProductsFilterInputs,
  productType,
} from "../../types/ProductsTypes";
import FilterMenu from "../../ui/FilterMenu";
import { useGetAllVariants } from "./useGetAllVariants";
import { getUniqueItems } from "../../utils/helpers";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerMini from "../../ui/SpinnerMini";

interface ProductsHeaderActionsBoxProps {
  btnName: string;
  allProducts?: productType[];
}

function ProductsHeaderActionsBox({
  btnName,
  allProducts = [],
}: ProductsHeaderActionsBoxProps) {
  const context = useDisplayedProducts();
  const {
    data: allVariants,
    isPending: isLoadingAllVariants,
    error: variantsError,
  } = useGetAllVariants();

  // calculate max price of all products
  let maxPrice = 0;
  if (allProducts?.length) {
    maxPrice = allProducts
      ?.map((product) => product.price)
      ?.reduce((acc, price) => Math.max(acc, price));
  }

  // get all unique colors
  const availableColors = getUniqueItems(
    allVariants?.map((variant) => variant.color) ?? []
  );

  // get all unique materials
  const availableMaterials = getUniqueItems(
    allProducts?.map((product) => product.material ?? "")
  );

  // get all unique categories
  const availableCategories = getUniqueItems(
    allProducts?.map((product) => product.category ?? "")
  );

  // construct product data with sizes & colors variants for every product(we get from variants table)
  const filterData = allProducts.flatMap((product) => {
    const productVariants = allVariants?.filter(
      (variant) => variant.productId === product.id
    );
    if (!productVariants || productVariants.length === 0) return [];

    const productSizes =
      getUniqueItems(productVariants.map((variant) => variant.size)) ?? [];

    const productColors =
      getUniqueItems(productVariants.map((variant) => variant.color)) ?? [];

    const allProductdata: productType = {
      images: product.images,
      title: product.title,
      discount: product.discount,
      price: product.price,
      id: product.id,
      ratingVal: product.ratingVal,
      available: product.available,
      sizes: productSizes,
      colors: productColors,
      material: product.material,
      category: product.category,
    };

    return allProductdata;
  });

  function onApplyFilters(inputValues: FormProductsFilterInputs) {
    const data = filterData.filter((product) => {
      // Category filter
      if (inputValues.category && product.category !== inputValues.category) {
        return false;
      }

      // Material filter
      if (inputValues.material && product.material !== inputValues.material) {
        return false;
      }

      // Size filter
      if (
        inputValues.size &&
        !product.sizes.includes(inputValues.size.toLowerCase())
      ) {
        return false;
      }

      // Color filter
      if (inputValues.color && !product.colors.includes(inputValues.color)) {
        return false;
      }

      // Price filter
      if (
        Number(inputValues.price) &&
        product.price > Number(inputValues.price)
      ) {
        return false;
      }

      // Discount filter
      if (inputValues.discount && product.discount <= 0) {
        return false;
      }

      // Stock filter
      if (inputValues.stock === "In Stock" && !product.available) {
        return false;
      }

      if (inputValues.stock === "Out of Stock" && product.available) {
        return false;
      }

      return true; // include product if all active filters match
    });

    context?.setDisplayedProducts(data);
  }

  function onResetFilters() {
    context?.setDisplayedProducts(allProducts);
  }

  if (variantsError?.message) {
    return <ErrorMessage errorMsg={variantsError.message} />;
  }

  if (!context || isLoadingAllVariants)
    return <SpinnerMini spinnerColor="border-primary_2" />;

  return (
    <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="max-md:order-last max-md:self-stretch">
        <InputSearch
          name="productsSearch"
          searchField="title"
          data={allProducts}
          setter={context.setDisplayedProducts}
          placeHolder="search by Title..."
        />
      </div>

      <div className="flex items-center gap-4 max-md:self-end">
        <Button>
          <Link to="product/create">{btnName}</Link>
        </Button>

        {/* filter button is embedded in Filter Menu Component */}
        <FilterMenu onApply={onApplyFilters}>
          <FilterMenu.CloseButton />

          <FilterMenu.Section title="Category" marginTop="mt-4">
            <FilterMenu.RadioGroup
              name="category"
              options={availableCategories}
            />
          </FilterMenu.Section>

          <FilterMenu.Section title="Size">
            <FilterMenu.SizeButtons
              name="size"
              sizes={["SM", "M", "L", "XL", "2XL"]}
            />
          </FilterMenu.Section>

          <FilterMenu.Section title="Color">
            <FilterMenu.ColorDots name="color" colors={availableColors} />
          </FilterMenu.Section>

          <FilterMenu.Section title="Price">
            <FilterMenu.PriceRange name="price" max={maxPrice} />
          </FilterMenu.Section>

          <FilterMenu.Section title="Material">
            <FilterMenu.RadioGroup
              name="material"
              options={availableMaterials}
            />
          </FilterMenu.Section>

          <FilterMenu.Section title="Stock Availability">
            <FilterMenu.RadioGroup
              name="stock"
              options={["In Stock", "Out of Stock"]}
            />
          </FilterMenu.Section>

          <FilterMenu.Section title="Discount">
            <FilterMenu.CheckboxGroup
              name="discount"
              options={["Discounted Items"]}
            />
          </FilterMenu.Section>

          <FilterMenu.ApplyButton />
          <FilterMenu.ResetButton onReset={onResetFilters} />
        </FilterMenu>
      </div>
    </div>
  );
}

export default ProductsHeaderActionsBox;
