import Star from "../assets/home/Star.svg";
import ArrowRight from "../assets/home/arrow-right.png";
import FoodImage1 from "../assets/home/Food-1.png";
import Chart from "../assets/images/ShoppingCart.svg";
import React from "react";
import detail from "../assets/images/detail.svg";
import { useNavigate, useParams, useSearchParams } from "react-router";

export default function ProductDetail() {
  const [counter, setCounter] = React.useState(1);
  const [unClick, setUnClick] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [detailData, setDetailData] = React.useState({});

  // const search = searchParams.get("search") || "";
  //
  const { id } = useParams();

  const API_URL = import.meta.env.VITE_SOLID_API_URL;
  //
  const handleIncrement = () => {
    setCounter((counter) => {
      return counter + 1;
    });
    updateParams("qty", counter + 1);
  };
  //
  const handleDecrement = () => {
    if (counter <= 0) {
      return;
    }
    setCounter((counter) => {
      return counter - 1;
    });
    updateParams("qty", counter - 1);
  };
  //
  const handleInput = (value) => {
    setUnClick((prev) => {
      if (prev === value) {
        return null;
      } else if (prev !== value) {
        return value;
      }
    });
  };
  //
  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API_URL}/products/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        setDetailData(data.data);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [API_URL, id]);
  //
  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };
  //
  const handleSizeChange = (size) => {
    updateParams("size", size);
  };

  // Tambahkan handler untuk variant
  const handleVariantChange = (variant) => {
    handleInput(variant);
    updateParams("variant", variant);
  };
  //
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate("/product/checkout-product");
  };

  return (
    <section className="mt-10 px-4 lg:mt-20 lg:px-24">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* LEFT - IMAGES */}
        <section className="flex flex-col gap-5">
          <img
            src={
              Array.isArray(detailData.images) 
                ? detailData.images[0] 
                : (typeof detailData.images === 'string' ? detailData.images.split(',')[0] : detailData.images)
            }
            alt="detail-coffe"
            className="w-full rounded-lg object-cover"
          />

          <div className="grid grid-cols-3 gap-3 lg:gap-6">
            {(Array.isArray(detailData.images) || typeof detailData.images === 'string') ? (
              (Array.isArray(detailData.images) ? detailData.images : detailData.images.split(',')).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`detail-coffee-${i}`}
                  className="aspect-square w-full rounded-md object-cover"
                />
              ))
            ) : (
              [detail, detail, detail].map((img, i) => (
                <img
                  key={i}
                  src={detailData.images || img}
                  alt="detail-coffe"
                  className="aspect-square w-full rounded-md object-cover"
                />
              ))
            )}
          </div>
        </section>

        {/* RIGHT - DETAIL */}
        <div className="flex flex-col">
          <p className="inline-block w-fit rounded-full bg-[#D00000] px-3 py-1.5 text-sm font-semibold text-white lg:px-4 lg:py-2 lg:text-xl">
            Flash Sale!
          </p>

          <p className="py-5 text-3xl font-medium lg:text-6xl">
            {detailData.product_name}
          </p>

          <div className="flex items-center gap-3 lg:gap-4">
            <p className="text-sm text-[#D00000] line-through lg:text-base">
              IDR.{detailData.price}
            </p>
            <p className="text-brand-orange text-xl lg:text-2xl">
              IDR.{detailData.price - (detailData.price * 10) / 100}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 py-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <img key={item} src={Star} alt="star" className="w-4 lg:w-5" />
            ))}
            <span className="ml-2 text-sm lg:text-base">
              {parseFloat(detailData.rating).toFixed(1)}
            </span>
          </div>

          {/* Review */}
          <div className="flex items-center gap-3 text-sm text-gray-500 lg:text-base">
            <span>{detailData.total_review} Review</span>

            {detailData.total_review >= 3 && (
              <>
                <span>|</span>
                <span>Recommendation</span>
              </>
            )}
          </div>
          <div>
            <p className="text-sm lg:text-base">
              Cold brewing is a method of brewing that combines ground coffee
              and cool water and uses time instead of heat to extract the
              flavor. It is brewed in small batches and steeped for as long as
              48 hours.
            </p>
            <div className="mt-4 grid max-w-xs grid-cols-3 items-center justify-center gap-2 border border-gray-200 text-center">
              <button
                className="border-brand-orange rounded border-2 px-4 py-2 text-2xl"
                onClick={handleDecrement}
              >
                -
              </button>
              <p className="text-lg lg:text-xl">{counter}</p>
              <button
                className="bg-brand-orange border-brand-orange rounded border px-4 py-2 text-2xl text-white"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <div className="mt-4">
              <label
                htmlFor="size"
                className="text-xl font-semibold lg:text-2xl"
              >
                Choose Size
              </label>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm lg:gap-6 lg:text-base">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value="regular"
                    className="peer sr-only appearance-none"
                    onChange={() => handleSizeChange("regular")}
                  />
                  <div className="border border-gray-400 py-3 peer-checked:border-orange-500">
                    Regular
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value="medium"
                    className="peer sr-only appearance-none"
                    onChange={() => handleSizeChange("medium")}
                  />
                  <div className="border border-gray-400 py-3 peer-checked:border-orange-500">
                    Medium
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value="large"
                    className="peer sr-only appearance-none"
                    onChange={() => handleSizeChange("large")}
                  />
                  <div className="border border-gray-400 py-3 peer-checked:border-orange-500">
                    Large
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="variant"
                className="text-xl font-semibold lg:text-2xl"
              >
                Hot/Ice?
              </label>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm lg:gap-6 lg:text-base">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="variant"
                    value="ice"
                    className="peer sr-only appearance-none"
                    onChange={() => handleVariantChange("ice")}
                  />
                  <div className="border border-gray-400 py-3 peer-checked:border-orange-500">
                    Ice
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="variant"
                    value="hot"
                    className="peer sr-only appearance-none"
                    checked={unClick === "hot"}
                    onChange={() => handleVariantChange("hot")}
                  />
                  <div className="border border-gray-400 py-3 peer-checked:border-orange-500">
                    Hot
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
              <button
                onClick={handleBuy}
                className="bg-brand-orange rounded-md py-4 text-sm font-semibold text-white hover:bg-orange-500 lg:text-base"
              >
                Buy
              </button>
              <button className="border-brand-orange text-brand-orange flex items-center justify-center gap-2 rounded-md border py-4 text-sm font-semibold lg:text-base">
                <img src={Chart} alt="shopping-cart" className="h-5 w-5" />
                add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8 lg:mt-12">
        <h2 className="text-center text-2xl md:text-3xl lg:text-left lg:text-5xl">
          Recommendation <span className="text-[#8E6447]">For You</span>
        </h2>
      </section>
      <div className="mt-4 px-0 sm:px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {[1, 2, 3].map((item) => (
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
                      className="filter-brand-orange text-brand-orange h-4 w-4 sm:h-6 sm:w-6"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="mt-12 mb-8 flex items-center justify-center gap-3">
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
    </section>
  );
}
