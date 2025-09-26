import { useFormContext } from "react-hook-form";
import { ReactNode, useRef } from "react";
import { HiOutlineArrowUpOnSquare } from "react-icons/hi2";
import ErrorForm from "../../ui/ErrorForm";

interface InputImageProps {
  name: string;
  label?: string;
  isUpdatingImages?: boolean;
  requiredMessage?: string | boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

function InputImage({
  name,
  label = "Upload Images",
  isUpdatingImages = false,
  requiredMessage,
  accept = "image/*",
  multiple = true,
  className = "",
}: InputImageProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <input
        id={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={isUpdatingImages}
        {...register(name, {
          required: requiredMessage,
        })}
        ref={(e) => {
          register(name).ref(e);
          fileInputRef.current = e;
        }}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={isUpdatingImages}
        className="flex items-center justify-center gap-2 px-8 max-lg:px-4  py-3 bg-primary text-primary_2 border border-dashed border-primary_2 rounded-sm hover:bg-secondary hover:text-primary hover:border-primary disabled:opacity-50 transition-all duration-200"
      >
        <HiOutlineArrowUpOnSquare className="w-7 h-7 max-lg:w-6 max-lg:h-6" />
        <span className="whitespace-nowrap">{label}</span>
      </button>

      {errors[name]?.message && (
        <ErrorForm>{errors[name]?.message as ReactNode}</ErrorForm>
      )}
    </div>
  );
}

export default InputImage;
