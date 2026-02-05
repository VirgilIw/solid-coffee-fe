import { Navigate } from "react-router";

const PrivateRoute = ({ isLogin }) => {
  if (!isLogin) {
    return <Navigate to="login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
