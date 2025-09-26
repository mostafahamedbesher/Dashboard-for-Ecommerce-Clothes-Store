import { useEffect, useRef, ReactNode, useState } from "react";

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Overlay({ isOpen, onClose, children }: OverlayProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  // this state is used for animation
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay background */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Content */}
      <div
        ref={menuRef}
        onAnimationEnd={handleAnimationEnd}
        className={`fixed z-50 top-0 -left-1/3 shadow-lg max-xl:w-1/3 max-lg:w-1/2 max-sm:w-3/4 max-lg:-left-1/2 max-sm:-left-3/4
          ${isOpen ? "animate-slide-out" : "animate-slide-in"}
        `}
      >
        {children}
      </div>
    </>
  );
}

export default Overlay;

// import { useEffect, useRef, ReactNode } from "react";

// type OverlayProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// };

// function Overlay({ isOpen, onClose, children }: OverlayProps) {
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleClick = (e: MouseEvent) => {
//       if (
//         menuRef.current &&
//         e.target instanceof Node &&
//         !menuRef.current.contains(e.target)
//       ) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay background */}
//       <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

//       {/* Content */}
//       <div
//         ref={menuRef}
//         className={`fixed z-50 top-0 -left-1/3 shadow-lg max-xl:w-1/3 ${
//           isOpen ? "animate-slide-out" : "animate-slide-in"
//         }`}
//       >
//         {children}
//       </div>
//     </>
//   );
// }

// export default Overlay;
