import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import FilterIcon from "../../assets/adminDashborad/FilterIcon.svg";
import Delete from "../../assets/adminDashborad/deleteIcon.svg";
import Edit from "../../assets/adminDashborad/editIcon.svg";
import EditProduct from "./EditProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../../redux/slices/menu.slice";
import AddMenu from "./AddMenu";

function MenuList() {
  const dispatch = useDispatch();
  const { items: menu, isLoading, error } = useSelector((state) => state.menu);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setSearchTerm("");
  };

  const updateUrlQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);

    if (window.history.replaceState) {
      window.history.replaceState({ path: url.href }, "", url.href);
    }
  };

  const [isAddbarOpen, setIsAddbarOpen] = useState(false);

  const toggleAddbar = () => {
    setIsAddbarOpen(!isAddbarOpen);
  };

  const [isEditbarOpen, setIsEditbarOpen] = useState(false);

  const toggleEditbar = () => {
    setIsEditbarOpen(!isEditbarOpen);
  };

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
      updateUrlQueryParam("page", page);
    }
  };

  useEffect(() => {
    dispatch(fetchMenu({ page: currentPage }));
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

  const [selectProduct, setSelectProduct] = useState(null);

  const handleOpenAndSelect = (menu) => {
    setSelectProduct(menu);
    setIsEditbarOpen(true);
  };

  let no = 1;

  return (
    <div>
      {selectProduct ? (
        <EditProduct
          isEditbarOpen={isEditbarOpen}
          toggleEditbar={toggleEditbar}
          selectProduct={selectProduct}
        />
      ) : (
        <></>
      )}
      <AddMenu isAddbarOpen={isAddbarOpen} toggleAddbar={toggleAddbar} />
      <div
        className={` ${isEditbarOpen || isAddbarOpen ? "brightness-50 backdrop-brightness-50" : ""} relative min-h-screen min-w-fit`}
      >
        <div className="w-full p-4 md:p-8">
          <div className="mb-8 flex w-full items-center justify-between">
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <div>
                <p className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
                  Menu List
                </p>
              </div>
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:items-center">
                <button
                  onClick={() => setIsAddbarOpen(true)}
                  className="bg-brand-orange flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-black shadow-sm transition-colors hover:text-white hover:brightness-70"
                >
                  <Plus size={20} />
                  <span>Add Menu</span>
                </button>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div>
                <p className="mt-1 text-sm text-gray-500">Search Menu</p>
              </div>
              <form onClick={handleSubmitSearch} className="flex gap-3">
                <div className="flex justify-between rounded border px-3 py-2">
                  <input
                    id="menu-name"
                    name="menu-name"
                    type="text"
                    placeholder="Enter Menu Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-fit"
                  />
                  <div className="flex items-center pl-3">
                    <Search size={20} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-brand-orange flex h-full items-center justify-center gap-1 rounded-lg border-0 p-3"
                  >
                    <div className="w-5">
                      <img src={FilterIcon} alt="filter-icon" />
                    </div>
                    <div>
                      <p>Filter</p>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full rounded-xl bg-white shadow-md">
            <div className="w-full min-w-167.5">
              <table className="w-full divide-y divide-gray-200">
                <thead className="w-full bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      no
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full divide-y divide-gray-200">
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
                  ) : !Array.isArray(menu) ? (
                    <tr>
                      <td colSpan="7" className="p-10 text-center font-medium">
                        Format data tidak valid.
                      </td>
                    </tr>
                  ) : menu.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-10 text-center font-medium">
                        No menu found.
                      </td>
                    </tr>
                  ) : (
                    menu.map((menu, index) => (
                      <tr
                        key={menu.id}
                        className={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} transition-colors hover:bg-gray-100`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <p>{no++}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <p>{menu.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <p>{parseFloat(menu.discount)}</p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {menu.product_name}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {menu.stock}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div
                            className="flex max-w-xs items-center justify-center gap-2 truncate text-sm text-gray-700"
                            title="menu-action"
                          >
                            <div className="h-5 w-5">
                              <button
                                key={menu.id}
                                onClick={() => handleOpenAndSelect(menu)}
                                className="h-full w-full"
                              >
                                <img
                                  src={Edit}
                                  alt="edit-action-icon"
                                  className="h-full w-full"
                                />
                              </button>
                            </div>
                            <div className="h-5 w-5">
                              <button className="h-full w-full">
                                <img
                                  src={Delete}
                                  alt="delete-action-icon"
                                  className="h-full w-full"
                                />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{menu.length}</span>{" "}
                  menu of <span className="font-semibold">100</span> menu
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
    </div>
  );
}

export default MenuList;
