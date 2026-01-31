import React from "react";
import FoodImage1 from "../../../assets/home/Food-1.png";
import Chart from "../../../assets/home/ShoppingCart.svg";
import Star from "../../../assets/home/Star.png";

export default function ProductCard({ product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Image Area */}
      <div className="relative h-36 w-full overflow-hidden sm:h-56 lg:h-72">
        <img
          src={product.image || FoodImage1}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-5 lg:p-8">
        <h3 className="truncate text-sm font-bold text-[#0B0909] sm:text-xl lg:text-2xl">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#4F5665] opacity-70 sm:text-sm">
          {product.description ||
            "Nikmati produk kopi favorit Anda dengan cita rasa yang unik dan menyegarkan."}
        </p>

        <div className="mt-2 flex items-center gap-0.5 sm:gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <img
              key={s}
              src={Star}
              alt="Star"
              className="h-2.5 w-2.5 sm:h-4 sm:w-4"
            />
          ))}
          <span className="ml-1 text-[10px] font-bold text-[#4B5563] sm:ml-2 sm:text-sm">
            5.0
          </span>
        </div>

        {product.discount > 0 ? (
          <div className="flex items-center gap-2 mt-4">
            <p className="text-[#D00000] line-through text-xs">
              IDR {Number(product.price).toLocaleString()}
            </p>
            <p className="text-orange-500 text-lg sm:text-xl font-bold">
              IDR{" "}
              {Number(
                product.price - product.price * product.discount
              ).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="mt-2 text-brand-orange text-sm font-extrabold sm:text-xl lg:text-2xl">
            IDR {Number(product.price).toLocaleString()}
          </div>
        )}

        {/* Buttons Area */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-brand-orange w-full rounded-lg py-2 text-center text-[10px] font-bold text-white transition-all duration-300 hover:bg-[#e67e00] sm:text-base">
            Buy
          </button>
          <button className="border-brand-orange hover:bg-brand-orange/5 group/cart flex w-full items-center justify-center rounded-lg border py-2 transition-all duration-300">
            <img
              src={Chart}
              alt="Cart"
              className="filter-brand-orange h-4 w-4 sm:h-6 sm:w-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
