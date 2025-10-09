import { FormProvider, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useAddSize } from "./useAddSize";
import ErrorForm from "../../ui/ErrorForm";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import { AddSizeFormValues } from "../../types/ProductsTypes";
import { sizesSchema } from "../../utils/constants";

interface FormSizeAddProps {
  productId: number;
  price: number;
  sizes: string[];
  selectedColor: string;
}

// const sizesOptions = [
//   { label: "sm", value: "sm" },
//   { label: "m", value: "m" },
//   { label: "l", value: "l" },
//   { label: "xl", value: "xl" },
//   { label: "2xl", value: "2xl" },
// ];

const sizesOptions = sizesSchema.map((size) => {
  return { label: size, value: size };
});

function FormSizeAdd({
  productId,
  price,
  sizes = [],
  selectedColor,
}: FormSizeAddProps) {
  const formMethods = useForm<AddSizeFormValues>();
  const { handleSubmit, formState } = formMethods;

  const { mutate, isPending } = useAddSize(productId);
  // get Error Messages
  const { errors } = formState;

  function handleFormAdd(data: AddSizeFormValues) {
    // check if selected size is already exists as product variant or Quantity is negative Number
    const isSizeExists = sizes.includes(data.size);
    if (isSizeExists || data.quantity < 0) return;

    // insert data to database
    const variantData = {
      productId,
      price,
      color: selectedColor,
      size: data.size,
      stokeQuantity: Number(data.quantity),
    };

    mutate(variantData);
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handleFormAdd)}
        className="flex flex-col items-center gap-4 m-2"
      >
        {/* size */}
        <div>
          <div className="grid grid-cols-2 items-center gap-4 w-52">
            <SelectInput
              labelText="Size"
              id="size-select"
              name="size"
              options={sizesOptions}
              disabled={isPending}
              validation={{
                validate: (value) => {
                  if (sizes.includes(value)) {
                    return "Size Already Exists";
                  }
                },
              }}
            />
          </div>

          {errors.size?.message && <ErrorForm>{errors.size.message}</ErrorForm>}
        </div>

        {/* Quantity */}
        <div>
          <div className="grid grid-cols-2 items-center gap-4 w-52">
            <Input
              type="number"
              labelWidth="w-20"
              id="sizeQuantity"
              style="border border-primary_2 rounded-sm p-2 text-primary_2 w-full bg-primary"
              labelText="Quantity"
              name="quantity"
              defaultValue={0}
              disabled={isPending}
              validation={{
                required: "Quantity is required",
                min: {
                  value: 0,
                  message: "Quantity should be at least 0",
                },
                max: {
                  value: 99,
                  message: "Quantity should be less than 99",
                },
              }}
            />
          </div>

          {errors.quantity?.message && (
            <ErrorForm>{errors.quantity?.message}</ErrorForm>
          )}
        </div>

        <div className="w-full mt-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Size"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FormSizeAdd;
