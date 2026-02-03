import { Outlet } from "react-router";
import ScrollToTop from "../ui/ScrollToTop";
import Navbar from "../ui/product/navbar";
import Footer from "../ui/Footer";

const ProfileLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default ProfileLayout;
