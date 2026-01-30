import { useState } from "react"
import { Link } from "react-router"
import ChatWindow from "../components/ui/ChatWindow"
import BgCoffee from "../assets/home/bg-cofee-home.jpg"
import ChatIcon from "../assets/home/ChatCircleDots.png"
import CheckListIcon from "../assets/home/checklist-Icon.png"
import BgBarista from "../assets/home/bg-barista.png"
import FoodImage1 from "../assets/home/Food-1.png"
import Map from "../assets/home/HugeGlobal.png"
import Testimoni1 from "../assets/home/Testimoni1.png"
import Star from "../assets/home/Star.png"
import ArrowLeft from "../assets/home/arrow-left.png"
import ArrowRight from "../assets/home/arrow-right.png"
import Chart from "../assets/home/ShoppingCart.svg"

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <main>
        {/* ... existing sections ... */}
        <section className="flex flex-col-reverse lg:flex-row min-h-screen">
          {/* Text Content */}
          <article className="bg-[#0B0909] w-full lg:w-1/2 flex flex-col justify-start items-center pt-12 pb-16 lg:pt-48 lg:pb-0 lg:bg-linear-to-b lg:from-[#37393a] lg:to-[#0B0909]">
            <div className="px-6 sm:px-10 md:px-16 lg:px-20 max-w-2xl lg:max-w-none">
              <div className="flex flex-col text-center lg:text-left">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Start Your Day with Coffee and Good Meals</h1>
                <p className="text-white mt-5 text-sm sm:text-base opacity-70">We provide high quality beans, good taste, and healthy meals made by love just for you. Start your day with us for a bigger smile!</p>
                <div className="flex justify-center lg:justify-start">
                  <Link to="/product" className="text-white cursor-pointer border-2 border-brand-orange rounded-[5px] py-3 px-10 text-center bg-brand-orange mt-8 hover:bg-transparent hover:text-brand-orange font-bold transition-all w-full sm:w-auto">
                      Get Started
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 mt-16 gap-4 divide-x divide-white">
                <div className="text-center">
                  <p className="text-brand-orange text-3xl sm:text-4xl lg:text-5xl font-bold">90+</p>
                  <p className="text-white mt-2 text-xs sm:text-sm opacity-60 uppercase tracking-widest font-medium">Staf</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-orange text-3xl sm:text-4xl lg:text-5xl font-bold">30+</p>
                  <p className="text-white mt-2 text-xs sm:text-sm opacity-60 uppercase tracking-widest font-medium">Stores</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-orange text-3xl sm:text-4xl lg:text-5xl font-bold">800+</p>
                  <p className="text-white mt-2 text-xs sm:text-sm opacity-60 uppercase tracking-widest font-medium">Customers</p>
                </div>
              </div>
            </div>
          </article>

          {/* Image Content */}
          <article className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto">
            <img src={BgCoffee} alt="Background Coffee" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/20 lg:hidden"></div>
          </article>
        </section>

        <section className="flex flex-col-reverse lg:flex-row items-center">
          <article className="w-full lg:w-1/2 flex flex-col justify-center items-center">
            <div className="px-6 sm:px-10 md:px-16 lg:px-20">
              <div className="flex flex-col">
                <h2 className="text-black text-3xl sm:text-4xl md:text-5xl border-l-8 border-brand-orange pl-5 font-bold leading-tight">
                  We Provide <span className="text-[#8E6447]">Good Coffee</span> and <span className="text-[#8E6447]">Healthy Meals</span>
                </h2>
                <p className="text-[#4F5665] mt-6 text-sm sm:text-base">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                <ul className="mt-10 flex flex-col gap-6 sm:gap-8">
                  {[
                    "High quality beans",
                    "Healthy meals, you can request the ingredients",
                    "Chat with our staff to get better experience for ordering",
                    "Free member card with a minimum purchase of IDR 200.000."
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#4F5665]">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-sm sm:text-base">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="w-full lg:w-1/2">
            <img src={BgBarista} alt="Background Barista" className="object-cover w-full h-75 sm:h-100 lg:h-auto"/>
          </article>
        </section>

        <section className="py-20 bg-white">
          <div className="flex justify-center px-4 text-center">
            <h2 className="border-b-8 border-brand-orange pb-5 mt-10 text-3xl sm:text-4xl md:text-5xl font-bold">
              Here is People's <span className="text-[#8E6447]">Favorite</span>
            </h2>
          </div>
          <p className="text-center mt-6 text-[#4F5665] px-6 max-w-2xl mx-auto opacity-70 text-sm sm:text-base">
            Let's choose and have a bit taste of people's favorite. It might be yours too!
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-32 gap-x-4 sm:gap-x-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mt-20">
            {[
              { id: 1, label: 'BEST SELLER', color: 'bg-red-600' },
              { id: 2, label: 'LOW PRICE', color: 'bg-red-600' },
              { id: 3, label: null },
              { id: 4, label: null }
            ].map((item) => (
              <div key={item.id} className="relative flex flex-col items-center group">
                <div className="w-full relative overflow-hidden rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105">
                  <img src={FoodImage1} alt="Food Image" className="w-full h-40 sm:h-72 object-cover"/>
                  {item.label && (
                    <div className={`absolute top-2 left-2 ${item.color} text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-sm`}>
                      {item.label}
                    </div>
                  )}
                </div>
                
                <div className="bg-white -mt-10 lg:-mt-20 z-10 p-3 sm:p-6 w-[95%] shadow-xl rounded-xl border border-gray-100 transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-sm sm:text-xl font-bold text-[#0B0909] truncate">Hazelnut Latte</h3>
                  <p className="text-[#4F5665] mt-1 sm:mt-2 text-[10px] sm:text-xs leading-relaxed opacity-80 line-clamp-2">
                    You can explore the menu that we provide with fun and have their own taste and make your day better.
                  </p>
                  <p className="text-brand-orange text-sm sm:text-xl mt-2 sm:mt-4 font-bold">IDR 20.000</p>
                  
                  <div className="flex flex-col mt-4 gap-2">
                    <Link to="/product" className="w-full text-white border-2 border-brand-orange rounded-lg py-1.5 sm:py-2 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-[10px] sm:text-sm">
                      Buy
                    </Link>
                    <Link to="/product" className="w-full border-2 border-brand-orange py-1.5 sm:py-2 rounded-lg flex justify-center items-center hover:bg-brand-orange group/cart transition-all cursor-pointer">
                      <img src={Chart} alt="cart icon" className="w-4 h-4 sm:w-5 sm:h-5 filter-brand-orange group-hover/cart:brightness-0 group-hover/cart:invert" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F8F8F8] py-24">
          <div className="flex justify-center px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight text-[#0B0909] border-b-7 border-brand-orange pb-4">
              Visit Our Store in the Spot on the Map Below
            </h2>
          </div>
          <p className="mt-10 text-center text-[#4F5665] w-full max-w-2xl mx-auto px-6 opacity-70">
            You can explore the menu that we provide with fun and have their own taste and make your day better.
          </p>
          <div className="mt-16 px-4 sm:px-10 lg:px-24">
            <img src={Map} alt="Map" className="w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" />
          </div>
        </section>

        <section className="bg-[#0B0909] py-20 lg:py-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center w-full">
            <article className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-20 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-orange/10 blur-[100px] rounded-full lg:blur-[120px]"></div>
              <img src={Testimoni1} alt="Testimonials" className="w-[85%] max-w-sm mx-auto lg:w-full lg:max-w-full object-cover rounded-3xl shadow-2xl relative z-10 border-4 border-white/10 lg:rounded-none lg:border-none"/>
            </article>
            
            <article className="w-full lg:w-1/2 px-6 sm:px-10 md:px-16 lg:px-32 text-center lg:text-left py-12 lg:py-24">
              <div className="max-w-xl mx-auto lg:mx-0">
                <p className="text-white mb-7">TESTIMONIAL</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl border-l-4 lg:border-l-8 pl-4 lg:pl-6 text-white border-brand-orange font-bold leading-tight">
                  Viezh Robert
                </h2>
                <p className="text-brand-orange mt-4 text-sm sm:text-lg font-semibold tracking-wide uppercase">Manager Coffee Shop</p>
                <p className="text-white mt-8 lg:mt-10 text-sm sm:text-lg leading-relaxed lg:leading-loose opacity-80 italic font-light px-4 lg:px-0">
                  “Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!”
                </p>

                <div className="flex items-center gap-3 justify-center lg:justify-start mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img key={star} src={Star} alt="Star Icon" className="w-3 h-3 sm:w-4 sm:h-4"/>
                  ))}
                  <span className="text-white ml-2 font-bold text-xs sm:text-sm">5.0</span>
                </div>
              
                <div className="mt-7 flex gap-4 lg:gap-6 justify-center lg:justify-start">
                  <button className="bg-white hover:bg-brand-orange transition-all duration-300 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center shadow-lg group transform hover:scale-110 active:scale-95">
                    <img src={ArrowLeft} alt="Arrow Icon" className="w-4 h-4 lg:w-5 lg:h-5 group-hover:brightness-0 group-hover:invert"/>
                  </button>
                  <button className="bg-brand-orange hover:bg-white transition-all duration-300 rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center shadow-lg group transform hover:scale-110 active:scale-95">
                    <img src={ArrowRight} alt="Arrow Icon" className="w-4 h-4 lg:w-5 lg:h-5 group-hover:filter-brand-orange"/>
                  </button>
                </div>

                <div className="mt-6 flex gap-2 lg:gap-3 justify-center lg:justify-start items-center">
                  <span className="w-8 lg:w-12 h-1.5 lg:h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(255,137,6,0.5)]"></span>
                  <span className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-white opacity-20 hover:opacity-100 cursor-pointer transition-all duration-300"></span>
                  <span className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-white opacity-20 hover:opacity-100 cursor-pointer transition-all duration-300"></span>
                  <span className="w-2 lg:w-2.5 h-2 lg:h-2.5 rounded-full bg-white opacity-20 hover:opacity-100 cursor-pointer transition-all duration-300"></span>
                </div>
              </div>
            </article>
          </div>
        </section>

      </main>
      
      {/* Chat Feature */}
      <div className="fixed bottom-6 right-6 z-60">
        <img 
          src={ChatIcon} 
          alt="Chat Icon"  
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`cursor-pointer bg-brand-orange border-2 border-brand-orange p-3 rounded-full hover:scale-110 active:scale-90 transition-all duration-300 shadow-2xl w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16`}
        />
      </div>
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
