import { useState } from "react"
import Star from "../../../assets/home/Star.svg"
import XCircle from "../../../assets/adminDashborad/XCircle.svg"

export default function Rating({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 transition-opacity duration-300">
      <div className="animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-5 flex w-full max-w-md flex-col overflow-hidden rounded-t-[2.5rem] sm:rounded-3xl border-t sm:border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] duration-300">
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-200 sm:hidden"></div>
        <div className="bg-brand-orange mt-3 sm:mt-0 h-1.5 w-full sm:h-6"></div>

        <div className="flex flex-col border-b border-gray-50 p-6 sm:p-5">
            <div className="flex items-center justify-between gap-4">
                <p className="font-bold text-xl sm:text-lg text-gray-800">Add Review for This Menu</p>
                <button onClick={onClose} className="cursor-pointer p-1">
                    <img src={XCircle} alt="Close" className="w-7 h-7 sm:w-6 sm:h-6 hover:scale-110 duration-300" /> 
                </button>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 justify-center mt-12 sm:mt-10 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition-transform hover:scale-110 active:scale-90 focus:outline-none"
                    >
                        <img 
                            src={Star} 
                            alt={`Star ${star}`} 
                            className={`w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ${
                                star <= (hoverRating || rating) 
                                ? "opacity-100 grayscale-0 scale-110" 
                                : "opacity-30 grayscale scale-100"
                            }`}
                        />
                    </button>
                ))}
            </div>

            <button 
                onClick={() => {
                    if (rating === 0) {
                        alert("Please select a rating!");
                        return;
                    }
                    console.log(`Submitted rating: ${rating}`);
                    onClose();
                }}
                className="bg-brand-orange mt-6 sm:mt-10 mb-4 sm:mb-0 shadow-brand-orange/30 group shrink-0 rounded-2xl sm:rounded-xl p-4 sm:p-3.5 shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-white font-bold text-lg sm:text-base"
            >
                Submit Review
            </button>
        </div>
      </div>
    </div>
  );
}
