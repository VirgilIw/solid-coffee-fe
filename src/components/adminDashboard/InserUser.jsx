import { useState } from "react"
import Image from "../../assets/adminDashborad/Image.svg"
import XCircle from "../../assets/adminDashborad/XCircle.svg"
import Profile from "../../assets/adminDashborad/Profile.svg"
import Mail from "../../assets/adminDashborad/mail.svg"
import PhoneCall from "../../assets/adminDashborad/PhoneCall.svg"
import Password from "../../assets/adminDashborad/Password.svg"
import Location from "../../assets/adminDashborad/Location.svg"
import EyeOpen from "../ui/EyeOpen"
import EyeClose from "../ui/EyeClose"

export default function InserUser({ isOpen, onClose }) {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md h-full bg-white shadow-xl overflow-y-auto no-scrollbar animate-slide-in-right">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-black">Insert User</h2>
            <button onClick={onClose} className="cursor-pointer">
                <img src={XCircle} alt="Close" className="w-6 h-6 hover:scale-110 duration-300 shadow-2xl" /> 
            </button>
          </div>

          <form className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Image User</label>
              <div className="flex flex-col gap-3">
                <div className="w-24 h-24 bg-[#F4F4F4] rounded-lg flex items-center justify-center border border-[#E8E8E8]">
                    <img src={Image} alt="Upload Placeholder" className="w-8 h-8 opacity-50" />
                </div>
                <button type="button" className="bg-brand-orange text-black text-sm font-medium px-4 py-2 rounded-md w-fit cursor-pointer hover:bg-[#ffad4e]">
                  Upload
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Full Name</label>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={Profile} alt="User" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Full Name" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Email</label>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={Mail} alt="Mail" />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Phone</label>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={PhoneCall} alt="Phone" />
                </div>
                <input 
                  type="tel" 
                  placeholder="Enter Your Number" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-[#4F5665]">Password</label>
                <button type="button" className="text-sm text-brand-orange font-medium">Set New Password</button>
              </div>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={Password} alt="Lock" />
                </div>
                <input 
                  type={isPasswordOpen ? "text" : "password"}
                  placeholder="Enter Your Password" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                />
                <button 
                  type="button" 
                  onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                  className="ml-2 w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                    {isPasswordOpen ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>

             <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Address</label>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={Location} alt="Location" />
                </div>
                <input 
                  type="text" 
                  placeholder="Enter Your Address" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                />
              </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-[#4F5665] mb-2">Type of User</label>
                <div className="flex gap-4">
                    <button type="button" className="flex-1 py-3 border border-brand-orange text-black rounded-md font-medium text-sm text-center">
                        Normal User
                    </button>
                    <button type="button" className="flex-1 py-3 border border-[#E8E8E8] text-[#4F5665] rounded-md font-medium text-sm text-center hover:border-brand-orange hover:text-black transition-colors">
                        Admin
                    </button>
                </div>
            </div>

            <div className="pt-4 pb-8">
                <button type="submit" className="w-full bg-brand-orange text-black font-bold py-3.5 rounded-md shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-[#ffad4e]">
                    Add User
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
