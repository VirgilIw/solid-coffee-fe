import React from "react";

import profile from "../assets/images/Profile.svg";
import mail from "../assets/images/mail.svg";
import location from "../assets/product/Location.svg";
import PaymentType from "../components/ui/product/PaymentType";
import AddNewMenu from "../components/ui/product/AddNewMenu";

export default function CheckoutProduct() {
  const [deliveryMethod, setDeliveryMethod] = React.useState("dine-in");
  const [isOpen, setIsOpen] = React.useState(false);

  const orderItems = [
    {
      id: 1,
      name: "Hazelnut Latte",
      size: "2pcs | Regular | Ice | Dine In",
      originalPrice: 40000,
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop",
      flash: true,
    },
    {
      id: 2,
      name: "Hazelnut Latte",
      size: "2pcs | Regular | Ice | Dine In",
      originalPrice: 40000,
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop",
      flash: true,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const delivery = 0;
  const tax = 4000;
  const total = subtotal + delivery + tax;

  const handleNewMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Payment Details</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Order Items & Form */}
          <div className="space-y-6">
            {/* Your Order Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Order</h2>
                <button
                  className="bg-brand-orange rounded-lg px-4 py-2 text-sm font-medium hover:bg-orange-500"
                  onClick={handleNewMenu}
                >
                  + Add Menu
                </button>
                {isOpen && <AddNewMenu onClose={() => setIsOpen(false)} />}
              </div>

              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      {item.flash && (
                        <span className="absolute -top-2 -left-2 rounded bg-red-600 px-2 py-1 text-xs text-white">
                          FLASH SALE
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="mb-2 text-sm text-gray-600">{item.size}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          IDR {item.originalPrice.toLocaleString("id-ID")}
                        </span>
                        <span className="font-bold text-orange-500">
                          IDR {item.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <button className="text-red-500 hover:text-red-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info & Delivery Form */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Payment Info & Delivery
              </h2>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                      <img src={mail} alt="mail" />
                    </span>
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400">
                      <img src={profile} alt="name" />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Your Full Name"
                      className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400">
                      <img src={location} alt="location" className="w-6" />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Your Address"
                      className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {/* Dine In */}
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="delivery_method"
                        value="dine-in"
                        checked={deliveryMethod === "dine-in"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:border-gray-400">
                        Dine In
                      </div>
                    </label>

                    {/* Door Delivery */}
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="delivery_method"
                        value="door-delivery"
                        checked={deliveryMethod === "door-delivery"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:border-gray-400">
                        Door Delivery
                      </div>
                    </label>

                    {/* Pick Up */}
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="delivery_method"
                        value="pick-up"
                        checked={deliveryMethod === "pick-up"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="peer sr-only"
                      />
                      <div className="rounded-lg border-2 border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-600 hover:border-gray-400">
                        Pick Up
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Total</h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Order</span>
                  <span>Idr. {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>Idr. {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-semibold">
                  <span>Sub Total</span>
                  <span>Idr. {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button className="bg-brand-orange mb-6 w-full rounded-lg py-4 font-semibold text-white transition-colors hover:bg-orange-500">
                Checkout
              </button>
              <PaymentType />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
