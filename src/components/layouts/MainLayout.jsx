import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import ScrollToTop from "../ui/ScrollToTop";

export default function MainLayout() {
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
