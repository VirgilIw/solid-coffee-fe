import { useState, useRef } from "react";
import BgCoffee from "../assets/product/bg-coffee.jpg";
import ArrowLeft from "../assets/home/arrow-left.png";
import ArrowRight from "../assets/home/arrow-right.png";
import Animate from "../assets/product/animate.svg";
import Animate2 from "../assets/product/animate2.svg";
import FoodImage1 from "../assets/home/Food-1.png";
import Chart from "../assets/home/ShoppingCart.svg";
import Star from "../assets/home/Star.png";
import Filter from "../assets/product/Filter.svg"

export default function Product() {
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(['Coffee']);
  const [selectedSort, setSelectedSort] = useState(['Flash sale']);
  
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
    setSelectedCategories(['Coffee']);
    setSelectedSort(['Flash sale']);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSort = (sort) => {
    setSelectedSort(prev => 
      prev.includes(sort) ? prev.filter(s => s !== sort) : [...prev, sort]
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
              className="w-full bg-white border border-gray-100 h-10 px-4 pl-10 rounded-lg text-sm shadow-sm focus:outline-none"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <button className="bg-brand-orange text-white p-2.5 rounded-lg shadow-sm">
            <img src={Filter} alt="Filter" />
          </button>
        </div>
      </section>

      {/* Hero Banner Section - Hidden on Mobile */}
      <section className="hidden lg:relative lg:block overflow-hidden">
        <img src={BgCoffee} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-start px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="w-full max-w-4xl text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
              We Provide Good Coffee and Healthy Meals
            </h1>
          </div>
        </div>
      </section>

      {/* Today Promo Section */}
      <section className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Today <span className="text-[#8E6447]">Promo</span>
          </h2>
          <div className="hidden lg:flex gap-4">
            <button 
              onClick={() => scrollPromo("left")}
              className="bg-white hover:bg-brand-orange transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg group"
            >
              <img src={ArrowLeft} alt="Arrow Icon" className="w-4 h-4 group-hover:brightness-0 group-hover:invert"/>
            </button>
            <button 
              onClick={() => scrollPromo("right")}
              className="bg-brand-orange hover:bg-white transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg group"
            >
              <img src={ArrowRight} alt="Arrow Icon" className="w-4 h-4 group-hover:filter-brand-orange"/>
            </button>
          </div>
        </div>

        <div 
          ref={promoRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory ${isDragging ? 'cursor-grabbing select-none snap-none' : 'cursor-grab'}`}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="min-w-70 sm:min-w-[320px] lg:min-w-87.5 snap-center bg-[#88B788] rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition-shadow cursor-pointer shrink-0">
              <img src={Animate} alt="Promo Icon" className="w-16 h-16 object-contain" />
              <div className="flex-1">
                <p className="font-extrabold text-[#0B0909] text-xs sm:text-sm uppercase leading-tight">HAPPY MOTHER'S DAY!</p>
                <p className="text-[#0B0909] text-[10px] sm:text-xs mt-1 font-medium opacity-80">Get one of our favorite menu for free!</p>
                <button className="mt-3 text-white text-[10px] sm:text-xs font-bold hover:underline">
                  Klaim Kupon
                </button>
              </div>
            </div>
          ))}

          <div className="min-w-70 sm:min-w-[320px] lg:min-w-87.5 snap-center bg-[#F5C361] rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition-shadow cursor-pointer shrink-0">
            <img src={Animate2} alt="Promo Icon" className="w-16 h-16 object-contain" />
            <div className="flex-1">
              <p className="font-extrabold text-[#0B0909] text-xs sm:text-sm leading-tight">Get a cup of coffee for free on sunday morning</p>
              <p className="text-[#0B0909] text-[10px] sm:text-xs mt-1 font-medium opacity-80">Only at 7 to 9 AM</p>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="mt-6 lg:mt-10 flex gap-2 justify-center lg:justify-start items-center">
          <span className="w-8 h-2 rounded-full bg-brand-orange shadow-[0_2px_8px_rgba(255,137,6,0.3)]"></span>
          <span className="w-2 h-2 rounded-full bg-[#E8E8E8]"></span>
          <span className="w-2 h-2 rounded-full bg-[#E8E8E8]"></span>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="px-4 py-8 lg:py-16 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-[#F8F8F8]">

        <div className="flex justify-center lg:justify-start mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Our <span className="text-[#8E6447] pb-1">Product</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Filter - Hidden on mobile, shown on lg */}
          <aside className="hidden lg:block w-87.5 shrink-0">
            <div className="bg-[#0B0909] rounded-2xl p-8 text-white sticky top-24 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <p className="text-xl font-bold tracking-wide">Filter</p>
                <button 
                  onClick={handleReset}
                  className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                >
                  Reset Filter
                </button>
              </div>

              {/* Search */}
              <div className="mb-10">
                <label className="block text-sm font-bold mb-3 uppercase tracking-widest opacity-60">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Your Product"
                    className="w-full bg-white text-black h-12 rounded-lg px-4 focus:ring-2 focus:ring-brand-orange outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Category ... (rest of sidebar content) */}
              <div className="mb-10">
                <p className="text-sm font-bold mb-5 uppercase tracking-widest opacity-60">Category</p>
                <div className="flex flex-col gap-4">
                  {['Favorite Product', 'Coffee', 'Non Coffee', 'Foods', 'Add-On'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-full checked:bg-brand-orange checked:border-brand-orange transition-all" 
                          checked={selectedCategories.includes(cat)} 
                          onChange={() => toggleCategory(cat)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity text-white pointer-events-none">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-10">
                <p className="text-sm font-bold mb-5 uppercase tracking-widest opacity-60">Sort By</p>
                <div className="flex flex-col gap-4">
                  {['Priciest', 'Cheapest', 'Recommended', 'Latest'].map((sort) => (
                    <label key={sort} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border-2 border-white/20 rounded-full checked:bg-brand-orange checked:border-brand-orange transition-all" 
                          checked={selectedSort.includes(sort)} 
                          onChange={() => toggleSort(sort)}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity text-white pointer-events-none">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      </div>
                      <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">{sort}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Range Price */}
              <div className="mb-12">
                <p className="text-sm font-bold mb-6 uppercase tracking-widest opacity-60">
                  Range Price (IDR {minPrice.toLocaleString()} - {maxPrice.toLocaleString()})
                </p>
                <div className="px-2 relative h-10 flex items-center">
                  <div className="absolute left-2 right-2 h-1.5 bg-white/20 rounded-full"></div>
                  <div className="absolute h-1.5 bg-brand-orange rounded-full pointer-events-none" style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}></div>
                  <input type="range" min="0" max="100000" step="500" value={minPrice} onChange={handleMinChange} className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" />
                  <input type="range" min="0" max="100000" step="500" value={maxPrice} onChange={handleMaxChange} className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] opacity-60 font-medium">
                  <span>IDR 0</span>
                  <span>IDR 100k</span>
                </div>
              </div>

              <button className="w-full bg-brand-orange text-[#0B0909] font-extrabold py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-brand-orange/20">
                Apply Filter
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                  {/* Image Area */}
                  <div className="w-full relative overflow-hidden h-36 sm:h-56 lg:h-72">
                    <img src={FoodImage1} alt="Product Image" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-3 sm:p-5 lg:p-8 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-[#0B0909] truncate">Hazelnut Latte</h3>
                    <p className="text-[#4F5665] text-[10px] sm:text-sm leading-relaxed opacity-70 line-clamp-2 mt-1">
                      You can explore the menu that we provide with fun and have their own taste and make your day better.
                    </p>
                    
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <img key={s} src={Star} alt="Star" className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                      ))}
                      <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm font-bold text-[#4B5563]">5.0</span>
                    </div>

                    <div className="mt-2">
                      <p className="text-brand-orange text-sm sm:text-xl lg:text-2xl font-extrabold">IDR 20.000</p>
                    </div>
                    
                    {/* Buttons Area */}
                    <div className="mt-4 flex flex-col gap-2">
                      <button className="w-full bg-brand-orange text-white rounded-lg py-2 text-center font-bold hover:bg-[#e67e00] transition-all duration-300 text-[10px] sm:text-base">
                        Buy
                      </button>
                      <button className="w-full border border-brand-orange py-2 rounded-lg hover:bg-brand-orange/5 transition-all duration-300 flex justify-center items-center group/cart">
                        <img src={Chart} alt="Cart" className="w-4 h-4 sm:w-6 sm:h-6 filter-brand-orange" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center lg:justify-start items-center gap-3 mt-12 mb-8">
              {[1, 2, 3, 4].map((page) => (
                <button 
                  key={page} 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold transition-all shadow-sm flex items-center justify-center text-sm sm:text-base ${
                    page === 1 
                      ? 'bg-brand-orange text-white shadow-brand-orange/20' 
                      : 'bg-[#E8E8E8] text-[#4F5665] hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/20 hover:scale-110 transition-all">
                <img src={ArrowRight} alt="Next" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
