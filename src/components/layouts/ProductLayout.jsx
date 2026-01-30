import { Outlet } from "react-router";
import Navbar from "../ui/productUi/navbar";
import Footer from "../ui/Footer";

export default function ProductLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
