import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireUser = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user
      ? <Outlet />
      : <Navigate to="/login" state={{from: location}} replace /> // replace "/login" in user browser history with location they came from
  );
}

export default RequireUser;