import {
  ChevronDown,
  X,
  Plus,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
} from "lucide-react";
import Xicon from "../../assets/adminDashborad/XCircle.svg";

function AddOrder({
  activeSidebar,
  isSidebarOpen,
  handleCloseSidebar,
  newOrder,
  setNewOrder,
  formatPrice,
}) {
    const paymentMethods = ["Cash", "Credit Card", "Debit Card", "E-Wallet"];

    const shippingOptions = ["Dine In", "Delivery", "Take Away"];

  const handleAddOrderSubmit = (e) => {
    e.preventDefault();

    handleCloseSidebar();
  };

  const handleAddOrderInput = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    setNewOrder((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "",
          size: "Regular",
          quantity: 1,
          temperature: "Ice",
          type: "Dine In",
          price: 0,
        },
      ],
    }));
  };

  const handleItemInput = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setNewOrder((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleRemoveItem = (index) => {
    if (newOrder.items.length > 1) {
      const updatedItems = newOrder.items.filter((_, i) => i !== index);
      setNewOrder((prev) => ({
        ...prev,
        items: updatedItems,
      }));
    }
  };

  const calculateTotal = () => {
    return newOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <>
      {/* Add Order Sidebar */}
      {activeSidebar === "add" && (
        <div
          className={`fixed top-0 right-0 z-40 h-full w-full overflow-y-auto transform bg-white py-10 shadow-2xl transition-transform duration-300 ease-in-out md:w-96 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} `}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Order
                </h2>
                <p className="text-sm text-gray-600">
                  Create a new customer order
                </p>
              </div>
              <button
                onClick={handleCloseSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <img src={Xicon} alt="x-icon" />
              </button>
            </div>

            <div className="flex-1 p-6">
              <form onSubmit={handleAddOrderSubmit}>
                {/* Customer Information */}
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Customer Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute top-3 left-3 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="customerName"
                          value={newOrder.customerName}
                          onChange={handleAddOrderInput}
                          placeholder="Enter full name"
                          className="focus:brighness-75 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:ring-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute top-3 left-3 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="address"
                          value={newOrder.address}
                          onChange={handleAddOrderInput}
                          placeholder="Enter address"
                          className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:ring-2 focus:brightness-75"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute top-3 left-3 text-gray-400"
                          size={20}
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={newOrder.phone}
                          onChange={handleAddOrderInput}
                          placeholder="Enter phone number"
                          className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:ring-2 focus:brightness-75"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <div className="relative">
                        <CreditCard
                          className="absolute top-3 left-3 text-gray-400"
                          size={20}
                        />
                        <select
                          name="paymentMethod"
                          value={newOrder.paymentMethod}
                          onChange={handleAddOrderInput}
                          className="w-full appearance-none rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:ring-2 focus:brightness-75"
                        >
                          {paymentMethods.map((method) => (
                            <option key={method} value={method}>
                              {method}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute top-3 right-3 text-gray-400"
                          size={20}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Shipping Method
                      </label>
                      <div className="relative">
                        <Truck
                          className="absolute top-3 left-3 text-gray-400"
                          size={20}
                        />
                        <select
                          name="shipping"
                          value={newOrder.shipping}
                          onChange={handleAddOrderInput}
                          className="w-full appearance-none rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-all focus:ring-2 focus:brightness-75"
                        >
                          {shippingOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute top-3 right-3 text-gray-400"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order Items
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-brand-orange flex items-center gap-1 text-sm hover:brightness-75"
                    >
                      <Plus size={16} />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {newOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <h4 className="font-medium text-gray-800">
                            Item {index + 1}
                          </h4>
                          {newOrder.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Product Name
                            </label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                handleItemInput(index, "name", e.target.value)
                              }
                              placeholder="Enter product name"
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Size
                            </label>
                            <select
                              value={item.size}
                              onChange={(e) =>
                                handleItemInput(index, "size", e.target.value)
                              }
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                            >
                              <option value="Regular">Regular</option>
                              <option value="Large">Large</option>
                              <option value="Extra Large">Extra Large</option>
                            </select>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Quantity
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemInput(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                              Price (IDR)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={item.price}
                              onChange={(e) =>
                                handleItemInput(
                                  index,
                                  "price",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">
                      Total:
                    </span>
                    <span className="text-brand-orange text-2xl font-bold">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-center items-center space-x-3">
                <button
                  type="button"
                  onClick={handleCloseSidebar}
                  className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAddOrderSubmit}
                  className="bg-brand-orange rounded-lg px-6 py-3 font-medium text-white shadow-sm transition-colors hover:brightness-75"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddOrder;
