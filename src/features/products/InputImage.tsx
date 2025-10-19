import { useFormContext } from "react-hook-form";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
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
  resetTrigger?: number;
}

function InputImage({
  name,
  label = "Upload Images",
  isUpdatingImages = false,
  requiredMessage,
  accept = "image/*",
  multiple = true,
  className = "",
  resetTrigger,
}: InputImageProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // this state shows count of selected files
  const [filesCount, setFilesCount] = useState<number>(0);
  // this state displays each selected image file
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // handles filesCount & PreviewImages states when selected
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFilesCount(selectedFiles.length);

    // add images url to preview them
    const imagesUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreview(imagesUrls);
  };

  // this effect is used only to cleanup created previewed images object URLs to avoid memory leaks
  useEffect(
    function () {
      // clean up function
      return () => {
        imagePreview.map((url) => URL.revokeObjectURL(url));
      };
    },
    [imagePreview]
  );

  // this effect is used to reset filesCount & ResetTrigger states After submitting the form(controlled by resetTrigger state )
  useEffect(
    function () {
      if (resetTrigger) {
        setFilesCount(0);
        setImagePreview([]);
      }
    },
    [resetTrigger]
  );

  // Destructure onChange from register to compose it with your onChange handler
  const { onChange: onChangeFromRegister, ...registerRest } = register(name, {
    required: requiredMessage,
  });

  const composedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Call the form original onChange first to register files in form state
    onChangeFromRegister(e);
    // handle preview images & files count badge
    handleChange(e);
  };

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <input
        id={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={isUpdatingImages}
        {...registerRest}
        ref={(e) => {
          register(name).ref(e);
          fileInputRef.current = e;
        }}
        className="hidden"
        onChange={composedOnChange}
      />

      <div className="flex items-center gap-4 max-sm:flex-col">
        <button
          type="button"
          onClick={handleClick}
          disabled={isUpdatingImages}
          className="flex items-center justify-center gap-2 px-8 max-lg:px-4  py-3 bg-primary text-primary_2 border border-dashed border-primary_2 rounded-sm hover:bg-secondary hover:text-primary_4 hover:border-primary disabled:opacity-50 transition-all duration-200"
        >
          <HiOutlineArrowUpOnSquare className="w-7 h-7 max-lg:w-6 max-lg:h-6" />
          <span className="whitespace-nowrap">{label}</span>
        </button>

        {/* count files badge */}
        {filesCount > 0 && (
          <span className="bg-secondary text-primary_4 px-3 py-1 rounded-full text-sm font-medium max-sm:hidden">
            {filesCount} {filesCount === 1 ? "file" : "files"} selected
          </span>
        )}
      </div>

      {/* images preview cards */}
      <ul className="flex items-center gap-2 flex-wrap">
        {imagePreview.map((img) => (
          <li key={img}>
            <img
              src={img}
              alt="uploaded img preview"
              className="overflow-hidden rounded-md w-14 h-14"
            />
          </li>
        ))}
      </ul>

      {errors[name]?.message && (
        <ErrorForm>{errors[name]?.message as ReactNode}</ErrorForm>
      )}
    </div>
  );
}

export default InputImage;

// import { useFormContext } from "react-hook-form";
// import { ChangeEvent, ReactNode, useRef, useState } from "react";
// import { HiOutlineArrowUpOnSquare } from "react-icons/hi2";
// import ErrorForm from "../../ui/ErrorForm";

// interface InputImageProps {
//   name: string;
//   label?: string;
//   isUpdatingImages?: boolean;
//   requiredMessage?: string | boolean;
//   accept?: string;
//   multiple?: boolean;
//   className?: string;
// }

// function InputImage({
//   name,
//   label = "Upload Images",
//   isUpdatingImages = false,
//   requiredMessage,
//   accept = "image/*",
//   multiple = true,
//   className = "",
// }: InputImageProps) {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   // this state shows count of selected files
//   const [filesCount, setFilesCount] = useState<number>(0);

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log("files", e.target.files);
//     const selectedFiles = Array.from(e.target.files || []);
//     setFilesCount(selectedFiles.length);
//   };

//   return (
//     <div className={`flex flex-col items-start gap-2 ${className}`}>
//       <input
//         id={name}
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         disabled={isUpdatingImages}
//         {...register(name, {
//           required: requiredMessage,
//         })}
//         ref={(e) => {
//           register(name).ref(e);
//           fileInputRef.current = e;
//         }}
//         className="hidden"
//         onChange={handleChange}
//       />

//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           onClick={handleClick}
//           disabled={isUpdatingImages}
//           className="flex items-center justify-center gap-2 px-8 max-lg:px-4  py-3 bg-primary text-primary_2 border border-dashed border-primary_2 rounded-sm hover:bg-secondary hover:text-primary_4 hover:border-primary disabled:opacity-50 transition-all duration-200"
//         >
//           <HiOutlineArrowUpOnSquare className="w-7 h-7 max-lg:w-6 max-lg:h-6" />
//           <span className="whitespace-nowrap">{label}</span>
//         </button>

//         {filesCount > 0 && (
//           <span className="bg-secondary text-primary_4 px-3 py-1 rounded-full text-sm font-medium">
//             {filesCount} {filesCount === 1 ? "file" : "files"} selected
//           </span>
//         )}
//       </div>

//       {errors[name]?.message && (
//         <ErrorForm>{errors[name]?.message as ReactNode}</ErrorForm>
//       )}
//     </div>
//   );
// }

// export default InputImage;
