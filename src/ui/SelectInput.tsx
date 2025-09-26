import {
  useFormContext,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";

interface Option<T = string> {
  label: string;
  value: T;
}

interface SelectProps<TFormValues extends FieldValues, TValue = string> {
  labelText: string;
  id: string;
  name: Path<TFormValues>;
  options: Option<TValue>[];
  defaultValue?: string;
  disabled?: boolean;
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
  className?: string;
  labelWidth?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput<TFormValues extends FieldValues, TValue = string>({
  labelText,
  id,
  name,
  options,
  defaultValue,
  disabled = false,
  validation,
  className = "border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-full",
  labelWidth,
  onChange,
}: SelectProps<TFormValues, TValue>) {
  const { register } = useFormContext<TFormValues>();
  const registerField = register(name, validation);

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          labelWidth ? labelWidth : "w-24"
        } text-primary_2 whitespace-nowrap`}
      >
        {labelText}
      </label>
      <select
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        {...registerField}
        onChange={(e) => {
          registerField.onChange(e); // RHF internal
          onChange?.(e); // Custom handler
        }}
        className={className}
      >
        <option value="" disabled hidden>
          Select {labelText.toLowerCase()}
        </option>
        {options.map(({ label, value }) => (
          <option key={String(value)} value={String(value)}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;

// import { useFormContext, RegisterOptions, Path } from "react-hook-form";

// interface Option<T = string> {
//   label: string;
//   value: T;
// }

// interface SelectProps<TFormValues extends object> {
//   labelText: string;
//   id: string;
//   name: Path<TFormValues>;
//   options: Option[];
//   defaultValue?: string;
//   disabled?: boolean;
//   validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
//   className?: string;
// }

// function SelectInput<TFormValues extends object>({
//   labelText,
//   id,
//   name,
//   options,
//   defaultValue,
//   disabled = false,
//   validation,
//   className = "border border-primary_2 rounded-sm p-2 text-primary_2 w-full",
// }: SelectProps<TFormValues>) {
//   const { register } = useFormContext<TFormValues>();

//   return (
//     <>
//       <label htmlFor={id} className="text-primary_2 w-24 whitespace-nowrap">
//         {labelText}
//       </label>
//       <select
//         id={id}
//         defaultValue={defaultValue}
//         disabled={disabled}
//         {...register(name, validation)}
//         className={className}
//       >
//         <option value="" disabled hidden>
//           Select {labelText.toLowerCase()}
//         </option>
//         {options.map(({ label, value }) => (
//           <option key={value.toString()} value={value}>
//             {label}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// }

// export default SelectInput;
