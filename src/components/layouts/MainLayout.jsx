import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function MainLayout() {
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
