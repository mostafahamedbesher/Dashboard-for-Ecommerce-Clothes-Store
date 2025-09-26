interface ErrorMessageProps {
  errorMsg: string;
}

function ErrorMessage({ errorMsg }: ErrorMessageProps) {
  return (
    <p className="text-2xl text-center my-24 text-primary_2">
      {`${errorMsg} ❌`}
    </p>
  );
}

export default ErrorMessage;
