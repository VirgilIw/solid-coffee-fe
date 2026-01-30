import { Link } from 'react-router'
import CoffeeIcon from "../../assets/images/coffe-shop.svg"
import Facebook from "../../assets/footer/Facebook.svg"
import Twitter from "../../assets/footer/Tweet.svg"
import Instagram from "../../assets/footer/Instagram.svg"

export default function Footer() {
  return (
    <>
        <section className='flex flex-col md:flex-row justify-between bg-white py-16 lg:py-20 px-8 sm:px-12 md:px-16 lg:px-24 gap-12 md:gap-0 border-t border-gray-100'>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <Link to="/">
                  <img src={CoffeeIcon} alt="Coffee Icon" className="h-10 md:h-12 cursor-pointer" />
                </Link>
                <p className='w-full max-w-sm mt-6 text-[#4F5665] leading-relaxed opacity-80 text-sm sm:text-base'>
                  Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans
                </p>
                <div className='hidden md:block'>
                  <p className='mt-12 text-[#AFB5C0] font-medium'>&copy; 2026 Solid Coffee.</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row md:grid md:grid-cols-3 gap-12 sm:gap-20 md:gap-10 w-full md:w-auto items-center sm:items-start text-center sm:text-left">
              <div className='flex flex-col gap-6 w-full sm:w-auto'>
                  <p className='font-bold text-[#0B0909]'>Product</p>
                  <ul className='flex flex-col gap-3 text-[#4F5665] opacity-80 text-sm sm:text-base'>
                      <li>
                        <Link to="/product" className="hover:text-brand-orange cursor-pointer transition-all">Our Product</Link>
                      </li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Pricing</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Locations</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Countries</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Blog</li>
                  </ul>
              </div>
              <div className='flex flex-col gap-6 w-full sm:w-auto'>
                  <p className='font-bold text-[#0B0909]'>Engage</p>
                  <ul className='flex flex-col gap-3 text-[#4F5665] opacity-80 text-sm sm:text-base'>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Partner</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">FAQ</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">About Us</li>
                      <li className="hover:text-brand-orange cursor-pointer transition-all">Privacy Policy</li>
                  </ul>
              </div>
              <div className='flex flex-col gap-6 w-full sm:w-auto items-center sm:items-start'>
                  <p className='font-bold text-[#0B0909]'>Social Media</p>
                  <ul className='flex gap-4 justify-center md:justify-start'>
                      <li className='bg-brand-orange rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-md group'>
                          <img src={Facebook} alt="Facebook Icon" className="brightness-0 invert w-5 h-5 group-hover:scale-110 transition-transform" />
                      </li>
                      <li className='bg-brand-orange rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-md group'>
                          <img src={Twitter} alt="Twitter Icon" className="brightness-0 invert w-5 h-5 group-hover:scale-110 transition-transform" />
                      </li>
                      <li className='bg-brand-orange rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-md group'>
                          <img src={Instagram} alt="Instagram Icon" className="brightness-0 invert w-5 h-5 group-hover:scale-110 transition-transform" />
                      </li>
                  </ul>
              </div>
            </div>

            <div className='md:hidden text-center w-full pt-8 border-t border-gray-50'>
              <p className='text-[#AFB5C0] text-sm'>&copy; 2026 Solid Coffee.</p>
            </div>
        </section>
    </>
  )
}
