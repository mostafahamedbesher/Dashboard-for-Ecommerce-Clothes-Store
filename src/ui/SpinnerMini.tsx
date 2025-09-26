interface SpinnerMiniProps {
  spinnerColor: string;
  marginY?: string;
}

// spinnerColor we change border color

function SpinnerMini({ spinnerColor, marginY }: SpinnerMiniProps) {
  return (
    <div
      className={`loader-mini mx-auto ${marginY ? marginY : "my-4"} ${
        spinnerColor ? spinnerColor : ""
      }`}
    ></div>
  );
}

export default SpinnerMini;
