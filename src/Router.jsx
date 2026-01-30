import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";
import { Login } from "./pages/Login";
import ProductLayout from "./components/layouts/ProductLayout";
import Product from "./pages/Product";
import Register from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

export default function Router() {
  return (
    <>
      <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="product" element={<ProductLayout />}>
        <Route index element={<Product/>}/>
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
