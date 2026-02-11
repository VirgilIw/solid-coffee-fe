import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { fetchOrders } from "../../redux/slices/order.slice";

function OrderList() {
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    address: "",
    phone: "",
    paymentMethod: "Cash",
    shipping: "Dine In",
    items: [
      {
        name: "",
        size: "Regular",
        quantity: 1,
        temperature: "Ice",
        type: "Dine In",
        price: 0,
      },
    ],
  });

  // const orders = [
  //   {
  //     id: 1,
  //     orderNumber: "#12354-09893",
  //     date: "26 January 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "R", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Done",
  //     total: 40000,
  //     customer: {
  //       fullName: "Ghaluh Wizard Anggoro",
  //       address: "Griya bandung indah",
  //       phone: "082116304338",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //     details: [
  //       {
  //         name: "Hazelnut Latte",
  //         quantity: 2,
  //         size: "Regular",
  //         temperature: "Ice",
  //         type: "Dine In",
  //         price: 40000,
  //         unitPrice: 20000,
  //       },
  //       {
  //         name: "Caramel Machiatto",
  //         quantity: 2,
  //         size: "Regular",
  //         temperature: "Ice",
  //         type: "Dine In",
  //         price: 40000,
  //         unitPrice: 20000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     orderNumber: "#12354-09894",
  //     date: "27 January 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Pending",
  //     total: 40000,
  //     customer: {
  //       fullName: "John Doe",
  //       address: "Jl. Merdeka No. 123",
  //       phone: "081234567890",
  //       paymentMethod: "Credit Card",
  //       shipping: "Delivery",
  //     },
  //   },
  //   {
  //     id: 3,
  //     orderNumber: "#12354-09895",
  //     date: "28 January 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "On Progress",
  //     total: 40000,
  //     customer: {
  //       fullName: "Jane Smith",
  //       address: "Jl. Sudirman No. 45",
  //       phone: "085678901234",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //   },
  //   {
  //     id: 4,
  //     orderNumber: "#12354-09896",
  //     date: "29 January 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Waiting",
  //     total: 40000,
  //     customer: {
  //       fullName: "Robert Johnson",
  //       address: "Jl. Gatot Subroto No. 78",
  //       phone: "087812345678",
  //       paymentMethod: "Debit Card",
  //       shipping: "Delivery",
  //     },
  //   },
  //   {
  //     id: 5,
  //     orderNumber: "#12354-09897",
  //     date: "30 January 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "On Progress",
  //     total: 40000,
  //     customer: {
  //       fullName: "Sarah Williams",
  //       address: "Jl. Thamrin No. 90",
  //       phone: "081112223333",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //   },
  //   {
  //     id: 6,
  //     orderNumber: "#12354-09898",
  //     date: "1 Frebuari 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "R", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Done",
  //     total: 40000,
  //     customer: {
  //       fullName: "Ghaluh Wizard Anggoro",
  //       address: "Griya bandung indah",
  //       phone: "082116304338",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //     details: [
  //       {
  //         name: "Hazelnut Latte",
  //         quantity: 2,
  //         size: "Regular",
  //         temperature: "Ice",
  //         type: "Dine In",
  //         price: 40000,
  //         unitPrice: 20000,
  //       },
  //       {
  //         name: "Caramel Machiatto",
  //         quantity: 2,
  //         size: "Regular",
  //         temperature: "Ice",
  //         type: "Dine In",
  //         price: 40000,
  //         unitPrice: 20000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     orderNumber: "#12354-09899",
  //     date: "2 Frebuary 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Pending",
  //     total: 40000,
  //     customer: {
  //       fullName: "John Doe",
  //       address: "Jl. Merdeka No. 123",
  //       phone: "081234567890",
  //       paymentMethod: "Credit Card",
  //       shipping: "Delivery",
  //     },
  //   },
  //   {
  //     id: 8,
  //     orderNumber: "#12354-09900",
  //     date: "3 Frebuary 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "On Progress",
  //     total: 40000,
  //     customer: {
  //       fullName: "Jane Smith",
  //       address: "Jl. Sudirman No. 45",
  //       phone: "085678901234",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //   },
  //   {
  //     id: 9,
  //     orderNumber: "#12354-09901",
  //     date: "4 Frebuary 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "Waiting",
  //     total: 40000,
  //     customer: {
  //       fullName: "Robert Johnson",
  //       address: "Jl. Gatot Subroto No. 78",
  //       phone: "087812345678",
  //       paymentMethod: "Debit Card",
  //       shipping: "Delivery",
  //     },
  //   },
  //   {
  //     id: 10,
  //     orderNumber: "#12354-09902",
  //     date: "5 Frebuary 2023",
  //     items: [
  //       { name: "Hazelnut Latte", size: "L", quantity: 1 },
  //       { name: "Caramel Machiatto", size: "L", quantity: 1 },
  //     ],
  //     status: "On Progress",
  //     total: 40000,
  //     customer: {
  //       fullName: "Sarah Williams",
  //       address: "Jl. Thamrin No. 90",
  //       phone: "081112223333",
  //       paymentMethod: "Cash",
  //       shipping: "Dine In",
  //     },
  //   },
  // ];

  const dispatch = useDispatch();
  const {
    items: orders,
    isLoading,
    error,
  } = useSelector((state) => state.order);
  // const [searchParams, setSearchParams] = useSearchParams();
  // //const [search, setSearch] = useState(searchParams.get("search") || "");

  // //const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   const filters = {
  //     page: Number(searchParams.get("page")) || pageInfo.currentPage,
  //     //limit: 5,
  //     //search: searchParams.get("title") || "",
  //   };
  //   dispatch(fetchOrders(filters));
  // }, [dispatch, pageInfo.currentPage, searchParams]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const updateUrlQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);

    if (window.history.replaceState) {
      window.history.replaceState({ path: url.href }, "", url.href);
    }
  };

  const statusOptions = [{name: "Done"}, {name: "Pending"}, {name: "On Progress"}, {name: "Waiting"}];

  const formatPrice = (price) => {
    return `IDR ${price.toLocaleString("id-ID")}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-[#00A70033] text-[#00A700]";
      case "cancelled":
        return "bg-[#D0000033] text-[#D00000]";
      case "pending":
        return "bg-[#FF890633] text-[#FF8906]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "cancelled":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setActiveSidebar("detail");
  };

  const handleAddOrderClick = () => {
    setActiveSidebar("add");
  };

  const handleCloseSidebar = () => {
    setActiveSidebar(null);
    setSelectedOrder(null);

    if (activeSidebar === "add") {
      setNewOrder({
        customerName: "",
        address: "",
        phone: "",
        paymentMethod: "Cash",
        shipping: "Dine In",
        items: [
          {
            name: "",
            size: "Regular",
            quantity: 1,
            temperature: "Ice",
            type: "Dine In",
            price: 0,
          },
        ],
      });
    }
  };

  const [filter, setFilter] = useState({
    status: "",
    search: "",
  });

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setFilter({
      status: "",
      search: "",
    })
  };

  const handleFilterSearchChange = (event) => {
    setFilter({search: event.target.value})
    updateUrlQueryParam("search", "")
    updateUrlQueryParam("search", event.target.value)
  };

  const handleFilterStatusChange = (event) => {
    setFilter({status: event.target.value})
    updateUrlQueryParam("status", "")
    updateUrlQueryParam("status", event.target.value)
  };


  const handlePageChange = (page) => {
      if (page > 0) {
        setCurrentPage(page);
        updateUrlQueryParam("page", page);
      }
    };
  
    useEffect(() => {
      dispatch(fetchOrders({ page: currentPage }));
    }, [dispatch, currentPage, searchTerm]);
  
    const handleFilter = (e) => {
      e.preventDefault();
      setSearchTerm(searchInput);
      setCurrentPage(1);
      updateUrlQueryParam("search", searchInput);
      updateUrlQueryParam("page", 1);
    };
  
    const handleSearchChange = (e) => {
      setSearchInput(e.target.value);
    };
  

  const isSidebarOpen = activeSidebar !== null;

  return (
    <div>
      {/* Order Edit Sidebar */}
      <EditOrder
        activeSidebar={activeSidebar}
        isSidebarOpen={isSidebarOpen}
        handleCloseSidebar={handleCloseSidebar}
        selectedOrder={selectedOrder}
        getStatusColor={getStatusColor}
        formatPrice={formatPrice}
      />

      {/* Add Order Sidebar */}
      <AddOrder
        activeSidebar={activeSidebar}
        isSidebarOpen={isSidebarOpen}
        handleCloseSidebar={handleCloseSidebar}
        newOrder={newOrder}
        setNewOrder={setNewOrder}
        formatPrice={formatPrice}
      />

      {/* Main Content */}

      <div className={`${isSidebarOpen ? 'brightness-50 backdrop-brightness-50' : ''} min-h-screen p-4 md:p-8`}>
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="mb-8 flex flex-col gap-2">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                Order List
              </h2>
            </div>
            <div className="relative">
              <div>
                <button
                  onClick={handleAddOrderClick}
                  className="bg-brand-orange flex w-full items-center gap-2 rounded-lg px-4 py-3 font-medium text-white shadow-sm transition-colors hover:brightness-75 md:w-auto"
                >
                  <Plus size={20} />
                  <span>Add Order</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-[60%]">
            <form onSubmit={handleFilterSubmit} className="grid w-full grid-cols-[30%_49%_21%] gap-3">
              <div className="flex w-full flex-col items-start justify-center gap-2 text-gray-500">
                <div className="w-full">
                  <p>Status</p>
                </div>
                <select
                  id="status"
                  name="status"
                  className="w-full rounded-md border border-gray-300 p-2"
                  value= {filter.status}
                  onChange={handleFilterStatusChange}
                >
                  <option 
                  value="" 
                  className="w-full px-4 py-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100">
                    All
                  </option>
                  {statusOptions.map((status) => (
                    <option
                      key={status.name}
                      value={status.name}
                      className="w-full px-4 py-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Search Bar */}
              <div className="flex w-full flex-col">
                <div>
                  <p className="mt-1 text-sm text-gray-500">Search Order</p>
                </div>
                <div className="flex rounded-lg border border-gray-300 p-3 transition-all focus:ring-2 focus:brightness-75">
                  <input
                    type="text"
                    placeholder="Enter Order Number"
                    value={filter.search}
                    onChange={handleFilterSearchChange}
                    className="w-full"
                  />
                  <div className="flex items-center">
                    <Search size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="flex h-full items-end justify-start">
                <button
                  type="submit"
                  className="bg-brand-orange flex gap-2 rounded-md border-0 px-2 py-4"
                >
                  <Filter size={20} />
                  <p>Filter</p>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tabel Order */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    No. Order
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                    <tr>
                      <td colSpan="7" className="p-10 text-center font-medium">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-10 text-center font-medium text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : !Array.isArray(orders) ? (
                    <tr>
                      <td colSpan="7" className="p-10 text-center font-medium">
                        Format data tidak valid.
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-10 text-center font-medium">
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} cursor-pointer transition-colors hover:bg-gray-100`}
                    onClick={() => handleOrderClick(order)}
                  >
                    {/* No. Order */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.order_id}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>

                    {/* Order Items */}
                    <td className="px-6 py-4">
                      {/* <div className="text-sm text-gray-700">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <span className="text-gray-500">•</span>
                            <span>
                              {item.name} {item.size}
                              {item.quantity}x
                            </span>
                          </div>
                        ))}
                      </div> */}
                      <div className="text-sm text-gray-700">
                          <div className="flex items-center gap-1">
                            <p>{order.items}</p>
                          </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="flex items-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="text-brand-orange rounded-md p-2 transition-colors hover:brightness-75"
                          title="Edit"
                          onClick={() => handleOrderClick(order)}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>

          {/* Footer Tabel: Pagination */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              {/* Info jumlah order */}
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold">{orders.length}</span>{" "}
                order of <span className="font-semibold">100</span> order
              </div>

              {/* Pagination */}
                <div className="flex items-center justify-between border-t border-[#E8E8E8] p-6 text-sm text-[#4F5665]">
                  
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="cursor-pointer font-medium transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <div className="flex items-center gap-4 font-medium">
                      {/* Dynamic page numbers could be improved if total pages are known */}
                      <span className="text-brand-orange text-lg font-bold">
                        {currentPage}
                      </span>
                      <span
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="cursor-pointer transition-colors hover:text-black"
                      >
                        {currentPage + 1}
                      </span>
                      <span
                        onClick={() => handlePageChange(currentPage + 2)}
                        className="cursor-pointer transition-colors hover:text-black"
                      >
                        {currentPage + 2}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer font-medium transition-colors hover:text-black"
                    >
                      Next
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
