// I implemented this FilterMenu component using compound component pattern to be more flexible

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldValues,
} from "react-hook-form";
import { createPortal } from "react-dom";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Button from "./Button";
import ButtonResetCurrentFilter from "./ButtonResetCurrentFilter";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useSearchParams } from "react-router-dom";

type FilterMenuContextType = {
  close: () => void;
};

const FilterMenuContext = createContext<FilterMenuContextType | null>(null);

// Overlay Component
const Overlay = ({ children }: { children: ReactNode }) => {
  const ctx = useContext(FilterMenuContext);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        ctx?.close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ctx]);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" />
      <div ref={menuRef}>{children}</div>
    </>
  );
};

// Main FilterMenu Component
function FilterMenu<T extends FieldValues>({
  children,
  onApply,
}: {
  children: ReactNode;
  onApply: (inputValues: T) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const methods = useForm<T>();
  const [searchParams, setSearchParams] = useSearchParams();

  const open = () => {
    setIsOpen(true);
    setAnimateOut(false);
  };

  const close = () => {
    setAnimateOut(true);
    setTimeout(() => setIsOpen(false), 500);
  };

  const onSubmit = (data: T) => {
    onApply?.(data);
    // fix pages bug
    if (searchParams.get("page")) {
      searchParams.set("page", "0");
    }
    setSearchParams(searchParams);
    // close FilterMenu
    close();
  };

  return (
    <>
      <Button
        style="py-2 px-3 border border-gray-200 hover:opacity-85 flex items-center gap-2"
        color="bg-primary"
        textColor="text-primary_2"
        onClick={open}
      >
        <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
        <span>Filter</span>
      </Button>

      {isOpen &&
        createPortal(
          <FilterMenuContext.Provider value={{ close }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Overlay>
                  <div
                    className={`fixed px-2 py-4 top-0 right-0 h-full w-5/12 bg-primary shadow-lg z-50 transition-transform duration-500 overflow-y-auto max-lg:w-7/12 max-sm:w-10/12 max-xs:w-full ${
                      animateOut ? "animate-slide-out" : "animate-slide-in"
                    }`}
                  >
                    {children}
                  </div>
                </Overlay>
              </form>
            </FormProvider>
          </FilterMenuContext.Provider>,
          document.body
        )}
    </>
  );
}

// Compound children components
function CloseButton() {
  const ctx = useContext(FilterMenuContext);
  if (!ctx) throw new Error("CloseButton must be used within FilterMenu");

  return (
    <button
      type="button"
      onClick={ctx.close}
      className="absolute top-2 right-2 text-xl text-primary_2 hover:text-red-500 hover:ring-1 hover:ring-primary_2 transition-all duration-300 px-2 rounded-sm"
    >
      ✖
    </button>
  );
}

function Section({
  title,
  children,
  marginTop = "mt-0",
}: {
  title: string;
  children: ReactNode;
  marginTop?: string;
}) {
  return (
    <div className={`p-4 border-b relative ${marginTop}`}>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function RadioGroup({
  name,
  options,
}: {
  name: keyof FieldValues;
  options: string[];
}) {
  const { register, watch, setValue } = useFormContext();
  const selectedValue = watch(name);
  const darkModeContext = useDarkMode();

  return (
    <>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center gap-3 p-2 border rounded cursor-pointer transition-all duration-200  ${
              darkModeContext?.isDarkMode
                ? "hover:text-primary"
                : "hover:text-primary_2"
            }  ${
              selectedValue === option
                ? `bg-gray-100 ring-2 ring-gray-400 ${
                    darkModeContext?.isDarkMode
                      ? "text-primary"
                      : "text-primary_2"
                  }`
                : "ring-1 ring-gray-300 hover:bg-gray-50 text-primary_2"
            }`}
          >
            <input
              type="radio"
              value={option}
              {...register(name)}
              className="hidden"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>

      <ButtonResetCurrentFilter onClick={() => setValue(name, null)} />
    </>
  );
}

function SizeButtons({ name, sizes }: { name: string; sizes: string[] }) {
  const { register, watch, setValue } = useFormContext();
  const selectedSize = watch(name);

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="radio"
              value={size}
              {...register(name)}
              className="sr-only"
            />
            <div
              className={`border rounded text-center px-2 py-1 w-12 transition-all duration-200 ${
                selectedSize === size
                  ? "bg-primary_2 border-primary_2 text-primary"
                  : "bg-primary border-primary_2 text-primary_2 hover:bg-primary_2 hover:text-primary"
              }`}
            >
              {size}
            </div>
          </label>
        ))}
      </div>

      <ButtonResetCurrentFilter onClick={() => setValue(name, null)} />
    </>
  );
}

function ColorDots({ name, colors }: { name: string; colors: string[] }) {
  const { register, setValue } = useFormContext();

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <label key={color} className="cursor-pointer">
            <input
              type="radio"
              value={color}
              {...register(name)}
              className="sr-only peer"
            />
            <div
              className={`
              w-7 h-7 rounded-full border-2 transition-all duration-200
              peer-checked:p-0.5 peer-checked:ring-2 peer-checked:ring-primary_2
              hover:p-0.5 hover:ring-2 hover:ring-primary_2
            `}
              style={{ backgroundColor: color }}
              title={color}
            />
          </label>
        ))}
      </div>

      <ButtonResetCurrentFilter onClick={() => setValue(name, null)} />
    </>
  );
}

function PriceRange({ name, max }: { name: string; max: number }) {
  const { register, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center bg-ternary px-4 py-2 rounded-md max-xs:flex-col">
        <span className="text-primary_2">Min: $0</span>
        <div className="flex items-center gap-2 text-secondary font-semibold">
          <span className="text-primary_2">Current:</span>
          <span className="text-secondary">${value ?? 0}</span>
        </div>
        <span className="text-primary_2">Max: ${max}</span>
      </div>
      <input
        type="range"
        defaultValue={0}
        min={0}
        max={max}
        step={10}
        className="w-full accent-primary_2"
        {...register(name)}
      />
    </div>
  );
}

function CheckboxGroup({ name, options }: { name: string; options: string[] }) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex gap-2 items-center text-primary_2 cursor-pointer"
        >
          <input
            className="accent-secondary w-4 h-4 cursor-pointer"
            type="checkbox"
            value={option}
            {...register(name)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function ApplyButton() {
  return (
    <Button type="submit" style="px-3 py-2 mt-4 ml-4">
      Apply
    </Button>
  );
}

function ResetButton({ onReset }: { onReset: () => void }) {
  const { reset } = useFormContext();
  return (
    <Button
      style="px-3 py-2 ml-4 mt-4 ring-1 ring-primary_2 hover:opacity-85 transition-all duration-200"
      color="bg-ternary"
      textColor="text-primary_2"
      onClick={() => {
        reset();
        onReset?.();
      }}
    >
      Reset
    </Button>
  );
}

// Compound attachments
FilterMenu.CloseButton = CloseButton;
FilterMenu.Section = Section;
FilterMenu.RadioGroup = RadioGroup;
FilterMenu.SizeButtons = SizeButtons;
FilterMenu.ColorDots = ColorDots;
FilterMenu.PriceRange = PriceRange;
FilterMenu.CheckboxGroup = CheckboxGroup;
FilterMenu.ApplyButton = ApplyButton;
FilterMenu.ResetButton = ResetButton;

export default FilterMenu;
