import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface InputSearchProps<T> {
  name: string;
  searchField: keyof T;
  data: T[];
  setter: (data: T[]) => void;
  placeHolder?: string;
}

function InputSearch<T>({
  name,
  searchField,
  data,
  setter,
  placeHolder,
}: InputSearchProps<T>) {
  const { register, watch } = useForm();
  const inputVal = watch(name);

  useEffect(
    function () {
      if (!inputVal) {
        setter(data);
      } else {
        setter(
          data.filter((item) => {
            // incase search string values like search by name
            if (typeof item[searchField] === "string") {
              return item[searchField]
                .toLowerCase()
                .includes(inputVal.toLowerCase());
            }
            // incase search number values like search by ID
            if (typeof item[searchField] === "number") {
              return item[searchField] === Number(inputVal);
            }
          })
        );
      }
    },
    [inputVal, data, searchField, setter]
  );

  return (
    <form className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2">
      <HiOutlineMagnifyingGlass className="w-6 h-6 text-primary_2" />
      <input
        type="text"
        className="text-primary_2 block w-full focus:outline-none focus:border-none bg-transparent"
        placeholder={`${placeHolder ? placeHolder : "search..."}`}
        {...register(name)}
      />
    </form>
  );
}

export default InputSearch;
