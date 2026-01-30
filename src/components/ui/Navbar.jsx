import { useState } from 'react'
import CoffeeIcon from "../../assets/images/coffe-shop.svg"
import Chart from "../../assets/home/ShoppingCart.svg"
import Search from "../../assets/home/Search.svg"

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-black/50 w-full fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-10 justify-center items-center">
          <img src={CoffeeIcon} alt="Coffee Logo" className="brightness-0 invert h-8 md:h-10" />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-white"> 
            {['Home', 'Product'].map((menu) => (
              <li 
                key={menu}
                className={`cursor-pointer hover:text-brand-orange transition-all pb-1 border-b-2 ${
                  activeMenu === menu ? 'border-brand-orange text-brand-orange' : 'border-transparent'
                }`}
                onClick={() => setActiveMenu(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 md:gap-5 justify-center items-center">
          <img src={Search} alt="Search Icon" className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover/cart:brightness-0 group-hover/cart:invert"/>
          <img src={Chart} alt="Cart Icon" className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover/cart:brightness-0 group-hover/cart:invert"/>

          {/* Desktop Auth Buttons */}
          <ul className="hidden md:flex gap-6 justify-center items-center">
            <li className="text-white border-2 border-brand-orange rounded-[5px] py-2 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold">Sign In</li>
            <li className="text-white border-2 border-brand-orange rounded-[5px] py-2 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold">Sign Up</li>
          </ul>

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
            {['Home', 'Product'].map((menu) => (
              <li 
                key={menu}
                className={`cursor-pointer transition-all ${activeMenu === menu ? 'text-brand-orange' : 'hover:text-brand-orange'}`}
                onClick={() => { setActiveMenu(menu); setIsMenuOpen(false); }}
              >
                {menu}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 mt-8">
            <button className="text-[#0B0909] border-2 border-brand-orange rounded-[5px] py-2 px-4 text-center bg-brand-orange font-bold transition-all">Sign In</button>
            <button className="text-white border-2 border-white rounded-[5px] py-2 px-4 text-center bg-transparent font-bold transition-all hover:bg-white hover:text-black">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  )
}
