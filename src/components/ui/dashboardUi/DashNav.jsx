import { useState } from "react";
import CoffeeIcon from "../../../assets/images/coffe-shop.svg";
import Chart from "../../../assets/home/ShoppingCart.svg";
import Search from "../../../assets/home/Search.svg";
import DashboardIcon from "../../../assets/adminDashborad/DashboardIcon.svg";
import ProductIcon from "../../../assets/adminDashborad/ProductIcon.svg";
import OrderIcon from "../../../assets/adminDashborad/Bag.svg";
import UserIcon from "../../../assets/adminDashborad/UserIcon.svg";
import LogoutIcon from "../../../assets/adminDashborad/LogoutIcon.svg";
import { Link } from "react-router";

function DashNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState();

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const menu = [
    { id: 1, name: "Dashboard", icon: DashboardIcon },
    { id: 2, name: "Product", icon: ProductIcon },
    { id: 3, name: "Order", icon: OrderIcon },
    { id: 4, name: "User", icon: UserIcon },
    { id: 5, name: "Keluar", icon: LogoutIcon },
  ];

  return (
    <header className="top-0 left-0 z-50 w-full bg-white px-9 py-4 border-b-2 border-[#E8E8E8] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-10">
          <Link to="/">
            <img
              src={CoffeeIcon}
              alt="Coffee Logo"
              className="h-8 invert-0 md:h-10"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-5">
          <img
            src={Search}
            alt="Search Icon"
            className="h-5 w-5 cursor-pointer text-white invert-50 md:h-6 md:w-6"
          />
          <img
            src={Chart}
            alt="Cart Icon"
            className="h-5 w-5 cursor-pointer text-white invert-50 md:h-6 md:w-6"
          />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-6 justify-center items-center">
            <Link to="/login" className="text-white border-2 border-brand-orange rounded-[5px] py-1.5 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-sm">Sign In</Link>
            <Link to="/register" className="text-white border-2 border-brand-orange rounded-[5px] py-1.5 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-sm">Sign Up</Link>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            className="rounded-lg border-0 p-1 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#4F5665"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-brand-orange h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-64 min-h-900 transform bg-black/90 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-8 p-8">
          <button
            className="self-end text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-8 flex flex-col gap-4">
            <button className="border-brand-orange bg-brand-orange rounded-[5px] border-2 px-4 py-2 text-center font-bold text-[#0B0909] transition-all">
              Sign In
            </button>
            <button className="rounded-[5px] border-2 border-white bg-transparent px-4 py-2 text-center font-bold text-white transition-all hover:bg-white hover:text-black">
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`${activeMenu == item.id ? "bg-brand-orange" : ""} text-white flex w-full pl-15 items-center gap-3 rounded-lg border-0 p-2`}
            >
              <div>
                <img src={item.icon} alt={`${item.name}-icon`} className="brightness-500"/>
              </div>
              <div>
                <p>{item.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default DashNav;
