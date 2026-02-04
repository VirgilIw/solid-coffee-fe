import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser, fetchUsers } from "../../redux/slices/user.slice"
import ImagePlaceholder from "../../assets/adminDashborad/Image.svg"
import XCircle from "../../assets/adminDashborad/XCircle.svg"
import Profile from "../../assets/adminDashborad/Profile.svg"
import Mail from "../../assets/adminDashborad/mail.svg"
import PhoneCall from "../../assets/adminDashborad/PhoneCall.svg"
import LocationIcon from "../../assets/adminDashborad/Location.svg"

function UpdateUser({ isOpen, onClose, user }) {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user)
    const [error, setError] = useState(null)

    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(user?.image || user?.photo || user?.img || null)

    const [formData, setFormData] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phone: user?.phone,
        address: user?.address
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const dataToSend = new FormData()
            dataToSend.append("id", user.id)
            Object.keys(formData).forEach(key => {
                dataToSend.append(key, formData[key])
            })
            
            if (selectedImage) {
                dataToSend.append("photo", selectedImage)
            }

            const resultAction = await dispatch(updateUser(dataToSend))
            
            if (updateUser.fulfilled.match(resultAction)) {
                dispatch(fetchUsers())
                onClose()
            } else {
                setError(resultAction.payload || "Gagal memperbarui user")
            }
        } catch {
            setError("Terjadi kesalahan sistem")
        }
    }

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
            <h2 className="text-2xl font-bold text-black">Update User</h2>
            <button onClick={onClose} className="cursor-pointer">
                <img src={XCircle} alt="Close" className="w-6 h-6 hover:scale-110 duration-300 shadow-2xl" /> 
            </button>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm font-medium border border-red-200">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Image User</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="w-24 h-24 bg-[#F4F4F4] rounded-lg flex items-center justify-center border border-[#E8E8E8] overflow-hidden">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <img src={ImagePlaceholder} alt="Upload Placeholder" className="w-8 h-8 opacity-50" />
                    )}
                </div>
                <button 
                  type="button" 
                  onClick={handleUploadClick}
                  className="bg-brand-orange text-black text-sm font-medium px-4 py-2 rounded-md w-fit cursor-pointer hover:bg-[#ffad4e]"
                >
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
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter Full Name" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                  required
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Number" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                  required
                />
              </div>
            </div>

             <div>
              <label className="block text-sm font-bold text-[#4F5665] mb-2">Address</label>
              <div className="flex items-center border border-[#E8E8E8] rounded-md px-4 py-3 focus-within:border-brand-orange transition-colors">
                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
                    <img src={LocationIcon} alt="Location" />
                </div>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address" 
                  className="w-full text-sm outline-none bg-transparent placeholder:text-[#A0A3BD]"
                  required
                />
              </div>
            </div>

            <div className="pt-4 pb-8">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full bg-brand-orange text-black font-bold py-3.5 rounded-md shadow-md transition-all cursor-pointer hover:bg-[#ffad4e] hover:shadow-lg active:scale-[0.98] ${
                    isLoading ? "opacity-70 cursor-not-allowed grayscale-[0.5]" : ""
                  }`}
                >
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser