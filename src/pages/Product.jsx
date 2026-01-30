import { useState, useRef } from "react";
import BgCoffee from "../assets/product/bg-coffee.jpg";
import ArrowLeft from "../assets/home/arrow-left.png";
import ArrowRight from "../assets/home/arrow-right.png";
import Animate from "../assets/product/animate.svg";
import Animate2 from "../assets/product/animate2.svg";
import FoodImage1 from "../assets/home/Food-1.png";
import Chart from "../assets/home/ShoppingCart.svg";
import Star from "../assets/home/Star.png";
import Filter from "../assets/product/Filter.svg";

export default function Product() {
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["Coffee"]);
  const [selectedSort, setSelectedSort] = useState(["Flash sale"]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const promoRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - promoRef.current.offsetLeft);
    setScrollLeftState(promoRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - promoRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    promoRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollPromo = (direction) => {
    if (promoRef.current) {
      const scrollAmount = 350;
      promoRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1000);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1000);
    setMaxPrice(value);
  };

  const handleReset = () => {
    setMinPrice(10000);
    setMaxPrice(80000);
    setSearch("");
    setSelectedCategories(["Coffee"]);
    setSelectedSort(["Flash sale"]);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleSort = (sort) => {
    setSelectedSort((prev) =>
      prev.includes(sort) ? prev.filter((s) => s !== sort) : [...prev, sort],
    );
  };

  const minPos = ((minPrice - 0) / (100000 - 0)) * 100;
  const maxPos = ((maxPrice - 0) / (100000 - 0)) * 100;

  return (
    <>
      {/* Mobile Search & Filter Bar - Only visible on mobile/tablet */}
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

      {/* Hero Banner Section - Hidden on Mobile */}
      <section className="hidden overflow-hidden lg:relative lg:block">
        <img
          src={BgCoffee}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-start bg-black/10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-4xl text-white">
            <h1 className="text-2xl leading-tight drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
              We Provide Good Coffee and Healthy Meals
            </h1>
          </div>
        </div>
      </section>

      {/* Today Promo Section */}
      <section className="px-4 py-16 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Today <span className="text-[#8E6447]">Promo</span>
          </h2>
          <div className="hidden gap-4 lg:flex">
            <button
              onClick={() => scrollPromo("left")}
              className="hover:bg-brand-orange group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300"
            >
              <img
                src={ArrowLeft}
                alt="Arrow Icon"
                className="h-4 w-4 group-hover:brightness-0 group-hover:invert"
              />
            </button>
            <button
              onClick={() => scrollPromo("right")}
              className="bg-brand-orange group flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:bg-white"
            >
              <img
                src={ArrowRight}
                alt="Arrow Icon"
                className="group-hover:filter-brand-orange h-4 w-4"
              />
            </button>
          </div>
        </div>
      </section>

      {/* card section */}
      <section className="pb-8">
        <div
          ref={promoRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`scrollbar-hide no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 ${isDragging ? "cursor-grabbing snap-none select-none" : "cursor-grab"}`}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex min-w-70 shrink-0 cursor-pointer snap-center items-center gap-4 rounded-2xl bg-[#88B788] p-10 shadow-md transition-shadow hover:shadow-xl sm:min-w-[320px] lg:min-w-87.5"
            >
              <img
                src={Animate}
                alt="Promo Icon"
                className="h-16 w-16 object-contain"
              />
              <div className="flex-1">
                <p className="text-xs leading-tight font-extrabold text-[#0B0909] uppercase sm:text-sm">
                  HAPPY MOTHER'S DAY!
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#0B0909] opacity-80 sm:text-xs">
                  Get one of our favorite menu for free!
                </p>
                <button className="mt-3 text-[10px] font-bold text-white hover:underline sm:text-xs">
                  Klaim Kupon
                </button>
              </div>
            </div>
          ))}

          <div className="flex min-w-70 shrink-0 cursor-pointer snap-center items-center gap-4 rounded-2xl bg-[#F5C361] p-6 shadow-md transition-shadow hover:shadow-xl sm:min-w-[320px] lg:min-w-87.5">
            <img
              src={Animate2}
              alt="Promo Icon"
              className="h-16 w-16 object-contain"
            />
            <div className="flex-1">
              <p className="text-xs leading-tight font-extrabold text-[#0B0909] sm:text-sm">
                Get a cup of coffee for free on sunday morning
              </p>
              <p className="mt-1 text-[10px] font-medium text-[#0B0909] opacity-80 sm:text-xs">
                Only at 7 to 9 AM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="bg-[#F8F8F8] px-4 py-8 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="mb-12 flex justify-center lg:justify-start">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Our <span className="pb-1 text-[#8E6447]">Product</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Sidebar Filter - Hidden on mobile, shown on lg */}
          <aside className="hidden w-87.5 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl bg-[#0B0909] p-8 text-white shadow-2xl">
              <div className="mb-10 flex items-center justify-between">
                <p className="text-xl font-bold tracking-wide">Filter</p>
                <button
                  onClick={handleReset}
                  className="text-sm font-medium opacity-60 transition-opacity hover:opacity-100"
                >
                  Reset Filter
                </button>
              </div>

              {/* Search */}
              <div className="mb-10">
                <label className="mb-3 block text-sm font-bold tracking-widest uppercase opacity-60">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Your Product"
                    className="focus:ring-brand-orange h-12 w-full rounded-lg bg-white px-4 text-black transition-all outline-none placeholder:text-gray-400 focus:ring-2"
                  />
                </div>
              </div>

              {/* Category ... (rest of sidebar content) */}
              <div className="mb-10">
                <p className="mb-5 text-sm font-bold tracking-widest uppercase opacity-60">
                  Category
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    "Favorite Product",
                    "Coffee",
                    "Non Coffee",
                    "Foods",
                    "Add-On",
                  ].map((cat) => (
                    <label
                      key={cat}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer checked:bg-brand-orange checked:border-brand-orange h-5 w-5 appearance-none rounded-full border-2 border-white/20 transition-all"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="4"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-10">
                <p className="mb-5 text-sm font-bold tracking-widest uppercase opacity-60">
                  Sort By
                </p>
                <div className="flex flex-col gap-4">
                  {["Priciest", "Cheapest", "Recommended", "Latest"].map(
                    (sort) => (
                      <label
                        key={sort}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer checked:bg-brand-orange checked:border-brand-orange h-5 w-5 appearance-none rounded-full border-2 border-white/20 transition-all"
                            checked={selectedSort.includes(sort)}
                            onChange={() => toggleSort(sort)}
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <span className="text-sm font-medium opacity-80 transition-opacity group-hover:opacity-100">
                          {sort}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Range Price */}
              <div className="mb-12">
                <p className="mb-6 text-sm font-bold tracking-widest uppercase opacity-60">
                  Range Price (IDR {minPrice.toLocaleString()} -{" "}
                  {maxPrice.toLocaleString()})
                </p>
                <div className="relative flex h-10 items-center px-2">
                  <div className="absolute right-2 left-2 h-1.5 rounded-full bg-white/20"></div>
                  <div
                    className="bg-brand-orange pointer-events-none absolute h-1.5 rounded-full"
                    style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={minPrice}
                    onChange={handleMinChange}
                    className="pointer-events-none absolute w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className="pointer-events-none absolute w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-medium opacity-60">
                  <span>IDR 0</span>
                  <span>IDR 100k</span>
                </div>
              </div>

              <button className="bg-brand-orange shadow-brand-orange/20 w-full rounded-xl py-4 font-extrabold text-[#0B0909] shadow-lg transition-all duration-300 hover:bg-white">
                Apply Filter
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                >
                  {/* Image Area */}
                  <div className="relative h-36 w-full overflow-hidden sm:h-56 lg:h-72">
                    <img
                      src={FoodImage1}
                      alt="Product Image"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-3 sm:p-5 lg:p-8">
                    <h3 className="truncate text-sm font-bold text-[#0B0909] sm:text-xl lg:text-2xl">
                      Hazelnut Latte
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#4F5665] opacity-70 sm:text-sm">
                      You can explore the menu that we provide with fun and have
                      their own taste and make your day better.
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

                    <div className="mt-2">
                      <p className="text-brand-orange text-sm font-extrabold sm:text-xl lg:text-2xl">
                        IDR 20.000
                      </p>
                    </div>

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
              ))}
            </div>

            {/* Pagination Section */}
            <div className="mt-12 mb-8 flex items-center justify-center gap-3 lg:justify-start">
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
              <button className="bg-brand-orange shadow-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:h-12 sm:w-12">
                <img src={ArrowRight} alt="Next" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
