import { useState } from "react";
import { useNavigate } from "react-router";
import ChatWindow from "../components/ui/ChatWindow"
import Calendar from "../assets/Order/Calendar.svg"
import Calendar2 from "../assets/Order/Calendar2.svg"
import Glass from "../assets/Order/glass-tea.svg"
import Repeat from "../assets/Order/Repeat.svg"
import Process from "../assets/Order/process.svg"
import Message from "../assets/Order/Message.svg"
import ArrowRight from "../assets/home/arrow-right.png"
import FoodImage1 from "../assets/home/Food-1.png"

const orders = [
    {
        id: "#12354-09893",
        date: "23 January 2023",
        total: "Idr 40.000",
        status: "On Progress",
        image: FoodImage1
    },
    {
        id: "#12354-09893",
        date: "24 January 2023",
        total: "Idr 40.000",
        status: "On Progress",
        image: FoodImage1
    },
    {
        id: "#12354-09893",
        date: "24 January 2023",
        total: "Idr 40.000",
        status: "On Progress",
        image: FoodImage1
    },
    {
        id: "#12354-09893",
        date: "24 January 2023",
        total: "Idr 40.000",
        status: "On Progress",
        image: FoodImage1
    }
]

export default function HistoryOrder() {
    const navigate = useNavigate();
    const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <section className='py-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
        <div>
            <h1 className='text-3xl md:text-5xl font-medium flex gap-3'>History Order <span className='text-xl bg-[#E8E8E8] p-3 pl-5 pr-5'>2</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            {/* Left Column: Orders List */}
            <div className='lg:col-span-2'>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-5 mb-8 font-jakarta'>
                    <div className='flex bg-[#E8E8E899] p-1 rounded-lg items-center gap-1 flex-wrap justify-between sm:justify-start'>
                        <button className='bg-white text-[#3E3E3E] px-4 sm:px-6 py-2 font-bold shadow-sm rounded-md text-sm sm:text-base grow sm:grow-0'>On Progress</button>
                        <button className='text-[#9F9F9F] px-4 sm:px-6 py-2 font-medium hover:text-[#3E3E3E] transition text-sm sm:text-base grow sm:grow-0'>Sending Goods</button>
                        <button className='text-[#9F9F9F] px-4 sm:px-6 py-2 font-medium hover:text-[#3E3E3E] transition text-sm sm:text-base grow sm:grow-0'>Finish Order</button>
                    </div>
                    <div className='bg-[#E8E8E899] p-2 px-4 flex gap-3 items-center rounded-lg cursor-pointer w-fit'>
                        <img src={Calendar} alt="Calendar Icon" className="w-4 h-4 opacity-60" />
                        <select name="Date" id="Date" className="bg-transparent outline-none cursor-pointer text-[#3E3E3E] font-medium text-sm">
                            <option>January 2023</option>
                            <option>February 2023</option>
                            <option>March 2023</option>
                            <option>April 2023</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 bg-[#E8E8E84D] p-5 rounded-md items-start md:items-center">
                            <div className="shrink-0 hidden md:block">
                                <img src={order.image} alt="Food" className="w-24 h-24 object-cover"/>
                            </div>
                            
                            <div className="grow grid grid-cols-2 sm:grid-cols-4 gap-4 w-full min-w-0">
                                <div className="flex flex-col">
                                    <p className="flex gap-2 text-[#4F5665] text-sm"><img src={Glass} alt="Icon" className="w-4 h-4" /> No. Order</p>
                                    <p className="font-bold mt-1 text-base">{order.id}</p>
                                    <button onClick={() => navigate('/order/detail')} className="text-brand-orange hover:text-[#ffad4e] text-sm font-medium underline text-left mt-1 hidden md:block">View Order Detail</button>
                                </div>
                                <div className="flex flex-col">
                                    <p className="flex gap-2 text-[#4F5665] text-sm"><img src={Calendar2} alt="Icon" className="w-4 h-4" /> Date</p>
                                    <p className="font-bold mt-1 text-base">{order.date}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="flex gap-2 text-[#4F5665] text-sm"><img src={Repeat} alt="Icon" className="w-4 h-4" /> Total</p>
                                    <p className="font-bold mt-1 text-base">{order.total}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="flex gap-2 text-[#4F5665] text-sm"><img src={Process} alt="Icon" className="w-4 h-4" /> Status</p>
                                    <p className="font-semibold mt-1 bg-[#FF890633] text-brand-orange py-1 px-3 rounded-full text-xs w-fit">{order.status}</p>
                                </div>
                            </div>
                            <button onClick={() => navigate('/order/detail')} className="text-brand-orange text-sm font-medium hover:underline text-left mt-1 block md:hidden">View Order Detail</button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 mb-8 flex items-center justify-center gap-3">
                    {[1, 2, 3, 4].map((page) => (
                        <button
                        key={page}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all sm:h-12 sm:w-12 sm:text-base ${
                            page === 1
                            ? "bg-brand-orange shadow-brand-orange/20 text-white"
                            : "bg-[#E8E8E8] text-[#4F5665] hover:bg-gray-200"
                        }`}
                        >
                        {page}
                        </button>
                    ))}
                    <button 
                        className="bg-brand-orange shadow-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:h-12 sm:w-12"
                    >
                        <img src={ArrowRight} alt="Next" className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            {/* Right Column: Send Message */}
            <div className="lg:col-span-1">
                <div className="flex flex-col border border-[#E8E8E8] h-fit p-8 rounded-md sticky top-10">
                    <div className="flex items-center gap-3 mb-4">
                         <img src={Message} alt="Message Icon" className="w-8 h-8"/>
                         <p className="text-[#4F5665] text-xl font-bold">Send Us Message</p>
                    </div>
                   
                    <p className="text-[#4F5665] text-sm leading-6 mb-6">
                        if your unable to find answer or find your product quickly, please describe your problem and tell us. we will give you solution.
                    </p>
                    <button 
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="bg-brand-orange text-white px-6 py-3 rounded-md font-medium hover:bg-[#ffad4e] transition w-full">
                        Send Message
                    </button>
                    <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                </div> 
            </div>
        </div>
    </section>
  )
}
