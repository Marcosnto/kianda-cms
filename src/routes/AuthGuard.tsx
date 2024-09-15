import { useAuth } from "@/api/auth";
import { Navigate, Outlet } from "@/utils/libs/routerFacade";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isAuth } = useAuth();

  if (!isAuth && isPrivate) {
    return <Navigate to={"/"} replace />;
  }

  if (isAuth && !isPrivate) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
}
