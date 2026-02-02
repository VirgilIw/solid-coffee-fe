import React, { useState } from 'react'
import PlusIcon from "../../assets/adminDashborad/Plus.svg"
import Filter from "../../assets/adminDashborad/Filter.svg"
import InserUser from "./InserUser"
import UpdateUser from './UpdateUser'
import Union from "../../assets/adminDashborad/Union.svg"
import Search from "../../assets/adminDashborad/Search.svg"
import Pencil from "../../assets/adminDashborad/Pencil.svg"
import Delete from "../../assets/adminDashborad/Delete.svg"
import User1 from "../../assets/adminDashborad/User1.jpg"
import User2 from "../../assets/adminDashborad/User2.jpg"
import User3 from "../../assets/adminDashborad/User3.jpg"
import User4 from "../../assets/adminDashborad/User4.jpg"
import User5 from "../../assets/adminDashborad/User5.jpg"


function UserListContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const users = [
    { id: 1, name: "Eleanor Pena", phone: "(205) 555-0100", address: "3517 W. Gray St. Utica, Pennsylvania 57867", email: "cikaracak@gmail.com", img: User1 },
    { id: 2, name: "Ronald Richards", phone: "(205) 555-0100", address: "1901 Thornridge Cir. Shiloh, Hawaii 81063", email: "cikaracak@gmail.com", img: User2 },
    { id: 3, name: "Darlene Robertson", phone: "(209) 555-0104", address: "4140 Parker Rd. Allentown, New Mexico 31134", email: "cikaracak@gmail.com", img: User3 },
    { id: 4, name: "Kristin Watson", phone: "(252) 555-0126", address: "2972 Westheimer Rd. Santa Ana, Illinois 85486", email: "cikaracak@gmail.com", img: User4 },
    { id: 5, name: "Dianne Russell", phone: "(201) 555-0124", address: "4517 Washington Ave. Manchester, Kentucky 39495", email: "cikaracak@gmail.com", img: User5 },
  ]

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
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#E8E8E8] hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center">
                      <input type="checkbox" className="w-4 h-4 accent-brand-orange cursor-pointer" />
                    </td>
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200">
                         <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3 font-medium text-black whitespace-nowrap">{user.name}</td>
                    <td className="p-3 whitespace-nowrap">{user.phone}</td>
                    <td className="p-3 max-w-xs leading-relaxed">{user.address}</td>
                    <td className="p-3 cursor-pointer">{user.email}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => setIsUpdateOpen(true)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#FF890633]">
                          <img src={Pencil} alt="Edit" />
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity bg-[#D0000033]">
                          <img src={Delete} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
      <UpdateUser isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}/>

    </>
  )
}

export default UserListContent
