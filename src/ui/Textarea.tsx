import { useFormContext, RegisterOptions, Path } from "react-hook-form";

interface TextareaProps<T extends object> {
  labelText: string;
  id: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  height?: string;
  name: Path<T>;
  validation?: RegisterOptions<T, Path<T>>;
}

function Textarea<T extends object>({
  labelText,
  id,
  placeholder,
  defaultValue,
  name,
  height = "h-40",
  disabled = false,
  validation,
}: TextareaProps<T>) {
  const { register } = useFormContext<T>();

  return (
    <>
      <label htmlFor={id} className="text-primary_2 w-28">
        {labelText}
      </label>
      <textarea
        id={id}
        {...register(name, validation)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`border border-primary_2 rounded-sm p-2 text-primary_2 bg-primary w-full ${height}`}
      />
    </>
  );
}

export default Textarea;
