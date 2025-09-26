import { Link, useRouteError } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface RouterError {
  status?: number;
  statusText?: string;
  message?: string;
}

function ErrorPage() {
  const error = useRouteError() as RouterError;
  // console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center gap-4 mt-32 text-primary_2"
    >
      <h1 className="text-2xl">Oops!</h1>
      <p className="text-2xl">Something went wrong :(</p>
      <p className="text-2xl">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="dashboard"
        className="flex items-center gap-2 text-xl border-b-2 border-primary_2 font-semibold"
      >
        <HiOutlineArrowLeft />
        <span>Go Back Home</span>
      </Link>
    </div>
  );
}

export default ErrorPage;
