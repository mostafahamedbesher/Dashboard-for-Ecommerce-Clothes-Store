import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

interface ModalContextType {
  selectedId: string;
  openWindow: (id: string) => void;
  closeWindow: () => void;
}

interface Modalprops {
  children: ReactNode;
}

interface InjectedModalProps {
  onCloseWindow: () => void;
}

interface WindowProps {
  children: ReactElement<InjectedModalProps>;
  id: string;
}

interface OpenProps {
  children: ReactElement;
  id: string;
}

// create context
const ModalContext = createContext<ModalContextType | null>(null);

// parent component
function Modal({ children }: Modalprops) {
  const [selectedId, setSelectedId] = useState<string>("");

  function openWindow(id: string) {
    setSelectedId(id);
  }

  function closeWindow() {
    setSelectedId("");
  }

  return (
    <ModalContext.Provider value={{ selectedId, openWindow, closeWindow }}>
      {children}
    </ModalContext.Provider>
  );
}

// child components
function Window({ children, id }: WindowProps) {
  const context = useContext(ModalContext);
  const overlayRef = useRef<HTMLDivElement>(null);

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef?.current) {
      context?.closeWindow();
    }
  }

  return createPortal(
    <div
      className={`${context?.selectedId === id ? "flex" : "hidden"} overlay`}
      onClick={handleOutsideClick}
      ref={overlayRef}
    >
      <div
        className={`relative rounded-md shadow-sm bg-primary px-14 py-10 w-fit max-md:px-10 max-md:w-3/4 max-sm:px-6`}
      >
        <button
          type="button"
          onClick={() => context?.closeWindow()}
          className="absolute right-3 top-2 p-1 rounded-md hover:bg-ternary hover:text-red-500 transition-colors duration-150 text-primary_2"
        >
          <HiXMark className="w-6 h-6" />
        </button>

        {React.cloneElement(children, {
          onCloseWindow: context?.closeWindow,
        })}
      </div>
    </div>,
    document.body
  );
}

function Open({ children, id }: OpenProps) {
  const context = useContext(ModalContext);

  return React.cloneElement(children, {
    onClick: () => context?.openWindow(id),
  });
}

// add children to parent as properties
Modal.Window = Window;
Modal.Open = Open;

export default Modal;
