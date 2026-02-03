import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/slices/user.slice'
import PlusIcon from "../../assets/adminDashborad/Plus.svg"
import Filter from "../../assets/adminDashborad/Filter.svg"
import InserUser from "./InserUser"
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
  const [selectedUser, setSelectedUser] = useState(null)

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setIsUpdateOpen(true)
  }

  const handleDeleteClick = (user) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

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

          <div className="flex items-end gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[#4F5665] text-sm font-medium">Search User</label>
              <input type="text" placeholder='Enter User Name' className="border border-[#E8E8E8] rounded-md px-4 py-2 w-64 focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
            <button className="bg-brand-orange text-black flex gap-2 items-center px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow h-10.5 cursor-pointer hover:bg-[#ffad4e]">
              <img src={Filter} alt="Icon Filter" className="w-4 h-4" /> Filter
            </button>
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
                          <img src={user.photo || UserIcon} alt={user.fullname} className="w-full h-full object-cover" />
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
              <p>Show 5 user of 100 user</p>
              <div className="flex items-center gap-6">
                <button className="hover:text-black font-medium transition-colors cursor-pointer">Prev</button>
                <div className="flex items-center gap-4 font-medium">
                  <span className="text-brand-orange font-bold text-lg">1</span>
                  <span className="cursor-pointer hover:text-black transition-colors">2</span>
                  <span className="cursor-pointer hover:text-black transition-colors">3</span>
                  <span className="cursor-pointer hover:text-black transition-colors">4</span>
                  <span className="cursor-pointer hover:text-black transition-colors">5</span>
                  <span className="cursor-pointer hover:text-black transition-colors">6</span>
                  <span className="cursor-pointer hover:text-black transition-colors">7</span>
                  <span className="cursor-pointer hover:text-black transition-colors">8</span>
                  <span className="cursor-pointer hover:text-black transition-colors">9</span>
                </div>
                <button className="hover:text-black font-medium transition-colors cursor-pointer">Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Insert User Modal */}
      <InserUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
