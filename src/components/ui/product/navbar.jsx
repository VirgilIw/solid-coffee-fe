import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux/slices/login.slice";
import CoffeeIcon from "../../../assets/images/coffe-shop.svg"
import Chart from "../../../assets/home/ShoppingCart.svg"
import Search from "../../../assets/home/Search.svg"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const handleLogOut = () => {
    dispatch(signOut());
  };

  const navMenus = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-black w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-10 justify-center items-center">
          <Link to="/">
            <img src={CoffeeIcon} alt="Coffee Logo" className="brightness-0 invert h-8 md:h-10 cursor-pointer" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-white"> 
            {navMenus.map((menu) => (
              <li key={menu.name}>
                <Link
                  to={menu.path}
                  className={`cursor-pointer hover:text-brand-orange transition-all pb-1 border-b-2 font-medium ${
                    isActive(menu.path) ? 'border-brand-orange text-brand-orange' : 'border-transparent'
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 md:gap-5 justify-center items-center">
          <img src={Search} alt="Search Icon" className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover/cart:brightness-0 group-hover/cart:invert"/>
          <img src={Chart} alt="Cart Icon" className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover/cart:brightness-0 group-hover/cart:invert"/>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-6 justify-center items-center">
            {user ? (
               <div className="flex items-center gap-3 text-md">
                 <p className="font-semibold text-white">{user.email}</p>
                 <button
                   onClick={handleLogOut}
                   className="bg-brand-orange text-md rounded px-3 py-2 font-medium transition hover:bg-orange-500 text-white"
                 >
                   Logout
                 </button>
               </div>
            ) : (
                <>
                  <Link to="/login" className="text-white border-2 border-brand-orange rounded-[5px] py-1.5 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-sm">Sign In</Link>
                  <Link to="/register" className="text-white border-2 border-brand-orange rounded-[5px] py-1.5 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-sm">Sign Up</Link>
                </>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button 
            className="md:hidden text-white focus:outline-none p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand-orange">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-black/90 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-8 gap-8">
          <button className="self-end text-white" onClick={() => setIsMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <ul className="flex flex-col gap-6 text-white text-xl">
            {navMenus.map((menu) => (
              <li key={menu.name}>
                <Link
                  to={menu.path}
                  className={`cursor-pointer transition-all ${isActive(menu.path) ? 'text-brand-orange font-bold' : 'hover:text-brand-orange'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 mt-8">
            {user ? (
               <>
                 <p className="font-semibold text-white text-center mb-2">{user.email}</p>
                 <button onClick={handleLogOut} className="text-[#0B0909] border-2 border-brand-orange rounded-[5px] py-2 px-4 text-center bg-brand-orange font-bold transition-all">
                   Logout
                 </button>
               </>
            ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[#0B0909] border-2 border-brand-orange rounded-[5px] py-2 px-4 text-center bg-brand-orange font-bold transition-all">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-white border-2 border-white rounded-[5px] py-2 px-4 text-center bg-transparent font-bold transition-all hover:bg-white hover:text-black">Sign Up</Link>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
