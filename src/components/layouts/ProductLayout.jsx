import { Outlet } from "react-router";
import Navbar from "../ui/productUi/navbar";
import Footer from "../ui/Footer";
import ScrollToTop from "../ui/ScrollToTop";

export default function ProductLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
