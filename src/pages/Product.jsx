import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../redux/slices/product.slice";
import ProductList from "../components/ui/product/ProductList";
import BgCoffee from "../assets/product/bg-coffee.jpg";
import ArrowLeft from "../assets/home/arrow-left.png";
import ArrowRight from "../assets/home/arrow-right.png";
import Animate from "../assets/product/animate.svg";
import Animate2 from "../assets/product/animate2.svg";
import Filter from "../assets/product/Filter.svg";


export default function Product() {
  const dispatch = useDispatch();
  const { items: products, isLoading, pageInfo } = useSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(Number(searchParams.get("min")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("max")) || 100000);
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category") ? searchParams.get("category").split(",") : []
  );
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    const filters = {
      page: Number(searchParams.get("page")) || pageInfo.currentPage,
      title: searchParams.get("title") || "",
      category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
      min: searchParams.get("min") || "",
      max: searchParams.get("max") || "",
    };
    dispatch(fetchProducts(filters));
  }, [dispatch, pageInfo.currentPage, searchParams]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (title) params.set("title", title);
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (selectedSort) params.set("sort", selectedSort);
    params.set("min", minPrice.toString());
    params.set("max", maxPrice.toString());
    
    setSearchParams(params);
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    dispatch(setPage(newPage));
  };

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
    setMinPrice(0);
    setMaxPrice(100000);
    setTitle("");
    setSelectedCategories([]);
    setSelectedSort("");
    setSearchParams({});
    dispatch(setPage(1));
  };

  const toggleSort = (sort) => {
    setSelectedSort((prev) => (prev === sort ? "" : sort));
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
              placeholder="Find Product"
              className="h-10 w-full rounded-lg border border-gray-100 bg-white px-4 pl-10 text-sm shadow-sm focus:outline-none"
            />
            <button 
              onClick={handleApplyFilter}
              className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
            >
              <svg
                className="h-4 w-4 text-gray-400 hover:text-brand-orange transition-colors"
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
            </button>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
                    placeholder="Search Your Product"
                    className="focus:ring-brand-orange h-12 w-full rounded-lg bg-white px-4 text-black transition-all outline-none placeholder:text-gray-400 focus:ring-2"
                  />
                </div>
              </div>

              {/* Category */}
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
                          className="peer checked:bg-brand-orange checked:border-brand-orange h-5 w-5 appearance-none rounded-md border-2 border-white/20 transition-all"
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
                            type="radio"
                            name="sortBy"
                            className="peer checked:bg-brand-orange checked:border-brand-orange h-5 w-5 appearance-none rounded-md border-2 border-white/20 transition-all shadow-sm focus:ring-1 focus:ring-brand-orange"
                            checked={selectedSort === sort}
                            onClick={() => toggleSort(sort)}
                            onChange={() => {}}
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

              <button 
                onClick={handleApplyFilter}
                className="bg-brand-orange shadow-brand-orange/20 w-full rounded-xl py-4 font-extrabold text-[#0B0909] shadow-lg transition-all duration-300 hover:bg-white"
              >
                Apply Filter
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <ProductList
              isLoading={isLoading}
              products={products}
              onRetry={() => dispatch(fetchProducts({ page: 1 }))}
            />

            {/* Pagination Section */}
            <div className="mt-12 mb-8 flex items-center justify-center gap-3 lg:justify-start">
              <button 
                onClick={() => pageInfo.currentPage > 1 && handlePageChange(pageInfo.currentPage - 1)}
                className="bg-brand-orange shadow-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:h-12 sm:w-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pageInfo.currentPage === 1}
              >
                <img src={ArrowLeft} alt="Previous" className="h-4 w-4" />
              </button>

              {Array.from({ length: pageInfo.totalPage || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all sm:h-12 sm:w-12 sm:text-base ${
                    page === pageInfo.currentPage
                      ? "bg-brand-orange shadow-brand-orange/20 text-white"
                      : "bg-[#E8E8E8] text-[#4F5665] hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => pageInfo.currentPage < (pageInfo.totalPage || 1) && handlePageChange(pageInfo.currentPage + 1)}
                className="bg-brand-orange shadow-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:h-12 sm:w-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pageInfo.currentPage === (pageInfo.totalPage || 1)}
              >
                <img src={ArrowRight} alt="Next" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
