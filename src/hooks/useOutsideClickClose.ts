import { useEffect, useRef } from "react";

export function useOutsideClickClose<T extends HTMLElement>(
  closeHandler: () => void,
  handleAtCapturePhase: boolean
) {
  // ref points to the actual element
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const el = ref.current;
      const target = e.target as Node | null;

      if (!el || !target) return;

      // close when click is outside
      if (el && !el.contains(target)) {
        closeHandler();
      }
    }

    // capture phase avoids the open→immediate-close race
    document.addEventListener(
      "click",
      handleOutsideClick,
      handleAtCapturePhase
    );

    return () =>
      document.removeEventListener(
        "click",
        handleOutsideClick,
        handleAtCapturePhase
      );
  }, [closeHandler, handleAtCapturePhase]);

  return ref;
}
