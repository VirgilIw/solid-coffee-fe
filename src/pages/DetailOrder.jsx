import Profile from "../assets/Order/Profile.svg"
import Location from "../assets/Order/Location.svg"
import PhoneCall from "../assets/Order/PhoneCall.svg"
import Payment from "../assets/Order/Payment.svg"
import Truct from "../assets/Order/Truck.svg"
import Circle from "../assets/Order/Circle.svg"
import FoodImage from "../assets/home/Food-1.png"

export default function DetailOrder() {
  return (
    <>
      <section className='py-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
        <h1 className='text-3xl md:text-5xl font-medium'>Order <span className='font-bold'>#12354-09893</span></h1>
        <p className='text-[#4F5665] mt-4 text-lg'>21 March 2023 at 10:30 AM</p>

        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <div>
            <h2 className='text-2xl font-bold mb-6'>Order Information</h2>
            <div className='mt-1'>
              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Profile} alt="Icon" className="w-5 h-5" /> Full Name</p>
                <p className='font-bold text-right ml-4'>Ghaluh Wizard Anggoro</p>
              </div>
  
              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Location} alt="Icon" className="w-5 h-5" /> Address</p>
                <p className='font-bold text-right ml-4'>Griya bandung indah</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={PhoneCall} alt="Icon" className="w-5 h-5" /> Phone</p>
                <p className='font-bold text-right ml-4'>082116304338</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Payment} alt="Icon" className="w-5 h-5" /> Payment Method</p>
                <p className='font-bold text-right ml-4'>Cash</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Truct} alt="Icon" className="w-5 h-5" /> Shipping</p>
                <p className='font-bold text-right ml-4'>Dine In</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Circle} alt="Icon" className="w-5 h-5" /> Status</p>
                <p className='font-bold px-4 py-1 rounded-full bg-[#00A70033] text-[#00a11b] text-sm'>Done</p>
              </div>
              <div className='flex justify-between items-center py-6'>
                <p className='text-[#4F5665] font-medium'>Total Transaksi</p>
                <p className='font-bold text-2xl text-orange-500'>Idr 40.000</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className='text-2xl font-bold mb-2'>Your Order</h2>
            {/* Product Card 1 */}
            <div className="relative flex gap-4 bg-[#F8F8F8] p-4 rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all">
              <button className="absolute top-3 right-3 text-[#D00000] hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="w-24 sm:w-32 h-24 sm:h-32 shrink-0 overflow-hidden rounded-lg">
                <img src={FoodImage} alt="Menu Image" className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 pr-6 flex flex-col justify-center">
                <p className="inline-block bg-[#D00000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit mb-1">FLASH SALE!</p>
                <h3 className="font-bold text-lg sm:text-xl text-[#0B132A]">Hazelnut Latte</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-sm text-[#4F5665]">
                  <p className="flex items-center gap-2">2pcs <span className="opacity-50">|</span></p>
                  <p className="flex items-center gap-2">Regular <span className="opacity-50">|</span></p>
                  <p className="flex items-center gap-2">Ice <span className="opacity-50">|</span></p>
                  <p>Dine In</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-[#D00000] line-through text-xs">IDR 40.000</p>
                  <p className="text-orange-500 text-lg sm:text-xl font-bold">IDR 20.000</p>
                </div>
              </div>
            </div>
 
            {/* Product Card 2 */}
            <div className="relative flex gap-4 bg-[#F8F8F8] p-4 rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all">
              <button className="absolute top-3 right-3 text-[#D00000] hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="w-24 sm:w-32 h-24 sm:h-32 shrink-0 overflow-hidden rounded-lg">
                <img src={FoodImage} alt="Menu Image" className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 pr-6 flex flex-col justify-center">
                <p className="inline-block bg-[#D00000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit mb-1">FLASH SALE!</p>
                <h3 className="font-bold text-lg sm:text-xl text-[#0B132A]">Hazelnut Latte</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-sm text-[#4F5665]">
                  <p className="flex items-center gap-2">2pcs <span className="opacity-50">|</span></p>
                  <p className="flex items-center gap-2">Regular <span className="opacity-50">|</span></p>
                  <p className="flex items-center gap-2">Ice <span className="opacity-50">|</span></p>
                  <p>Dine In</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-[#D00000] line-through text-xs">IDR 40.000</p>
                  <p className="text-orange-500 text-lg sm:text-xl font-bold">IDR 20.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
