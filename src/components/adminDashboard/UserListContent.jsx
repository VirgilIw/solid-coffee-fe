import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/slices/user.slice'
import PlusIcon from "../../assets/adminDashborad/Plus.svg"
import { Search } from "lucide-react";
import FilterIcon from "../../assets/adminDashborad/FilterIcon.svg";
import InsertUser from "./InsertUser"
import UpdateUser from './UpdateUser'
import Pencil from "../../assets/adminDashborad/Pencil.svg"
import Delete from "../../assets/adminDashborad/Delete.svg"
import UserIcon from "../../assets/adminDashborad/UserIcon.svg"
import DeleteUser from '../ui/dashboardUi/DeleteUser'

function UserListContent() {
  const dispatch = useDispatch()
  const { items: users, isLoading, error } = useSelector((state) => state.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // const searchParam = params.get("search") || "";
    // const pageParam = parseInt(params.get("page")) || 1;
    
    // setSearchInput(searchParam);
    // setSearchTerm(searchParam);
    // setCurrentPage(pageParam);
  }, []);

  const updateUrlQueryParam = (key, value) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({ path: url.href }, "", url.href);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setIsUpdateOpen(true)
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
      updateUrlQueryParam("page", page);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage }));
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
  }

  return (
    <>
      <section>
        <div className='flex justify-between items-center p-10'>
          <div>
            <p className='text-3xl font-medium'>User List</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className='flex items-center gap-2 bg-brand-orange text-black px-4 py-2 rounded-md mt-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-[#ffad4e]'
            >
              <img src={PlusIcon} alt="Icon Plus" /> Add User
            </button>
          </div>

            <div className="w-full md:w-auto">
               <div>
                <p className="mt-1 text-sm text-gray-500">Search User</p>
              </div>
              <form onSubmit={handleFilter} className="flex gap-3">
                <div className="flex justify-between rounded border px-3 py-2 bg-white">
                  <input
                    type="text"
                    placeholder="Enter User Name or Email"
                    className="w-48 md:w-64 focus:outline-none"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                  <div className="flex items-center pl-3">
                    <Search size={20} className="text-gray-400" />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-brand-orange flex h-full items-center justify-center gap-1 rounded-lg border-0 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-[#ffad4e]"
                  >
                    <div className="w-5">
                      <img src={FilterIcon} alt="filter-icon" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">Filter</p>
                    </div>
                  </button>
                </div>
              </form>
            </div>
        </div>

        {/* Table */}
        <div className="px-10 pb-10">
          <div className="bg-white rounded-lg shadow-[0px_4px_20px_0px_#0000000D] border border-[#E8E8E8] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FAFAFA] text-[#4F5665] font-semibold text-sm border-b border-[#E8E8E8]">
                <tr>
                  <th className="p-3 text-center w-16">
                    <input type="checkbox" className="w-4 h-4 accent-brand-orange cursor-pointer" />
                  </th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-[#4F5665] text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center font-medium">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center font-medium text-red-500">{error}</td>
                  </tr>
                ) : !Array.isArray(users) ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center font-medium">Format data tidak valid.</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center font-medium">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-[#E8E8E8] hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-center">
                        <input type="checkbox" className="w-4 h-4 accent-brand-orange cursor-pointer" />
                      </td>
                      <td className="p-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200">
                          <img src={user.photo ? `http://192.168.50.221:8080/static/img${user.photo}` : UserIcon} alt={user.fullname} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-3 font-medium text-black whitespace-nowrap">{user.fullname}</td>
                      <td className="p-3 whitespace-nowrap">{user.phone}</td>
                      <td className="p-3 max-w-xs leading-relaxed">{user.address}</td>
                      <td className="p-3 cursor-pointer">{user.email}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#FF890633]">
                            <img src={Pencil} alt="Edit" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(user)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#D0000033]">
                            <img src={Delete} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-6 border-t border-[#E8E8E8] text-[#4F5665] text-sm">
              <p>Showing page {currentPage} of users</p>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="hover:text-black font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  Prev
                </button>
                <div className="flex items-center gap-4 font-medium">
                  {/* Dynamic page numbers could be improved if total pages are known */}
                  <span className="text-brand-orange font-bold text-lg">{currentPage}</span>
                  <span 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="cursor-pointer hover:text-black transition-colors"
                  >
                    {currentPage + 1}
                  </span>
                  <span 
                    onClick={() => handlePageChange(currentPage + 2)}
                    className="cursor-pointer hover:text-black transition-colors"
                  >
                    {currentPage + 2}
                  </span>
                </div>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="hover:text-black font-medium transition-colors cursor-pointer"
                >
                    Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Insert User Modal */}
      <InsertUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpdateUser 
        key={selectedUser?.id}
        isOpen={isUpdateOpen} 
        onClose={() => {
          setIsUpdateOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
      />
      <DeleteUser
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
      />
    </>
  )
}

export default UserListContent
