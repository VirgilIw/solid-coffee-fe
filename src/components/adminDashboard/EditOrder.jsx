import {
  ChevronDown,
  X,
  AlertCircle,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
} from "lucide-react";

import Xicon from "../../assets/adminDashborad/XCircle.svg";
import StatusIcon from "../../assets/adminDashborad/u_process.svg";

function EditOrder({
  activeSidebar,
  isSidebarOpen,
  handleCloseSidebar,
  selectedOrder,
  formatPrice,
}) {
  const handleStatusUpdate = (newStatus) => {
    console.log(`Update status to: ${newStatus}`);
    handleCloseSidebar();
  };

  return (
    <>
      {activeSidebar === "detail" && selectedOrder && (
        <div
          className={`fixed top-0 right-0 z-40 h-full w-full transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out md:w-96 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} `}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order {selectedOrder.orderNumber}
                </h2>
                <p className="text-sm text-gray-600">Order Information</p>
              </div>
              <button
                onClick={handleCloseSidebar}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <img src={Xicon} alt="x-icon" />
              </button>
            </div>

            <div className="flex-1 p-6">
              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Order Information
                </h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-2 border-b border-gray-200 pb-3">
                    <User size={18} className="mt-1 shrink-0 text-gray-400" />
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm text-gray-600">Full Name</div>
                      <div className="font-medium">
                        {selectedOrder.customer.fullName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-gray-200 pb-3">
                    <MapPin size={18} className="mt-1 shrink-0 text-gray-400" />
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="font-medium">
                        {selectedOrder.customer.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-gray-200 pb-3">
                    <Phone size={18} className="mt-1 shrink-0 text-gray-400" />
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">
                        {selectedOrder.customer.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-gray-200 pb-3">
                    <CreditCard
                      size={18}
                      className="mt-1 shrink-0 text-gray-400"
                    />
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Payment Method
                      </div>
                      <div className="font-medium">
                        {selectedOrder.customer.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-gray-200 pb-3">
                    <Truck size={18} className="mt-1 shrink-0 text-gray-400" />
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm text-gray-600">Shipping</div>
                      <div className="font-medium">
                        {selectedOrder.customer.shipping}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pt-2 pb-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <img src={StatusIcon} alt="status-icon" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        className={`rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold`}
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                      >
                        <option value="Waiting">Waiting</option>
                        <option value="On Progress">On Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-800">Total Transaksi:</p>
                </div>
                <div>
                  <p className="text-brand-orange font-semibold">
                    {formatPrice(selectedOrder.total)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Your Order
                </h3>
                <div className="space-y-4">
                  {selectedOrder.details?.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-4 last:border-0"
                    >
                      <h4 className="mb-2 font-medium text-gray-800">
                        {item.name}
                      </h4>
                      <div className="mb-2 text-sm text-gray-600">
                        {item.quantity}pcs | {item.size} | {item.temperature} |{" "}
                        {item.type}
                      </div>
                      <div className="flex items-center justify-start">
                        <div className="text-right font-medium text-brand-orange">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  onClick={() => handleStatusUpdate("Done")}
                  className="bg-brand-orange hover:brighness-75 w-full rounded-lg px-6 py-2 font-medium shadow-sm transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditOrder;
