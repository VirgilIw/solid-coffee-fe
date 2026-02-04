import React from "react";
import { Link } from "react-router";
import FoodImage1 from "../../../assets/home/Food-1.png";
import Chart from "../../../assets/home/ShoppingCart.svg";
import Star from "../../../assets/home/Star.svg";

export default function ProductCard({ product, index }) {
  const isRecommended = index < 4;
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="relative h-36 w-full overflow-hidden sm:h-56 lg:h-72">
        {isRecommended && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-[#D00000] px-3 py-1 text-[8px] font-black italic text-white sm:top-4 sm:left-4 sm:px-4 sm:text-xs">
            RECOMMENDED
          </div>
        )}
        <img
          src={product.image_products ? `http://192.168.50.221:8080/static/img/products/${product.image_products}` : FoodImage1}
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
            {Number(product.rating_product || product.rating || 0).toFixed(1)}
          </span>
        </div>


        {product.discount > 0 ? (
          <div className="mt-2">
            <p className="text-[#D00000] line-through text-xs sm:text-sm">
              IDR {Number(product.price).toLocaleString()}
            </p>
            <p className="text-brand-orange text-sm font-extrabold sm:text-xl lg:text-2xl">
              IDR {Number(product.price - (product.price * (product.discount / 100))).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="mt-2 text-brand-orange text-sm font-extrabold sm:text-xl lg:text-2xl">
            IDR {Number(product.price).toLocaleString()}
          </div>
        )}

        {/* Buttons Area */}
        <div className="mt-4 flex flex-col gap-2">
          <Link to={`/product/detail-product/${product.id}`} className="bg-brand-orange w-full rounded-lg py-2 text-center text-[10px] font-bold text-white transition-all duration-300 hover:bg-[#e67e00] sm:text-base">
            Buy
          </Link>
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
