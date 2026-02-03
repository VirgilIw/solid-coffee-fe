import { useState } from "react";
import { Link, useLocation } from "react-router";
import CoffeeIcon from "../../assets/images/coffe-shop.svg";
import Chart from "../../assets/home/ShoppingCart.svg";
import Search from "../../assets/home/Search.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/login.slice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navMenus = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  // const isSuccess = useSelector((state)=> state.login.getUserStatus.user.isSuccess)
  console.log(user);
  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/50 px-4 py-4 backdrop-blur-md sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-10">
          <Link to="/">
            <img
              src={CoffeeIcon}
              alt="Coffee Logo"
              className="h-8 cursor-pointer brightness-0 invert md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden gap-8 text-white md:flex">
            {navMenus.map((menu) => (
              <li key={menu.name}>
                <Link
                  to={menu.path}
                  className={`hover:text-brand-orange cursor-pointer border-b-2 pb-1 font-medium transition-all ${
                    isActive(menu.path)
                      ? "border-brand-orange text-brand-orange"
                      : "border-transparent"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-5">
          <img
            src={Search}
            alt="Search Icon"
            className="h-5 w-5 cursor-pointer text-white group-hover/cart:brightness-0 group-hover/cart:invert md:h-6 md:w-6"
          />
          <img
            src={Chart}
            alt="Cart Icon"
            className="h-5 w-5 cursor-pointer text-white group-hover/cart:brightness-0 group-hover/cart:invert md:h-6 md:w-6"
          />

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center justify-center gap-6 md:flex">
            {user ? (
              <div className="text-md flex items-center gap-3">
                <p className="font-semibold text-white">{user.email}</p>
                <button
                  onClick={handleLogOut}
                  className="bg-brand-orange text-md rounded px-3 py-2 font-medium transition hover:bg-orange-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-1.5 text-center text-sm font-bold text-white transition-all hover:bg-transparent"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-1.5 text-center text-sm font-bold text-white transition-all hover:bg-transparent"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

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

          <ul className="flex flex-col gap-6 text-xl text-white">
            {navMenus.map((menu) => (
              <li key={menu.name}>
                <Link
                  to={menu.path}
                  className={`cursor-pointer transition-all ${isActive(menu.path) ? "text-brand-orange font-bold" : "hover:text-brand-orange"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            {user ? (
              <div className="text-md flex flex-col gap-3">
                <p className="font-semibold text-white">{user.email}</p>
                <button
                  onClick={handleLogOut}
                  className="bg-brand-orange text-md rounded px-3 py-2 font-medium transition hover:bg-orange-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-1.5 text-center text-sm font-bold text-white transition-all hover:bg-transparent"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="border-brand-orange bg-brand-orange hover:text-brand-orange cursor-pointer rounded-[5px] border-2 px-6 py-1.5 text-center text-sm font-bold text-white transition-all hover:bg-transparent"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
