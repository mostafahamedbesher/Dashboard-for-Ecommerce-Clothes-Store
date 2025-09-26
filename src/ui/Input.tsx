import {
  useFormContext,
  RegisterOptions,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  labelText: string;
  type: string;
  id: string;
  placeholder?: string;
  style?: string;
  readonly?: boolean;
  disabled?: boolean;
  name: Path<T>;
  labelWidth?: string;
  defaultValue?: PathValue<T, Path<T>>;
  validation?: RegisterOptions<T, Path<T>>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input<T extends FieldValues>({
  labelText,
  type,
  placeholder,
  id,
  style = "",
  readonly = false,
  disabled = false,
  name,
  labelWidth,
  defaultValue,
  validation,
  onBlur,
}: InputProps<T>) {
  const { register } = useFormContext<T>();

  // const registerField = register(name, validation);
  const registerField = register(name, {
    ...validation,
    value: defaultValue,
  });

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          labelWidth ? labelWidth : "w-28"
        } text-primary_2 whitespace-nowrap`}
      >
        {labelText}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={disabled}
        {...registerField}
        onBlur={(e) => {
          registerField.onBlur(e);
          onBlur?.(e);
        }}
        className={`${
          style
            ? style
            : "border border-primary_2 rounded-sm p-2 text-primary_2 w-full"
        } ${readonly && "bg-gray-400 text-gray-500 focus:outline-none"} ${
          disabled ? "bg-gray-400" : "bg-primary"
        }`}
      />
    </>
  );
}

export default Input;

// import {
//   useFormContext,
//   RegisterOptions,
//   Path,
//   FieldValues,
// } from "react-hook-form";

// interface InputProps<T extends FieldValues> {
//   labelText: string;
//   type: string;
//   id: string;
//   placeholder?: string;
//   style?: string;
//   readonly?: boolean;
//   disabled?: boolean;
//   name: Path<T>;
//   labelWidth?: string;
//   validation?: RegisterOptions<T, Path<T>>;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
// }

// function Input<T extends FieldValues>({
//   labelText,
//   type,
//   placeholder,
//   id,
//   style = "",
//   readonly = false,
//   disabled = false,
//   name,
//   labelWidth,
//   validation,
//   onBlur,
// }: InputProps<T>) {
//   const { register } = useFormContext<T>();

//   const registerField = register(name, validation);

//   return (
//     <>
//       <label
//         htmlFor={id}
//         className={`${
//           labelWidth ? labelWidth : "w-28"
//         } text-primary_2 whitespace-nowrap`}
//       >
//         {labelText}
//       </label>

//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         readOnly={readonly}
//         disabled={disabled}
//         {...registerField}
//         onBlur={(e) => {
//           registerField.onBlur(e);
//           onBlur?.(e);
//         }}
//         className={`${
//           style
//             ? style
//             : "border border-primary_2 rounded-sm p-2 text-primary_2 w-full"
//         } ${readonly && "bg-gray-300 text-gray-500 focus:outline-none"}`}
//       />
//     </>
//   );
// }

// export default Input;
