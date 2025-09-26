// ---- this form is used for creating & Editing Product ---- //

import { FormProvider, useForm } from "react-hook-form";
import BoxForm from "../../ui/BoxForm";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import ErrorForm from "../../ui/ErrorForm";
import { useUpdateMainProduct } from "./useUpdateMainProduct";
import { useAddMainProduct } from "./useAddMainProduct";
import InputImage from "./InputImage";
import { MainProductFormValues, productType } from "../../types/ProductsTypes";

interface FormEditProps {
  productData: productType;
  isEditSession: boolean;
}

function FormProductEdit({ productData, isEditSession }: FormEditProps) {
  const {
    title,
    price,
    discount,
    material,
    category,
    description,
    id,
    images,
  } = productData ?? {};

  // console.log(images);

  const formMethods = useForm<MainProductFormValues>({
    defaultValues: isEditSession
      ? {
          title,
          price,
          discount,
          description,
          material,
          category,
        }
      : {},
  });

  const { handleSubmit, getValues, formState } = formMethods;
  const { errors } = formState;

  const { mutate: EditProduct, isPending: isEditing } =
    useUpdateMainProduct(id);

  const { mutate: createProduct, isPending: isCreating } = useAddMainProduct();

  // decide we are creating or editing a product
  const isSubmitting = isEditing || isCreating;

  function handleFormSubmit(data: MainProductFormValues) {
    // console.log(data);
    // we should first convert (price,discount) values ==> should be numbers
    const newData = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
    };

    if (isEditSession) {
      const editedImages = data.images.length ? data.images : images;
      EditProduct({ id, editedData: { ...newData, images: editedImages } });
      // EditProduct({ id, editedData: newData });
    } else {
      createProduct({
        ...newData,
        available: true,
        ratingNo: 0,
        ratingVal: 0,
      });
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-4"
      >
        <BoxForm>
          <Heading name="General Product Mangement" size="tiny" />

          {/* Edit Original Product */}
          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            <div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
                <Input
                  type="text"
                  id="title"
                  labelText="Title"
                  placeholder="title"
                  name="title"
                  disabled={isSubmitting}
                  validation={{
                    required: "Product title is required",
                    minLength: {
                      value: 3,
                      message: "Product title must be at least 3 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Product title must be less than 100 characters",
                    },
                  }}
                />
              </div>
              {errors.title?.message && (
                <ErrorForm margin="mt-1 ml-32">
                  {errors.title.message}
                </ErrorForm>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
                <Input
                  type="number"
                  id="price"
                  labelText="Price"
                  placeholder="price"
                  name="price"
                  disabled={isSubmitting}
                  validation={{
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be positive",
                    },
                    max: {
                      value: 10000,
                      message: "Price must be less than 10,000",
                    },
                  }}
                />
              </div>
              {errors.price?.message && (
                <ErrorForm margin="mt-1 ml-32">
                  {errors.price.message}
                </ErrorForm>
              )}
            </div>

            <div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
                <Input
                  type="number"
                  id="discount"
                  labelText="Discount"
                  placeholder="discount"
                  name="discount"
                  disabled={isSubmitting}
                  validation={{
                    required: "Discount is required",
                    min: {
                      value: 0,
                      message: "Discount must be positive",
                    },
                    validate: (value) =>
                      Number(value) <= getValues().price ||
                      "discount must be less than or equal price",
                  }}
                />
              </div>
              {errors.discount?.message && (
                <ErrorForm margin="mt-1 ml-32">
                  {errors.discount.message}
                </ErrorForm>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
                <Input
                  type="text"
                  id="category"
                  labelText="Category"
                  placeholder="category"
                  name="category"
                  disabled={isSubmitting}
                  validation={{
                    required: "Product category is required",
                    minLength: {
                      value: 3,
                      message: "Product category must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Product category must be less than 20 characters",
                    },
                  }}
                />
              </div>
              {errors.category?.message && (
                <ErrorForm margin="mt-1 ml-32">
                  {errors.category.message}
                </ErrorForm>
              )}
            </div>

            <div>
              <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
                <Input
                  type="text"
                  id="material"
                  labelText="Material"
                  placeholder="material"
                  name="material"
                  disabled={isSubmitting}
                  validation={{
                    required: "Product material is required",
                    minLength: {
                      value: 3,
                      message: "Product material must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Product material must be less than 20 characters",
                    },
                  }}
                />
              </div>
              {errors.material?.message && (
                <ErrorForm margin="mt-1 ml-32">
                  {errors.material.message}
                </ErrorForm>
              )}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
              <Textarea
                id="descriptionArea"
                labelText="Description"
                placeholder="description..."
                name="description"
                disabled={isSubmitting}
                validation={{
                  required: "Product description is required",
                  minLength: {
                    value: 20,
                    message:
                      "Product description must be at least 20 characters",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Product description must be less than 500 characters",
                  },
                }}
              />
            </div>
            {errors.description?.message && (
              <ErrorForm margin="mt-1 ml-32">
                {errors.description.message}
              </ErrorForm>
            )}
          </div>

          <div className="grid grid-cols-[max-content_1fr] items-center gap-4 max-sm:grid-cols-1 max-sm:gap-1">
            <p className="whitespace-nowrap text-primary_2 w-28">Main Image</p>
            <div className="flex justify-center items-center border border-dashed border-primary_2 w-full h-40">
              <InputImage
                name="images"
                label="Select Image"
                multiple={false}
                requiredMessage={isEditSession ? false : "image is required"}
              />
            </div>
          </div>

          <div className="w-fit ml-auto">
            <Button type="submit" style="px-5 py-2" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </BoxForm>
      </form>
    </FormProvider>
  );
}

export default FormProductEdit;
