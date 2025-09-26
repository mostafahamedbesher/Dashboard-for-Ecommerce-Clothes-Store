import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useEffect } from "react";

function DarkModeButton() {
  const context = useDarkMode();

  useEffect(
    function () {
      const rootElement = document.documentElement;

      if (context?.isDarkMode) {
        rootElement.classList.add("dark-mode");
        rootElement.classList.remove("light-mode");
      } else {
        rootElement.classList.add("light-mode");
        rootElement.classList.remove("dark-mode");
      }
    },
    [context?.isDarkMode]
  );

  function handleDarkmode() {
    context?.toggleDarkMode();
  }

  return (
    <button onClick={handleDarkmode}>
      {context?.isDarkMode ? (
        <HiOutlineSun className="icon-nav" />
      ) : (
        <HiOutlineMoon className="icon-nav" />
      )}
    </button>
  );
}

export default DarkModeButton;
