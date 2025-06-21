import { AppRoutes } from "@/constants/appRoutes";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import FullPageLoader from "../full-page-loader";

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoadingAuth = useAuthStore((state) => state.isLoadingAuth);
  const location = useLocation();

  if (isLoadingAuth) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
