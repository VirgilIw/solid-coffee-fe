// components/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const user = useSelector((state) => state.login.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
