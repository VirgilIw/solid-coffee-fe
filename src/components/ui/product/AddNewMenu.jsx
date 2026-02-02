import React from "react";

export default function AddNewMenu({ onClose, onAddItem }) {
  const menuCategories = [
    {
      category: "Coffee",
      items: [
        {
          id: 101,
          name: "Hazelnut Latte",
          price: 40000,
          image:
            "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop",
        },
        {
          id: 102,
          name: "Caramel Macchiato",
          price: 45000,
          image:
            "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200&h=200&fit=crop",
        },
        {
          id: 103,
          name: "Vanilla Latte",
          price: 42000,
          image:
            "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=200&h=200&fit=crop",
        },
        {
          id: 104,
          name: "Americano",
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop",
        },
        {
          id: 105,
          name: "Cappuccino",
          price: 38000,
          image:
            "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop",
        },
        {
          id: 106,
          name: "Espresso",
          price: 30000,
          image:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=200&h=200&fit=crop",
        },
      ],
    },
    {
      category: "Non-Coffee",
      items: [
        {
          id: 201,
          name: "Matcha Latte",
          price: 38000,
          image:
            "https://images.unsplash.com/photo-1536013756879-b4835fa8e044?w=200&h=200&fit=crop",
        },
        {
          id: 202,
          name: "Chocolate",
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=200&h=200&fit=crop",
        },
        {
          id: 203,
          name: "Red Velvet",
          price: 40000,
          image:
            "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop",
        },
        {
          id: 204,
          name: "Taro Latte",
          price: 38000,
          image:
            "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=200&h=200&fit=crop",
        },
      ],
    },
    {
      category: "Food",
      items: [
        {
          id: 301,
          name: "Croissant",
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop",
        },
        {
          id: 302,
          name: "Sandwich",
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop",
        },
        {
          id: 303,
          name: "Cake Slice",
          price: 30000,
          image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop",
        },
        {
          id: 304,
          name: "Donut",
          price: 20000,
          image:
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
        },
        {
          id: 305,
          name: "Muffin",
          price: 22000,
          image:
            "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200&h=200&fit=crop",
        },
        {
          id: 306,
          name: "Bagel",
          price: 28000,
          image:
            "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200&h=200&fit=crop",
        },
      ],
    },
  ];

  const handleAddItem = (item) => {
    if (onAddItem) {
      onAddItem(item);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Menu</h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-600 transition-colors hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {menuCategories.map((category, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h3 className="mb-4 border-b-2 border-orange-500 pb-2 text-xl font-bold text-gray-800">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="p-3">
                      <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="mb-3 text-sm font-bold text-orange-500">
                        IDR {item.price.toLocaleString("id-ID")}
                      </p>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
