interface SpinnerMiniProps {
  spinnerColor: string;
}

// spinnerColor we change border color

function Spinner({ spinnerColor }: SpinnerMiniProps) {
  return (
    <div
      className={`loader-large mx-auto mb-8 ${
        spinnerColor ? spinnerColor : ""
      }`}
    ></div>
  );
}

export default Spinner;
