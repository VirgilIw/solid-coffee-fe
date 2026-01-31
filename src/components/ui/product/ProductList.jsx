import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ isLoading, products, onRetry }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-orange border-t-transparent"></div>
        <p className="mt-4 font-medium text-gray-500">Memuat Produk...</p>
      </div>
    );
  }

  if (products.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-xl font-bold text-gray-400">
        Tidak ada produk ditemukan.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 text-brand-orange font-bold hover:underline"
      >
        Coba lagi
      </button>
    </div>
  );
}
