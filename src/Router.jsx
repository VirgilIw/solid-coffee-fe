import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import { Login } from "./pages/Login";
import ProductLayout from "./components/layouts/ProductLayout";
import Product from "./pages/Product";
import Register from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import OrderLayout from "./components/layouts/OrderLayout";
import DetailOrder from "./pages/DetailOrder";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HistoryOrder from "./pages/HistoryOrder";
import AdminUserlist from "./pages/AdminUserlist";
import ProductDetail from "./pages/ProductDetail";
import CheckoutProduct from "./pages/CheckoutProduct";

export default function Router() {
  return (
    <>
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />  
      </Route>
      <Route path="dashboard" element={<DashboardLayout/>}>
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="users-list" element={<AdminUserlist/>} />
          </Route>
        </Route>
      <Route path="product" element={<ProductLayout />}>
        <Route index element={<Product />} />
        <Route path="detail-product" element={<ProductDetail />} />
        <Route path="checkout-product" element={<CheckoutProduct />} />
      </Route>
      <Route path="order" element={<OrderLayout />}>
        <Route path="detail" element={<DetailOrder/>}/>
        <Route path="history" element={<HistoryOrder/>} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route
        path="*"
        element={
          <div className="flex h-dvh items-center justify-center text-5xl font-bold">
            404 NOT FOUND
          </div>
        }
      />
     </Routes>
    </>
  );
}
