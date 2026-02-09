import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const user = useSelector((state) => state.login.user);
  if (!user) {
    return <Navigate to="login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
