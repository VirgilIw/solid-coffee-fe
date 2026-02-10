import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fetchHistoryDetail } from "../redux/slices/order.slice"
import Rating from "../components/ui/product/Rating"
import Profile from "../assets/Order/Profile.svg"
import Location from "../assets/Order/Location.svg"
import PhoneCall from "../assets/Order/PhoneCall.svg"
import Payment from "../assets/Order/Payment.svg"
import Truct from "../assets/Order/Truck.svg"
import Circle from "../assets/Order/Circle.svg"
import FoodImage from "../assets/home/Food-1.png"

export default function DetailOrder() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedOrder: order, isLoading, error } = useSelector((state) => state.order)
  const [isRatingOpen, setIsRatingOpen] = useState(false)

  console.log(order)

  useEffect(() => {
    if (id) {
      dispatch(fetchHistoryDetail(id))
    }
  }, [dispatch, id])

  const formatPrice = (price) => {
    if (typeof price === 'string' && price.startsWith('IDR')) return price
    return `IDR ${Number(price || 0).toLocaleString("id-ID")}`
  }

  if (isLoading) {
    return (
      <section className='py-20 px-4 text-center'>
        <p className="text-2xl font-medium text-gray-500">Loading order details...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className='py-20 px-4 text-center'>
        <p className="text-2xl font-medium text-red-500">Error: {error}</p>
      </section>
    )
  }

  if (!order) {
    return (
      <section className='py-20 px-4 text-center'>
        <p className="text-2xl font-medium text-gray-500">Order not found.</p>
      </section>
    )
  }

  return (
    <>
      <section className='py-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
        <h1 className='text-3xl md:text-5xl font-medium'>Order <span className='font-bold'>#{(order.order_id || order.orderNumber || id).toString().slice(0, 11)}</span></h1>
        <p className='text-[#4F5665] mt-4 text-lg'>{order.date || "-"}</p>

        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <div>
            <h2 className='text-2xl font-bold mb-6'>Order Information</h2>
            <div className='mt-1'>
              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Profile} alt="Icon" className="w-5 h-5" /> Full Name</p>
                <p className='font-bold text-right ml-4'>{order.fullname || order.customer?.fullName || "-"}</p>
              </div>
  
              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Location} alt="Icon" className="w-5 h-5" /> Address</p>
                <p className='font-bold text-right ml-4'>{order.address || order.customer?.address || "-"}</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={PhoneCall} alt="Icon" className="w-5 h-5" /> Phone</p>
                <p className='font-bold text-right ml-4'>{order.phone || order.customer?.phone || "-"}</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Payment} alt="Icon" className="w-5 h-5" /> Payment Method</p>
                <p className='font-bold text-right ml-4 capitalize'>{order.payment_method || order.customer?.paymentMethod || "-"}</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Truct} alt="Icon" className="w-5 h-5" /> Shipping</p>
                <p className='font-bold text-right ml-4'>{order.shipping || order.customer?.shipping || "-"}</p>
              </div>

              <div className='flex justify-between items-center border-b border-[#E8E8E8] py-5'>
                <p className='text-[#4F5665] flex items-center gap-3'><img src={Circle} alt="Icon" className="w-5 h-5" /> Status</p>
                <p className={`font-bold px-4 py-1 rounded-full text-sm capitalize ${
                  order.status?.toLowerCase() === 'done' || order.status?.toLowerCase() === 'completed' 
                  ? 'bg-[#00A70033] text-[#00a11b]' 
                  : 'bg-[#FF890633] text-brand-orange'
                }`}>
                  {order.status || "Pending"}
                </p>
              </div>
              <div className='flex justify-between items-center py-6'>
                <p className='text-[#4F5665] font-medium'>Total Transaksi</p>
                <p className='font-bold text-2xl text-orange-500'>{formatPrice(order.total || order.total_price || 0)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className='text-2xl font-bold mb-2'>Your Order</h2>
            {order.detail_item && order.detail_item.length > 0 ? (
              order.detail_item.map((item, index) => (
                <div key={index} className="relative flex gap-4 bg-[#F8F8F8] p-4 rounded-xl shadow-sm border border-transparent hover:border-gray-200 transition-all">
                  <div className="w-24 sm:w-32 h-24 sm:h-32 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img 
                      src={item.image || item.image_products || FoodImage} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = FoodImage; }}
                    />
                  </div>
                  <div className="flex-1 pr-6 flex flex-col justify-center">
                    {item.is_sale && (
                      <p className="inline-block bg-[#D00000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit mb-1">FLASH SALE!</p>
                    )}
                    <h3 className="font-bold text-lg sm:text-xl text-[#0B132A]">{item.item_name || item.product_name}</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-sm text-[#4F5665]">
                      <p className="flex items-center gap-2">{item.qty}pcs <span className="opacity-50">|</span></p>
                      <p className="flex items-center gap-2">{item.product_size} <span className="opacity-50">|</span></p>
                      <p className="flex items-center gap-2">{item.product_type || item.temp} <span className="opacity-50">|</span></p>
                      <p>{item.type || order.shipping}</p>
                    </div>

                    <div className="flex flex-col items-start sm:flex-row justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {item.old_price && <p className="text-[#D00000] line-through text-xs font-medium">{formatPrice(item.old_price)}</p>}
                        <p className="text-orange-500 text-lg sm:text-xl font-bold">{formatPrice(item.subtotal || item.unitPrice)}</p>
                      </div>
                      <p 
                        onClick={() => setIsRatingOpen(!isRatingOpen)}
                        className="text-white border-2 mt-2 border-brand-orange rounded-[5px] py-1.5 px-6 text-center bg-brand-orange hover:bg-transparent hover:text-brand-orange cursor-pointer transition-all font-bold text-sm">Rating</p>
                    </div>
                    <Rating isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} orderId={order.detail_id || order.detail_id}/>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No items found in this order.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
