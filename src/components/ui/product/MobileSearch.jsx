import React from "react";
import Filter from "../../../assets/product/Filter.svg";

export default function MobileSearch({ search, setSearch }) {
  return (
    <section className="px-4 pt-6 lg:hidden">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find Product"
            className="h-10 w-full rounded-lg border border-gray-100 bg-white px-4 pl-10 text-sm shadow-sm focus:outline-none"
          />
          <svg
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <button className="bg-brand-orange rounded-lg p-2.5 text-white shadow-sm">
          <img src={Filter} alt="Filter" />
        </button>
      </div>
    </section>
  );
}
