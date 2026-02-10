import { Routes, Route } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import CheckoutProduct from "./pages/CheckoutProduct";
import Profile from "./pages/Profile";
import DetailOrder from "./pages/DetailOrder";
import HistoryOrder from "./pages/HistoryOrder";

import { Login } from "./pages/Login";
import Register from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

import AdminUserlist from "./pages/AdminUserlist";
import AdminProductList from "./pages/AdminProductList";
import AdminMenuList from "./pages/AdminMenuList";
import AdminOrderList from "./pages/AdminOrderList";

import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Admin from "./pages/Admin";
import ProductLayout from "./components/layouts/ProductLayout";
import OrderLayout from "./components/layouts/OrderLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";
import NotFound from "./components/ui/NotFound";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="admin">
            <Route index element={<Admin/>} />
            <Route path="product-list" element={<AdminProductList/>} />
            <Route path="menu-list" element={<AdminMenuList/>} />
            <Route path="order-list" element={<AdminOrderList/>} />
            <Route path="users-list" element={<AdminUserlist/>} />
          </Route>
        </Route>
      </Route>

      {/* PRODUCT (lihat bebas, checkout harus login) */}
      <Route path="product" element={<ProductLayout />}>
        <Route index element={<Product />} />
        <Route path="detail-product/:id" element={<ProductDetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="checkout-product" element={<CheckoutProduct />} />
        </Route>
      </Route>

      {/* ORDER (PRIVATE) */}
      <Route element={<PrivateRoute />}>
        <Route path="order" element={<OrderLayout />}>
          <Route path="detail/:id" element={<DetailOrder />} />
          <Route path="history" element={<HistoryOrder />} />
        </Route>
      </Route>

      {/* PROFILE (PRIVATE) */}
      <Route element={<PrivateRoute />}>
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
        </Route>
      </Route>

      {/* AUTH */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound/>}
      />
    </Routes>
  );
}