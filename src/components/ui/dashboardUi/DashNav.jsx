import React, { useState } from "react";
import CoffeeIcon from "../../../assets/images/coffe-shop.svg";
import Chart from "../../../assets/home/ShoppingCart.svg";
import Search from "../../../assets/home/Search.svg";

function DashNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white px-4 py-4 backdrop-blur-md sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-10">
          <img
            src={CoffeeIcon}
            alt="Coffee Logo"
            className="h-8 invert-0 md:h-10"
          />
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
          <ul className="hidden items-center justify-center gap-6 md:flex">
            <li className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-2 text-center font-bold text-white transition-all hover:bg-transparent">
              Sign In
            </li>
            <li className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-2 text-center font-bold text-white transition-all hover:bg-transparent">
              Sign Up
            </li>
          </ul>

          {/* Hamburger Menu Icon */}
          <button
            className="p-1 text-white focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
        className={`fixed top-0 right-0 z-50 h-screen w-64 transform bg-black/90 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
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
      </div>
    </header>
  );
}

export default DashNav;
