import { ReactNode, useEffect } from "react";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  // 1-get the current user
  const { data: currentUser, isPending: isLoadingUser } = useGetCurrentUser();

  // 2-if the user is not authenticated --> redirect it back to login page
  useEffect(
    function () {
      if (currentUser?.role !== "authenticated" && !isLoadingUser) {
        navigate("/login");
      }
    },
    [currentUser?.role, isLoadingUser, navigate]
  );

  // show spinner while loading user
  if (isLoadingUser)
    return (
      <div className="h-screen flex items-center justify-center bg-primary">
        <Loader />
      </div>
    );

  // 3-if the user is authenticated --> render the app
  if (currentUser?.role === "authenticated") {
    return children;
  }
}

export default ProtectedRoute;
